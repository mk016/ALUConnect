import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { API_ENDPOINTS } from '@/config/api';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  graduationYear: string;
  major: string;
  interests: string[];
  skills: string[];
  github: string;
  linkedin: string;
  profilePicture: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  freelancerProfile?: {
    hourlyRate: number;
    expertise: string[];
    services: Array<{
      title: string;
      description: string;
      price: number;
      deliveryTime: number;
    }>;
    portfolio: Array<{
      title: string;
      description: string;
      image?: string;
      link?: string;
    }>;
    availability: boolean;
  };
}

interface Notification {
  _id: string;
  type: string;
  message: string;
  projectDetails?: {
    title: string;
    description: string;
    budget: number;
    deadline: string;
  };
  from: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  read: boolean;
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
  postedBy: {
    _id: string;
    name: string;
    profilePicture: string;
    currentCompany: string;
  };
}

export default function StudentDashboard() {
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
    interests: [],
    skills: [],
    github: '',
    linkedin: '',
    profilePicture: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    freelancerProfile: {
      hourlyRate: 0,
      expertise: [],
      services: [],
      portfolio: [],
      availability: false
    }
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applicationDetails, setApplicationDetails] = useState({
    message: '',
    proposedPrice: 0
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
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINTS.GET_NOTIFICATIONS}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch notifications');
        
        const data = await response.json();
        setNotifications(data);
        setUnreadCount(data.filter((n: Notification) => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    // Set up polling for new notifications
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.GET_OPPORTUNITIES, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch opportunities');
        
        const data = await response.json();
        setOpportunities(data.filter((opp: Opportunity) => opp.status === 'open'));
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  const handleChange = (field: keyof ProfileData, value: string) => {
    if (field === 'interests' || field === 'skills') {
      setProfileData(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim())
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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

  const handleFreelancerProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.UPDATE_PROFILE}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profileData,
          userType: 'freelancer'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update freelancer profile');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      alert('Freelancer profile updated successfully!');
    } catch (error) {
      console.error('Error updating freelancer profile:', error);
      alert('Failed to update freelancer profile');
    }
  };

  const addService = () => {
    setProfileData(prev => ({
      ...prev,
      freelancerProfile: {
        ...prev.freelancerProfile!,
        services: [
          ...(prev.freelancerProfile?.services || []),
          { title: '', description: '', price: 0, deliveryTime: 1 }
        ]
      }
    }));
  };

  const updateService = (index: number, field: string, value: string | number) => {
    setProfileData(prev => {
      const services = [...(prev.freelancerProfile?.services || [])];
      services[index] = { ...services[index], [field]: value };
      return {
        ...prev,
        freelancerProfile: {
          ...prev.freelancerProfile!,
          services
        }
      };
    });
  };

  const removeService = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      freelancerProfile: {
        ...prev.freelancerProfile!,
        services: prev.freelancerProfile?.services.filter((_, i) => i !== index) || []
      }
    }));
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_ENDPOINTS.GET_NOTIFICATIONS}/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNotifications(prev => 
        prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleApplyToOpportunity = async (opportunityId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.APPLY_TO_OPPORTUNITY}/${opportunityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: applicationDetails.message,
          proposedPrice: applicationDetails.proposedPrice
        })
      });

      if (!response.ok) throw new Error('Failed to apply to opportunity');

      alert('Application submitted successfully!');
      setApplicationDetails({
        message: '',
        proposedPrice: 0
      });
    } catch (error) {
      console.error('Error applying to opportunity:', error);
      alert('Failed to submit application');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Student Profile</h2>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <DropdownMenuItem>No notifications</DropdownMenuItem>
                ) : (
                  notifications.map(notification => (
                    <DropdownMenuItem
                      key={notification._id}
                      className={`p-4 ${!notification.read ? 'bg-gray-50' : ''}`}
                      onClick={() => markAsRead(notification._id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.from.profilePicture} />
                          <AvatarFallback>{notification.from.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.from.name}
                          </p>
                          <p className="text-sm text-gray-500">{notification.message}</p>
                          {notification.projectDetails && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs">
                              <p className="font-medium">{notification.projectDetails.title}</p>
                              <p className="text-gray-500">{notification.projectDetails.description}</p>
                              <div className="flex justify-between mt-1">
                                <span>Budget: ₹{notification.projectDetails.budget}</span>
                                <span>Deadline: {new Date(notification.projectDetails.deadline).toLocaleDateString()}</span>
                              </div>
                            </div>
                          )}
                          <p className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="freelancer">Freelancer Profile</TabsTrigger>
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
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={profileData.major}
                        onChange={(e) => handleChange('major', e.target.value)}
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

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>
                  Your academic details and interests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        value={profileData.graduationYear}
                        onChange={(e) => handleChange('graduationYear', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major/Program</Label>
                      <Input
                        id="major"
                        value={profileData.major}
                        onChange={(e) => handleChange('major', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Input
                      id="interests"
                      value={profileData.interests.join(', ')}
                      onChange={(e) => handleChange('interests', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Separate interests with commas"
                    />
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

          <TabsContent value="freelancer" className="space-y-4">
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="opportunities">Available Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Freelancer Profile</CardTitle>
                    <CardDescription>
                      Set up your freelancer profile to start offering services.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleFreelancerProfileSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={profileData.freelancerProfile?.hourlyRate || ''}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            freelancerProfile: {
                              ...prev.freelancerProfile!,
                              hourlyRate: parseFloat(e.target.value)
                            }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertise">Areas of Expertise</Label>
                        <Input
                          id="expertise"
                          value={profileData.freelancerProfile?.expertise?.join(', ') || ''}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            freelancerProfile: {
                              ...prev.freelancerProfile!,
                              expertise: e.target.value.split(',').map(item => item.trim())
                            }
                          }))}
                          disabled={!isEditing}
                          placeholder="e.g., Web Development, Graphic Design, Content Writing"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Services Offered</Label>
                          {isEditing && (
                            <Button type="button" variant="outline" onClick={addService}>
                              Add Service
                            </Button>
                          )}
                        </div>
                        
                        {profileData.freelancerProfile?.services?.map((service, index) => (
                          <Card key={index}>
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 space-y-2">
                                    <Label>Service Title</Label>
                                    <Input
                                      value={service.title}
                                      onChange={(e) => updateService(index, 'title', e.target.value)}
                                      disabled={!isEditing}
                                      placeholder="e.g., Website Development"
                                    />
                                  </div>
                                  {isEditing && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => removeService(index)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    value={service.description}
                                    onChange={(e) => updateService(index, 'description', e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Describe your service..."
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Price (₹)</Label>
                                    <Input
                                      type="number"
                                      value={service.price}
                                      onChange={(e) => updateService(index, 'price', parseFloat(e.target.value))}
                                      disabled={!isEditing}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Delivery Time (days)</Label>
                                    <Input
                                      type="number"
                                      value={service.deliveryTime}
                                      onChange={(e) => updateService(index, 'deliveryTime', parseInt(e.target.value))}
                                      disabled={!isEditing}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="availability"
                            checked={profileData.freelancerProfile?.availability}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              freelancerProfile: {
                                ...prev.freelancerProfile!,
                                availability: e.target.checked
                              }
                            }))}
                            disabled={!isEditing}
                          />
                          <Label htmlFor="availability">Available for hire</Label>
                        </div>
                      </div>

                      {isEditing && (
                        <Button type="submit">Save Freelancer Profile</Button>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Opportunities</CardTitle>
                    <CardDescription>
                      Browse and apply for freelance opportunities posted by alumni
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {opportunities.map(opportunity => (
                        <Card key={opportunity._id}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={opportunity.postedBy.profilePicture} />
                                    <AvatarFallback>{opportunity.postedBy.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span>{opportunity.postedBy.name}</span>
                                  <span>•</span>
                                  <span>{opportunity.postedBy.currentCompany}</span>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                Posted {new Date(opportunity.createdAt).toLocaleDateString()}
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

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full">Apply Now</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Apply for Opportunity</DialogTitle>
                                  <DialogDescription>
                                    Submit your proposal for "{opportunity.title}"
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  handleApplyToOpportunity(opportunity._id);
                                }} className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Cover Message</Label>
                                    <Textarea
                                      id="message"
                                      value={applicationDetails.message}
                                      onChange={(e) => setApplicationDetails(prev => ({
                                        ...prev,
                                        message: e.target.value
                                      }))}
                                      placeholder="Explain why you're a good fit for this opportunity..."
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="proposedPrice">Your Price (₹)</Label>
                                    <Input
                                      id="proposedPrice"
                                      type="number"
                                      value={applicationDetails.proposedPrice}
                                      onChange={(e) => setApplicationDetails(prev => ({
                                        ...prev,
                                        proposedPrice: parseFloat(e.target.value)
                                      }))}
                                      required
                                    />
                                  </div>
                                  <Button type="submit">Submit Application</Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
