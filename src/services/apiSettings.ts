import { SettingsType } from "../types/collection";
import supabase from "./supabase";

export async function getSettings(): Promise<SettingsType> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded.");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(
  newSetting: SettingsType
): Promise<SettingsType> {
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated.");
  }
  return data;
}
