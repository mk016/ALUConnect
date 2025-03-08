import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';

interface FreelancerCard {
  id: string;
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
const freelancers: FreelancerCard[] = [
  {
    id: '1',
    name: 'John Doe',
    level: 'Level 2',
    rating: 5.0,
    reviews: 249,
    price: 6712,
    description: 'I will do website development, develop custom website as full stack web developer',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    level: 'Top Rated',
    rating: 4.9,
    reviews: 150,
    price: 5000,
    description: 'I will design modern and responsive websites',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    level: 'Level 1',
    rating: 4.8,
    reviews: 100,
    price: 3000,
    description: 'I will create stunning graphic designs',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '4',
    name: 'Bob Brown',
    level: 'Level 2',
    rating: 4.7,
    reviews: 200,
    price: 4500,
    description: 'I will provide digital marketing services',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '5',
    name: 'Charlie Davis',
    level: 'Top Rated',
    rating: 5.0,
    reviews: 300,
    price: 7000,
    description: 'I will write and translate content',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '6',
    name: 'Diana Evans',
    level: 'Level 1',
    rating: 4.6,
    reviews: 80,
    price: 2500,
    description: 'I will create engaging video animations',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '7',
    name: 'Ethan Foster',
    level: 'Level 2',
    rating: 4.9,
    reviews: 220,
    price: 6000,
    description: 'I will provide AI services and solutions',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '8',
    name: 'Fiona Green',
    level: 'Top Rated',
    rating: 5.0,
    reviews: 180,
    price: 5500,
    description: 'I will produce high-quality music and audio',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '9',
    name: 'George Harris',
    level: 'Level 1',
    rating: 4.7,
    reviews: 90,
    price: 3200,
    description: 'I will offer business consulting services',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '10',
    name: 'Hannah Irving',
    level: 'Level 2',
    rating: 4.8,
    reviews: 160,
    price: 4800,
    description: 'I will provide expert consulting services',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '11',
    name: 'Ian Jackson',
    level: 'Top Rated',
    rating: 5.0,
    reviews: 210,
    price: 6200,
    description: 'I will develop mobile applications',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '12',
    name: 'Julia King',
    level: 'Level 1',
    rating: 4.6,
    reviews: 70,
    price: 2700,
    description: 'I will create social media marketing campaigns',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '13',
    name: 'Kevin Lewis',
    level: 'Level 2',
    rating: 4.9,
    reviews: 190,
    price: 5300,
    description: 'I will design logos and branding materials',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '14',
    name: 'Laura Martinez',
    level: 'Top Rated',
    rating: 5.0,
    reviews: 240,
    price: 6800,
    description: 'I will provide SEO services',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
  {
    id: '15',
    name: 'Michael Nelson',
    level: 'Level 1',
    rating: 4.7,
    reviews: 110,
    price: 3500,
    description: 'I will create content for blogs and websites',
    image: 'https://placehold.co/400x300',
    offerConsultation: true,
  },
  {
    id: '16',
    name: 'Nina Owens',
    level: 'Level 2',
    rating: 4.8,
    reviews: 130,
    price: 4000,
    description: 'I will provide virtual assistant services',
    image: 'https://placehold.co/400x300',
    offerConsultation: false,
  },
];

function Freelancer() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-[#013914] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Scale your professional workforce with freelancers
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for any service..."
                className="w-full h-12 pl-12 pr-4 rounded-lg text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="text-sm opacity-70">Trusted by:</span>
              {['Meta', 'Google', 'Netflix', 'P&G', 'PayPal', 'Payoneer'].map((company) => (
                <span key={company} className="text-sm opacity-70">
                  {company}
                </span>
              ))}
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
              variant="outline"
              className="flex flex-col items-center justify-center p-6 h-32 hover:border-primary"
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
          {freelancers.map((freelancer) => (
            <div key={freelancer.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="outline"
                  className="absolute top-4 right-4 rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white"
                >
                  ❤️
                </Button>
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
                  ⭐ {freelancer.rating.toFixed(1)}
                  <span className="text-gray-500">({freelancer.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">From ₹{freelancer.price}</span>
                  {freelancer.offerConsultation && (
                    <span className="text-xs text-gray-500">📹 Offers consultation</span>
                  )}
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
