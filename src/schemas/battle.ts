import { z } from "zod";
import { AuditSchema, DateSchema } from "./common";

export const BattleSchema = z.object({
  id: z.string().optional(),
  challengerId: z.string(),
  defenderId: z.string(),
  battleLogs: z.array(z.string()).optional(),
  ...DateSchema.shape,
  ...AuditSchema.shape,
});
