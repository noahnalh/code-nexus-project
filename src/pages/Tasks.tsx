import { useState } from "react";
import { Plus, Filter, Search, MoreHorizontal, Calendar, User, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateTaskDialog } from "@/components/dialogs/CreateTaskDialog";
import { useTasks } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";

const tasks = [
  {
    id: 1,
    title: "Design new dashboard layout",
    description: "Create a modern and intuitive dashboard design with improved UX",
    project: "Mobile App Redesign",
    priority: "High",
    status: "In Progress",
    dueDate: "Dec 10, 2024",
    assignee: { name: "Alice Johnson", avatar: "/placeholder-avatar.jpg", initials: "AJ" },
    completed: false,
    tags: ["Design", "UX"]
  },
  {
    id: 2,
    title: "Implement user authentication",
    description: "Add secure login and registration functionality",
    project: "E-commerce Platform",
    priority: "High",
    status: "Todo",
    dueDate: "Dec 12, 2024",
    assignee: { name: "Bob Smith", avatar: "/placeholder-avatar.jpg", initials: "BS" },
    completed: false,
    tags: ["Backend", "Security"]
  },
  {
    id: 3,
    title: "Create brand guidelines",
    description: "Document comprehensive brand guidelines and usage rules",
    project: "Brand Identity Update",
    priority: "Medium",
    status: "Review",
    dueDate: "Dec 8, 2024",
    assignee: { name: "Carol Davis", avatar: "/placeholder-avatar.jpg", initials: "CD" },
    completed: false,
    tags: ["Design", "Documentation"]
  },
  {
    id: 4,
    title: "Setup database schema",
    description: "Design and implement the database structure",
    project: "E-commerce Platform",
    priority: "High",
    status: "In Progress",
    dueDate: "Dec 15, 2024",
    assignee: { name: "David Wilson", avatar: "/placeholder-avatar.jpg", initials: "DW" },
    completed: false,
    tags: ["Database", "Backend"]
  },
  {
    id: 5,
    title: "Write API documentation",
    description: "Create comprehensive API documentation for developers",
    project: "API Documentation",
    priority: "Medium",
    status: "Todo",
    dueDate: "Dec 18, 2024",
    assignee: { name: "Eva Brown", avatar: "/placeholder-avatar.jpg", initials: "EB" },
    completed: false,
    tags: ["Documentation", "API"]
  },
  {
    id: 6,
    title: "Conduct security testing",
    description: "Perform comprehensive security testing and vulnerability assessment",
    project: "Security Audit",
    priority: "High",
    status: "In Progress",
    dueDate: "Dec 14, 2024",
    assignee: { name: "Frank Miller", avatar: "/placeholder-avatar.jpg", initials: "FM" },
    completed: false,
    tags: ["Security", "Testing"]
  },
  {
    id: 7,
    title: "Logo design finalization",
    description: "Finalize the new logo design and prepare assets",
    project: "Brand Identity Update",
    priority: "Low",
    status: "Completed",
    dueDate: "Dec 5, 2024",
    assignee: { name: "Grace Lee", avatar: "/placeholder-avatar.jpg", initials: "GL" },
    completed: true,
    tags: ["Design", "Branding"]
  },
  {
    id: 8,
    title: "Mobile app testing",
    description: "Test the mobile application on various devices and platforms",
    project: "Mobile App Redesign",
    priority: "Medium",
    status: "Todo",
    dueDate: "Dec 20, 2024",
    assignee: { name: "Henry Adams", avatar: "/placeholder-avatar.jpg", initials: "HA" },
    completed: false,
    tags: ["Testing", "Mobile"]
  },
];

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { tasks, loading, updateTask } = useTasks();

  const handleToggleComplete = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';
    await updateTask(taskId, { status: newStatus });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className={`bg-gradient-card shadow-card border-0 hover:shadow-lg transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.completed}
            className="mt-1"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {task.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </Badge>
                <Badge variant={task.status === "In Progress" ? "default" : task.status === "Review" ? "secondary" : task.status === "Completed" ? "outline" : "outline"}>
                  {task.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {task.dueDate}
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-xs">
                    {task.assignee.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TaskBoard = () => {
    const todoTasks = filteredTasks.filter(task => task.status === "Todo");
    const inProgressTasks = filteredTasks.filter(task => task.status === "In Progress");
    const reviewTasks = filteredTasks.filter(task => task.status === "Review");
    const completedTasks = filteredTasks.filter(task => task.status === "Completed");

    const Column = ({ title, tasks, color }: { title: string; tasks: typeof filteredTasks; color: string }) => (
      <div className="flex-1 min-w-80">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary" className="text-xs">{tasks.length}</Badge>
        </div>
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    );

    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        <Column title="Todo" tasks={todoTasks} color="bg-muted" />
        <Column title="In Progress" tasks={inProgressTasks} color="bg-primary" />
        <Column title="Review" tasks={reviewTasks} color="bg-warning" />
        <Column title="Completed" tasks={completedTasks} color="bg-success" />
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all your tasks across projects</p>
        </div>
        <CreateTaskDialog />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search tasks..."
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
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View Tabs */}
      <Tabs defaultValue="board" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="board">Board View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-6">
          <TaskBoard />
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Flag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create your first task
          </Button>
        </div>
      )}
    </div>
  );
}