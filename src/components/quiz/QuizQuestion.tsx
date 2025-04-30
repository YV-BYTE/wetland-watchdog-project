
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, RefreshCw, Award } from "lucide-react";

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};

// Mock quiz data - in a real app, this would come from Supabase
const quizQuestions: Question[] = [
  {
    id: 1,
    text: "What percentage of the world's species depend on wetlands for survival?",
    options: ["10%", "25%", "40%", "60%"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which of these is NOT a function of wetlands?",
    options: [
      "Flood control",
      "Carbon storage",
      "Generating electricity",
      "Water purification"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "Which human activity has caused the greatest loss of wetlands worldwide?",
    options: [
      "Industrial pollution",
      "Agriculture and development",
      "Climate change",
      "Tourism"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Wetlands are often called 'nature's kidneys' because they:",
    options: [
      "Filter pollutants from water",
      "Are shaped like kidneys when viewed from above",
      "Produce oxygen like kidneys do",
      "Store water like kidneys store waste"
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    text: "Which wetland type is characterized by trees growing in standing water?",
    options: [
      "Marsh",
      "Swamp",
      "Bog",
      "Fen"
    ],
    correctAnswer: 1
  }
];

const QuizQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(parseInt(value));
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
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
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  if (quizCompleted) {
    const percentScore = (score / (quizQuestions.length * 10)) * 100;
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
            <div className="text-4xl font-bold text-primary mb-2">{score}/{quizQuestions.length * 10}</div>
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
        <CardFooter>
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={restartQuiz}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <CardTitle>{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption?.toString()} onValueChange={handleOptionSelect}>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${
                  showFeedback && index === question.correctAnswer 
                    ? 'border-green-500 bg-green-50' 
                    : showFeedback && selectedOption === index && index !== question.correctAnswer
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
          {currentQuestion < quizQuestions.length - 1 ? (
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
