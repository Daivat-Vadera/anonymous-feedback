import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 character" })
    .max(300, { message: "Content must be not longer than 300 character" }),
});
