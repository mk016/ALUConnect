import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BookOpen, 
  Download,
  FileText,
  Video,
  Link as LinkIcon,
  ExternalLink
} from "lucide-react";

const resources = [
  {
    title: "Complete Guide to Machine Learning",
    type: "PDF",
    category: "Computer Science",
    size: "2.5 MB",
    downloads: 1234,
    icon: FileText
  },
  {
    title: "Introduction to Financial Markets",
    type: "Video",
    category: "Finance",
    duration: "45 mins",
    views: 5678,
    icon: Video
  },
  {
    title: "Research Methodology Handbook",
    type: "PDF",
    category: "Research",
    size: "1.8 MB",
    downloads: 890,
    icon: FileText
  },
  {
    title: "Career Development Workshop",
    type: "Video",
    category: "Career",
    duration: "1.5 hours",
    views: 3456,
    icon: Video
  },
  {
    title: "Industry Best Practices Guide",
    type: "Link",
    category: "Professional Development",
    website: "industry-guide.com",
    visits: 2345,
    icon: LinkIcon
  }
];

export default function Resources() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Educational Resources</h1>
          <p className="text-muted-foreground mt-1">
            Access a curated collection of educational materials and guides
          </p>
        </div>
        <Button className="gap-2">
          <BookOpen className="h-4 w-4" />
          Submit Resource
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search resources..." />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/30 rounded-lg">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{resource.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{resource.category}</span>
                      <span>•</span>
                      {resource.type === 'PDF' && (
                        <>
                          <span>{resource.size}</span>
                          <span>•</span>
                          <span>{resource.downloads} downloads</span>
                        </>
                      )}
                      {resource.type === 'Video' && (
                        <>
                          <span>{resource.duration}</span>
                          <span>•</span>
                          <span>{resource.views} views</span>
                        </>
                      )}
                      {resource.type === 'Link' && (
                        <>
                          <span>{resource.website}</span>
                          <span>•</span>
                          <span>{resource.visits} visits</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  {resource.type === 'Link' ? (
                    <>
                      <ExternalLink className="h-4 w-4" />
                      Visit
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 