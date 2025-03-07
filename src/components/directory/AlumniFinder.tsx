
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Building2, GraduationCap, UserCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { mockColleges, mockAlumni } from '@/data/mockData';

export default function AlumniFinder() {
  const [searchType, setSearchType] = useState("byCollege");
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [graduationYear, setGraduationYear] = useState<string | null>(null);
  const [fieldOfStudy, setFieldOfStudy] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<typeof mockAlumni>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Get all unique graduation years from the alumni data
  const graduationYears = [...new Set(mockAlumni.map(alum => alum.graduationYear))].sort((a, b) => b - a);
  
  // Get all unique fields of study from the alumni data
  const fields = [...new Set(mockAlumni.flatMap(alum => 
    alum.education.map(edu => edu.major)
  ))].sort();

  const handleSearch = () => {
    let results = [...mockAlumni];
    
    // Filter by college if selected
    if (selectedCollege) {
      results = results.filter(alum => 
        alum.education.some(edu => edu.collegeId === parseInt(selectedCollege))
      );
    }
    
    // Filter by graduation year if selected
    if (graduationYear && graduationYear !== "any") {
      results = results.filter(alum => alum.graduationYear.toString() === graduationYear);
    }
    
    // Filter by field of study if selected
    if (fieldOfStudy && fieldOfStudy !== "any") {
      results = results.filter(alum => 
        alum.education.some(edu => edu.major === fieldOfStudy)
      );
    }
    
    // Filter by name query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(alum => 
        alum.name.toLowerCase().includes(query)
      );
    }
    
    // If search by name directly
    if (searchType === "byName" && searchQuery.trim()) {
      results = mockAlumni.filter(alum => 
        alum.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // If search by field directly
    if (searchType === "byField" && fieldOfStudy && fieldOfStudy !== "any") {
      results = mockAlumni.filter(alum => 
        alum.education.some(edu => edu.major === fieldOfStudy)
      );
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <>
      <Card className="glass dark:glass-dark w-full mb-8">
        <CardContent className="p-6">
          <Tabs defaultValue="byCollege" onValueChange={setSearchType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="byCollege" className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                By College
              </TabsTrigger>
              <TabsTrigger value="byName" className="flex items-center gap-1">
                <UserCircle2 className="h-4 w-4" />
                By Name
              </TabsTrigger>
              <TabsTrigger value="byField" className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                By Field
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="byCollege" className="space-y-4">
              <div>
                <Label htmlFor="college-select">Select College/University</Label>
                <Select onValueChange={(value) => setSelectedCollege(value)}>
                  <SelectTrigger id="college-select" className="w-full">
                    <SelectValue placeholder="Select a college" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockColleges.map(college => (
                      <SelectItem key={college.id} value={college.id.toString()}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCollege && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="graduation-year">Graduation Year</Label>
                      <Select onValueChange={setGraduationYear}>
                        <SelectTrigger id="graduation-year">
                          <SelectValue placeholder="Any year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any year</SelectItem>
                          {graduationYears.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="field-of-study">Field of Study</Label>
                      <Select onValueChange={setFieldOfStudy}>
                        <SelectTrigger id="field-of-study">
                          <SelectValue placeholder="Any field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any field</SelectItem>
                          {fields.map(field => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="alumni-name">Alumni Name (Optional)</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="alumni-name" 
                        placeholder="Search by name" 
                        className="pl-10" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSearch} className="w-full sm:w-auto">
                    <Search className="mr-2 h-4 w-4" />
                    Find Alumni
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="byName" className="space-y-4">
              <div>
                <Label htmlFor="alumni-name-direct">Alumni Name</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="alumni-name-direct" 
                    placeholder="Search alumni by name" 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </TabsContent>
            
            <TabsContent value="byField" className="space-y-4">
              <div>
                <Label htmlFor="field-select">Field/Industry</Label>
                <Select onValueChange={setFieldOfStudy}>
                  <SelectTrigger id="field-select" className="w-full">
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map(field => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input id="location" placeholder="City, State, or Country" />
                </div>
                <div>
                  <Label htmlFor="graduation-year-field">Graduation Year (Optional)</Label>
                  <Select onValueChange={setGraduationYear}>
                    <SelectTrigger id="graduation-year-field">
                      <SelectValue placeholder="Any year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any year</SelectItem>
                      {graduationYears.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Search Results Section */}
      {hasSearched && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(alumni => {
                // Find college name for this alumni
                const college = alumni.education[0] ? 
                  mockColleges.find(c => c.id === alumni.education[0].collegeId)?.name : 
                  "Unknown College";
                
                return (
                  <Link to={`/alumni/${alumni.id}`} key={alumni.id}>
                    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden h-full glass">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16 border-2 border-primary/10">
                            <AvatarImage src={alumni.avatar} alt={alumni.name} />
                            <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg">{alumni.name}</h3>
                            <p className="text-sm text-muted-foreground">{alumni.currentPosition} at {alumni.currentCompany}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{college}</span>
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{alumni.education[0]?.degree} in {alumni.education[0]?.major}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-1">
                          {alumni.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-secondary/30 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                          {alumni.skills.length > 3 && (
                            <span className="px-2 py-1 bg-secondary/30 rounded-full text-xs">
                              +{alumni.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No alumni found matching your search criteria.</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search for a different college.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
