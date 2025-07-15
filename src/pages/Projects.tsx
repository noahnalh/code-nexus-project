import { useState } from "react";
import { Plus, Filter, Search, MoreHorizontal, Calendar, Users, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  { 
    id: 1, 
    name: "Mobile App Redesign", 
    description: "Complete redesign of our mobile application with modern UI/UX",
    progress: 75, 
    status: "In Progress", 
    priority: "High",
    dueDate: "Dec 15, 2024",
    tasks: { total: 24, completed: 18 },
    team: [
      { name: "Alice Johnson", avatar: "/placeholder-avatar.jpg", initials: "AJ" },
      { name: "Bob Smith", avatar: "/placeholder-avatar.jpg", initials: "BS" },
      { name: "Carol Davis", avatar: "/placeholder-avatar.jpg", initials: "CD" },
    ]
  },
  { 
    id: 2, 
    name: "E-commerce Platform", 
    description: "Building a new e-commerce platform with advanced features",
    progress: 45, 
    status: "Planning", 
    priority: "Medium",
    dueDate: "Jan 30, 2025",
    tasks: { total: 36, completed: 16 },
    team: [
      { name: "David Wilson", avatar: "/placeholder-avatar.jpg", initials: "DW" },
      { name: "Eva Brown", avatar: "/placeholder-avatar.jpg", initials: "EB" },
    ]
  },
  { 
    id: 3, 
    name: "Brand Identity Update", 
    description: "Refreshing our brand identity with new logo and guidelines",
    progress: 90, 
    status: "Review", 
    priority: "Low",
    dueDate: "Dec 8, 2024",
    tasks: { total: 12, completed: 11 },
    team: [
      { name: "Frank Miller", avatar: "/placeholder-avatar.jpg", initials: "FM" },
      { name: "Grace Lee", avatar: "/placeholder-avatar.jpg", initials: "GL" },
      { name: "Henry Adams", avatar: "/placeholder-avatar.jpg", initials: "HA" },
    ]
  },
  { 
    id: 4, 
    name: "API Documentation", 
    description: "Creating comprehensive API documentation for developers",
    progress: 30, 
    status: "In Progress", 
    priority: "Medium",
    dueDate: "Dec 20, 2024",
    tasks: { total: 8, completed: 2 },
    team: [
      { name: "Ian Thompson", avatar: "/placeholder-avatar.jpg", initials: "IT" },
      { name: "Jane Wilson", avatar: "/placeholder-avatar.jpg", initials: "JW" },
    ]
  },
  { 
    id: 5, 
    name: "Security Audit", 
    description: "Comprehensive security audit and vulnerability assessment",
    progress: 60, 
    status: "In Progress", 
    priority: "High",
    dueDate: "Dec 12, 2024",
    tasks: { total: 15, completed: 9 },
    team: [
      { name: "Kevin Brown", avatar: "/placeholder-avatar.jpg", initials: "KB" },
      { name: "Linda Davis", avatar: "/placeholder-avatar.jpg", initials: "LD" },
    ]
  },
  { 
    id: 6, 
    name: "Marketing Campaign", 
    description: "Q1 2025 marketing campaign planning and execution",
    progress: 25, 
    status: "Planning", 
    priority: "Medium",
    dueDate: "Feb 14, 2025",
    tasks: { total: 20, completed: 5 },
    team: [
      { name: "Mike Johnson", avatar: "/placeholder-avatar.jpg", initials: "MJ" },
      { name: "Nancy Wilson", avatar: "/placeholder-avatar.jpg", initials: "NW" },
      { name: "Oscar Lee", avatar: "/placeholder-avatar.jpg", initials: "OL" },
    ]
  },
];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card className="bg-gradient-card shadow-card border-0 hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={project.priority === "High" ? "destructive" : project.priority === "Medium" ? "default" : "secondary"}>
              {project.priority}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={project.status === "In Progress" ? "default" : project.status === "Review" ? "secondary" : "outline"}>
              {project.status}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {project.dueDate}
            </span>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {project.tasks.completed}/{project.tasks.total} tasks
              </span>
            </div>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects in one place</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create your first project
          </Button>
        </div>
      )}
    </div>
  );
}