import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Plus } from "lucide-react";

const forumCategories = [
  {
    title: "General Discussion",
    description: "Open discussions about anything related to alumni life",
    threads: 156,
    messages: 1243
  },
  {
    title: "Career Development",
    description: "Discuss career opportunities, job hunting, and professional growth",
    threads: 89,
    messages: 567
  },
  {
    title: "Academic Support",
    description: "Help with studies, research, and academic challenges",
    threads: 234,
    messages: 1890
  },
  {
    title: "Events & Meetups",
    description: "Discuss upcoming events and organize meetups",
    threads: 45,
    messages: 312
  },
  {
    title: "Alumni Stories",
    description: "Share your experiences and success stories",
    threads: 78,
    messages: 456
  }
];

export default function Forums() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Discussion Forums</h1>
          <p className="text-muted-foreground mt-1">
            Engage in meaningful discussions with fellow alumni and students
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Thread
        </Button>
      </div>

      <div className="grid gap-4">
        {forumCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{category.threads} threads</span>
                  </div>
                  <div>
                    <span>{category.messages} messages</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}