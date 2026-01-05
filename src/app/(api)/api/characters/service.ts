import type { Character } from "@/types/schema";
import characterDao from "./dao";

const getCharacters = async () => {
  return await characterDao.getAll();
};

const getCharacterById = async (id: string) => {
  return await characterDao.getById(id);
};

const getCharactersByUserId = async (userId: string) => {
  return await characterDao.getAll({ userId });
};

const createCharacter = async (character: Character) => {
  const id = await characterDao.create(character);
  return await characterDao.getById(id);
};

const modifyCharacter = async (character: Partial<Character>) => {
  return await characterDao.modify(character);
};

const deleteCharacter = async (id: string) => {
  return await characterDao.deleteById(id);
};

const getLeaderboard = async (limit: number = 5) => {
  return await characterDao.getTopByElo(limit);
};

const characterService = {
  getCharacters,
  getCharacterById,
  getCharactersByUserId,
  createCharacter,
  modifyCharacter,
  deleteCharacter,
  getLeaderboard,
};
export default characterService;
