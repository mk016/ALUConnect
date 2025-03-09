import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { API_ENDPOINTS } from '@/config/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  graduationYear: string;
  major: string;
  currentCompany: string;
  currentPosition: string;
  skills: string[];
  linkedin: string;
  github: string;
  website: string;
  profilePicture: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface FreelancerProfile {
  _id: string;
  name: string;
  profilePicture: string;
  skills: string[];
  hourlyRate: number;
  expertise: string[];
  rating?: number;
  reviews?: number;
  availability: boolean;
  bio: string;
}

interface Opportunity {
  _id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  skills: string[];
  status: 'open' | 'closed';
  createdAt: string;
  applications: Array<{
    _id: string;
    freelancer: {
      _id: string;
      name: string;
      profilePicture: string;
      hourlyRate: number;
      rating?: number;
    };
    status: 'pending' | 'accepted' | 'rejected';
    message: string;
    proposedPrice: number;
    createdAt: string;
  }>;
}

export default function AlumniDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    bio: '',
    location: '',
    graduationYear: '',
    major: '',
    currentCompany: '',
    currentPosition: '',
    skills: [],
    linkedin: '',
    github: '',
    website: '',
    profilePicture: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [hireDetails, setHireDetails] = useState({
    projectTitle: '',
    projectDescription: '',
    budget: 0,
    deadline: ''
  });
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    budget: 0,
    deadline: '',
    skills: [] as string[]
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileData({
        ...profileData,
        ...parsedUser
      });
    }
  }, []);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINTS.GET_FREELANCERS}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch freelancers');
        
        const data = await response.json();
        setFreelancers(data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };

    fetchFreelancers();
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINTS.GET_OPPORTUNITIES}?userId=${user._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch opportunities');
        
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    if (user) {
      fetchOpportunities();
    }
  }, [user]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.UPLOAD_PHOTO}/${user._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload photo');

      const data = await response.json();
      setProfileData(prev => ({
        ...prev,
        profilePicture: data.profilePicture
      }));

      // Update local storage
      const updatedUser = { ...user, profilePicture: data.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.UPDATE_PROFILE}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.CHANGE_PASSWORD}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: profileData.password,
          newPassword: profileData.newPassword
        })
      });

      if (!response.ok) throw new Error('Failed to change password');

      // Clear password fields
      setProfileData(prev => ({
        ...prev,
        password: '',
        newPassword: '',
        confirmPassword: ''
      }));

      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  const handleHireSubmit = async (freelancerId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.HIRE_FREELANCER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          freelancerId,
          clientId: user._id,
          projectDetails: {
            title: hireDetails.projectTitle,
            description: hireDetails.projectDescription,
            budget: hireDetails.budget,
            deadline: hireDetails.deadline
          }
        })
      });

      if (!response.ok) throw new Error('Failed to send hire request');

      alert('Hire request sent successfully!');
      setHireDetails({
        projectTitle: '',
        projectDescription: '',
        budget: 0,
        deadline: ''
      });
    } catch (error) {
      console.error('Error hiring freelancer:', error);
      alert('Failed to send hire request');
    }
  };

  const handlePostOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.POST_OPPORTUNITY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newOpportunity,
          postedBy: user._id
        })
      });

      if (!response.ok) throw new Error('Failed to post opportunity');

      const data = await response.json();
      setOpportunities(prev => [data, ...prev]);
      setNewOpportunity({
        title: '',
        description: '',
        budget: 0,
        deadline: '',
        skills: []
      });
    } catch (error) {
      console.error('Error posting opportunity:', error);
      alert('Failed to post opportunity');
    }
  };

  const handleApplicationResponse = async (opportunityId: string, applicationId: string, status: 'accepted' | 'rejected') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.RESPOND_TO_APPLICATION}/${opportunityId}/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to respond to application');

      setOpportunities(prev => prev.map(opp => {
        if (opp._id === opportunityId) {
          return {
            ...opp,
            applications: opp.applications.map(app => {
              if (app._id === applicationId) {
                return { ...app, status };
              }
              return app;
            })
          };
        }
        return opp;
      }));

      alert(`Application ${status} successfully`);
    } catch (error) {
      console.error('Error responding to application:', error);
      alert('Failed to respond to application');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="hire">Hire Freelancers</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.profilePicture} />
                    <AvatarFallback>{profileData.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        Change Photo
                      </Button>
                    </>
                  )}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        value={profileData.graduationYear}
                        onChange={(e) => handleChange('graduationYear', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <Button type="submit">Save Changes</Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>
                  Your work experience and professional details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentCompany">Current Company</Label>
                      <Input
                        id="currentCompany"
                        value={profileData.currentCompany}
                        onChange={(e) => handleChange('currentCompany', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPosition">Current Position</Label>
                      <Input
                        id="currentPosition"
                        value={profileData.currentPosition}
                        onChange={(e) => handleChange('currentPosition', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      value={profileData.skills.join(', ')}
                      onChange={(e) => handleChange('skills', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Separate skills with commas"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) => handleChange('github', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <Button type="submit">Save Changes</Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hire" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hire Freelancers</CardTitle>
                <CardDescription>
                  Find and hire talented students for your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search freelancers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="w-64">
                      <select
                        className="w-full h-10 px-3 border rounded-md"
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                      >
                        <option value="">All Expertise</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile Development</option>
                        <option value="design">Design</option>
                        <option value="writing">Content Writing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freelancers
                      .filter(f => 
                        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        f.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .filter(f => !selectedExpertise || f.expertise.includes(selectedExpertise))
                      .map(freelancer => (
                        <Card key={freelancer._id}>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={freelancer.profilePicture} />
                                <AvatarFallback>{freelancer.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{freelancer.name}</h3>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span>{freelancer.rating || 'New'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-gray-600">{freelancer.bio}</p>
                              <div className="flex flex-wrap gap-2">
                                {freelancer.expertise.map(exp => (
                                  <span key={exp} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {exp}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between text-sm">
                                <span>Hourly Rate:</span>
                                <span className="font-medium">₹{freelancer.hourlyRate}/hr</span>
                              </div>
                              
                              <Button
                                className="w-full"
                                onClick={() => {
                                  const projectDetails = prompt('Enter project details:');
                                  if (projectDetails) {
                                    handleHireSubmit(freelancer._id);
                                  }
                                }}
                              >
                                Hire Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Opportunities</CardTitle>
                    <CardDescription>
                      Post and manage your freelance opportunities
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Post New Opportunity</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Post New Opportunity</DialogTitle>
                        <DialogDescription>
                          Create a new opportunity for freelancers
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePostOpportunity} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newOpportunity.title}
                            onChange={(e) => setNewOpportunity(prev => ({
                              ...prev,
                              title: e.target.value
                            }))}
                            placeholder="e.g., Website Development Project"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newOpportunity.description}
                            onChange={(e) => setNewOpportunity(prev => ({
                              ...prev,
                              description: e.target.value
                            }))}
                            placeholder="Describe your project requirements..."
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget (₹)</Label>
                            <Input
                              id="budget"
                              type="number"
                              value={newOpportunity.budget}
                              onChange={(e) => setNewOpportunity(prev => ({
                                ...prev,
                                budget: parseFloat(e.target.value)
                              }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deadline">Deadline</Label>
                            <Input
                              id="deadline"
                              type="date"
                              value={newOpportunity.deadline}
                              onChange={(e) => setNewOpportunity(prev => ({
                                ...prev,
                                deadline: e.target.value
                              }))}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="skills">Required Skills</Label>
                          <Input
                            id="skills"
                            value={newOpportunity.skills.join(', ')}
                            onChange={(e) => setNewOpportunity(prev => ({
                              ...prev,
                              skills: e.target.value.split(',').map(s => s.trim())
                            }))}
                            placeholder="e.g., React, Node.js, UI/UX"
                          />
                        </div>
                        <Button type="submit">Post Opportunity</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map(opportunity => (
                    <Card key={opportunity._id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                            <p className="text-sm text-gray-500">
                              Posted on {new Date(opportunity.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-sm ${
                            opportunity.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {opportunity.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {opportunity.skills.map(skill => (
                            <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                          <span>Budget: ₹{opportunity.budget}</span>
                          <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Applications ({opportunity.applications.length})</h4>
                          {opportunity.applications.map(application => (
                            <div key={application._id} className="border rounded-lg p-4">
                              <div className="flex items-center gap-4 mb-2">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={application.freelancer.profilePicture} />
                                  <AvatarFallback>{application.freelancer.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{application.freelancer.name}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>₹{application.freelancer.hourlyRate}/hr</span>
                                    {application.freelancer.rating && (
                                      <span className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {application.freelancer.rating}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{application.message}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Proposed: ₹{application.proposedPrice}</span>
                                {application.status === 'pending' ? (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleApplicationResponse(opportunity._id, application._id, 'accepted')}
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-500 hover:text-red-600"
                                      onClick={() => handleApplicationResponse(opportunity._id, application._id, 'rejected')}
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                ) : (
                                  <span className={`text-sm ${
                                    application.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handlePasswordChange}>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={profileData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => handleChange('newPassword', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    />
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
