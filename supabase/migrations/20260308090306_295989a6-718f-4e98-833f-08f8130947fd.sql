CREATE TABLE public.timetable (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  day_of_week TEXT NOT NULL,
  period_number INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject TEXT NOT NULL,
  teacher_name TEXT,
  teacher_user_id UUID,
  room TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view timetable" ON public.timetable FOR SELECT USING (true);
CREATE POLICY "Admins can manage timetable" ON public.timetable FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));