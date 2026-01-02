import type { z } from "zod";
import type { BattleSchema } from "@/schemas/battle";
import type { BattleFieldSchema } from "@/schemas/battleField";
import type { CharacterSchema } from "@/schemas/character";

export type Battle = z.infer<typeof BattleSchema>;
export type BattleField = z.infer<typeof BattleFieldSchema>;
export type Character = z.infer<typeof CharacterSchema>;
