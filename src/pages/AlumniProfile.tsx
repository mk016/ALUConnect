
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, MapPin, Briefcase, GraduationCap, Calendar, Building2, FileText, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

// Mock alumni data
const alumniData = {
  id: 1,
  name: "Alex Johnson",
  avatar: "https://source.unsplash.com/random/200x200/?portrait,man,1",
  coverPhoto: "https://source.unsplash.com/random/1920x400/?university",
  graduationYear: 2018,
  degree: "Bachelor of Science in Computer Science",
  company: "Google",
  position: "Software Engineer",
  location: "San Francisco, CA",
  email: "alex.johnson@example.com",
  linkedin: "https://linkedin.com/in/alexjohnson",
  bio: "Software engineer with 5+ years of experience in full-stack development. Passionate about building scalable web applications and mentoring junior developers.",
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "TypeScript"],
  experiences: [
    {
      id: 1,
      role: "Software Engineer",
      company: "Google",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "Working on Google Search infrastructure."
    },
    {
      id: 2,
      role: "Junior Developer",
      company: "Facebook",
      startDate: "Aug 2018",
      endDate: "Dec 2019",
      description: "Worked on internal tools for content moderation."
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      gradYear: 2018
    }
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
      link: "#"
    },
    {
      id: 2,
      title: "AI Chat Assistant",
      description: "Developed a conversational AI assistant using Python and TensorFlow.",
      link: "#"
    }
  ]
};

export default function AlumniProfile() {
  const { id } = useParams();
  const [messageOpen, setMessageOpen] = useState(false);
  
  // In a real app, you would fetch the alumni data based on the ID
  const alumni = alumniData;

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
              src={alumni.coverPhoto}
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
              src={alumni.avatar}
              alt={alumni.name}
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
                <CardTitle className="text-xl">{alumni.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {alumni.position} at {alumni.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{alumni.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>{alumni.degree}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Class of {alumni.graduationYear}</span>
                </div>
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Connect</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${alumni.email}`} className="flex items-center">
                        <Mail className="h-4 w-4 mr-1.5" />
                        Email
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-1.5" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-sm">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map((skill, index) => (
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
                <p className="text-muted-foreground">{alumni.bio}</p>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="experience" className="mb-6">
              <TabsList className="glass mb-4">
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Projects
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="experience">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {alumni.experiences.map((exp) => (
                      <div key={exp.id} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{exp.role}</h3>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Building2 className="h-3.5 w-3.5 mr-1" />
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {alumni.education.map((edu) => (
                      <div key={edu.id} className="mb-6 last:mb-0">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mb-1">
                          <Building2 className="h-3.5 w-3.5 mr-1" />
                          {edu.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Graduated: {edu.gradYear}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card className="glass">
                  <CardContent className="pt-6">
                    {alumni.projects.map((project) => (
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
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
