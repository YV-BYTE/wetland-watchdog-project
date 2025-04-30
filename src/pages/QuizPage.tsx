
import MainLayout from "@/components/layout/MainLayout";
import QuizQuestion from "@/components/quiz/QuizQuestion";

const QuizPage = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-wetland-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Test Your Wetland Knowledge</h1>
            <p className="text-muted-foreground text-lg">
              Challenge yourself with our educational quiz about wetlands and earn points 
              to track your conservation journey.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <QuizQuestion />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg p-6 shadow-md">
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 p-2 rounded-full text-primary">🏆</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Earn Points</h3>
                <p className="text-muted-foreground text-sm">
                  Score points for correct answers and climb the leaderboard. Points contribute to your overall profile score.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-md">
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 p-2 rounded-full text-primary">🎓</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn As You Go</h3>
                <p className="text-muted-foreground text-sm">
                  Each quiz provides educational content about wetland ecosystems, their importance, and conservation.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-md">
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 p-2 rounded-full text-primary">🔄</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">New Quizzes</h3>
                <p className="text-muted-foreground text-sm">
                  Check back regularly for new quizzes covering different aspects of wetland ecology and conservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default QuizPage;
