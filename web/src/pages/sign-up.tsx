import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/http/use-create-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router-dom"; // 👈 Importa o hook de navegação

const createUserSchema = z.object({
  full_name: z.string().min(3, { message: "min 3 characters" }),
  email: z.string().email(),
  password: z.string().min(3, { message: "min 3 characters" }),
});

type createUserData = z.infer<typeof createUserSchema>;

export function SignUp() {
  const navigate = useNavigate(); // 👈 inicializa
  const { mutateAsync: createUser } = useCreateUser();
  const form = useForm<createUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUpUser(user: createUserData) {
    console.log("handleSignUpUser");

    try {
      const result = await createUser({
        full_name: user.full_name,
        email: user.email,
        password: user.password,
      });

      console.log(result);

      // 👇 Mostra aviso de sucesso
      alert("Conta criada com sucesso! Verifique seu email antes de entrar.");

      // 👇 Redireciona para a página de login
      navigate("/signin");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      alert("Ocorreu um erro ao criar a conta. Tente novamente.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>sign up</CardTitle>
          <CardDescription>
            Crie seu usuário para salvar seus planos de aula
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUpUser)}
              className="flex justify-center flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email da conta:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu email" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu nome" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite sua senha"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Criar conta</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
