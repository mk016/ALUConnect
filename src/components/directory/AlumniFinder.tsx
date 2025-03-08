import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import collegesData from '@/data/colleges.json';
import alumniData from '@/data/alumni.json';

// Filter interfaces
interface CollegeFilters {
  search: string;
  location: string | null;
  type: string | null;
  programType: string | null;
  rankingRange: [number, number];
}

interface AlumniFilters {
  search: string;
  graduationYearRange: [number, number];
  skills: string[];
  industry: string | null;
  degree: string;
}

// Helper function to get unique values from array
const getUniqueValues = (array: any[], key: string): string[] => {
  return Array.from(new Set(array.map(item => item[key]))).filter(Boolean) as string[];
};

// Component interfaces
interface CollegeCardProps {
  college: typeof collegesData.colleges[0];
  onClick: () => void;
}

const CollegeCard = ({ college, onClick }: CollegeCardProps) => (
  <>
  
  <Card 
    className="hover:shadow-lg transition-all duration-300 cursor-pointer" 
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          <AvatarImage src={college.logo} alt={college.name} />
          <AvatarFallback>{college.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-lg">{college.name}</h3>
          <p className="text-sm text-muted-foreground">{college.location}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{college.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs bg-secondary/30 px-2 py-1 rounded-full">
          {college.stats.students.toLocaleString()} Students
        </span>
        <span className="text-xs bg-secondary/30 px-2 py-1 rounded-full">
          {college.stats.alumniCount.toLocaleString()} Alumni
        </span>
        <span className="text-xs bg-secondary/30 px-2 py-1 rounded-full">
          {college.programs.length} Programs
        </span>
      </div>
    </CardContent>
  </Card>
  </>
);

interface AlumniCardProps {
  alumni: typeof alumniData.alumni[0];
}

const AlumniCard = ({ alumni }: AlumniCardProps) => (
  <Link to={`/alumni/${alumni.id}`}>
    <Card className="hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={alumni.avatar} alt={alumni.name} />
            <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{alumni.name}</h3>
            <p className="text-sm text-muted-foreground">{alumni.position} at {alumni.company}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{alumni.bio}</p>
        <div className="flex flex-wrap gap-1">
          {alumni.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {alumni.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{alumni.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  </Link>
);

// Filter components
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="space-y-2">
    <h3 className="font-semibold text-sm">{title}</h3>
    {children}
  </div>
);

export default function AlumniFinder() {
  // State for filters
  const [collegeFilters, setCollegeFilters] = useState<CollegeFilters>({
    search: "",
    location: null,
    type: null,
    programType: null,
    rankingRange: [1, 100]
  });

  const [alumniFilters, setAlumniFilters] = useState<AlumniFilters>({
    search: "",
    graduationYearRange: [2010, new Date().getFullYear()],
    skills: [],
    industry: null,
    degree: ""
  });

  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);

  // Get unique values for filters
  const locations = getUniqueValues(collegesData.colleges, 'location');
  const types = getUniqueValues(collegesData.colleges, 'type');
  const programTypes = Array.from(new Set(
    collegesData.colleges.flatMap(college => 
      college.programs.map(program => program.type)
    )
  ));

  const industries = Array.from(new Set(
    alumniData.alumni.map(alumni => alumni.company)
  ));

  const skills = Array.from(new Set(
    alumniData.alumni.flatMap(alumni => alumni.skills)
  ));

  // Filter colleges
  const filteredColleges = collegesData.colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(collegeFilters.search.toLowerCase()) ||
                         college.location.toLowerCase().includes(collegeFilters.search.toLowerCase());
    const matchesLocation = !collegeFilters.location || college.location === collegeFilters.location;
    const matchesType = !collegeFilters.type || college.type === collegeFilters.type;
    const matchesProgramType = !collegeFilters.programType || 
                              college.programs.some(program => program.type === collegeFilters.programType);
    
    return matchesSearch && matchesLocation && matchesType && matchesProgramType;
  });

  // Filter alumni
  const filteredAlumni = selectedCollege ? alumniData.alumni.filter(alumni => {
    const matchesCollege = alumni.collegeId === selectedCollege;
    const matchesSearch = alumni.name.toLowerCase().includes(alumniFilters.search.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(alumniFilters.search.toLowerCase());
    const matchesYear = alumni.graduationYear >= alumniFilters.graduationYearRange[0] &&
                       alumni.graduationYear <= alumniFilters.graduationYearRange[1];
    const matchesIndustry = !alumniFilters.industry || alumni.company === alumniFilters.industry;
    const matchesSkills = alumniFilters.skills.length === 0 ||
                         alumniFilters.skills.every(skill => alumni.skills.includes(skill));
    const matchesDegree = !alumniFilters.degree || alumni.degree.includes(alumniFilters.degree);

    return matchesCollege && matchesSearch && matchesYear && matchesIndustry && matchesSkills && matchesDegree;
  }) : [];

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          {!selectedCollege ? (
            // College Filters
            <>
              <FilterSection title="Search Colleges">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or location..."
                    className="pl-10"
                    value={collegeFilters.search}
                    onChange={(e) => setCollegeFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
              </FilterSection>

              <FilterSection title="Location">
                <Select
                  value={collegeFilters.location || "all"}
                  onValueChange={(value) => setCollegeFilters(prev => ({ 
                    ...prev, 
                    location: value === "all" ? null : value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterSection>

              <FilterSection title="Institution Type">
                <Select
                  value={collegeFilters.type || "all"}
                  onValueChange={(value) => setCollegeFilters(prev => ({ 
                    ...prev, 
                    type: value === "all" ? null : value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
              </FilterSection>

              <FilterSection title="Program Type">
                <Select
                  value={collegeFilters.programType || "all"}
                  onValueChange={(value) => setCollegeFilters(prev => ({ 
                    ...prev, 
                    programType: value === "all" ? null : value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                        </SelectTrigger>
                        <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {programTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
              </FilterSection>
            </>
          ) : (
            // Alumni Filters
            <>
              <FilterSection title="Search Alumni">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search by name or company..."
                    className="pl-10" 
                    value={alumniFilters.search}
                    onChange={(e) => setAlumniFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
              </FilterSection>

              <FilterSection title="Graduation Year">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>{alumniFilters.graduationYearRange[0]}</span>
                    <span>{alumniFilters.graduationYearRange[1]}</span>
                  </div>
                  <Slider
                    value={[
                      alumniFilters.graduationYearRange[0],
                      alumniFilters.graduationYearRange[1]
                    ]}
                    min={2010}
                    max={new Date().getFullYear()}
                    step={1}
                    onValueChange={(value) => 
                      setAlumniFilters(prev => ({ 
                        ...prev, 
                        graduationYearRange: [value[0], value[1]]
                      }))
                    }
                  />
              </div>
              </FilterSection>

              <FilterSection title="Industry">
                <Select
                  value={alumniFilters.industry || "all"}
                  onValueChange={(value) => setAlumniFilters(prev => ({ 
                    ...prev, 
                    industry: value === "all" ? null : value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterSection>

              <FilterSection title="Skills">
                <div className="space-y-2">
                  {skills.slice(0, 10).map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={alumniFilters.skills.includes(skill)}
                        onCheckedChange={(checked) => {
                          setAlumniFilters(prev => ({
                            ...prev,
                            skills: checked
                              ? [...prev.skills, skill]
                              : prev.skills.filter(s => s !== skill)
                          }));
                        }}
                      />
                      <Label htmlFor={skill}>{skill}</Label>
              </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Degree">
                <Input
                  placeholder="Filter by degree..."
                  value={alumniFilters.degree}
                  onChange={(e) => setAlumniFilters(prev => ({ ...prev, degree: e.target.value }))}
                />
              </FilterSection>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="md:col-span-3">
          {!selectedCollege ? (
            // College Results
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Colleges ({filteredColleges.length})</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredColleges.map(college => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    onClick={() => setSelectedCollege(college.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            // Alumni Results
            <>
           <img src={collegesData.colleges.find(c => c.id === selectedCollege)?.coverPhoto} className='h-100 w-full rounded-md ' alt="College Cover" />

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {collegesData.colleges.find(c => c.id === selectedCollege)?.name} Alumni
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Found {filteredAlumni.length} alumni
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCollege(null);
                    setAlumniFilters({
                      search: "",
                      graduationYearRange: [2010, new Date().getFullYear()],
                      skills: [],
                      industry: null,
                      degree: ""
                    });
                  }}
                >
                  Back to Colleges
                </Button>
              </div>
              
              {filteredAlumni.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAlumni.map(alumni => (
                    <AlumniCard key={alumni.id} alumni={alumni} />
                  ))}
            </div>
          ) : (
            <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No alumni found matching your filters.</p>
            </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
