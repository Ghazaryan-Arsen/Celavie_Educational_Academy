-- Supabase Database Schema for CELAVIE Educational Academy

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('language', 'smm')),
    level VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    price VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'instructor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    parent_guardian_name VARCHAR(255),
    notes TEXT,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('card', 'bank_transfer', 'payment_plan')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. NICE EXCHANGE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.nice_exchange_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INT NOT NULL CHECK (age >= 14 AND age <= 99),
    school VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    language_level VARCHAR(50) NOT NULL CHECK (language_level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
    motivation_essay TEXT NOT NULL CHECK (array_length(regexp_split_to_array(btrim(motivation_essay), '\s+'), 1) BETWEEN 300 AND 500),
    parent_name VARCHAR(255),
    parent_phone VARCHAR(50) NOT NULL CHECK (parent_phone ~ '^[0-9+() -]{7,50}$'),
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE CHECK (terms_accepted = TRUE),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT nice_exchange_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
    CONSTRAINT nice_exchange_phone_format CHECK (phone ~ '^[0-9+() -]{7,50}$')
);

-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    avatar TEXT,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ROW LEVEL SECURITY POLICIES

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nice_exchange_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public Read Access for Courses & FAQs
CREATE POLICY "Public courses read access" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public faqs read access" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public approved testimonials read access" ON public.testimonials FOR SELECT USING (status = 'approved');

-- Application & Enrollment Submission Policies (Public/Students can insert)
CREATE POLICY "Public enrollment insert"
ON public.enrollments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.users
        WHERE public.users.id = auth.uid()
          AND public.users.role = 'admin'
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

DROP POLICY IF EXISTS "Public nice exchange insert" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Public nice exchange read access" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Admin nice exchange read access" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Admin nice exchange update access" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Admin nice exchange delete access" ON public.nice_exchange_applications;

CREATE POLICY "Public nice exchange insert"
ON public.nice_exchange_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending' AND terms_accepted = TRUE);

CREATE POLICY "Admin nice exchange read access"
ON public.nice_exchange_applications
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin nice exchange update access"
ON public.nice_exchange_applications
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (status IN ('pending', 'approved', 'rejected'));

CREATE POLICY "Admin nice exchange delete access"
ON public.nice_exchange_applications
FOR DELETE
TO authenticated
USING (public.is_admin());
