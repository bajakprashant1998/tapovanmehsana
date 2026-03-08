
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'parent', 'student', 'teacher');

-- Create admission_status enum
CREATE TYPE public.admission_status AS ENUM ('pending', 'under_review', 'approved', 'rejected', 'enrolled');

-- Create fee_status enum
CREATE TYPE public.fee_status AS ENUM ('pending', 'paid', 'overdue', 'partial');

-- ==========================================
-- 1. PROFILES TABLE
-- ==========================================
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 2. USER ROLES TABLE
-- ==========================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- 3. ADMISSIONS TABLE
-- ==========================================
CREATE TABLE public.admissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  applying_for_class TEXT NOT NULL,
  previous_school TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'Gujarat',
  message TEXT,
  status admission_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit admission" ON public.admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own admissions" ON public.admissions FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update admissions" ON public.admissions FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete admissions" ON public.admissions FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_admissions_updated_at BEFORE UPDATE ON public.admissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 4. STUDENTS TABLE
-- ==========================================
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admission_id UUID REFERENCES public.admissions(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  roll_number TEXT,
  class TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  date_of_birth DATE,
  gender TEXT,
  parent_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  address TEXT,
  is_hostel_student BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage students" ON public.students FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Teachers can view students" ON public.students FOR SELECT USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Parents can view their children" ON public.students FOR SELECT USING (auth.uid() = parent_user_id);
CREATE POLICY "Students can view themselves" ON public.students FOR SELECT USING (auth.uid() = user_id);

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 5. ATTENDANCE TABLE
-- ==========================================
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present',
  marked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, date)
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/teachers can manage attendance" ON public.attendance FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Parents can view child attendance" ON public.attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = attendance.student_id AND students.parent_user_id = auth.uid())
);
CREATE POLICY "Students can view own attendance" ON public.attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = attendance.student_id AND students.user_id = auth.uid())
);

-- ==========================================
-- 6. FEE STRUCTURES TABLE
-- ==========================================
CREATE TABLE public.fee_structures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class TEXT NOT NULL,
  fee_type TEXT NOT NULL DEFAULT 'tuition',
  amount NUMERIC(10,2) NOT NULL,
  academic_year TEXT NOT NULL DEFAULT '2026-27',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fee_structures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view fee structures" ON public.fee_structures FOR SELECT USING (true);
CREATE POLICY "Admins can manage fee structures" ON public.fee_structures FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- 7. FEE PAYMENTS TABLE
-- ==========================================
CREATE TABLE public.fee_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  fee_structure_id UUID REFERENCES public.fee_structures(id),
  amount NUMERIC(10,2) NOT NULL,
  status fee_status NOT NULL DEFAULT 'pending',
  payment_date DATE,
  due_date DATE NOT NULL,
  receipt_number TEXT,
  payment_method TEXT,
  academic_year TEXT NOT NULL DEFAULT '2026-27',
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage fee payments" ON public.fee_payments FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Parents can view child fees" ON public.fee_payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = fee_payments.student_id AND students.parent_user_id = auth.uid())
);
CREATE POLICY "Students can view own fees" ON public.fee_payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = fee_payments.student_id AND students.user_id = auth.uid())
);

CREATE TRIGGER update_fee_payments_updated_at BEFORE UPDATE ON public.fee_payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 8. ANNOUNCEMENTS TABLE
-- ==========================================
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  target_audience TEXT DEFAULT 'all',
  is_published BOOLEAN DEFAULT true,
  published_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published announcements" ON public.announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 9. HOMEWORK/ASSIGNMENTS TABLE
-- ==========================================
CREATE TABLE public.homework (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  class TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  subject TEXT NOT NULL,
  due_date DATE NOT NULL,
  assigned_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/teachers can manage homework" ON public.homework FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Parents can view homework" ON public.homework FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.parent_user_id = auth.uid() AND students.class = homework.class)
);
CREATE POLICY "Students can view homework" ON public.homework FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.user_id = auth.uid() AND students.class = homework.class)
);

-- ==========================================
-- 10. EXAM RESULTS TABLE
-- ==========================================
CREATE TABLE public.exam_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  exam_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  marks_obtained NUMERIC(5,2),
  total_marks NUMERIC(5,2) DEFAULT 100,
  grade TEXT,
  academic_year TEXT NOT NULL DEFAULT '2026-27',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage results" ON public.exam_results FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Teachers can manage results" ON public.exam_results FOR ALL USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Parents can view child results" ON public.exam_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = exam_results.student_id AND students.parent_user_id = auth.uid())
);
CREATE POLICY "Students can view own results" ON public.exam_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = exam_results.student_id AND students.user_id = auth.uid())
);
