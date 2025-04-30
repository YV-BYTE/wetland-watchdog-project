
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WetlandStatistics {
  wetlands_protected: number;
  species_saved: number;
  volunteers_engaged: number;
  reports_submitted: number;
}

export function useStatistics() {
  const [stats, setStats] = useState<WetlandStatistics>({
    wetlands_protected: 0,
    species_saved: 0, 
    volunteers_engaged: 0,
    reports_submitted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const { data, error } = await supabase
          .from('wetland_statistics')
          .select('*')
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setStats({
            wetlands_protected: data.wetlands_protected || 0,
            species_saved: data.species_saved || 0,
            volunteers_engaged: data.volunteers_engaged || 0,
            reports_submitted: data.reports_submitted || 0,
          });
        }
      } catch (err: any) {
        console.error('Error fetching statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wetland_statistics'
        },
        (payload) => {
          if (payload.new) {
            const newData = payload.new as WetlandStatistics;
            setStats({
              wetlands_protected: newData.wetlands_protected || 0,
              species_saved: newData.species_saved || 0,
              volunteers_engaged: newData.volunteers_engaged || 0,
              reports_submitted: newData.reports_submitted || 0,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading, error };
}
