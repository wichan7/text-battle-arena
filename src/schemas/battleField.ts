import { z } from "zod";
import { DateSchema } from "./common";

export const BattleFieldSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().max(150),
  ...DateSchema.shape,
});
