import { CabinType } from "../types/collection";
import supabase, { supabaseUrl } from "./supabase";

// FileList;

export async function createEditCabin({
  newCabin,
  id,
}: {
  newCabin: CabinType;
  id: number;
}): Promise<CabinType> {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName: string = `${Math.random()}-${
    newCabin?.image?.name
  }`.replaceAll("/", "");

  const imagePath: string | null = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }

  return data;
}

export async function createCabin({ newCabin }: { newCabin: CabinType }) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
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
