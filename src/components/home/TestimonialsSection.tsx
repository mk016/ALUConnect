
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    content: "The alumni platform has been invaluable for my career growth. Through networking events, I found my current position and have been able to give back by mentoring recent graduates.",
    author: "Sarah Johnson",
    position: "Marketing Director, Class of 2010",
    image: "https://source.unsplash.com/random/200x200/?portrait,woman,professional"
  },
  {
    content: "After graduation, I was looking for ways to stay connected with my university. This platform has allowed me to maintain those bonds while also expanding my professional network significantly.",
    author: "Michael Chen",
    position: "Software Engineer, Class of 2015",
    image: "https://source.unsplash.com/random/200x200/?portrait,man,asian"
  },
  {
    content: "The job portal exclusively for alumni has been a game-changer. I've hired three alumni from my alma mater and they've been exceptional additions to our team.",
    author: "Priya Patel",
    position: "HR Manager, Class of 2008",
    image: "https://source.unsplash.com/random/200x200/?portrait,woman,indian"
  },
  {
    content: "The mentorship program connected me with industry leaders who provided guidance during a critical career transition. I'm now paying it forward by mentoring recent graduates myself.",
    author: "James Wilson",
    position: "Financial Analyst, Class of 2012",
    image: "https://source.unsplash.com/random/200x200/?portrait,man"
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      next();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [current, autoplay]);

  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            What our alumni say
          </motion.h2>
        </div>

        <div 
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="absolute top-8 left-8 text-primary/20 z-0">
            <Quote size={120} />
          </div>
          
          <div className="relative overflow-hidden rounded-2xl glass p-8 md:p-12 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mx-auto border-4 border-white/30"
                    loading="lazy"
                  />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <p className="text-lg md:text-xl italic text-foreground mb-6">"{testimonials[current].content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonials[current].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[current].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors focus:outline-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors focus:outline-none"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 flex space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'w-6 bg-primary' : 'bg-secondary'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
