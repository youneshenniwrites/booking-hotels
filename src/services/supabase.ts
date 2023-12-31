import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export const supabaseUrl = import.meta.env.VITE_SUPABSE_URL as string;
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
