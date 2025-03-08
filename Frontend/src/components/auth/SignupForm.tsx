import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User, Building2, GraduationCap, Briefcase, Link2 } from 'lucide-react';
import { saveData } from '@/utils/dataUtils';
import collegesData from '@/data/colleges.json';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'alumni';
  collegeId: string;
  graduationYear: string;
  major: string;
  currentCompany?: string;
  currentPosition?: string;
  skills: string;
  bio: string;
  linkedin: string;
  github: string;
}

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

export default function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    collegeId: '',
    graduationYear: '',
    major: '',
    currentCompany: '',
    currentPosition: '',
    skills: '',
    bio: '',
    linkedin: '',
    github: ''
  });

  const handleChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create user data
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // In a real app, this should be hashed
        role: formData.role,
        collegeId: parseInt(formData.collegeId),
        graduationYear: parseInt(formData.graduationYear),
        major: formData.major,
        skills: formData.skills.split(',').map(s => s.trim()),
        bio: formData.bio,
        linkedin: formData.linkedin,
        github: formData.github,
        avatar: `https://source.unsplash.com/random/200x200/?portrait,${formData.role}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save user data
      const savedUser = await saveData({ type: 'users', data: userData });

      // If user is an alumni, create alumni profile
      if (formData.role === 'alumni') {
        const college = collegesData.colleges.find(c => c.id === parseInt(formData.collegeId));
        const alumniData = {
          name: formData.name,
          email: formData.email,
          avatar: userData.avatar,
          coverPhoto: `https://source.unsplash.com/random/1920x400/?university,${college?.name}`,
          graduationYear: parseInt(formData.graduationYear),
          degree: formData.major,
          collegeId: parseInt(formData.collegeId),
          collegeName: college?.name || '',
          company: formData.currentCompany,
          position: formData.currentPosition,
          location: college?.location || '',
          linkedin: formData.linkedin,
          bio: formData.bio,
          skills: formData.skills.split(',').map(s => s.trim()),
          experiences: [],
          education: [{
            id: 1,
            degree: formData.major,
            institution: college?.name || '',
            gradYear: parseInt(formData.graduationYear)
          }],
          projects: []
        };

        await saveData({ type: 'alumni', data: alumniData });
      }

      // Log user in
      localStorage.setItem('currentUser', JSON.stringify(savedUser));
      navigate('/dashboard');
    } catch (err) {
      setError('Error creating account. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
                      placeholder="Enter your email"
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Role and Education */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Current Student</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
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
                <div className="space-y-2">
                  <Label htmlFor="major">Major/Field of Study</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
              </div>
            </div>

            {/* Professional Information (for Alumni) */}
            {formData.role === 'alumni' && (
              <div className="space-y-4">
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
              </div>
            )}

            {/* Additional Information */}
            <div className="space-y-4">
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

            <div className="space-y-4">
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 font-semibold text-primary"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 