import type { ApiResponse } from "@/types/api";
import type { Character } from "@/types/schema";
import api from "./api";

const get = async () => {
  const result = await api.get<null, ApiResponse<Character[]>>("/characters");
  return result;
};

type CreateCharacterInput = Omit<
  Character,
  | "wins"
  | "losses"
  | "elo"
  | "id"
  | "createdAt"
  | "updatedAt"
  | "createdBy"
  | "updatedBy"
>;

const create = async (data: CreateCharacterInput) => {
  const result = await api.post<CreateCharacterInput, ApiResponse<Character>>(
    "/characters",
    data,
  );
  return result;
};

const deleteById = async (id: string) => {
  const result = await api.delete<null, ApiResponse<null>>(`/characters/${id}`);
  return result;
};

const characterApi = { get, create, deleteById };
export default characterApi;
