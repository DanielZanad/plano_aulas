import z from "zod";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string(),
  VITE_SUPABASE_KEY: z.string(),
  VITE_SUPABASE_FUNCTIONS_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
