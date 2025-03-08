import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Globe, MapPin, Users, ArrowRight } from "lucide-react";

const globalNetworks = [
  {
    name: "North America Network",
    members: 1250,
    location: "USA & Canada",
    description: "Connect with alumni across North America",
    activeGroups: 15
  },
  {
    name: "European Alumni",
    members: 850,
    location: "Europe",
    description: "Network with alumni in European countries",
    activeGroups: 12
  },
  {
    name: "Asia Pacific Connect",
    members: 1100,
    location: "Asia & Pacific",
    description: "Join the largest alumni network in Asia Pacific",
    activeGroups: 18
  },
  {
    name: "Global Tech Network",
    members: 2000,
    location: "Worldwide",
    description: "Technology professionals network across the globe",
    activeGroups: 25
  }
];

export default function Global() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Global Network</h1>
          <p className="text-muted-foreground mt-1">
            Connect with alumni from around the world
          </p>
        </div>
        <Button className="gap-2">
          <Globe className="h-4 w-4" />
          Find Network
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search global networks..." />
        </div>
        <Button variant="outline">Region Filter</Button>
      </div>

      <div className="grid gap-4">
        {globalNetworks.map((network, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{network.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{network.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{network.members} members</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{network.description}</p>
                  <p className="text-sm">
                    <span className="font-medium">{network.activeGroups}</span>
                    <span className="text-muted-foreground"> active groups</span>
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  Join Network
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 