import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateLesson } from "@/http/use-create-lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const createLessonSchema = z.object({
  theme: z.string().min(3, { message: "min 3 characters" }),
  subject: z.string().min(3, { message: "min 3 characters" }),
  grade: z.string(),
  duration: z.string(),
});

type createLessonData = z.infer<typeof createLessonSchema>;

export function LessonForm() {
  const { mutateAsync: createLesson, isPending } = useCreateLesson();

  const form = useForm<createLessonData>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      theme: "",
      subject: "",
      grade: "",
      duration: "",
    },
  });

  async function handleCreateLesson(lesson: createLessonData) {
    const result = await createLesson({
      duration: lesson.duration,
      grade: lesson.grade,
      subject: lesson.subject,
      theme: lesson.theme,
    });
    console.log(result.data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-xl ">
        <Form {...form}>
          <form
            className="flex gap-4 flex-col"
            onSubmit={form.handleSubmit(handleCreateLesson)}
          >
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tema: </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o tema da aula" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Disciplina: </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite a disciplina" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Séries: </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite a em qual ano/série"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Duração: </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite a duração da aula"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button
              className="cursor-pointer"
              disabled={isPending}
              type="submit"
            >
              Enviar aula
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
