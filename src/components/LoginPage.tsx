import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ForgotPassword from './ForgotPassword';

interface LoginPageProps {
  onNavigate: (page: string, type?: 'client' | 'admin') => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'cadinkarsahni',
    password: 'Jaishreeram@123'
  };

  // Client credentials
  const CLIENT_CREDENTIALS = [
    {
      username: 'LOHPS7022A',
      password: 'lohps7022a24121998',
      name: 'Simran',
      pan: 'LOHPS7022A'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (activeTab === 'admin') {
      // Admin validation
      if (formData.username === ADMIN_CREDENTIALS.username && 
          formData.password === ADMIN_CREDENTIALS.password) {
        onNavigate('admin', 'admin');
      } else {
        setErrorMessage('Invalid credentials. Please check your username and password.');
        setIsLoading(false);
      }
    } else {
      // Client login validation
      const client = CLIENT_CREDENTIALS.find(
        c => c.username === formData.username && c.password === formData.password
      );
      
      if (client) {
        // Store client info in sessionStorage for the portal
        sessionStorage.setItem('clientName', client.name);
        sessionStorage.setItem('clientPAN', client.pan);
        onNavigate('portal', 'client');
      } else {
        setErrorMessage('Invalid credentials. Please check your username (PAN) and password.');
        setIsLoading(false);
      }
    }
  };

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
              scale: [1, 2, 1],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="min-h-[calc(100vh-5rem)] flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative">
          {/* Animated Geometric Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 border border-[#628ca2]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-[#628ca2]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-6 h-6 bg-[#628ca2]/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-light tracking-wide mb-12 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              SECURE
              <br />
              <span className="text-[#628ca2]">ACCESS</span>
            </motion.h1>
            
            <motion.div
              className="w-24 h-px bg-[#628ca2] mb-16"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 1 }}
            />
            
            <div className="space-y-12 max-w-md">
              {[
                {
                  title: "ENTERPRISE SECURITY",
                  desc: "Military-grade encryption protecting your sensitive financial data with zero-trust architecture"
                },
                {
                  title: "REAL-TIME SYNCHRONIZATION", 
                  desc: "Instant access to documents, reports, and live account status with seamless cloud integration"
                },
                {
                  title: "ALWAYS AVAILABLE",
                  desc: "24/7 secure access to your financial ecosystem from anywhere in the world"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                >
                  <motion.div
                    className="w-3 h-3 bg-[#628ca2] rounded-full mt-2 flex-shrink-0"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                  />
                  <div>
                    <h3 className="text-lg font-light tracking-wider mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16 relative">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-md relative z-10"
          >
            {/* Tab Selector */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative border border-[#628ca2]/20 overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 bg-[#628ca2] transition-all duration-500"
                  animate={{
                    left: activeTab === 'client' ? '0%' : '50%',
                    width: '50%',
                  }}
                />
                <div className="relative flex">
                  <button
                    onClick={() => {
                      setActiveTab('client');
                      setErrorMessage('');
                      setFormData({ email: '', username: '', password: '' });
                    }}
                    className={`flex-1 py-4 px-6 text-center font-light tracking-wider transition-all duration-500 relative z-10 ${
                      activeTab === 'client'
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    CLIENT ACCESS
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setErrorMessage('');
                      setFormData({ email: '', username: '', password: '' });
                    }}
                    className={`flex-1 py-4 px-6 text-center font-light tracking-wider transition-all duration-500 relative z-10 ${
                      activeTab === 'admin'
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    ADMIN ACCESS
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="border border-[#628ca2]/20 p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#628ca2]/5 to-transparent opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-light tracking-wide mb-4">
                    {activeTab === 'client' ? 'CLIENT PORTAL' : 'ADMIN PORTAL'}
                  </h2>
                  <p className="text-white/60 font-light tracking-wider">
                    {activeTab === 'client' 
                      ? 'Secure client portal - Use PAN as username'
                      : 'Administrative system access'
                    }
                  </p>
                </div>

                <div className="space-y-8">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Label htmlFor={activeTab === 'client' ? 'username' : 'username'} className="text-white/80 font-light tracking-wider">
                      {activeTab === 'client' ? 'USERNAME (PAN)' : 'ADMIN USERNAME'}
                    </Label>
                    <div className="relative mt-3">
                      <User className="absolute left-4 top-4 text-[#628ca2] w-5 h-5" />
                      <Input
                        type="text"
                        id="username"
                        placeholder={activeTab === 'client' ? 'Enter your PAN' : 'Enter admin username'}
                        value={formData.username}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            username: e.target.value.toUpperCase()
                          });
                          setErrorMessage('');
                        }}
                        className="pl-14 h-14 bg-transparent border-[#628ca2]/30 text-white placeholder-white/40 font-light tracking-wider focus:border-[#628ca2] transition-all duration-500"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <Label htmlFor="password" className="text-white/80 font-light tracking-wider">PASSWORD</Label>
                    <div className="relative mt-3">
                      <Lock className="absolute left-4 top-4 text-[#628ca2] w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({...formData, password: e.target.value});
                          setErrorMessage('');
                        }}
                        className="pl-14 pr-14 h-14 bg-transparent border-[#628ca2]/30 text-white placeholder-white/40 font-light tracking-wider focus:border-[#628ca2] transition-all duration-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <label className="flex items-center space-x-3 text-white/60 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#628ca2]/30 bg-transparent text-[#628ca2] focus:ring-[#628ca2] transition-colors"
                    />
                    <span className="font-light tracking-wider group-hover:text-white transition-colors">
                      REMEMBER ME
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[#628ca2] hover:text-white transition-colors duration-300 font-light tracking-wider"
                  >
                    FORGOT PASSWORD?
                  </button>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 p-4 text-center"
                    >
                      <p className="text-red-400 text-sm font-light tracking-wider">
                        {errorMessage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 bg-[#628ca2] text-white hover:bg-white hover:text-black transition-all duration-700 font-light tracking-[0.2em] group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3 relative z-10">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>AUTHENTICATING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3 relative z-10">
                        <span>
                          {activeTab === 'client' ? 'SECURE SIGN IN' : 'ADMIN ACCESS'}
                        </span>
                        {activeTab === 'client' ? (
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        ) : (
                          <Shield className="w-5 h-5" />
                        )}
                      </div>
                    )}
                  </Button>
                </motion.div>

                {activeTab === 'client' && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    <p className="text-white/60 font-light tracking-wider">
                      NEW CLIENT?{' '}
                      <button 
                        type="button" 
                        onClick={() => onNavigate('contact')}
                        className="text-[#628ca2] hover:text-white transition-colors duration-300"
                      >
                        CONTACT US
                      </button>
                    </p>
                  </motion.div>
                )}

                {activeTab === 'admin' && (
                  <motion.div
                    className="border border-[#628ca2]/20 p-6 text-center bg-[#628ca2]/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    <p className="text-[#628ca2] text-sm font-light tracking-wider flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-3" />
                      ELEVATED SECURITY CLEARANCE REQUIRED
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center space-x-4 border border-[#628ca2]/20 px-6 py-3 bg-[#628ca2]/5">
                <motion.div
                  className="w-3 h-3 bg-[#628ca2] rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-light tracking-widest text-white/60">
                  256-BIT SSL ENCRYPTED CONNECTION
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}