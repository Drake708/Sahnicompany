import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Lock, Eye, FileText, Bell, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number)',
        'Financial information necessary for providing chartered accountancy services',
        'Business information including GST numbers, PAN details, and tax records',
        'Communication records and service interaction data',
        'Technical information such as IP addresses and browser information'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'Providing chartered accountancy and financial advisory services',
        'Processing tax returns, compliance filings, and audit requirements',
        'Communicating with clients regarding services and updates',
        'Maintaining records as required by professional standards',
        'Improving our services and developing new offerings'
      ]
    },
    {
      icon: Shield,
      title: 'Information Protection',
      content: [
        'Advanced encryption for all sensitive financial data',
        'Secure servers with regular security updates and monitoring',
        'Access controls limiting information to authorized personnel only',
        'Regular backup procedures with encrypted storage',
        'Compliance with industry-standard security protocols'
      ]
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent personal information to third parties',
        'Information may be shared with regulatory authorities as legally required',
        'Trusted service providers may access limited information under strict confidentiality',
        'Client information is shared only with explicit consent',
        'Anonymous, aggregated data may be used for research and development'
      ]
    },
    {
      icon: FileText,
      title: 'Data Retention',
      content: [
        'Client records maintained as per statutory requirements (minimum 8 years)',
        'Financial documents retained according to tax law obligations',
        'Communication records kept for service quality and legal purposes',
        'Right to request data deletion subject to legal and professional obligations',
        'Regular review and purging of unnecessary information'
      ]
    },
    {
      icon: Bell,
      title: 'Your Rights',
      content: [
        'Right to access your personal information we hold',
        'Right to request correction of inaccurate information',
        'Right to request deletion of information (subject to legal requirements)',
        'Right to withdraw consent for non-essential processing',
        'Right to file complaints with relevant data protection authorities'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black border border-[#628ca2]/30 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-[#628ca2]/20 p-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-wider mb-2">PRIVACY POLICY</h1>
            <p className="text-white/60 font-light">Sahni & Co. - Data Protection & Privacy</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="bg-[#628ca2]/10 border-[#628ca2]/20">
              <CardContent className="p-8">
                <h2 className="text-xl font-light text-[#628ca2] mb-4 tracking-wider">OUR COMMITMENT TO PRIVACY</h2>
                <div className="space-y-4 text-white/70 font-light leading-relaxed">
                  <p>
                    At Sahni & Co., we understand the critical importance of protecting your personal and financial 
                    information. As chartered accountants, we handle sensitive data and are committed to maintaining 
                    the highest standards of confidentiality and data protection.
                  </p>
                  <p>
                    This privacy policy outlines how we collect, use, protect, and manage your information in 
                    compliance with applicable data protection laws and professional standards governing chartered 
                    accountancy practices.
                  </p>
                  <p className="text-sm text-white/50">
                    <strong>Last Updated:</strong> January 2024 | <strong>Effective Date:</strong> January 1, 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Policy Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 border border-[#628ca2]/30 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-[#628ca2]" />
                        </div>
                        <CardTitle className="text-lg font-light text-white tracking-wider">
                          {section.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-white/70 font-light text-sm leading-relaxed">
                            <span className="w-2 h-2 bg-[#628ca2] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="bg-black/50 border-[#628ca2]/20">
              <CardHeader>
                <CardTitle className="text-xl font-light text-[#628ca2] tracking-wider">
                  CONTACT US REGARDING PRIVACY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-light mb-4">Privacy Officer</h4>
                    <div className="space-y-2 text-white/70 font-light text-sm">
                      <p>CA Dinkar Sahni</p>
                      <p>Email: privacy@sahniandco.com</p>
                      <p>Phone: +91 98765 43210</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-light mb-4">Data Protection Queries</h4>
                    <div className="space-y-2 text-white/70 font-light text-sm">
                      <p>For data access requests, corrections, or deletions</p>
                      <p>Response time: Within 30 days</p>
                      <p>Available during business hours: Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-center"
          >
            <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-6 rounded-lg">
              <p className="text-white/70 font-light text-sm leading-relaxed mb-4">
                By using our services, you acknowledge that you have read, understood, and agree to 
                this privacy policy. We may update this policy periodically, and we will notify you 
                of any significant changes.
              </p>
              <Button
                onClick={onClose}
                className="bg-[#628ca2] text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-500"
              >
                I UNDERSTAND
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}