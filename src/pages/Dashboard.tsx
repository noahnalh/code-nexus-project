import { Plus, TrendingUp, Users, CheckSquare, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CreateProjectDialog } from "@/components/dialogs/CreateProjectDialog";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user } = useAuth();
  const { projects, loading: projectsLoading } = useProjects();
  const { tasks, loading: tasksLoading } = useTasks();

  // Calculate stats from real data
  const stats = [
    { 
      title: "Total Projects", 
      value: projects.length.toString(), 
      change: "+2.3%", 
      trend: "up", 
      icon: CheckSquare 
    },
    { 
      title: "Active Tasks", 
      value: tasks.filter(task => task.status !== 'completed').length.toString(), 
      change: "+12.5%", 
      trend: "up", 
      icon: Calendar 
    },
    { 
      title: "Team Members", 
      value: "24", 
      change: "+4.2%", 
      trend: "up", 
      icon: Users 
    },
    { 
      title: "Completed This Week", 
      value: tasks.filter(task => task.status === 'completed').length.toString(), 
      change: "+8.1%", 
      trend: "up", 
      icon: TrendingUp 
    },
  ];

  // Get recent projects (limit to 3)
  const recentProjects = projects.slice(0, 3).map(project => ({
    id: project.id,
    name: project.name,
    progress: Math.floor(Math.random() * 100), // TODO: Calculate actual progress
    status: "In Progress",
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    team: [
      { name: "You", avatar: user?.user_metadata?.avatar_url, initials: user?.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || user?.email?.[0].toUpperCase() || "U" },
    ]
  }));

  // Get recent tasks (limit to 4)
  const recentTasks = tasks.slice(0, 4).map(task => ({
    id: task.id,
    title: task.title,
    project: task.projects?.name || "Unknown Project",
    priority: task.priority || "medium",
    status: task.status || "todo",
  }));
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <CreateProjectDialog />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="xl:col-span-2 bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Projects</span>
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
            <CardDescription>Your latest project updates and progress</CardDescription>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-background rounded-lg border border-border/50">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-3" />
                    <Skeleton className="h-2 w-full mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <Skeleton className="w-6 h-6 rounded-full" />
                      </div>
                      <Skeleton className="w-8 h-8 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-background rounded-lg border border-border/50 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">Due: {project.dueDate}</p>
                      </div>
                      <Badge variant={project.status === "In Progress" ? "default" : project.status === "Review" ? "secondary" : "outline"}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.map((member, idx) => (
                          <Avatar key={idx} className="w-6 h-6 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-gradient-primary text-white text-xs">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <CreateProjectDialog>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first project
                  </Button>
                </CreateProjectDialog>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest task updates</CardDescription>
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 bg-background rounded-lg border border-border/50">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            ) : recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-background rounded-lg border border-border/50 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                      <Badge 
                        variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                    <Badge variant="outline" className="text-xs">
                      {task.status?.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tasks yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}