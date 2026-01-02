import type { Character } from "@/app/core/schema/character";
import characterDao from "./dao";

const getCharacters = async () => {
  return await characterDao.getAll();
};

const getCharacterById = async (id: string) => {
  return await characterDao.getById(id);
};

const createCharacter = async (character: Character) => {
  const id = await characterDao.create(character);
  return await characterDao.getById(id);
};

const modifyCharacter = async (character: Partial<Character>) => {
  return await characterDao.modify(character);
};

const characterService = {
  getCharacters,
  getCharacterById,
  createCharacter,
  modifyCharacter,
};
export default characterService;
