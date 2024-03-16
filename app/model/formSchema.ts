import { z } from "zod";

export const formSchema = z.object({
  performer: z.string().min(2).max(50),
  date: z.date(),
  title: z.string().min(2).max(50),
  venue: z.string().min(2).max(50),
  time: z.string().min(2).max(50),
  capacity: z.coerce.number().int().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(5).max(1000),
});

export const bookingFormSchema = z.object({
  concertDate: z.date(),
  category: z.string().min(2).max(50),
  quantity: z.coerce.number().int().min(1),
});
