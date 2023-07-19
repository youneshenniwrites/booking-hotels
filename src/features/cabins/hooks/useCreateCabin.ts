import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin as createCabinApi } from "../../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin successfully created.");
    },
    onError: (err: PostgrestError | null) =>
      toast.error(
        err?.message || "An unknown error occurred. Please try again."
      ),
  });

  return { isCreating, createCabin };
}
