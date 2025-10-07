import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, TrendingUp, Shield, Briefcase, GraduationCap, Clock, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function AboutPage() {
  const stats = [
    { icon: Award, label: 'Professional Standards', value: '100%' },
    { icon: Shield, label: 'Data Security', value: 'Advanced' },
    { icon: Target, label: 'Client Focus', value: 'Dedicated' },
    { icon: TrendingUp, label: 'Technology Integration', value: 'Modern' }
  ];

  const expertise = [
    {
      icon: Briefcase,
      title: 'Taxation Services',
      description: 'Comprehensive tax planning, filing, and advisory services for individuals and businesses.'
    },
    {
      icon: Shield,
      title: 'Audit & Assurance',
      description: 'Professional audit services ensuring compliance and financial accuracy.'
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisory',
      description: 'Strategic financial planning and advisory services for business growth.'
    },
    {
      icon: Award,
      title: 'Compliance Management',
      description: 'Complete regulatory compliance management across all business verticals.'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#628ca2]/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 border border-[#628ca2]/30 mx-auto mb-8 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: '#628ca2' }}
            >
              <Award className="w-10 h-10 text-[#628ca2]" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-tight">
              ABOUT <span className="text-[#628ca2]">SAHNI & CO.</span>
            </h1>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl font-light text-white/70 max-w-4xl mx-auto leading-relaxed">
              An emerging chartered accountancy firm committed to delivering exceptional financial services 
              with fresh perspectives and innovative technological solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 text-center hover:border-[#628ca2]/40 transition-all duration-500">
                    <CardContent className="p-8">
                      <IconComponent className="w-12 h-12 text-[#628ca2] mx-auto mb-4" />
                      <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
                      <div className="text-white/60 font-light text-sm tracking-wider">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
                PROFESSIONAL <span className="text-[#628ca2]">EXCELLENCE</span>
              </h2>
              <motion.div
                className="w-24 h-px bg-[#628ca2] mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p className="text-lg">
                  Sahni & Co. is an emerging chartered accountancy firm dedicated to delivering 
                  professional excellence through modern methodologies and client-centric approaches 
                  in the evolving financial landscape.
                </p>
                <p>
                  Our firm specializes in comprehensive financial services including taxation, 
                  audit and assurance, financial advisory, and regulatory compliance. We integrate 
                  contemporary accounting practices with advanced technology to deliver efficient, 
                  accurate, and innovative solutions.
                </p>
                <p>
                  We are committed to serving clients across various industries and business scales, 
                  from individual taxpayers to growing enterprises, ensuring complete regulatory 
                  compliance while enabling financial optimization and sustainable business growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-[#628ca2] mb-4 tracking-wider">OUR MISSION</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    To provide comprehensive, technology-driven chartered accountancy services that 
                    ensure regulatory compliance, optimize financial performance, and support sustainable 
                    business growth for our diverse clientele.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-[#628ca2] mb-4 tracking-wider">OUR VISION</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    To be the leading chartered accountancy firm recognized for professional excellence, 
                    innovative solutions, and unwavering commitment to client success in the evolving 
                    financial landscape.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 border-t border-[#628ca2]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              PROFESSIONAL <span className="text-[#628ca2]">LEADERSHIP</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-lg font-light text-white/60">
              Led by experienced chartered accountant dedicated to excellence and client success
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
              <CardContent className="p-12 text-center">
                <motion.div
                  className="w-32 h-32 border border-[#628ca2]/30 mx-auto mb-8 flex items-center justify-center"
                  whileHover={{ scale: 1.05, borderColor: '#628ca2' }}
                >
                  <GraduationCap className="w-16 h-16 text-[#628ca2]" />
                </motion.div>
                
                <h3 className="text-3xl font-light mb-4 tracking-wider">CA DINKAR SAHNI</h3>
                <p className="text-[#628ca2] text-lg font-light mb-6 tracking-wider">PROPRIETOR & CHARTERED ACCOUNTANT</p>
                
                <div className="space-y-6 text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
                  <p>
                    CA Dinkar Sahni, the proprietor and principal chartered accountant of Sahni & Co., 
                    is a dedicated professional committed to excellence in financial services, taxation, 
                    and business advisory solutions.
                  </p>
                  <p>
                    With comprehensive knowledge of regulatory frameworks and modern business dynamics, 
                    CA Dinkar is positioned to guide businesses through evolving financial challenges, 
                    ensuring compliance while identifying growth opportunities.
                  </p>
                  <p>
                    His academic foundation and professional training encompass diverse industry 
                    applications, with focused expertise in contemporary taxation practices, audit 
                    methodologies, financial analysis, and strategic business planning.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <div className="text-center p-6 border border-[#628ca2]/20">
                    <div className="text-2xl font-light text-[#628ca2] mb-2">FRESH PERSPECTIVE</div>
                    <div className="text-white/60 text-sm font-light tracking-wider">Modern methodologies and innovative approaches to traditional accounting</div>
                  </div>
                  <div className="text-center p-6 border border-[#628ca2]/20">
                    <div className="text-2xl font-light text-[#628ca2] mb-2">DEDICATED SERVICE</div>
                    <div className="text-white/60 text-sm font-light tracking-wider">Client-focused solutions with personalized attention to every case</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 border-t border-[#628ca2]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              CORE <span className="text-[#628ca2]">EXPERTISE</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 border border-[#628ca2]/30 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-[#628ca2]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-light mb-4 text-white tracking-wider">{item.title}</h3>
                          <p className="text-white/70 font-light leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t border-[#628ca2]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              OUR <span className="text-[#628ca2]">VALUES</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'INTEGRITY', description: 'Unwavering commitment to ethical practices and transparency' },
              { title: 'EXCELLENCE', description: 'Continuous pursuit of highest professional standards' },
              { title: 'INNOVATION', description: 'Embracing technology for efficient service delivery' },
              { title: 'PARTNERSHIP', description: 'Building long-term relationships with our clients' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-black/50 border-[#628ca2]/20 h-full text-center hover:border-[#628ca2]/40 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 border border-[#628ca2]/30 mx-auto mb-6 flex items-center justify-center">
                      <span className="w-3 h-3 bg-[#628ca2] rounded-full"></span>
                    </div>
                    <h3 className="text-lg font-light mb-4 text-[#628ca2] tracking-wider">{value.title}</h3>
                    <p className="text-white/70 font-light leading-relaxed text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}