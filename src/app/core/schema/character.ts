import { z } from "zod";

export const CharacterSchema = z.object({});

export type Character = z.infer<typeof CharacterSchema>;
