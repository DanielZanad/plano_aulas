import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import { useCreateSession } from "@/http/use-create-session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

const signInUserSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(3, { message: "A senha deve ter no mínimo 3 caracteres" }),
});

type signInUserSchemaData = z.infer<typeof signInUserSchema>;

export function SignIn() {
  const navigate = useNavigate();
  const { mutateAsync: createSession } = useCreateSession();
  const form = useForm<signInUserSchemaData>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignInUser(user: signInUserSchemaData) {
    try {
      const result = await createSession({
        email: user.email,
        password: user.password,
      });

      console.log("Login bem-sucedido:", result);

      // 👇 Mostra aviso e redireciona
      alert("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao entrar:", error);
      alert(
        "Falha ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Entre com sua conta</CardDescription>
          <CardAction>
            <Button variant="outline">
              <Link to="/signup">Criar conta</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSignInUser)}
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

              <Button type="submit" className="cursor-pointer">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
