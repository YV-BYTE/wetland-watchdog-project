
import { useNewsArticles, type NewsArticle } from "@/hooks/useNewsArticles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const NewsArticleCard = ({ article }: { article: NewsArticle }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedDate = format(new Date(article.publication_date), 'MMM d, yyyy');

  // Truncate content for preview
  const previewContent = article.content.length > 150 
    ? `${article.content.substring(0, 150)}...` 
    : article.content;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      {article.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
          {article.source && (
            <>
              <span className="mx-1">•</span>
              <span>{article.source}</span>
            </>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">
          {expanded ? article.content : previewContent}
        </p>
      </CardContent>
      
      <CardFooter>
        {article.content.length > 150 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="p-0 h-auto text-primary"
          >
            <FileText className="h-4 w-4 mr-1" />
            {expanded ? "Read less" : "Read more"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const NewsSection = () => {
  const { articles, loading, error } = useNewsArticles();
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Environmental News</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest news and developments in wetland conservation and environmental protection.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-muted-foreground">Loading latest news...</div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>Unable to load news articles. Please try again later.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No news articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
