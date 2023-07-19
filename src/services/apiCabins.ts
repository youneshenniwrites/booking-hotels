import { CabinType } from "../types/collection";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

type CabinInput = Omit<CabinType, "image"> & { image: File };

export async function createCabin({
  newCabin,
}: {
  newCabin: CabinInput;
}): Promise<CabinType> {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
    /\//g,
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const query = supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  //* Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //* Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }

  return data;
}

export async function updateCabin({
  newCabin,
  id,
}: {
  newCabin: CabinType;
  id: number;
}): Promise<CabinType> {
  const query = supabase
    .from("cabins")
    .update({ ...newCabin })
    .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated.");
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
