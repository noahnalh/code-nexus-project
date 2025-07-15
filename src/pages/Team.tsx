import { useState } from "react";
import { Plus, Search, Mail, Phone, MoreHorizontal, Users, Calendar, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@taskflow.com",
    role: "Senior Designer",
    department: "Design",
    avatar: "/placeholder-avatar.jpg",
    initials: "AJ",
    status: "Active",
    joinDate: "Jan 15, 2023",
    activeProjects: 3,
    completedTasks: 124,
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Design Systems"],
    currentProjects: ["Mobile App Redesign", "Brand Identity Update", "Marketing Campaign"]
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@taskflow.com",
    role: "Full Stack Developer",
    department: "Engineering",
    avatar: "/placeholder-avatar.jpg",
    initials: "BS",
    status: "Active",
    joinDate: "Mar 8, 2023",
    activeProjects: 2,
    completedTasks: 98,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    currentProjects: ["E-commerce Platform", "API Documentation"]
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@taskflow.com",
    role: "Product Manager",
    department: "Product",
    avatar: "/placeholder-avatar.jpg",
    initials: "CD",
    status: "Active",
    joinDate: "Nov 22, 2022",
    activeProjects: 4,
    completedTasks: 156,
    skills: ["Product Strategy", "Agile", "User Research", "Analytics"],
    currentProjects: ["Mobile App Redesign", "Brand Identity Update", "Marketing Campaign", "Security Audit"]
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@taskflow.com",
    role: "Backend Developer",
    department: "Engineering",
    avatar: "/placeholder-avatar.jpg",
    initials: "DW",
    status: "Active",
    joinDate: "Jul 12, 2023",
    activeProjects: 2,
    completedTasks: 76,
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Redis"],
    currentProjects: ["E-commerce Platform", "Security Audit"]
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@taskflow.com",
    role: "DevOps Engineer",
    department: "Engineering",
    avatar: "/placeholder-avatar.jpg",
    initials: "EB",
    status: "Active",
    joinDate: "Feb 3, 2023",
    activeProjects: 3,
    completedTasks: 89,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    currentProjects: ["E-commerce Platform", "API Documentation", "Security Audit"]
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@taskflow.com",
    role: "Security Specialist",
    department: "Security",
    avatar: "/placeholder-avatar.jpg",
    initials: "FM",
    status: "Active",
    joinDate: "Sep 18, 2022",
    activeProjects: 2,
    completedTasks: 134,
    skills: ["Cybersecurity", "Penetration Testing", "Risk Assessment", "Compliance"],
    currentProjects: ["Security Audit", "Brand Identity Update"]
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace@taskflow.com",
    role: "Marketing Manager",
    department: "Marketing",
    avatar: "/placeholder-avatar.jpg",
    initials: "GL",
    status: "Active",
    joinDate: "Apr 25, 2023",
    activeProjects: 2,
    completedTasks: 67,
    skills: ["Digital Marketing", "Content Strategy", "SEO", "Analytics"],
    currentProjects: ["Brand Identity Update", "Marketing Campaign"]
  },
  {
    id: 8,
    name: "Henry Adams",
    email: "henry@taskflow.com",
    role: "QA Engineer",
    department: "Engineering",
    avatar: "/placeholder-avatar.jpg",
    initials: "HA",
    status: "Active",
    joinDate: "Jun 10, 2023",
    activeProjects: 3,
    completedTasks: 54,
    skills: ["Manual Testing", "Automation", "Selenium", "Jest", "Quality Assurance"],
    currentProjects: ["Mobile App Redesign", "E-commerce Platform", "API Documentation"]
  },
];

const departments = [
  { name: "All Departments", value: "all" },
  { name: "Design", value: "design" },
  { name: "Engineering", value: "engineering" },
  { name: "Product", value: "product" },
  { name: "Marketing", value: "marketing" },
  { name: "Security", value: "security" },
];

export default function Team() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department.toLowerCase() === departmentFilter.toLowerCase();
    return matchesSearch && matchesDepartment;
  });

  const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <Card className="bg-gradient-card shadow-card border-0 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{member.department}</Badge>
          <Badge variant="outline">{member.status}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            {member.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Joined {member.joinDate}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{member.activeProjects}</p>
              <p className="text-xs text-muted-foreground">Active Projects</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{member.completedTasks}</p>
              <p className="text-xs text-muted-foreground">Completed Tasks</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Skills</p>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{member.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const TeamStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Members</p>
              <p className="text-2xl font-bold text-foreground">{teamMembers.length}</p>
            </div>
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div className="p-3 bg-gradient-success rounded-lg">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Departments</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Tasks/Member</p>
              <p className="text-2xl font-bold text-foreground">6.2</p>
            </div>
            <div className="p-3 bg-gradient-success rounded-lg">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground">Manage your team members and their projects</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <TeamStats />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No team members found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Invite your first team member
          </Button>
        </div>
      )}
    </div>
  );
}