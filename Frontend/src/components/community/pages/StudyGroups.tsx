import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, BookOpen, Calendar, ArrowRight } from "lucide-react";

const studyGroups = [
  {
    name: "Computer Science Study Group",
    subject: "Computer Science",
    members: 12,
    nextMeeting: "Tomorrow at 3 PM",
    topics: ["Data Structures", "Algorithms", "System Design"]
  },
  {
    name: "Business Analytics Group",
    subject: "Business",
    members: 8,
    nextMeeting: "Friday at 2 PM",
    topics: ["Data Analysis", "Market Research", "Statistics"]
  },
  {
    name: "Engineering Mechanics",
    subject: "Engineering",
    members: 15,
    nextMeeting: "Today at 5 PM",
    topics: ["Dynamics", "Statics", "Thermodynamics"]
  },
  {
    name: "Medical Sciences Group",
    subject: "Medicine",
    members: 10,
    nextMeeting: "Monday at 4 PM",
    topics: ["Anatomy", "Physiology", "Pathology"]
  }
];

export default function StudyGroups() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Study Groups</h1>
          <p className="text-muted-foreground mt-1">
            Join or create study groups to collaborate with peers
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search study groups..." />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <div className="grid gap-4">
        {studyGroups.map((group, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.subject}</p>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{group.nextMeeting}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.topics.map((topic, i) => (
                      <div key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 