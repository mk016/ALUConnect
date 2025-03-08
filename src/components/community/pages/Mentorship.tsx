import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  UserCircle, 
  Briefcase, 
  GraduationCap, 
  Star,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const mentors = [
  {
    name: "Dr. Sarah Johnson",
    role: "Senior Software Engineer",
    company: "Google",
    expertise: ["Software Architecture", "Machine Learning", "Leadership"],
    experience: "15+ years",
    rating: 4.9,
    mentees: 12
  },
  {
    name: "Michael Chen",
    role: "Investment Banker",
    company: "Goldman Sachs",
    expertise: ["Finance", "Investment Strategy", "Market Analysis"],
    experience: "10+ years",
    rating: 4.8,
    mentees: 8
  },
  {
    name: "Dr. Emily Williams",
    role: "Research Scientist",
    company: "NASA",
    expertise: ["Aerospace", "Physics", "Research Methods"],
    experience: "12+ years",
    rating: 4.7,
    mentees: 15
  },
  {
    name: "James Rodriguez",
    role: "Product Manager",
    company: "Microsoft",
    expertise: ["Product Strategy", "UX Design", "Agile"],
    experience: "8+ years",
    rating: 4.9,
    mentees: 10
  }
];

export default function Mentorship() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mentorship Program</h1>
          <p className="text-muted-foreground mt-1">
            Connect with experienced mentors or become a mentor yourself
          </p>
        </div>
        <Button className="gap-2">
          <UserCircle className="h-4 w-4" />
          Become a Mentor
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search mentors by name, role, or expertise..." />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <div className="grid gap-4">
        {mentors.map((mentor, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{mentor.role} at {mentor.company}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{mentor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{mentor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <UserCircle className="h-4 w-4" />
                      <span>{mentor.mentees} mentees</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, i) => (
                      <div key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    View Profile
                    <ArrowRight className="h-4 w-4" />
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