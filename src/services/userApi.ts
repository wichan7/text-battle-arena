import type { ApiResponse } from "@/types/api";
import api from "./api";

const join = async () => {
  const result = await api.post<null, ApiResponse<string>>("/users/join", null);
  return result;
};

const userApi = { join };
export default userApi;
