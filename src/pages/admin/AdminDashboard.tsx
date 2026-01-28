import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot, CreditCard, TrendingUp } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

interface Stats {
  totalUsers: number;
  totalAgents: number;
  totalSubscriptions: number;
  proSubscriptions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAgents: 0,
    totalSubscriptions: 0,
    proSubscriptions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // TODO: Replace with your API call
        // const response = await fetch('/api/admin/stats');
        // const data = await response.json();
        // setStats(data);

        // Default stats for now
        setStats({
          totalUsers: 0,
          totalAgents: 0,
          totalSubscriptions: 0,
          proSubscriptions: 0,
        });
      } catch (_error: unknown) {
        console.error("Error fetching stats:", _error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers,
      description: "Usuários registrados",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Agentes Criados",
      value: stats.totalAgents,
      description: "Agentes no sistema",
      icon: Bot,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Assinaturas Ativas",
      value: stats.totalSubscriptions,
      description: "Total de assinaturas",
      icon: CreditCard,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Planos Pro",
      value: stats.proSubscriptions,
      description: "Usuários premium",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <AdminGuard>
      <PageTransition>
        <AdminLayout title="Dashboard">
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? "..." : stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Gerencie os principais recursos do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <a
                    href="/admin/users"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Gerenciar Usuários</p>
                      <p className="text-sm text-muted-foreground">Ver e editar usuários</p>
                    </div>
                  </a>
                  <a
                    href="/admin/agents"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Bot className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Gerenciar Agentes</p>
                      <p className="text-sm text-muted-foreground">Ver todos os agentes</p>
                    </div>
                  </a>
                  <a
                    href="/admin/subscriptions"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Assinaturas</p>
                      <p className="text-sm text-muted-foreground">Gerenciar planos</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </AdminLayout>
      </PageTransition>
    </AdminGuard>
  );
}
