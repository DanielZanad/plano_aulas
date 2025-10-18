export type ListAllLessonsResponse = Array<{
  id: string;
  theme: string;
  introduction: string;
  bncc_objective: string;
  activity_steps: Array<string>;
  evaluation_rubric: EvaluationRubric;
}>;

export type EvaluationRubric = {
  criteria: Array<{
    description: string;
    good: string;
    excellent: string;
    in_development: string;
  }>;
};
