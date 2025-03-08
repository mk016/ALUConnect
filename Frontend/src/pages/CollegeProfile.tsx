
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  MapPin, 
  GraduationCap, 
  Building2, 
  FileText, 
  Globe, 
  Users,
  CalendarDays,
  Info,
  BookOpen,
  Trophy
} from "lucide-react";
import { motion } from "framer-motion";

// Mock college data
const collegeData = {
  id: 1,
  name: "Stanford University",
  logo: "https://source.unsplash.com/random/200x200/?university,logo",
  coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus",
  location: "Stanford, CA",
  founded: 1885,
  type: "Private Research University",
  website: "https://www.stanford.edu",
  email: "admissions@stanford.edu",
  description: "Stanford University is a private research university in Stanford, California. The university was founded in 1885 by Leland and Jane Stanford in memory of their only child, Leland Stanford Jr., who had died of typhoid fever at age 15 the previous year.",
  rankings: [
    { name: "QS World University Rankings", rank: "3rd", year: 2023 },
    { name: "Times Higher Education", rank: "4th", year: 2023 },
    { name: "US News & World Report", rank: "6th", year: 2023 }
  ],
  programs: [
    { id: 1, name: "Computer Science", type: "Undergraduate", duration: "4 years" },
    { id: 2, name: "Electrical Engineering", type: "Undergraduate", duration: "4 years" },
    { id: 3, name: "Business Administration", type: "Graduate", duration: "2 years" },
    { id: 4, name: "Medicine", type: "Graduate", duration: "4 years" }
  ],
  stats: {
    students: 16520,
    faculty: 2300,
    alumniCount: 220000,
    internationalStudents: "23%",
    acceptanceRate: "4.3%"
  },
  upcomingEvents: [
    { 
      id: 1, 
      title: "Annual Alumni Homecoming", 
      date: "October 15, 2023", 
      location: "Main Campus",
      description: "Join us for the annual alumni homecoming celebration featuring networking events, campus tours, and a special dinner."
    },
    { 
      id: 2, 
      title: "Engineering Career Fair", 
      date: "November 5, 2023", 
      location: "Engineering Building",
      description: "Connect with top companies and explore career opportunities in various engineering fields."
    }
  ],
  notableAlumni: [
    { id: 1, name: "John Hennessy", achievement: "Former Stanford President and Chairman of Alphabet" },
    { id: 2, name: "Larry Page", achievement: "Co-founder of Google" },
    { id: 3, name: "Sergey Brin", achievement: "Co-founder of Google" },
    { id: 4, name: "Peter Thiel", achievement: "Co-founder of PayPal" }
  ]
};

export default function CollegeProfile() {
  const { id } = useParams();
  
  // In a real app, you would fetch the college data based on the ID
  const college = collegeData;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Cover Photo and Logo */}
        <div className="relative mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-64 w-full rounded-xl overflow-hidden"
          >
            <img
              src={college.coverPhoto}
              alt="Campus Cover"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-16 left-8 border-4 border-background rounded-full overflow-hidden shadow-lg"
          >
            <img
              src={college.logo}
              alt={college.name}
              className="w-32 h-32 object-cover bg-white"
            />
          </motion.div>
          
          <div className="absolute right-6 bottom-4 flex space-x-3">
            <Button variant="secondary" size="sm" className="glass" asChild>
              <a href={college.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href={`mailto:${college.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>
        </div>
        
        {/* College Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <Card className="glass mb-6">
              <CardHeader>
                <CardTitle className="text-xl">{college.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {college.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Founded in {college.founded}</span>
                </div>
                <div className="pt-4 space-y-3">
                  <h4 className="text-sm font-medium">Key Statistics</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-secondary/30 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">Students</div>
                      <div className="font-semibold">{college.stats.students.toLocaleString()}</div>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">Faculty</div>
                      <div className="font-semibold">{college.stats.faculty.toLocaleString()}</div>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">Alumni</div>
                      <div className="font-semibold">{college.stats.alumniCount.toLocaleString()}</div>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground mb-1">Acceptance Rate</div>
                      <div className="font-semibold">{college.stats.acceptanceRate}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-sm">Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {college.rankings.map((ranking, index) => (
                    <div key={index} className="flex justify-between items-center text-sm pb-2 last:pb-0 border-b last:border-0 border-border/40">
                      <span>{ranking.name} ({ranking.year})</span>
                      <span className="font-semibold">{ranking.rank}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="glass mb-6">
              <CardHeader>
                <CardTitle className="text-xl">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{college.description}</p>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="programs" className="mb-6">
              <TabsList className="glass mb-4">
                <TabsTrigger value="programs" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Programs
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="alumni" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Notable Alumni
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="programs">
                <Card className="glass">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {college.programs.map((program) => (
                        <div key={program.id} className="bg-secondary/30 p-4 rounded-lg">
                          <h3 className="font-semibold mb-1">{program.name}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{program.type}</span>
                            <span>{program.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        View All Programs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="events">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {college.upcomingEvents.map((event) => (
                      <div key={event.id} className="mb-6 last:mb-0 pb-6 last:pb-0 border-b last:border-0 border-border/40">
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-start gap-3 text-sm text-muted-foreground mt-2 mb-3">
                          <div className="flex items-center">
                            <CalendarDays className="h-3.5 w-3.5 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {event.location}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    ))}
                    <div className="mt-4 text-center">
                      <Button variant="outline">
                        View All Events
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alumni">
                <Card className="glass">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {college.notableAlumni.map((alumnus) => (
                        <div key={alumnus.id} className="bg-secondary/30 p-4 rounded-lg">
                          <h3 className="font-semibold mb-1">{alumnus.name}</h3>
                          <p className="text-sm text-muted-foreground">{alumnus.achievement}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button asChild>
                        <Link to="/directory">
                          <Users className="mr-2 h-4 w-4" />
                          Browse Alumni Directory
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
