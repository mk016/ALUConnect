
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const words = ['Connect', 'Engage', 'Inspire', 'Give Back', 'Grow'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh z-0" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center lg:text-left space-y-6">
            <motion.div className="inline-block py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2" variants={itemVariants}>
              Alumni Association Platform
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
              variants={itemVariants}
            >
              Where graduates{' '}
              <div className="relative inline-block h-[1.15em] w-90 md:w-48 overflow-hidden">
                <motion.span
                  key={count}
                  className="absolute inset-0 text-primary"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {words[count]}
                </motion.span>
              </div>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Build meaningful connections, advance your career, and give back to your alma mater through our comprehensive alumni platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              variants={itemVariants}
            >
              <Button size="lg" className="px-6 font-medium w-full sm:w-auto" onClick={() => navigate('/register')}>
                Join the Network
              </Button>
              <Button size="lg" variant="outline" className="px-6 font-medium group w-full sm:w-auto" onClick={() => navigate('/directory')}>
                Browse Alumni <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="pt-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <span>Already a member? </span>
              <a href="#" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-2xl overflow-hidden glass">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary" />
              </div>
              
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 backdrop-blur-md rounded-full z-10 animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 backdrop-blur-md rounded-full z-10 animate-pulse-slow" style={{ animationDelay: "1s" }} />
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-full max-w-xs h-full max-h-xs p-6">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Alumni" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <span className="text-white font-medium">Class of 2023</span>
                      <p className="text-white/80 text-sm">Celebrating new graduates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
