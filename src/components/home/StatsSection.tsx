
import { motion } from 'framer-motion';
import { Award, Building, Briefcase, Users } from 'lucide-react';

const stats = [
  { id: 1, name: 'Alumni Network', value: '50,000+', icon: Users },
  { id: 2, name: 'Partner Companies', value: '500+', icon: Building },
  { id: 3, name: 'Jobs Posted', value: '2,500+', icon: Briefcase },
  { id: 4, name: 'Success Stories', value: '1,000+', icon: Award },
];

export default function StatsSection() {
  return (
    <div className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Our growing alumni community
          </motion.h2>
        </div>
        
        <motion.div 
          className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="flex flex-col items-center text-center p-6 glass rounded-xl"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-4xl font-bold text-foreground">{stat.value}</h3>
              <p className="mt-2 text-base text-muted-foreground">{stat.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
