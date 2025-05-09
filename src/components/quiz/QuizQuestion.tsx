
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, RefreshCw, Award, ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Question } from "@/hooks/useQuizzes";

type QuizQuestionProps = {
  questions: Question[];
  quizTitle: string;
  onComplete: (score: number) => void;
  onBack: () => void;
};

const QuizQuestion = ({ questions, quizTitle, onComplete, onBack }: QuizQuestionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useAuth();

  // Reset state when questions change
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  }, [questions]);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(parseInt(value));
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedOption === questions[currentQuestion].correct_answer) {
      setScore(prev => prev + 10);
      if (!showFeedback) {
        toast.success("Correct answer! +10 points");
      }
    } else if (!showFeedback) {
      toast.error("Incorrect answer");
    }
    
    setShowFeedback(true);
    
    // Wait a moment before moving to the next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
        
        // Update user profile with earned points if the user is logged in
        if (user) {
          updateUserPoints(score + 50); // Quiz score + participation bonus
        }
        
        // Call onComplete with final score
        onComplete(score);
      }
    }, 1500);
  };

  const updateUserPoints = async (pointsToAdd: number) => {
    if (!user) return;

    try {
      // Get current user profile points
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();
      
      if (profileError) throw profileError;
      
      const currentPoints = profileData?.points || 0;
      const newPoints = currentPoints + pointsToAdd;
      
      // Calculate new level (1 level per 100 points)
      const newLevel = Math.floor(newPoints / 100) + 1;
      
      // Update profile with new points and level
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: newPoints, level: newLevel })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      console.log(`Updated user points: +${pointsToAdd}, new total: ${newPoints}`);
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">No Questions Available</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 text-center">
          <p>This quiz doesn't have any questions yet.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={onBack} className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Quiz List
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentScore = (score / (questions.length * 10)) * 100;
    let message = "";
    
    if (percentScore >= 80) {
      message = "Excellent! You're a wetland expert!";
    } else if (percentScore >= 60) {
      message = "Good job! You know your wetlands well.";
    } else {
      message = "Keep learning about wetlands!";
    }

    return (
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="mb-6">
            <Award className="h-16 w-16 mx-auto text-primary mb-2" />
            <h3 className="text-xl font-semibold mb-2">Your Score</h3>
            <div className="text-4xl font-bold text-primary mb-2">{score}/{questions.length * 10}</div>
            <p className="text-muted-foreground">{message}</p>
          </div>
          
          <div className="p-4 bg-muted rounded-lg text-left mb-4">
            <h4 className="font-medium mb-2">Points Earned</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Quiz score: {score} points</li>
              <li>• Participation bonus: +50 points</li>
              <li className="font-medium pt-2 text-foreground">Total added to your profile: {score + 50} points</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={restartQuiz}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <Button 
            variant="secondary"
            className="w-full" 
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Quizzes
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const options = Array.isArray(question.options) ? question.options : JSON.parse(question.options);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <CardTitle>{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption?.toString()} onValueChange={handleOptionSelect}>
          <div className="space-y-3">
            {options.map((option: string, index: number) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${
                  showFeedback && index === question.correct_answer 
                    ? 'border-green-500 bg-green-50' 
                    : showFeedback && selectedOption === index && index !== question.correct_answer
                    ? 'border-red-500 bg-red-50'
                    : selectedOption === index
                    ? 'border-primary'
                    : 'border-border'
                }`}
                onClick={() => !showFeedback && handleOptionSelect(index.toString())}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  disabled={showFeedback}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="w-full cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleNextQuestion} 
          disabled={selectedOption === null || showFeedback}
        >
          {currentQuestion < questions.length - 1 ? (
            <>Next Question <ChevronRight className="ml-2 h-4 w-4" /></>
          ) : (
            "Complete Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
