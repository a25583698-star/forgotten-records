-- Create users table for mock authentication
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patients table with horror-themed records
CREATE TABLE public.patients (
  id INT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  record TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flags table to store the CTF flag
CREATE TABLE public.flags (
  id INT NOT NULL PRIMARY KEY,
  flag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert horror-themed patient records
INSERT INTO public.patients (id, name, record) VALUES
(1, 'John Doe', 'Suffers from recurring nightmares. Claims to see shadows moving in his peripheral vision. Medication: Sedatives prescribed.'),
(2, 'Mary Black', 'Keeps hearing voices in the dark... Patient reports whispers calling her name at 3:33 AM every night. Condition worsening.'),
(3, 'Michael Cross', 'Found wandering the halls at night. Claims the walls are bleeding. Shows signs of severe paranoia and hallucinations.'),
(4, 'Sarah Thompson', 'Refuses to sleep. Says something is watching her from the corners. Patient exhibits extreme fear responses to darkness.'),
(5, 'David Wilson', 'Speaks to invisible entities. Patient claims deceased family members visit him. Requires constant supervision.'),
(66, '???', 'RESTRICTED ASYLUM FILE - ACCESS LEVEL: ADMINISTRATOR ONLY. This patient file contains classified information regarding the mysterious events that led to the asylum closure. The truth behind the disappearances...');

-- Insert the CTF flag
INSERT INTO public.flags (id, flag) VALUES
(1, 'CYCTF{forgotten_asylum_access}');

-- Insert test users
INSERT INTO public.users (email, password, role) VALUES
('patient@asylum.com', 'patient123', 'user'),
('admin@asylum.com', 'admin123', 'admin');

-- Enable Row Level Security (but we'll intentionally make it bypassable for the CTF)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flags ENABLE ROW LEVEL SECURITY;

-- Create policies that will be bypassed by our vulnerable edge function
CREATE POLICY "Users can view their own data" ON public.users
FOR SELECT USING (true);

CREATE POLICY "Patients accessible to logged in users" ON public.patients
FOR SELECT USING (true);

CREATE POLICY "Flags only for admins" ON public.flags
FOR SELECT USING (true);