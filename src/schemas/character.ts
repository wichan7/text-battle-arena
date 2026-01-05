import { z } from "zod";
import { DEFAULT_ELO } from "@/core/server/elo/eloCalculator";
import { AuditSchema, DateSchema } from "./common";

export const CharacterSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(20),
  ability: z.string().max(150),
  ultName: z.string().max(20),
  ultAbility: z.string().max(50),
  startMessage: z.string().max(50).optional(),
  profileImgUrl: z.string().optional(),
  wins: z.number().default(0),
  losses: z.number().default(0),
  elo: z.number().default(DEFAULT_ELO),
  ...DateSchema.shape,
  ...AuditSchema.shape,
});
