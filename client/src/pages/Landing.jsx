// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import Globe3D from '../components/Globe3D'; // Make sure this component exists
import FloatingOrb from '../components/FloatingOrb';
import { Plane, Sparkles, Map, Armchair } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Parallax for hero section
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Real-Time Pricing',
      description: 'AI-powered dynamic pricing with live market updates and predictive fare analytics.',
      color: '#2563EB',
      delay: 0.2,
    },
    {
      icon: <Armchair className="w-8 h-8" />,
      title: '3D Seat Map',
      description: 'Interactive cabin visualization with real-time availability and comfort ratings.',
      color: '#FACC15',
      delay: 0.4,
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: 'AI Route Recommender',
      description: 'Smart suggestions based on weather, connections, and your travel preferences.',
      color: '#2563EB',
      delay: 0.6,
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Floating Orbs */}
      <FloatingOrb size={300} color="#2563EB" delay={0} top="10%" left="5%" />
      <FloatingOrb size={250} color="#FACC15" delay={2} top="60%" right="10%" />
      <FloatingOrb size={200} color="#2563EB" delay={4} bottom="10%" left="20%" />

      {/* Hero Section */}
      <motion.section
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20"
      >
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{
                  textShadow: [
                    '0 0 20px rgba(37, 99, 235, 0.5)',
                    '0 0 40px rgba(37, 99, 235, 0.8)',
                    '0 0 20px rgba(37, 99, 235, 0.5)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-4"
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                  Book your flight
                  <br />
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#FACC15] bg-clip-text text-transparent">
                    the modern way.
                  </span>
                </h1>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-lg mx-auto lg:mx-0"
            >
              Real-time. Transparent. Effortless.
              <br />
              Experience the future of flight booking with AI-powered intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <GradientButton onClick={() => navigate('/search')} variant="primary">
                Start Booking
              </GradientButton>
              <GradientButton onClick={() => { /* Add scroll logic or path */ }} variant="ghost">
                Explore Features
              </GradientButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-8 justify-center lg:justify-start pt-8"
            >
              {[
                { value: '500K+', label: 'Flights Booked' },
                { value: '150+', label: 'Airlines' },
                { value: '4.9/5', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <Globe3D />
            
            {/* Floating particles around globe */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute w-2 h-2 rounded-full bg-[#FACC15]"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  boxShadow: '0 0 10px rgba(250, 204, 21, 0.6)',
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powered by{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Next-generation features designed for the modern traveler
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <GlassCard
                key={feature.title}
                delay={feature.delay}
                glow={true}
                glowColor={feature.color}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 border border-white/10"
                  style={{
                    boxShadow: `0 0 30px ${feature.color}33`,
                  }}
                >
                  <div style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="h-[2px] mt-6 rounded-full"
                  style={{ backgroundColor: feature.color }}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard glow={true} glowColor="#2563EB" className="p-12">
              <Plane className="w-16 h-16 mx-auto mb-6 text-[#2563EB]" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to take off?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of travelers who've discovered a better way to fly.
              </p>
              <GradientButton onClick={() => navigate('/search')} variant="primary">
                Search Flights Now
              </GradientButton>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}