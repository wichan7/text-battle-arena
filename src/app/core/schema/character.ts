import { z } from "zod";
import { AuditSchema, DateSchema } from "./common";

export const CharacterSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  ability: z.string().max(150),
  startMessage: z.string().max(50).optional(),
  profileImgUrl: z.string().optional(),
  ...DateSchema.shape,
  ...AuditSchema.shape,
});

export type Character = z.infer<typeof CharacterSchema>;
