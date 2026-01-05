import { z } from "zod";
import { AuditSchema, DateSchema } from "./common";

export const BattleSchema = z.object({
  id: z.string().optional(),
  challengerId: z.string(),
  defenderId: z.string(),
  battleLogs: z.array(z.string()).optional(),
  winnerId: z.string().nullable().default(null),
  ...DateSchema.shape,
  ...AuditSchema.shape,
});
