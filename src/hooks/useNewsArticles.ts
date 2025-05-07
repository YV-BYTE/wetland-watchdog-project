
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  source: string | null;
  publication_date: string;
  created_at: string;
  updated_at: string;
}

export function useNewsArticles() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsArticles() {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .order('publication_date', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setArticles(data as NewsArticle[]);
        }
      } catch (err: any) {
        console.error('Error fetching news articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsArticles();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news_articles'
        },
        (payload) => {
          // Refetch all articles when there's any change
          fetchNewsArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { articles, loading, error };
}
