
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export type Quiz = {
  id: string;
  title: string;
  description: string | null;
  difficulty: string | null;
  created_at: string;
  updated_at: string;
};

export type Question = {
  id: string;
  quiz_id: string;
  text: string;
  options: string[];
  correct_answer: number;
  created_at: string;
  updated_at: string;
};

export const useQuizzes = () => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('title');
      
      if (error) {
        throw new Error(`Error fetching quizzes: ${error.message}`);
      }
      
      return data as Quiz[];
    },
  });
};

export const useQuizQuestions = (quizId: string | null) => {
  return useQuery({
    queryKey: ['quiz-questions', quizId],
    queryFn: async () => {
      if (!quizId) return [];
      
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizId);
      
      if (error) {
        throw new Error(`Error fetching questions: ${error.message}`);
      }
      
      return data as Question[];
    },
    enabled: !!quizId,
  });
};
