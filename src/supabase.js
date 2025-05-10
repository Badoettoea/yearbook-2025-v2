import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dswzjhefngrgzowcilll.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3pqaGVmbmdyZ3pvd2NpbGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTc3OTAsImV4cCI6MjA2MjM5Mzc5MH0.V6ZXOvPRKXtGZz13VG4tOH3RC8eGplsqUwWn_fkeeG0';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
