import { useMutation } from "@tanstack/react-query";
import battleApi from "@/services/battleApi";

const battleQuery = {
  useGetBattle: () => {},
  useStartBattle: () => {
    return useMutation({ mutationFn: battleApi.create });
  },
};
export default battleQuery;
