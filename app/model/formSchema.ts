import { z } from "zod";

export const formSchema = z.object({
  performer: z.string().min(2).max(50),
  date: z.date(),
  title: z.string().min(2).max(50),
  venue: z.string().min(2).max(50),
  time: z.string().min(2),
  capacity: z.coerce.number().int().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(5).max(1000),
});

export const bookingFormSchema = z.object({
  category: z.string().min(1, { message: "Required field" }),
  seat: z.string().min(1, { message: "Required field" }),
  quantity: z.coerce.number().int().min(1, { message: "Required field" }),
});

export const commentSchema = z.object({
  comment: z.string().min(1, { message: "Required field" }),
});

export const PostSchema = z.object({
  content: z.string().min(1, { message: "Required field" }),
});
