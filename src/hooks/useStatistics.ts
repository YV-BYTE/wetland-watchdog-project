
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useStatistics() {
  const [stats, setStats] = useState({
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
            wetlands_protected: data.wetlands_protected,
            species_saved: data.species_saved,
            volunteers_engaged: data.volunteers_engaged,
            reports_submitted: data.reports_submitted,
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
            setStats({
              wetlands_protected: payload.new.wetlands_protected,
              species_saved: payload.new.species_saved,
              volunteers_engaged: payload.new.volunteers_engaged,
              reports_submitted: payload.new.reports_submitted,
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
