import { useState } from "react";
import { LessonForm } from "@/components/lesson-form";
import { LessonList } from "@/components/lesson-list";
import { useListLessons } from "@/http/use-list-all-lessons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Home() {
  const { data } = useListLessons();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const selectedLesson = data?.find((l) => l.id === selectedLessonId);

  function handleAddLesson() {
    setShowForm(true);
    setSelectedLessonId(null);
  }

  function handleSelectLesson(lessonId: string) {
    setSelectedLessonId(lessonId);
    setShowForm(false);
  }

  function handleLogout() {
    Cookies.remove("token");
    navigate("/signin");
  }

  return (
    <div className="relative grid grid-cols-2 gap-8 p-8 min-h-screen">
      <div className="absolute top-6 right-8">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-accent transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        {showForm && <LessonForm />}

        {!showForm && selectedLesson && (
          <div className="w-full max-w-xl border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{selectedLesson.theme}</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Introdução</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedLesson.introduction}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1">Objetivo BNCC</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedLesson.bncc_objective}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Etapas da Atividade
                </h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {selectedLesson.activity_steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Rubrica de Avaliação
                </h3>
                <div className="border rounded-md divide-y">
                  {selectedLesson.evaluation_rubric.criteria.map(
                    (criterion, i) => (
                      <div key={i} className="p-3">
                        <p className="font-medium mb-1">
                          {criterion.description}
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>
                            <strong>Em desenvolvimento:</strong>{" "}
                            {criterion.in_development}
                          </li>
                          <li>
                            <strong>Bom:</strong> {criterion.good}
                          </li>
                          <li>
                            <strong>Excelente:</strong> {criterion.excellent}
                          </li>
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedLessonId(null)}
                className="mt-6 text-sm text-blue-600 hover:underline"
              >
                ← Voltar para lista de aulas
              </button>
            </div>
          </div>
        )}

        {!showForm && !selectedLesson && (
          <p className="text-muted-foreground">
            Selecione uma aula na lista ao lado ou adicione uma nova.
          </p>
        )}
      </div>

      <LessonList
        onAddClick={handleAddLesson}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}
