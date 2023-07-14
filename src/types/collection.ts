import { Database } from "./supabase";

export type CabinType = Database["public"]["Tables"]["cabins"]["Row"];

export type BookingType = Database["public"]["Tables"]["bookings"]["Row"];

export type GuestType = Database["public"]["Tables"]["guests"]["Row"];

export type SettingType = Database["public"]["Tables"]["settings"]["Row"];
