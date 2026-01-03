import { z } from "zod";
import { AuditSchema, DateSchema } from "./common";

export const CharacterSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(20),
  ability: z.string().max(150),
  ultName: z.string().max(20),
  ultAbility: z.string().max(50),
  startMessage: z.string().max(50).optional(),
  profileImgUrl: z.string().optional(),
  ...DateSchema.shape,
  ...AuditSchema.shape,
});
