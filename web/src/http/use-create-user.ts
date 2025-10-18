import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest } from "./types/createUserRequest";
import { supabase } from "../supabase-client";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    // Função que cria o usuário no Supabase Auth
    mutationFn: async (user: CreateUserRequest) => {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.full_name,
          },
        },
      });

      if (error) {
        console.error("Erro ao cadastrar:", error.message);
        throw new Error(error.message);
      }

      console.log("Usuário criado com sucesso:", data.user);

      return data.user;
    },

    onSuccess: async (user) => {
      console.log("Usuário cadastrado:", user);

      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },

    onError: (error) => {
      console.error("Falha ao criar usuário:", error);
    },
  });
}
