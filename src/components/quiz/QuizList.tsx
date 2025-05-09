
import { useState } from "react";
import { useQuizzes } from "@/hooks/useQuizzes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, BookOpen, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type QuizListProps = {
  onSelectQuiz: (quizId: string, title: string) => void;
}

const QuizList = ({ onSelectQuiz }: QuizListProps) => {
  const { data: quizzes, isLoading, error } = useQuizzes();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-destructive/10 text-destructive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error Loading Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>There was a problem loading the quiz data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Quizzes Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There are currently no quizzes available. Please check back later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select a Quiz</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="w-full transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{quiz.title}</CardTitle>
                {quiz.difficulty && (
                  <Badge variant={
                    quiz.difficulty === "Beginner" ? "outline" :
                    quiz.difficulty === "Intermediate" ? "secondary" : "default"
                  }>
                    {quiz.difficulty}
                  </Badge>
                )}
              </div>
              {quiz.description && <CardDescription>{quiz.description}</CardDescription>}
            </CardHeader>
            <CardFooter>
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={() => onSelectQuiz(quiz.id, quiz.title)}
              >
                <BookOpen className="mr-2 h-4 w-4" /> Start Quiz <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
