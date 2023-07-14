import { CabinType } from "../types/collection";
import supabase from "./supabase";

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabin(id: number): Promise<null> {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
  return data;
}
