import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar,
  Tag,
  ThumbsUp,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const news = [
  {
    title: "Annual Alumni Meetup 2024",
    category: "Events",
    date: "March 15, 2024",
    excerpt: "Join us for our biggest alumni gathering of the year. Network with fellow graduates, share experiences, and celebrate our community's achievements.",
    likes: 245,
    comments: 56,
    tags: ["Event", "Networking", "Community"]
  },
  {
    title: "New Mentorship Program Launch",
    category: "Announcements",
    date: "March 10, 2024",
    excerpt: "We're excited to announce our new mentorship program connecting experienced alumni with current students and recent graduates.",
    likes: 189,
    comments: 42,
    tags: ["Mentorship", "Career Development"]
  },
  {
    title: "Alumni Success Story: Sarah Chen",
    category: "Success Stories",
    date: "March 8, 2024",
    excerpt: "Read about how Sarah Chen, class of 2018, built a successful tech startup and is now giving back to the community.",
    likes: 312,
    comments: 28,
    tags: ["Success Story", "Entrepreneurship"]
  },
  {
    title: "New Online Learning Resources",
    category: "Resources",
    date: "March 5, 2024",
    excerpt: "Check out our newly added collection of online courses, workshops, and learning materials exclusively for alumni.",
    likes: 156,
    comments: 34,
    tags: ["Education", "Resources", "Online Learning"]
  }
];

export default function News() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">News & Updates</h1>
          <p className="text-muted-foreground mt-1">
            Stay informed with the latest news and announcements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Categories</Button>
          <Button variant="outline">Archive</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search news..." />
        </div>
      </div>

      <div className="grid gap-4">
        {news.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Tag className="h-4 w-4" />
                    <span>{item.category}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.excerpt}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
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