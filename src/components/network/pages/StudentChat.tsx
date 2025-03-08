import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users, GraduationCap, MessageSquare } from "lucide-react";

const studentGroups = [
  {
    name: "Computer Science 2024",
    members: 45,
    description: "Connect with current CS students",
    topics: ["Programming", "Internships", "Projects"]
  },
  {
    name: "Business School Network",
    members: 32,
    description: "Mentoring and guidance for business students",
    topics: ["Career Advice", "Industry Insights", "Networking"]
  },
  {
    name: "Engineering Connect",
    members: 56,
    description: "Bridge between students and alumni engineers",
    topics: ["Technical Skills", "Industry Trends", "Mentorship"]
  }
];

export default function StudentChat() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Connect</h1>
          <p className="text-muted-foreground mt-1">
            Connect with current students and share your experiences
          </p>
        </div>
        <Button className="gap-2">
          <Users className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search student groups..." />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-4">
        {studentGroups.map((group, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{group.members} members</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.topics.map((topic, i) => (
                      <span key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Join Group
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 