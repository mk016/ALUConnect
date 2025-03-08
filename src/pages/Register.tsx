import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  GraduationCap, 
  CalendarIcon,
  Book,
  AtSign,
  UserCircle2,
  Briefcase,
  Link2,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import collegesData from '@/data/colleges.json';

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  collegeId: string;
  graduationYear: string;
  major: string;
  currentCompany?: string;
  currentPosition?: string;
  skills: string;
  bio: string;
  linkedin: string;
  github: string;
  studentId?: string;
  website?: string;
  location?: string;
  collegeType?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("alumni");
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeId: '',
    graduationYear: '',
    major: '',
    currentCompany: '',
    currentPosition: '',
    skills: '',
    bio: '',
    linkedin: '',
    github: '',
    studentId: '',
    website: '',
    location: '',
    collegeType: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Prepare data based on user type
      const userData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
      };

      // Remove confirmPassword from the data sent to server
      const { confirmPassword, ...dataToSend } = userData;

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:8080'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          ...dataToSend,
          userType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Registration failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Register to connect with the alumni network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="alumni" onValueChange={setUserType}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="alumni" className="flex items-center gap-1">
                    <UserCircle2 className="h-4 w-4" />
                    Alumni
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="college" className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    College
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="alumni">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={formData.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="password"
                              type="password"
                              className="pl-10"
                              value={formData.password}
                              onChange={(e) => handleChange('password', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="pl-10"
                              value={formData.confirmPassword}
                              onChange={(e) => handleChange('confirmPassword', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="college">College/University</Label>
                          <Select
                            value={formData.collegeId}
                            onValueChange={(value) => handleChange('collegeId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your college" />
                            </SelectTrigger>
                            <SelectContent>
                              {collegesData.colleges.map(college => (
                                <SelectItem key={college.id} value={college.id.toString()}>
                                  {college.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graduationYear">Graduation Year</Label>
                          <Select
                            value={formData.graduationYear}
                            onValueChange={(value) => handleChange('graduationYear', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {graduationYears.map(year => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="major">Major/Field of Study</Label>
                        <div className="relative">
                          <Book className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="major"
                            placeholder="Enter your major"
                            className="pl-10"
                            value={formData.major}
                            onChange={(e) => handleChange('major', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentCompany">Current Company</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="currentCompany"
                              placeholder="Enter company name"
                              className="pl-10"
                              value={formData.currentCompany}
                              onChange={(e) => handleChange('currentCompany', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currentPosition">Current Position</Label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="currentPosition"
                              placeholder="Enter your position"
                              className="pl-10"
                              value={formData.currentPosition}
                              onChange={(e) => handleChange('currentPosition', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                          id="skills"
                          placeholder="Enter your skills (comma-separated)"
                          value={formData.skills}
                          onChange={(e) => handleChange('skills', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          value={formData.bio}
                          onChange={(e) => handleChange('bio', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn Profile</Label>
                          <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="linkedin"
                              placeholder="LinkedIn URL"
                              className="pl-10"
                              value={formData.linkedin}
                              onChange={(e) => handleChange('linkedin', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub Profile</Label>
                          <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="github"
                              placeholder="GitHub URL"
                              className="pl-10"
                              value={formData.github}
                              onChange={(e) => handleChange('github', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Alumni Account'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="student">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={formData.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="password"
                              type="password"
                              className="pl-10"
                              value={formData.password}
                              onChange={(e) => handleChange('password', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="pl-10"
                              value={formData.confirmPassword}
                              onChange={(e) => handleChange('confirmPassword', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID</Label>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="studentId"
                              placeholder="Enter your student ID"
                              className="pl-10"
                              value={formData.studentId}
                              onChange={(e) => handleChange('studentId', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="college">College/University</Label>
                          <Select
                            value={formData.collegeId}
                            onValueChange={(value) => handleChange('collegeId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your college" />
                            </SelectTrigger>
                            <SelectContent>
                              {collegesData.colleges.map(college => (
                                <SelectItem key={college.id} value={college.id.toString()}>
                                  {college.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="major">Major/Field of Study</Label>
                          <div className="relative">
                            <Book className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="major"
                              placeholder="Enter your major"
                              className="pl-10"
                              value={formData.major}
                              onChange={(e) => handleChange('major', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                          <Select
                            value={formData.graduationYear}
                            onValueChange={(value) => handleChange('graduationYear', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {graduationYears.map(year => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills & Interests</Label>
                        <Input
                          id="skills"
                          placeholder="Enter your skills and interests (comma-separated)"
                          value={formData.skills}
                          onChange={(e) => handleChange('skills', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          value={formData.bio}
                          onChange={(e) => handleChange('bio', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn Profile</Label>
                          <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="linkedin"
                              placeholder="LinkedIn URL"
                              className="pl-10"
                              value={formData.linkedin}
                              onChange={(e) => handleChange('linkedin', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub Profile</Label>
                          <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="github"
                              placeholder="GitHub URL"
                              className="pl-10"
                              value={formData.github}
                              onChange={(e) => handleChange('github', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Student Account'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="college">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">College/University Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Enter college name"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Official Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="admin@college.edu"
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://www.college.edu"
                              className="pl-10"
                              value={formData.website}
                              onChange={(e) => handleChange('website', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="location"
                              placeholder="City, State, Country"
                              className="pl-10"
                              value={formData.location}
                              onChange={(e) => handleChange('location', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="collegeType">Type of Institution</Label>
                          <Select
                            value={formData.collegeType}
                            onValueChange={(value) => handleChange('collegeType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="autonomous">Autonomous</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="password"
                              type="password"
                              className="pl-10"
                              value={formData.password}
                              onChange={(e) => handleChange('password', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="pl-10"
                              value={formData.confirmPassword}
                              onChange={(e) => handleChange('confirmPassword', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">About the Institution</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about your institution"
                          value={formData.bio}
                          onChange={(e) => handleChange('bio', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create College Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
