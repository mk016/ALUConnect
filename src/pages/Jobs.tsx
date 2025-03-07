
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building2, 
  Filter, 
  Clock, 
  DollarSign,
  BookmarkPlus
} from "lucide-react";
import { motion } from "framer-motion";

// Mock job data
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    postedDate: "2 days ago",
    description: "We're looking for a Software Engineer to join our team and help build innovative products that impact millions of users.",
    requirements: ["Bachelor's degree in CS or related field", "3+ years of experience", "Proficiency in JavaScript, Python", "Knowledge of React"],
    alumni: {
      name: "David Kim",
      position: "Engineering Manager",
      graduationYear: 2015
    }
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Facebook",
    location: "Menlo Park, CA",
    type: "Full-time",
    salary: "$130,000 - $180,000",
    postedDate: "1 week ago",
    description: "Join our product team to help define and drive the vision for our next generation of social products.",
    requirements: ["Bachelor's degree", "5+ years of product management experience", "Experience with consumer products", "Strong analytical skills"],
    alumni: {
      name: "Sarah Johnson",
      position: "Senior PM",
      graduationYear: 2012
    }
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    postedDate: "3 days ago",
    description: "Help us build the future of entertainment by extracting insights from our vast data sets.",
    requirements: ["MS or PhD in Statistics, Math, CS", "Experience with Python, R", "Background in machine learning", "Strong communication skills"],
    alumni: {
      name: "Michael Chen",
      position: "Data Science Director",
      graduationYear: 2010
    }
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Internship",
    salary: "$30 - $40 per hour",
    postedDate: "5 days ago",
    description: "Join our marketing team for a summer internship and gain valuable experience in tech marketing.",
    requirements: ["Currently pursuing a Bachelor's degree", "Strong writing skills", "Creative thinking", "Interest in technology"],
    alumni: {
      name: "Jessica Miller",
      position: "Marketing Manager",
      graduationYear: 2017
    }
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    postedDate: "1 day ago",
    description: "Design intuitive and beautiful user experiences for Amazon's retail platform.",
    requirements: ["Bachelor's degree in Design or related field", "3+ years of UX design experience", "Proficiency in Figma, Sketch", "Strong portfolio"],
    alumni: {
      name: "Ryan Taylor",
      position: "Design Lead",
      graduationYear: 2013
    }
  }
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "" || job.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Alumni Job Board</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover career opportunities shared by fellow alumni or post your own job listings
            to connect with talented graduates.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
        
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} job opportunities
          </p>
          <Button>
            <Briefcase className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>
        
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="overflow-hidden h-full glass hover:shadow-md transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <Building2 className="h-4 w-4 mr-1.5" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <Button size="sm" variant="outline">
                            <BookmarkPlus className="h-4 w-4 mr-1.5" />
                            Save
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1.5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1.5" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1.5" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1.5" />
                          <span>Posted {job.postedDate}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Alumni Connection</div>
                          <div className="text-sm text-muted-foreground">
                            {job.alumni.name} (Class of {job.alumni.graduationYear}), {job.alumni.position}
                          </div>
                        </div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No jobs found matching your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
