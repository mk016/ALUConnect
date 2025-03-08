
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar, Heart, Network, GraduationCap } from 'lucide-react';

const features = [
  {
    name: 'Alumni Directory',
    description: 'Connect with fellow graduates based on year, field, location or interests.',
    icon: Users,
  },
  {
    name: 'Networking Hub',
    description: 'Join interest groups, engage in discussions, and build meaningful connections.',
    icon: Network,
  },
  {
    name: 'Job Portal ',
    description: 'Find opportunities, post openings, and advance your career with alumni support.',
    icon: Briefcase,
  },
  {
    name: 'Events & Reunions',
    description: 'Stay updated on reunions, networking events, and professional seminars.',
    icon: Calendar,
  },
  {
    name: 'Mentorship Program',
    description: 'Give and receive guidance through our structured mentorship initiatives.',
    icon: GraduationCap,
  },
  {
    name: 'Giving Back',
    description: 'Support your alma mater through donations, scholarships, and volunteering.',
    icon: Heart,
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Everything you need to stay connected
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our platform offers comprehensive tools and resources for alumni to network, grow professionally, and give back to their alma mater.
          </motion.p>
        </div>
        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div 
                key={feature.name} 
                className="relative p-6 rounded-2xl glass group hover:shadow-md transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base leading-7 text-muted-foreground">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
