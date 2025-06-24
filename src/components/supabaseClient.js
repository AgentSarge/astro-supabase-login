import { createClient } from '@supabase/supabase-js';

// Create a single Supabase client instance to be shared across the app
const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default supabase; 