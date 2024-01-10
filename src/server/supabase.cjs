const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://adzycihptqfmbpsszovy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkenljaWhwdHFmbWJwc3N6b3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MTU0OTMsImV4cCI6MjAyMDQ5MTQ5M30.MlKLeycCuaHOfnlxqtav5j6g_iD3tEp0UzId1z-MTqM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;