
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
  const [error, setError] = useState(null);

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
  }, []);

  return { stats, loading, error };
}
