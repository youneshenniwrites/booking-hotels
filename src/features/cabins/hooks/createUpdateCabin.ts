import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateCabin } from "../../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully updated.");
    },
    onError: (err: PostgrestError | null) =>
      toast.error(
        err?.message || "An unknown error occurred. Please try again."
      ),
  });

  return { isUpdating, updateCabin };
}
