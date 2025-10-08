import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      number: "01",
      title: "TAXATION SERVICES",
      description: "Comprehensive tax planning, preparation, and compliance solutions for individuals and businesses.",
      features: ["Income Tax Planning", "GST Compliance", "Tax Advisory", "Return Filing"]
    },
    {
      number: "02", 
      title: "AUDIT & ASSURANCE",
      description: "Professional audit services ensuring transparency, compliance, and financial integrity.",
      features: ["Statutory Audit", "Internal Audit", "Tax Audit", "Risk Assessment"]
    },
    {
      number: "03",
      title: "FINANCIAL ADVISORY", 
      description: "Strategic financial planning and advisory services for sustainable business growth.",
      features: ["Investment Planning", "Risk Management", "Cash Flow Analysis", "Growth Strategy"]
    },
    {
      number: "04",
      title: "DIGITAL SOLUTIONS",
      description: "AI-powered tools and digital platforms for modern financial management.",
      features: ["TaxMate AI", "Client Portal", "Calculators", "Knowledge Base"]
    }
  ];

  const stats = [
    { number: "24/7", label: "SUPPORT AVAILABLE", desc: "Round-the-clock assistance" },
    { number: "100%", label: "COMPLIANCE FOCUSED", desc: "Regulatory adherence" },
    { number: "AI", label: "POWERED SOLUTIONS", desc: "Technology integration" },
    { number: "∞", label: "POSSIBILITIES", desc: "Unlimited potential" }
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-1 h-1 bg-[#628ca2]/20 rounded-full pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.2, 0.8, 0.2],
      x: [0, Math.random() * 50 - 25],
      y: [0, Math.random() * 50 - 25],
    }}
    transition={{
      duration: 4 + Math.random() * 4,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
))}

      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-start relative overflow-hidden pt-20">
        {/* Dynamic Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-5 pointer-events-none"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(98, 140, 162, 0.1) 0%, transparent 50%)`
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Geometric Patterns */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 border border-[#628ca2]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-64 h-64 border border-[#628ca2]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/2 w-32 h-32 bg-[#628ca2]/10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] mb-12 tracking-tight"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              >
                SAHNI
                <br />
                <span className="text-[#628ca2]">&</span> CO.
              </motion.h1>
              
              <motion.div
                className="w-24 h-px bg-[#628ca2] mb-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              
              <motion.p 
                className="text-xl md:text-2xl font-light leading-relaxed mb-4 tracking-wide max-w-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                CHARTERED ACCOUNTANCY SERVICES
              </motion.p>

              <motion.p 
                className="text-lg font-light text-white/70 mb-16 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Professional financial services powered by advanced technology, 
                delivering precision and excellence in every engagement.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onNavigate('services')}
                    className="bg-[#628ca2] text-white px-12 py-4 text-lg font-light tracking-wider hover:bg-white hover:text-black transition-all duration-700 group"
                  >
                    EXPLORE SERVICES
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onNavigate('taxmate')}
                    variant="outline"
                    className="border-white/30 text-white bg-transparent px-12 py-4 text-lg font-light tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-700"
                  >
                    TAXMATE AI
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-[#628ca2]/60" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 border-t border-[#628ca2]/10 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              OUR <span className="text-[#628ca2]">EXPERTISE</span>
            </h2>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            />
            <p className="text-xl font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
              Comprehensive financial services designed for the modern business landscape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => onNavigate(service.title.includes('DIGITAL') ? 'taxmate' : 'services')}
              >
                <div className="border border-[#628ca2]/20 p-12 h-full hover:border-[#628ca2]/60 transition-all duration-700 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[#628ca2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    initial={false}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <span className="text-6xl font-light text-[#628ca2]/40 tracking-wider mr-6">
                        {service.number}
                      </span>
                      <div className="w-16 h-px bg-[#628ca2] group-hover:w-24 transition-all duration-500"></div>
                    </div>
                    
                    <h3 className="text-2xl font-light tracking-wide mb-6 group-hover:text-[#628ca2] transition-colors duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed mb-8 font-light">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center text-sm text-white/50 group-hover:text-white/70 transition-colors duration-500"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1 h-1 bg-[#628ca2] rounded-full mr-3"></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 border-t border-[#628ca2]/10 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div 
                  className="text-6xl md:text-7xl font-light text-[#628ca2] mb-6 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-lg font-light tracking-wider mb-3 group-hover:text-[#628ca2] transition-colors duration-500">
                  {stat.label}
                </h3>
                <p className="text-white/50 text-sm font-light">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Tools Showcase */}
      <section className="py-32 border-t border-[#628ca2]/10 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              DIGITAL <span className="text-[#628ca2]">INNOVATION</span>
            </h2>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "TAXMATE AI",
                desc: "AI-powered tax assistance for instant queries and calculations",
                action: () => onNavigate('taxmate')
              },
              {
                title: "CALCULATORS",
                desc: "Advanced financial calculators for tax and investment planning",
                action: () => onNavigate('calculators')
              },
              {
                title: "CLIENT PORTAL",
                desc: "Secure access to documents and real-time account information",
                action: () => onNavigate('login')
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="border border-[#628ca2]/20 p-10 text-center cursor-pointer group hover:border-[#628ca2]/60 transition-all duration-700"
                onClick={tool.action}
              >
                <motion.div
                  className="w-20 h-20 border border-[#628ca2]/40 mx-auto mb-8 flex items-center justify-center group-hover:border-[#628ca2] transition-colors duration-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <span className="text-2xl font-light text-[#628ca2] tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>
                
                <h3 className="text-xl font-light tracking-wide mb-6 group-hover:text-[#628ca2] transition-colors duration-500">
                  {tool.title}
                </h3>
                
                <p className="text-white/70 font-light leading-relaxed mb-8">
                  {tool.desc}
                </p>
                
                <motion.div
                  className="inline-flex items-center text-[#628ca2] group-hover:translate-x-2 transition-transform duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-light tracking-wider mr-2">EXPLORE</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-[#628ca2]/10">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12 leading-tight">
              READY TO <span className="text-[#628ca2]">ELEVATE</span>
              <br />
              YOUR FINANCES?
            </h2>
            
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-12"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            
            <p className="text-xl font-light text-white/60 mb-16 leading-relaxed max-w-3xl mx-auto">
              Connect with our team of professionals and discover how we can optimize 
              your financial operations with precision and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#628ca2] text-white px-16 py-4 text-lg font-light tracking-wider hover:bg-white hover:text-black transition-all duration-700 group"
                >
                  GET IN TOUCH
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  className="border-white/30 text-white bg-transparent px-16 py-4 text-lg font-light tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-700"
                >
                  CLIENT PORTAL
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}