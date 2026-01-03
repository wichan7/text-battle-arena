import { useMutation, useQuery } from "@tanstack/react-query";
import battleApi from "@/services/battleApi";

const battleQuery = {
  useGetBattle: (battleId: string | null) => {
    return useQuery({
      queryKey: ["battle", battleId],
      queryFn: () => battleApi.get(battleId!),
      enabled: !!battleId,
    });
  },
  useCreateBattle: () => {
    return useMutation({ mutationFn: battleApi.create });
  },
};
export default battleQuery;
