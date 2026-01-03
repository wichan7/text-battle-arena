import { useMutation, useQuery } from "@tanstack/react-query";
import characterApi from "@/services/characterApi";
import { queryClient } from "./QueryProvider";

const characterQuery = {
  useGetCharacters: () => {
    return useQuery({ queryKey: ["chracters"], queryFn: characterApi.get });
  },
  useCreateCharacter: () => {
    return useMutation({
      mutationFn: characterApi.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chracters"] });
      },
    });
  },
  useDeleteCharacter: () => {
    return useMutation({
      mutationFn: characterApi.deleteById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chracters"] });
      },
    });
  },
};
export default characterQuery;
