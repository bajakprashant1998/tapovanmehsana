
-- Fix: The "Admins can manage roles" policy uses FOR ALL with true for admins which is fine
-- The only warning is about the admissions INSERT which is intentionally public
-- Let's tighten it by requiring at least an email
-- Actually the warning is about WITH CHECK (true) on INSERT for admissions - this is by design
-- for public admission forms. Let's add some basic validation instead.

-- Drop and recreate the admissions INSERT policy with basic validation
DROP POLICY IF EXISTS "Anyone can submit admission" ON public.admissions;
CREATE POLICY "Anyone can submit admission" ON public.admissions 
  FOR INSERT WITH CHECK (
    student_name IS NOT NULL AND 
    student_name <> '' AND 
    email IS NOT NULL AND 
    email <> '' AND
    phone IS NOT NULL AND
    phone <> ''
  );
