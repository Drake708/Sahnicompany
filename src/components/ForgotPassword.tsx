import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, CreditCard, User, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { emailService } from './EmailService';

interface ForgotPasswordProps {
  onClose: () => void;
}

export default function ForgotPassword({ onClose }: ForgotPasswordProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    clientId: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
      newErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to admin with password reset request
      const emailSent = await emailService.sendForgotPasswordEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        pan: formData.pan.toUpperCase(),
        clientId: formData.clientId
      });

      if (emailSent) {
        setIsSubmitted(true);
      } else {
        alert('There was an error processing your request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting forgot password request:', error);
      alert('There was an error processing your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-black border-[#628ca2]/30">
          <CardHeader className="border-b border-[#628ca2]/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-light tracking-wider">FORGOT PASSWORD</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-24 h-24 text-[#628ca2] mx-auto mb-6" />
                  <h3 className="text-2xl font-light text-white mb-4">REQUEST SUBMITTED</h3>
                  <div className="space-y-4 text-white/70 mb-8">
                    <p>
                      Your password reset request has been sent to our admin team.
                    </p>
                    <p>
                      Our CA will verify your identity and contact you within 24-48 business hours 
                      with your new credentials.
                    </p>
                    <div className="bg-[#628ca2]/10 border border-[#628ca2]/30 p-4 mt-6">
                      <p className="text-sm text-white/60">
                        <strong className="text-white">Note:</strong> For security reasons, 
                        please ensure you have access to your registered email ({formData.email}) 
                        and phone number ({formData.phone}).
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    className="bg-[#628ca2] text-white hover:bg-white hover:text-black px-8 py-3"
                  >
                    CLOSE
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="bg-[#628ca2]/10 border border-[#628ca2]/30 p-6 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-[#628ca2] mt-0.5" />
                      <div className="text-sm text-white/70 space-y-2">
                        <p>
                          To reset your password, please provide your registered details including PAN.
                        </p>
                        <p>
                          Our CA will verify your identity and personally contact you with new credentials 
                          via your registered email or phone.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80 font-light mb-3 block">
                        <User className="w-4 h-4 inline mr-2" />
                        FULL NAME <span className="text-[#628ca2]">*</span>
                      </Label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`bg-black/50 border-[#628ca2]/30 text-white ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-white/80 font-light mb-3 block">
                        <Mail className="w-4 h-4 inline mr-2" />
                        EMAIL ADDRESS <span className="text-[#628ca2]">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`bg-black/50 border-[#628ca2]/30 text-white ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-white/80 font-light mb-3 block">
                        <Phone className="w-4 h-4 inline mr-2" />
                        PHONE NUMBER <span className="text-[#628ca2]">*</span>
                      </Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`bg-black/50 border-[#628ca2]/30 text-white ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-white/80 font-light mb-3 block">
                        <CreditCard className="w-4 h-4 inline mr-2" />
                        PAN NUMBER <span className="text-[#628ca2]">*</span>
                      </Label>
                      <Input
                        type="text"
                        value={formData.pan}
                        onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                        className={`bg-black/50 border-[#628ca2]/30 text-white ${
                          errors.pan ? 'border-red-500' : ''
                        }`}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                      />
                      {errors.pan && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.pan}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-white/80 font-light mb-3 block">
                        CLIENT ID (Optional)
                      </Label>
                      <Input
                        type="text"
                        value={formData.clientId}
                        onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="Your client ID if known"
                      />
                      <p className="text-xs text-white/50 mt-2">
                        If you have a client ID, providing it will help us process your request faster.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-[#628ca2]/40 text-white hover:bg-white/10"
                      disabled={isSubmitting}
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#628ca2] text-white hover:bg-white hover:text-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          SUBMITTING...
                        </>
                      ) : (
                        'SUBMIT REQUEST'
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}