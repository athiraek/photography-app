// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://mujwhupltohglshwpjln.supabase.co'; // replace this
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11andodXBsdG9oZ2xzaHdwamxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5Nzk3NjIsImV4cCI6MjA3MDU1NTc2Mn0.woVlOUxfUISg2scIlaZT6892mO2MbQCTfsPPLLz62as'; // replace this


const supabaseUrl = 'https://frhdgmtayioexlyzucpl.supabase.co'; // replace this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGRnbXRheWlvZXhseXp1Y3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDcwNjcsImV4cCI6MjA3MDEyMzA2N30.H7ppMwQTpJzvFxHE4UGT29AmGcRjsPmAfb9hLREhj8A'; // replace this
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
