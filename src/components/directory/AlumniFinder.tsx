
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

// Mock colleges data - in a real app, this would come from an API
const colleges = [
  { id: 1, name: "Stanford University" },
  { id: 2, name: "MIT" },
  { id: 3, name: "Harvard University" },
  { id: 4, name: "UC Berkeley" },
  { id: 5, name: "Princeton University" },
];

// Mock graduation years - in a real app, this would be dynamically generated
const graduationYears = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

// Mock fields/majors
const fields = [
  "Computer Science",
  "Business Administration",
  "Electrical Engineering",
  "Medicine",
  "Law",
  "Psychology",
  "Mathematics",
  "Physics",
  "Biology",
  "Economics"
];

export default function AlumniFinder() {
  const [searchType, setSearchType] = useState("byCollege");
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
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
                  {colleges.map(college => (
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
                    <Select>
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
                    <Select>
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
                
                <Button className="w-full sm:w-auto">
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
            <Button className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </TabsContent>
          
          <TabsContent value="byField" className="space-y-4">
            <div>
              <Label htmlFor="field-select">Field/Industry</Label>
              <Select>
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
                <Select>
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
            <Button className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
