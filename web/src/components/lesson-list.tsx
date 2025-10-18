import { useListLessons } from "@/http/use-list-all-lessons";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";

interface LessonListProps {
  onAddClick: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export function LessonList({ onAddClick, onSelectLesson }: LessonListProps) {
  const { data, isLoading } = useListLessons();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando aulas...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Aulas recentes</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={onAddClick}
            className="flex items-center justify-center rounded-lg border p-3 hover:bg-accent"
          >
            Adicionar nova aula
          </Button>

          {data?.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">
              Nenhuma aula criada ainda.
            </p>
          )}

          {data?.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent w-full text-left transition"
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-semibold text-base">{lesson.theme}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {lesson.introduction}
                </p>
              </div>
              <span className="flex items-center gap-1 text-sm text-blue-500">
                Abrir
                <ArrowRight className="size-3" />
              </span>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
