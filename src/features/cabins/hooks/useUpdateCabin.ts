import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCabin as useUpdateCabinApi } from "../../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => useUpdateCabinApi(newCabinData, id),
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
