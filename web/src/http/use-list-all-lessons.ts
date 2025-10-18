import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { ListAllLessonsResponse } from "./types/listAllLessonsResponse";

export function useListLessons() {
  return useQuery({
    queryKey: ["get-lessons"],
    queryFn: async () => {
      const { VITE_SUPABASE_FUNCTIONS_URL } = env;
      const token = Cookies.get("token") ?? "";

      const response = await fetch(
        `${VITE_SUPABASE_FUNCTIONS_URL}/list-lessons`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: ListAllLessonsResponse = await response.json();

      return result;
    },
  });
}
