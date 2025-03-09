import React, { useState, useEffect } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_ENDPOINTS } from '@/config/api';

interface FreelancerProfile {
  _id: string;
  name: string;
  level: string;
  rating: number;
  reviews: number;
  price: number;
  description: string;
  image: string;
  offerConsultation: boolean;
}

const categories = [
  { id: 'prog', icon: '💻', name: 'Programming & Tech' },
  { id: 'design', icon: '🎨', name: 'Graphics & Design' },
  { id: 'digital', icon: '📱', name: 'Digital Marketing' },
  { id: 'writing', icon: '✍️', name: 'Writing & Translation' },
  { id: 'video', icon: '🎥', name: 'Video & Animation' },
  { id: 'ai', icon: '🤖', name: 'AI Services' },
  { id: 'music', icon: '🎵', name: 'Music & Audio' },
  { id: 'business', icon: '💼', name: 'Business' },
  { id: 'consulting', icon: '👥', name: 'Consulting' },
];

function Freelancer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState<FreelancerProfile | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.GET_FREELANCERS, {
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

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         freelancer.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
                          freelancer.description.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleHire = async (freelancer: FreelancerProfile) => {
    if (!user) {
      alert('Please log in to hire freelancers');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.HIRE_FREELANCER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          freelancerId: freelancer._id,
          clientId: user._id,
          projectDetails: {
            title: 'New Project',
            description: 'Project details to be discussed',
            budget: freelancer.price
          }
        })
      });

      if (!response.ok) throw new Error('Failed to initiate hiring process');

      alert('Hiring request sent successfully! The freelancer will contact you soon.');
    } catch (error) {
      console.error('Error hiring freelancer:', error);
      alert('Failed to send hiring request');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-[#013914] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Find talented student freelancers
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for freelancers..."
                className="w-full h-12 pl-12 pr-4 rounded-lg text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex flex-col items-center justify-center p-6 h-32 hover:border-primary"
              onClick={() => setSelectedCategory(category.id === selectedCategory ? '' : category.id)}
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm text-center">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Freelancer Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <div key={freelancer._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${freelancer.name}`}
                    alt={freelancer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{freelancer.name}</h3>
                    <span className="text-sm text-gray-500">{freelancer.level}</span>
                  </div>
                </div>
                <p className="text-sm mb-2 line-clamp-2">{freelancer.description}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {freelancer.rating.toFixed(1)}
                  <span className="text-gray-500">({freelancer.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">From ₹{freelancer.price}</span>
                  {freelancer.offerConsultation && (
                    <span className="text-xs text-gray-500">📹 Offers consultation</span>
                  )}
                </div>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => setSelectedFreelancer(freelancer)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Freelancer Details</DialogTitle>
                        <DialogDescription>
                          Review the freelancer's details and services
                        </DialogDescription>
                      </DialogHeader>
                      {selectedFreelancer && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedFreelancer.name}`}
                              alt={selectedFreelancer.name}
                              className="w-16 h-16 rounded-full"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">{selectedFreelancer.name}</h3>
                              <p className="text-sm text-gray-500">{selectedFreelancer.level}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">About</h4>
                            <p className="text-sm text-gray-600">{selectedFreelancer.description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-medium">Rating</h4>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {selectedFreelancer.rating.toFixed(1)}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Reviews</h4>
                              <p>{selectedFreelancer.reviews}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Starting Price</h4>
                              <p>₹{selectedFreelancer.price}</p>
                            </div>
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => handleHire(selectedFreelancer)}
                          >
                            Hire Now
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Freelancer;
