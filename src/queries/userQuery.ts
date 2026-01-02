import { useMutation } from "@tanstack/react-query";
import userApi from "@/services/userApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { queryClient } from "./QueryProvider";

const userQuery = {
  useJoin: () => {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    return useMutation({
      mutationFn: userApi.join,
      onSuccess: ({ result }) => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setAccessToken(result);
      },
    });
  },
};
export default userQuery;
