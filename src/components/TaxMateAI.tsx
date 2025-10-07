import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, X, Minimize2, Maximize2, ArrowRight, Zap, Brain, Cpu, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  thinking?: string;
  isThinking?: boolean;
}

export default function TaxMateAI() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m TaxMate AI, your intelligent financial assistant powered by advanced neural networks. I can help you with complex tax calculations, compliance analysis, and strategic financial planning. How may I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingProcess, setThinkingProcess] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsThinking(true);
    setIsTyping(false);

    // Advanced thinking simulation
    const thinkingSteps = [
      'Analyzing query parameters...',
      'Processing tax regulation database...',
      'Cross-referencing compliance requirements...',
      'Calculating optimal strategies...',
      'Validating against current legislation...',
      'Generating comprehensive response...'
    ];

    for (let i = 0; i < thinkingSteps.length; i++) {
      setThinkingProcess(thinkingSteps[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsThinking(false);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAdvancedAIResponse(inputMessage),
        timestamp: new Date(),
        thinking: thinkingSteps.join('\n')
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setThinkingProcess('');
    }, 1200);
  };

  const generateAdvancedAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('income tax')) {
      return `Based on my analysis of current Income Tax regulations:

🧠 **Tax Structure Analysis:**
• New Tax Regime: 0% up to ₹3L, 5% (₹3-6L), 10% (₹6-9L), 15% (₹9-12L), 20% (₹12-15L), 30% (₹15L+)
• Old Tax Regime: Standard deductions available under Sections 80C, 80D, etc.

💡 **Strategic Recommendations:**
• For salary ≤₹7L: New regime generally beneficial
• For salary >₹10L with investments: Old regime may offer advantages
• Consider ELSS, PPF, and NPS for tax optimization

📊 **Compliance Matrix:**
• ITR-1: For salary income up to ₹50L
• ITR-2: For capital gains and multiple income sources
• Due dates: July 31st (individuals), September 30th (auditable cases)

Would you like me to perform a detailed calculation for your specific income bracket?`;
    } 
    
    else if (lowerQuery.includes('gst')) {
      return `GST Compliance Analysis Complete:

⚙️ **Rate Structure Matrix:**
• Essential goods: 0% (grains, milk)
• Reduced rate: 5% (packaged food, textiles <₹1000)
• Standard rates: 12% (computers, processed food), 18% (capital goods, IT services)
• Luxury/sin goods: 28% (cars, tobacco)

🔧 **Registration Requirements:**
• Threshold: ₹40L (goods), ₹20L (services), ₹10L (special states)
• Mandatory for inter-state supply regardless of turnover
• Composition scheme available for eligible businesses

📈 **Filing Calendar:**
• Monthly: GSTR-1 (11th), GSTR-3B (20th)
• Quarterly: GSTR-1 for small taxpayers
• Annual: GSTR-9 (December 31st)

💻 **Digital Compliance:**
• E-invoicing mandatory for ₹5Cr+ turnover
• E-way bill for goods >₹50,000

Need assistance with specific GST calculations or compliance scenarios?`;
    }
    
    else if (lowerQuery.includes('deduction') || lowerQuery.includes('80c')) {
      return `Tax Deduction Optimization Analysis:

🎯 **Section 80C Portfolio (₹1.5L limit):**
• EPF: Automatic deduction for salaried
• PPF: 15-year lock-in, 7.1% returns
• ELSS: Market-linked, 3-year lock-in
• NSC: 5-year term, 6.8% returns
• Tax-saving FD: 5-year lock-in

🏥 **Section 80D - Health Insurance:**
• Self/family: ₹25,000 (₹50,000 if senior citizen)
• Parents: Additional ₹25,000 (₹50,000 if senior citizen)
• Preventive health check-up: ₹5,000 within limits

💼 **Professional Deductions:**
• HRA: Lower of actual HRA, 50%/40% of salary, rent-10% of salary
• LTA: Actual travel expenses for domestic trips
• Professional tax: Varies by state (₹200-₹2,500)

🧮 **Advanced Strategies:**
• NPS: Additional ₹50,000 under 80CCD(1B)
• Interest on home loan: ₹2L under 24(b)
• Education loan interest: Full deduction under 80E

Shall I create a personalized deduction strategy based on your profile?`;
    }
    
    else if (lowerQuery.includes('tds')) {
      return `TDS Compliance Framework Analysis:

⚡ **Rate Matrix & Thresholds:**
• Salary: As per tax slab (after ₹2.5L exemption)
• Professional fees: 10% (above ₹30,000)
• Commission/brokerage: 5% (above ₹15,000)
• Rent: 10% (above ₹2.4L annually)
• Interest: 10% (above ₹40,000 for banks, ₹5,000 others)

📋 **Filing Requirements:**
• Form 26Q: Salary TDS (quarterly)
• Form 24Q: Non-salary TDS (quarterly)
• Form 27Q: TDS on payments to non-residents
• Form 27EQ: TCS collection

🔍 **Compliance Checkpoints:**
• TDS certificate: Form 16/16A mandatory
• Lower deduction certificate: Form 13 under Section 197
• NIL TDS certificate: Available for income below exemption

💡 **Digital Integration:**
• TRACES portal for TDS filing
• 26AS for taxpayer verification
• Real-time TDS reconciliation

Need help with TDS calculation for specific payment types?`;
    }
    
    else {
      return `Advanced Query Processing Complete:

🤖 **Analysis Summary:**
I've processed your query "${query}" through multiple analytical frameworks including regulatory compliance, financial optimization, and strategic planning modules.

🔬 **Available Assistance Modules:**
• Tax calculation engines (Income Tax, GST, TDS)
• Compliance calendar and deadline tracking
• Investment optimization algorithms
• Business structure analysis
• International taxation frameworks

💡 **Intelligent Suggestions:**
Based on current market conditions and regulatory updates, I can provide insights on:
• Tax-efficient investment strategies
• Compliance automation workflows
• Risk assessment and mitigation
• Financial planning optimization

Could you provide more specific details about your requirements? I can then deploy specialized analytical models to give you precise, actionable recommendations.

For example:
- Your income bracket and investment capacity
- Business type and turnover
- Specific compliance challenges
- Investment timeline and goals`;
    }
  };

  const quickQuestions = [
    'Calculate income tax for ₹8L salary',
    'GST registration requirements',
    'Section 80C deduction options',
    'TDS rates for professional payments',
    'Home loan tax benefits',
    'ELSS vs PPF comparison'
  ];

  const capabilities = [
    {
      title: "NEURAL TAX COMPUTATION",
      description: "Advanced AI algorithms for complex tax calculations with real-time optimization and scenario analysis.",
      icon: Brain
    },
    {
      title: "REGULATORY INTELLIGENCE", 
      description: "Continuous monitoring and analysis of tax law changes with predictive compliance recommendations.",
      icon: Cpu
    },
    {
      title: "STRATEGIC OPTIMIZATION",
      description: "Machine learning-powered financial planning with personalized tax-saving strategies and risk assessment.",
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Dynamic Neural Network Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#628ca2]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.2, 0.8, 0.2],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Advanced Neural Network Animation */}
        <div className="absolute inset-0 opacity-10">
          {/* Neural Network Nodes */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#628ca2] rounded-full"
              style={{
                left: `${10 + (i % 5) * 20}%`,
                top: `${15 + Math.floor(i / 5) * 17}%`,
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  "0 0 0px #628ca2",
                  "0 0 20px #628ca2",
                  "0 0 0px #628ca2"
                ]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          
          {/* Advanced Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(30)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${10 + (i % 5) * 20}%`}
                y1={`${15 + Math.floor(i / 5) * 17}%`}
                x2={`${10 + ((i + 1) % 5) * 20}%`}
                y2={`${15 + Math.floor((i + 1) / 5) * 17}%`}
                stroke="#628ca2"
                strokeWidth="1"
                opacity="0.4"
                animate={{
                  opacity: [0.1, 0.8, 0.1],
                  strokeWidth: [0.5, 2, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </svg>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl lg:text-[12rem] font-light leading-[0.8] mb-12 tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              TAX<span className="text-[#628ca2]">MATE</span>
              <br />
              <motion.span 
                className="text-[#628ca2]"
                animate={{
                  textShadow: [
                    "0 0 0px #628ca2",
                    "0 0 30px #628ca2",
                    "0 0 0px #628ca2"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                AI
              </motion.span>
            </motion.h1>
            
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-12"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            
            <motion.p 
              className="text-2xl md:text-3xl font-light mb-6 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              NEURAL FINANCIAL INTELLIGENCE
            </motion.p>

            <motion.p 
              className="text-lg font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Advanced artificial intelligence with deep learning capabilities for complex tax analysis, 
              regulatory compliance, and strategic financial optimization with human-like reasoning.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setShowChat(true)}
                  className="bg-[#628ca2] text-white px-20 py-6 text-xl font-light tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-700 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center">
                    INITIALIZE NEURAL NETWORK
                    <Zap className="ml-4 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-32 border-t border-[#628ca2]/10 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              NEURAL <span className="text-[#628ca2]">ARCHITECTURE</span>
            </h2>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-xl font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge AI architecture with deep learning models trained on vast financial datasets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div 
                    className="w-32 h-32 border border-[#628ca2]/30 mx-auto mb-12 flex items-center justify-center group-hover:border-[#628ca2] transition-all duration-700 relative overflow-hidden"
                    whileHover={{ rotate: 5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#628ca2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <IconComponent className="w-16 h-16 text-[#628ca2] relative z-10" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-light tracking-wide mb-8 group-hover:text-[#628ca2] transition-colors duration-500">
                    {capability.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed font-light text-lg">
                    {capability.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Questions */}
      <section className="py-32 border-t border-[#628ca2]/10 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
              NEURAL <span className="text-[#628ca2]">QUERIES</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => {
                  setInputMessage(question);
                  setShowChat(true);
                }}
                className="p-10 border border-[#628ca2]/20 hover:border-[#628ca2]/60 transition-all duration-500 text-left group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-[#628ca2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <div className="w-8 h-8 border border-[#628ca2]/40 mb-6 flex items-center justify-center group-hover:border-[#628ca2] transition-colors duration-500">
                    <Brain className="w-4 h-4 text-[#628ca2]" />
                  </div>
                  <p className="text-lg font-light tracking-wide group-hover:text-[#628ca2] transition-colors duration-500 mb-4">
                    {question}
                  </p>
                  <motion.div
                    className="inline-flex items-center text-[#628ca2] opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-sm font-light tracking-wider mr-2">PROCESS QUERY</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-xl z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`bg-black border border-[#628ca2]/30 w-full max-w-6xl transition-all duration-300 relative overflow-hidden flex flex-col ${
                isMinimized ? 'h-20' : 'h-[85vh]'
              }`}
            >
              {/* Advanced Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#628ca2]/5 via-transparent to-[#628ca2]/10"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* Chat Header */}
              <div className="flex items-center justify-between p-8 border-b border-[#628ca2]/20 relative z-10">
                <div className="flex items-center space-x-6">
                  <motion.div 
                    className="w-16 h-16 border border-[#628ca2] flex items-center justify-center relative"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0px #628ca2",
                        "0 0 20px #628ca2",
                        "0 0 0px #628ca2"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Bot className="w-8 h-8 text-[#628ca2]" />
                    <motion.div
                      className="absolute inset-0 border border-[#628ca2]/50"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-light tracking-wider">TAXMATE NEURAL AI</h3>
                    <p className="text-sm text-white/60 tracking-wider font-light">
                      {isThinking ? 'NEURAL PROCESSING...' : 'INTELLIGENT ASSISTANT ONLINE'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChat(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-8 overflow-y-auto relative z-10" style={{ maxHeight: 'calc(85vh - 200px)' }}>
                    <div className="space-y-8">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start space-x-6 ${
                            message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <div className={`w-12 h-12 border flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'border-white text-white' 
                              : 'border-[#628ca2] text-[#628ca2]'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-6 h-6" />
                            ) : (
                              <Bot className="w-6 h-6" />
                            )}
                          </div>
                          <div className={`max-w-[75%] p-6 ${
                            message.type === 'user'
                              ? 'bg-[#628ca2] text-white'
                              : 'border border-[#628ca2]/20 text-white'
                          }`}>
                            <div className="leading-relaxed font-light whitespace-pre-line">
                              {message.content}
                            </div>
                            <p className="text-xs mt-4 opacity-70 font-light">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Thinking Process */}
                      {isThinking && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-start space-x-6"
                        >
                          <div className="w-12 h-12 border border-[#628ca2] flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Brain className="w-6 h-6 text-[#628ca2]" />
                            </motion.div>
                          </div>
                          <div className="border border-[#628ca2]/20 p-6 max-w-[75%]">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="text-[#628ca2] font-light">🧠 Neural Processing:</div>
                            </div>
                            <div className="text-white/70 font-light">{thinkingProcess}</div>
                            <div className="flex space-x-2 mt-4">
                              {[...Array(4)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-[#628ca2] rounded-full"
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-start space-x-6"
                        >
                          <div className="w-12 h-12 border border-[#628ca2] flex items-center justify-center">
                            <Bot className="w-6 h-6 text-[#628ca2]" />
                          </div>
                          <div className="border border-[#628ca2]/20 p-6">
                            <div className="flex space-x-2">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-[#628ca2] rounded-full"
                                  animate={{ scale: [1, 1.4, 1] }}
                                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-8 border-t border-[#628ca2]/20 relative z-10">
                    <div className="flex space-x-6">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="ENTER YOUR NEURAL QUERY..."
                        className="flex-1 bg-transparent border border-[#628ca2]/30 text-white placeholder-white/40 font-light tracking-wider h-14 focus:border-[#628ca2] transition-all duration-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isThinking || isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isThinking || isTyping}
                        className="bg-[#628ca2] hover:bg-white hover:text-black text-white transition-all duration-500 px-8 h-14"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}