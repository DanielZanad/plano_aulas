import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest } from "./types/createUserRequest";
import Cookies from "js-cookie";
import { supabase } from "../supabase-client";
import type { CreateSessionResponse } from "./types/createSessionResponse";
import type { CreateSession } from "./types/createSessionRequest";

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: CreateSession) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) {
        console.error("Erro ao cadastrar:", error.message);
        throw new Error(error.message);
      }
      const jwt = data.session.access_token;

      return { jwt };
    },

    onSuccess: async (data: CreateSessionResponse) => {
      const { jwt } = data;

      if (jwt) {
        Cookies.set("token", jwt, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },

    onError: (error) => {
      console.error("Falha ao criar usuário:", error);
    },
  });
}
