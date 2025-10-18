import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { CreateLessonRequest } from "./types/createLessonRequest";
import { supabase } from "../supabase-client";
import { env } from "@/env";
import { jwt } from "zod";

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lesson: CreateLessonRequest) => {
      const { VITE_SUPABASE_FUNCTIONS_URL } = env;
      const token = Cookies.get("token") ?? "";

      const response = await fetch(
        `${VITE_SUPABASE_FUNCTIONS_URL}/Create-Lesson`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            theme: lesson.theme,
            subject: lesson.subject,
            grade: lesson.grade,
            duration: lesson.duration,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao criar lesson:", errorText);
        throw new Error(errorText || "Falha ao criar lesson");
      }

      const data = await response.json();

      return { data };
    },

    onSuccess: async ({ data }) => {
      console.log("Lesson criada:", data);

      // Invalida queries para atualizar a lista de lessons
      await queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
    },

    onError: (error) => {
      console.error("Falha ao criar a lesson:", error);
    },
  });
}
