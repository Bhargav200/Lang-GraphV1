
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI3MjAsImV4cCI6MTk2MDc2ODcyMH0.placeholder';

// Log a warning if using placeholder values
if (supabaseUrl.includes('placeholder')) {
  console.warn('⚠️ Using placeholder Supabase configuration. Connect to Supabase for full functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a flag to check if we're using real Supabase
export const isSupabaseConfigured = !supabaseUrl.includes('placeholder');
