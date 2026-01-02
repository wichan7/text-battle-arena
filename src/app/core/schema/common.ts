import { z } from "zod";

export const DateSchema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const AuditSchema = z.object({
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});
