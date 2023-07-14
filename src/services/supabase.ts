import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = process.env.SUPABSE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
