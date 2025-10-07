import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { emailService } from './EmailService';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    subject: '',
    message: '',
    serviceType: '',
    preferredContact: '',
    urgency: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@sahniandco.com',
      subtitle: 'Professional inquiries and consultations'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 98765 43210',
      subtitle: 'Business hours consultation'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Professional Services Center',
      subtitle: 'By appointment only'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      subtitle: 'Saturday: 10:00 AM - 2:00 PM'
    }
  ];

  const services = [
    'Tax Planning & Filing',
    'GST Registration & Compliance',
    'Audit & Assurance Services',
    'Financial Advisory',
    'Corporate Services',
    'Business Registration',
    'TaxMate AI Support',
    'Other Services'
  ];

  const businessTypes = [
    'Individual/Proprietorship',
    'Partnership Firm',
    'Private Limited Company',
    'Public Limited Company',
    'LLP',
    'Trust/Society/NGO',
    'Other'
  ];

  const urgencyLevels = [
    'Immediate (Within 24 hours)',
    'High (2-3 days)',
    'Medium (1 week)',
    'Low (Flexible timing)'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Required field validations
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.preferredContact) newErrors.preferredContact = 'Preferred contact method is required';
    if (!formData.urgency) newErrors.urgency = 'Urgency level is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{9,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Message length validation
    if (formData.message && formData.message.length < 20) {
      newErrors.message = 'Please provide at least 20 characters in your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email to admin
      const emailSent = await emailService.sendContactFormEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        businessType: formData.businessType,
        service: formData.serviceType,
        message: formData.message
      });

      if (emailSent) {
        setIsSubmitted(true);
      } else {
        alert('There was an error sending your message. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        businessType: '',
        subject: '',
        message: '',
        serviceType: '',
        preferredContact: '',
        urgency: ''
      });
      setErrors({});
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto px-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-32 h-32 text-[#628ca2] mx-auto mb-8" />
          </motion.div>
          <h2 className="text-5xl font-light mb-6 text-white">Thank You!</h2>
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Your inquiry has been submitted successfully. Our team will review your requirements 
            and respond within the timeframe you specified.
          </p>
          <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-8 rounded-lg">
            <p className="text-white/80 leading-relaxed">
              We appreciate your interest in our professional services. A dedicated consultant 
              will be assigned to your case and will contact you shortly to discuss your 
              specific requirements in detail.
            </p>
          </div>
          <div className="mt-8 text-sm text-white/50">
            Reference ID: INQ-{Date.now().toString().slice(-6)}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              <Mail className="w-10 h-10 text-[#628ca2]" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-tight">
              GET IN <span className="text-[#628ca2]">TOUCH</span>
            </h1>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl font-light text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to optimize your financial operations? Connect with our professional team 
              for comprehensive chartered accountancy solutions tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 text-center h-full hover:border-[#628ca2]/40 transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 border border-[#628ca2]/30 mx-auto mb-6 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#628ca2]" />
                      </div>
                      <h3 className="text-lg font-light mb-3 text-white tracking-wider">{info.title}</h3>
                      <p className="text-white/80 mb-3 font-light">{info.details}</p>
                      <p className="text-sm text-white/50 font-light">{info.subtitle}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              PROFESSIONAL <span className="text-[#628ca2]">CONSULTATION</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-lg font-light text-white/60">
              Complete the form below for a comprehensive consultation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border-[#628ca2]/20">
              <CardHeader>
                <CardTitle className="text-2xl font-light text-center tracking-wider">
                  INQUIRY FORM
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-light text-[#628ca2] mb-6 tracking-wider">PERSONAL INFORMATION</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-white/80 font-light tracking-wider mb-3 block">
                          FULL NAME <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-12 ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.name && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white/80 font-light tracking-wider mb-3 block">
                          EMAIL ADDRESS <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-12 ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.email && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-white/80 font-light tracking-wider mb-3 block">
                          PHONE NUMBER <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-12 ${
                            errors.phone ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.phone && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-white/80 font-light tracking-wider mb-3 block">
                          COMPANY/ORGANIZATION
                        </Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-light text-[#628ca2] mb-6 tracking-wider">BUSINESS INFORMATION</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-white/80 font-light tracking-wider mb-3 block">
                          BUSINESS TYPE
                        </Label>
                        <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                          <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white h-12">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map(type => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white/80 font-light tracking-wider mb-3 block">
                          SERVICE REQUIRED <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                          <SelectTrigger className={`bg-black/50 border-[#628ca2]/30 text-white h-12 ${
                            errors.serviceType ? 'border-red-500' : ''
                          }`}>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map(service => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.serviceType && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.serviceType}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <h3 className="text-lg font-light text-[#628ca2] mb-6 tracking-wider">COMMUNICATION PREFERENCES</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-white/80 font-light tracking-wider mb-3 block">
                          PREFERRED CONTACT METHOD <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                          <SelectTrigger className={`bg-black/50 border-[#628ca2]/30 text-white h-12 ${
                            errors.preferredContact ? 'border-red-500' : ''
                          }`}>
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="video">Video Call</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.preferredContact && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.preferredContact}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-white/80 font-light tracking-wider mb-3 block">
                          URGENCY LEVEL <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                          <SelectTrigger className={`bg-black/50 border-[#628ca2]/30 text-white h-12 ${
                            errors.urgency ? 'border-red-500' : ''
                          }`}>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map(level => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.urgency && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.urgency}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div>
                    <h3 className="text-lg font-light text-[#628ca2] mb-6 tracking-wider">INQUIRY DETAILS</h3>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="subject" className="text-white/80 font-light tracking-wider mb-3 block">
                          SUBJECT <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="Brief subject of your inquiry"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={`bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-12 ${
                            errors.subject ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.subject && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {errors.subject}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-white/80 font-light tracking-wider mb-3 block">
                          DETAILED MESSAGE <span className="text-[#628ca2]">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your requirements, current challenges, expected outcomes, timeline, and any specific questions you have. The more details you provide, the better we can assist you."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light min-h-32 ${
                            errors.message ? 'border-red-500' : ''
                          }`}
                          rows={6}
                        />
                        <div className="flex justify-between items-center mt-2">
                          {errors.message ? (
                            <div className="flex items-center text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              {errors.message}
                            </div>
                          ) : (
                            <div className="text-white/50 text-sm">
                              Minimum 20 characters required
                            </div>
                          )}
                          <div className="text-white/50 text-sm">
                            {formData.message.length}/500
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-6 rounded-lg">
                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      <strong className="text-[#628ca2]">Privacy & Data Protection:</strong> By submitting this form, 
                      you consent to Sahni & Co. processing your personal information for the purpose of providing 
                      professional consultation and services. We strictly adhere to data protection regulations and 
                      will not share your information with unauthorized third parties. Your data will be handled 
                      with utmost confidentiality and used solely for professional engagement purposes.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#628ca2] hover:bg-white hover:text-black text-white py-4 text-lg font-light tracking-wider transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        SUBMITTING INQUIRY...
                      </div>
                    ) : (
                      <>
                        SUBMIT PROFESSIONAL INQUIRY
                        <Send className="w-5 h-5 ml-3" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 border-t border-[#628ca2]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light mb-6 text-[#628ca2] tracking-wider">RESPONSE TIMEFRAME</h3>
                  <p className="text-white/70 mb-6 font-light leading-relaxed">
                    Our professional team ensures timely responses based on inquiry urgency and complexity.
                  </p>
                  <ul className="space-y-3 text-sm text-white/60 font-light">
                    <li>• Immediate queries: Within 4 hours</li>
                    <li>• Standard inquiries: Within 24 hours</li>
                    <li>• Complex consultations: Within 48 hours</li>
                    <li>• Emergency support: Same day response</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light mb-6 text-[#628ca2] tracking-wider">CONSULTATION PROCESS</h3>
                  <p className="text-white/70 mb-6 font-light leading-relaxed">
                    Structured approach to understanding and addressing your specific requirements.
                  </p>
                  <ul className="space-y-3 text-sm text-white/60 font-light">
                    <li>• Initial requirement analysis</li>
                    <li>• Detailed consultation session</li>
                    <li>• Customized solution proposal</li>
                    <li>• Implementation roadmap</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light mb-6 text-[#628ca2] tracking-wider">PROFESSIONAL COMMITMENT</h3>
                  <p className="text-white/70 mb-6 font-light leading-relaxed">
                    Dedicated support and expertise throughout our professional engagement.
                  </p>
                  <ul className="space-y-3 text-sm text-white/60 font-light">
                    <li>• Confidential handling of all information</li>
                    <li>• Expert professional guidance</li>
                    <li>• Ongoing support and communication</li>
                    <li>• Quality assurance and follow-up</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}