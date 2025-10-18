// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
