import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
Deno.serve(async (req) => {
  // Permitir qualquer origem (ou colocar sua URL do frontend)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  // Responde o preflight OPTIONS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    );
    const api_key = Deno.env.get("GEMINI_API_KEY");
    const gemini = new GoogleGenerativeAI(api_key);
    const model = gemini.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      tools: [
        {
          googleSearch: {},
        },
      ],
    });
    // Autenticação
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const token = authHeader.replace("Bearer ", "");
    supabase.auth.setSession({
      access_token: token,
      refresh_token: "",
    });
    const { data, error: userError } = await supabase.auth.getUser(token);
    if (userError || !data) throw new Error("Usuário não autenticado");
    const lesson = await req.json();
    const prompt = `
      Você é um assistente pedagógico especialista em criar planos de aula baseados na BNCC.

      Gere um plano de aula utilizando os seguintes parâmetros:
      - Tema: ${lesson.theme}
      - Faixa etária/Ano: ${lesson.grade}
      - Disciplina: ${lesson.subject}
      - Duração: ${lesson.duration}

      O resultado DEVE ser um objeto JSON válido.
      NÃO inclua nenhum texto, explicação ou marcadores de formatação (como \`\`\`json) antes ou depois do objeto JSON.

      O JSON deve seguir rigorosamente a seguinte estrutura:

      {
        "introduction": "Descrição da atividade inicial, criativa e envolvente para captar o interesse dos alunos.",
        "bncc_objective": "Código da habilidade principal da BNCC (ex: EF03CI05) e a descrição completa da habilidade correspondente.",
        "activity_steps": [
          "Descrição detalhada da Etapa 1 (ex: Apresentação do tema com perguntas guia).",
          "Descrição detalhada da Etapa 2 (ex: Atividade prática ou experimento).",
          "Descrição detalhada da Etapa 3 (ex: Discussão em grupo e registro).",
          "Descrição detalhada da Etapa 4 (ex: Fechamento e sistematização)."
        ],
        "evaluation_rubric": {
          "criteria": [
            {
              "description": "Descrição do primeiro critério de avaliação (ex: Compreensão do Conceito)",
              "excellent": "O que se espera para o nível 'Excelente'",
              "good": "O que se espera para o nível 'Bom'",
              "in_development": "O que se espera para o nível 'Em Desenvolvimento'"
            },
            {
              "description": "Descrição do segundo critério de avaliação (ex: Participação e Colaboração)",
              "excellent": "O que se espera para o nível 'Excelente'",
              "good": "O que se espera para o nível 'Bom'",
              "in_development": "O que se espera para o nível 'Em Desenvolvimento'"
            }
          ]
        }
      }

      Adapte o conteúdo de todos os campos para que sejam específicos e relevantes para o Tema, Disciplina e Faixa Etária fornecidos. Crie pelo menos dois critérios de avaliação na rubrica.

      Responda APENAS com o JSON.
    `.trim();
    const ai_response = await model.generateContent(prompt);
    const result = parseAIJson(ai_response.response.text());
    const newLesson = {
      theme: lesson.theme,
      subject: lesson.subject,
      grade: lesson.grade,
      duration: lesson.duration,
      introduction: result.introduction,
      bncc_objective: result.bncc_objective,
      activity_steps: result.activity_steps,
      evaluation_rubric: result.evaluation_rubric,
    };
    const { _data, error } = await supabase.from("lesson_plans").insert({
      user_id: data.user.id,
      ...newLesson,
    }).select().single();
    if (error) throw error;
    return new Response(JSON.stringify(result), {
      headers,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 400,
        headers,
      },
    );
  }
});
function parseAIJson(aiResponse: string) {
  const cleaned = aiResponse.trim().replace(/^```json\s*/, "") // Remove ```json do início
    .replace(/```$/, ""); // Remove ``` do final
  try {
    const json = JSON.parse(cleaned);
    return json;
  } catch (err) {
    console.error("Erro ao parsear JSON da IA:", err);
    return null;
  }
}
