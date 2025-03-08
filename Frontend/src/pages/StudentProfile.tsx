
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  MapPin, 
  Book, 
  GraduationCap, 
  Calendar, 
  Building2, 
  FileText, 
  MessageSquare, 
  Award,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

// Mock student data
const studentData = {
  id: 1,
  name: "Emma Carter",
  avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,2",
  coverPhoto: "https://source.unsplash.com/random/1920x400/?campus",
  major: "Computer Science",
  year: "Junior",
  graduationYear: 2025,
  university: "Stanford University",
  location: "Stanford, CA",
  email: "emma.carter@example.edu",
  bio: "Computer Science student passionate about artificial intelligence and machine learning. Looking for internship opportunities in software development.",
  skills: ["Python", "Java", "Machine Learning", "Data Structures", "Web Development"],
  courses: [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      grade: "A"
    },
    {
      id: 2,
      code: "CS201",
      name: "Data Structures",
      grade: "A-"
    },
    {
      id: 3,
      code: "CS301",
      name: "Algorithms",
      grade: "B+"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Weather Prediction App",
      description: "Used machine learning to predict weather patterns based on historical data.",
      link: "#"
    },
    {
      id: 2,
      title: "Student Social Network",
      description: "Developed a social networking platform for students to connect and collaborate.",
      link: "#"
    }
  ],
  extracurricular: [
    {
      id: 1,
      title: "Computer Science Club",
      role: "Vice President",
      period: "2022 - Present"
    },
    {
      id: 2,
      title: "Hackathon Team",
      role: "Team Leader",
      period: "2021 - Present"
    }
  ]
};

export default function StudentProfile() {
  const { id } = useParams();
  const [messageOpen, setMessageOpen] = useState(false);
  
  // In a real app, you would fetch the student data based on the ID
  const student = studentData;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Cover Photo and Avatar */}
        <div className="relative mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-64 w-full rounded-xl overflow-hidden"
          >
            <img
              src={student.coverPhoto}
              alt="Cover"
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
              src={student.avatar}
              alt={student.name}
              className="w-32 h-32 object-cover"
            />
          </motion.div>
          
          <div className="absolute right-6 bottom-4 flex space-x-3">
            <Button variant="secondary" size="sm" className="glass">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button size="sm" onClick={() => setMessageOpen(true)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <Card className="glass mb-6">
              <CardHeader>
                <CardTitle className="text-xl">{student.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <Book className="h-4 w-4 mr-1" />
                  {student.major} - {student.year}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{student.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{student.university}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Expected graduation: {student.graduationYear}</span>
                </div>
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Connect</h4>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={`mailto:${student.email}`} className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-1.5" />
                      Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-sm">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-secondary/50 text-xs rounded-full"
                    >
                      {skill}
                    </span>
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
                <p className="text-muted-foreground">{student.bio}</p>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="courses" className="mb-6">
              <TabsList className="glass mb-4">
                <TabsTrigger value="courses" className="flex items-center gap-1">
                  <Book className="h-4 w-4" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="extracurricular" className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Activities
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {student.courses.map((course) => (
                      <div key={course.id} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-border/40">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Course Code: {course.code}
                            </p>
                          </div>
                          <div className="flex items-center bg-secondary/30 px-2 py-1 rounded-md">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            <span className="text-sm font-medium">{course.grade}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {student.projects.map((project) => (
                      <div key={project.id} className="mb-6 last:mb-0">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="extracurricular">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {student.extracurricular.map((activity) => (
                      <div key={activity.id} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-border/40">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{activity.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {activity.role}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground">{activity.period}</span>
                        </div>
                      </div>
                    ))}
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
