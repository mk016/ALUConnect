import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, UserCircle2, GraduationCap, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import usersData from '@/data/users.json';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("alumni");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = usersData.users.find(u => u.email === formData.email);
    if (!user || user.password !== formData.password) {
      setError('Invalid email or password');
      return;
    }

    // Store user data in localStorage (in a real app, use proper session management)
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
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
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={`${userType === 'college' ? 'admin@college.edu' : 'your.email@example.com'}`}
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          value={formData.password}
                          onChange={(e) => handleChange('password', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
