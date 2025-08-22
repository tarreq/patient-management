import { createClient } from "@supabase/supabase-js";

// TODO: These should be loaded from .env
// It was added here for simplicty when deploying to cloud test
const supabaseUrl = "https://yeuzdxuluaybfozmyalb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldXpkeHVsdWF5YmZvem15YWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzA3ODIsImV4cCI6MjA3MTQwNjc4Mn0.Uz_kPStEuhpCfKGETPFWvBgIrkFm3NiXVtswSnKEM1U";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
