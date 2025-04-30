
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useStatistics } from "@/hooks/useStatistics";

type StatCardProps = {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
};

const StatCard = ({
  icon,
  value,
  label,
  suffix = "",
  delay = 0,
}: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const increment = value / 30;
      const timer = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + increment;
          if (newCount >= value) {
            clearInterval(timer);
            return value;
          }
          return newCount;
        });
      }, 50);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <Card className="stat-card">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full text-primary">{icon}</div>
        <div>
          <div className="flex items-baseline">
            <h3 className="text-2xl sm:text-3xl font-bold">
              {Math.round(count)}
              {suffix}
            </h3>
          </div>
          <p className="text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
};

const StatsSection = () => {
  const { stats, loading } = useStatistics();

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Together, our community is making a significant difference in preserving
            wetland ecosystems around the world.
          </p>
        </div>
        {loading ? (
          <div className="text-center">Loading statistics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<span className="text-2xl">🌿</span>}
              value={stats.wetlands_protected}
              label="Conservation Projects"
              delay={0}
            />
            <StatCard
              icon={<span className="text-2xl">👥</span>}
              value={stats.volunteers_engaged}
              label="Active Volunteers"
              delay={200}
            />
            <StatCard
              icon={<span className="text-2xl">🌎</span>}
              value={42}
              label="Countries Represented"
              delay={400}
            />
            <StatCard
              icon={<span className="text-2xl">🦆</span>}
              value={stats.species_saved}
              label="Species Protected"
              suffix="+"
              delay={600}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
