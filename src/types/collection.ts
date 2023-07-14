import { Database } from "./supabase";

export type CabinType = Database["public"]["Tables"]["cabins"]["Row"];
