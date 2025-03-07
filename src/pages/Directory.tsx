
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin, MapPin, Briefcase, Search, GraduationCap, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for alumni directory
const alumni = [
  {
    id: 1,
    name: 'Alex Johnson',
    graduationYear: 2018,
    degree: 'Bachelor of Science in Computer Science',
    company: 'Google',
    position: 'Software Engineer',
    location: 'San Francisco, CA',
    image: 'https://source.unsplash.com/random/200x200/?portrait,man,1',
    linkedin: '#'
  },
  {
    id: 2,
    name: 'Maya Rodriguez',
    graduationYear: 2015,
    degree: 'Master of Business Administration',
    company: 'Goldman Sachs',
    position: 'Investment Banker',
    location: 'New York, NY',
    image: 'https://source.unsplash.com/random/200x200/?portrait,woman,1',
    linkedin: '#'
  },
  {
    id: 3,
    name: 'David Kim',
    graduationYear: 2020,
    degree: 'Bachelor of Arts in Economics',
    company: 'Amazon',
    position: 'Business Analyst',
    location: 'Seattle, WA',
    image: 'https://source.unsplash.com/random/200x200/?portrait,man,2',
    linkedin: '#'
  },
  {
    id: 4,
    name: 'Sophia Chen',
    graduationYear: 2017,
    degree: 'Bachelor of Engineering',
    company: 'Tesla',
    position: 'Mechanical Engineer',
    location: 'Austin, TX',
    image: 'https://source.unsplash.com/random/200x200/?portrait,woman,2',
    linkedin: '#'
  },
  {
    id: 5,
    name: 'Jamal Williams',
    graduationYear: 2019,
    degree: 'Bachelor of Fine Arts',
    company: 'Pixar',
    position: 'Graphic Designer',
    location: 'San Francisco, CA',
    image: 'https://source.unsplash.com/random/200x200/?portrait,man,3',
    linkedin: '#'
  },
  {
    id: 6,
    name: 'Emma Taylor',
    graduationYear: 2016,
    degree: 'Doctor of Medicine',
    company: 'Mayo Clinic',
    position: 'Resident Physician',
    location: 'Rochester, MN',
    image: 'https://source.unsplash.com/random/200x200/?portrait,woman,3',
    linkedin: '#'
  },
  {
    id: 7,
    name: 'Omar Hassan',
    graduationYear: 2021,
    degree: 'Master of Science in Data Science',
    company: 'Netflix',
    position: 'Data Scientist',
    location: 'Los Angeles, CA',
    image: 'https://source.unsplash.com/random/200x200/?portrait,man,4',
    linkedin: '#'
  },
  {
    id: 8,
    name: 'Priya Patel',
    graduationYear: 2014,
    degree: 'Bachelor of Science in Marketing',
    company: 'Apple',
    position: 'Marketing Manager',
    location: 'Cupertino, CA',
    image: 'https://source.unsplash.com/random/200x200/?portrait,woman,4',
    linkedin: '#'
  }
];

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Extract unique graduation years and locations for filter options
  const graduationYears = [...new Set(alumni.map(a => a.graduationYear))].sort((a, b) => b - a);
  const locations = [...new Set(alumni.map(a => a.location))].sort();
  
  // Filter alumni based on search and filters
  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = searchQuery === '' || 
                          alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alumnus.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = yearFilter === '' || alumnus.graduationYear.toString() === yearFilter;
    const matchesLocation = locationFilter === '' || alumnus.location === locationFilter;
    
    return matchesSearch && matchesYear && matchesLocation;
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
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Alumni Directory</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow graduates from around the world. Search by name, graduation year, location, or industry.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, company or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by graduation year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Years</SelectItem>
                {graduationYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
        
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAlumni.length} of {alumni.length} alumni
          </p>
          <Button variant="outline" size="sm">
            <UserCircle2 className="h-4 w-4 mr-2" />
            Join Directory
          </Button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumnus) => (
              <motion.div key={alumnus.id} variants={itemVariants} whileHover={{ y: -5 }}>
                <Card className="overflow-hidden h-full glass hover:shadow-md transition-all duration-300">
                  <div className="relative">
                    <img
                      src={alumnus.image}
                      alt={alumnus.name}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-secondary/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full">
                      Class of {alumnus.graduationYear}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-1">{alumnus.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <GraduationCap className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">{alumnus.degree}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Briefcase className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">{alumnus.position} at {alumnus.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">{alumnus.location}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-3.5 w-3.5 mr-1.5" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Linkedin className="h-3.5 w-3.5 mr-1.5" />
                          Profile
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No alumni found matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setYearFilter('');
                  setLocationFilter('');
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
