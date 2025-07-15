import { Plus, TrendingUp, Users, CheckSquare, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const stats = [
  { title: "Total Projects", value: "12", change: "+2.3%", trend: "up", icon: CheckSquare },
  { title: "Active Tasks", value: "48", change: "+12.5%", trend: "up", icon: Calendar },
  { title: "Team Members", value: "24", change: "+4.2%", trend: "up", icon: Users },
  { title: "Completed This Week", value: "36", change: "+8.1%", trend: "up", icon: TrendingUp },
];

const recentProjects = [
  { 
    id: 1, 
    name: "Mobile App Redesign", 
    progress: 75, 
    status: "In Progress", 
    dueDate: "Dec 15, 2024",
    team: [
      { name: "Alice Johnson", avatar: "/placeholder-avatar.jpg", initials: "AJ" },
      { name: "Bob Smith", avatar: "/placeholder-avatar.jpg", initials: "BS" },
      { name: "Carol Davis", avatar: "/placeholder-avatar.jpg", initials: "CD" },
    ]
  },
  { 
    id: 2, 
    name: "E-commerce Platform", 
    progress: 45, 
    status: "Planning", 
    dueDate: "Jan 30, 2025",
    team: [
      { name: "David Wilson", avatar: "/placeholder-avatar.jpg", initials: "DW" },
      { name: "Eva Brown", avatar: "/placeholder-avatar.jpg", initials: "EB" },
    ]
  },
  { 
    id: 3, 
    name: "Brand Identity Update", 
    progress: 90, 
    status: "Review", 
    dueDate: "Dec 8, 2024",
    team: [
      { name: "Frank Miller", avatar: "/placeholder-avatar.jpg", initials: "FM" },
      { name: "Grace Lee", avatar: "/placeholder-avatar.jpg", initials: "GL" },
      { name: "Henry Adams", avatar: "/placeholder-avatar.jpg", initials: "HA" },
    ]
  },
];

const recentTasks = [
  { id: 1, title: "Design new dashboard layout", project: "Mobile App Redesign", priority: "High", status: "In Progress" },
  { id: 2, title: "Implement user authentication", project: "E-commerce Platform", priority: "Medium", status: "Todo" },
  { id: 3, title: "Create brand guidelines", project: "Brand Identity Update", priority: "Low", status: "Review" },
  { id: 4, title: "Setup database schema", project: "E-commerce Platform", priority: "High", status: "In Progress" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
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
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 bg-background rounded-lg border border-border/50">
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
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest task updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="p-3 bg-background rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                    <Badge 
                      variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                  <Badge variant="outline" className="text-xs">
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}