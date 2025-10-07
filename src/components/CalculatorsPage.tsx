import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, DollarSign, TrendingUp, PieChart, FileText, Percent, Building2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import IncomeTaxCalculator from './IncomeTaxCalculator';
import GSTCalculator from './calculators/GSTCalculator';
import EMICalculator from './calculators/EMICalculator';

export default function CalculatorsPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  const calculators = [
    {
      id: 'income-tax',
      icon: FileText,
      title: 'Income Tax Calculator',
      description: 'Calculate your income tax liability for different regimes with detailed breakdown and deductions.',
      features: ['New vs Old Tax Regime', 'Deduction Analysis', 'Tax Saving Tips', 'Detailed Breakdown'],
      color: 'text-[#628ca2]',
      bgColor: 'bg-[#628ca2]/10'
    },
    {
      id: 'gst',
      icon: Percent,
      title: 'GST Calculator',
      description: 'Calculate GST amount, inclusive/exclusive pricing, and reverse calculation for business transactions.',
      features: ['GST Rate Calculation', 'Inclusive/Exclusive', 'Reverse Calculation', 'Multiple Items'],
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'emi',
      icon: CreditCard,
      title: 'EMI Calculator',
      description: 'Calculate EMI for loans, mortgages, and credit with amortization schedule and prepayment analysis.',
      features: ['Loan EMI Calculation', 'Amortization Schedule', 'Prepayment Impact', 'Interest Breakdown'],
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 'sip',
      icon: TrendingUp,
      title: 'SIP Calculator',
      description: 'Calculate systematic investment plan returns, wealth accumulation, and goal-based planning.',
      features: ['SIP Returns', 'Goal Planning', 'Lump Sum vs SIP', 'Power of Compounding'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      id: 'fd',
      icon: DollarSign,
      title: 'FD Calculator',
      description: 'Calculate fixed deposit maturity amount, interest earned, and comparative analysis.',
      features: ['Maturity Amount', 'Interest Calculation', 'Quarterly/Monthly', 'Tax Impact'],
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      id: 'retirement',
      icon: PieChart,
      title: 'Retirement Calculator',
      description: 'Plan your retirement corpus, monthly savings required, and post-retirement income.',
      features: ['Corpus Planning', 'Savings Required', 'Inflation Adjusted', 'Income Planning'],
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    {
      id: 'business-loan',
      icon: Building2,
      title: 'Business Loan Calculator',
      description: 'Calculate business loan EMI, eligibility, and repayment schedule for entrepreneurs.',
      features: ['Loan Eligibility', 'EMI Calculation', 'Processing Fees', 'Tax Benefits'],
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10'
    },
    {
      id: 'capital-gains',
      icon: TrendingUp,
      title: 'Capital Gains Calculator',
      description: 'Calculate capital gains tax on equity, property, and other investments with exemptions.',
      features: ['STCG/LTCG', 'Indexation Benefits', 'Exemptions', 'Tax Optimization'],
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10'
    }
  ];

  if (selectedCalculator === 'income-tax') {
    return <IncomeTaxCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === 'gst') {
    return <GSTCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === 'emi') {
    return <EMICalculator onBack={() => setSelectedCalculator(null)} />;
  }

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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
              <Calculator className="w-10 h-10 text-[#628ca2]" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-tight">
              FINANCIAL <span className="text-[#628ca2]">CALCULATORS</span>
            </h1>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl font-light text-white/70 max-w-4xl mx-auto leading-relaxed">
              Comprehensive suite of professional-grade financial calculators for accurate planning, 
              analysis, and decision-making across various financial instruments and scenarios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              PROFESSIONAL <span className="text-[#628ca2]">TOOLS</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-lg font-light text-white/60">
              Select from our comprehensive range of financial calculators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {calculators.map((calc, index) => {
              const IconComponent = calc.icon;
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedCalculator(calc.id)}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500 group">
                    <CardHeader>
                      <div className={`w-16 h-16 border border-[#628ca2]/30 mb-4 flex items-center justify-center group-hover:border-[#628ca2] transition-all duration-500 ${calc.bgColor}`}>
                        <IconComponent className={`w-8 h-8 ${calc.color}`} />
                      </div>
                      <CardTitle className="text-lg font-light text-white group-hover:text-[#628ca2] transition-colors duration-300">
                        {calc.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 font-light leading-relaxed mb-6 text-sm">
                        {calc.description}
                      </p>
                      <div className="space-y-2">
                        {calc.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-xs text-white/50">
                            <span className="w-1 h-1 bg-[#628ca2] rounded-full mr-3"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full mt-6 bg-transparent border border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white transition-all duration-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCalculator(calc.id);
                        }}
                      >
                        USE CALCULATOR
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              CALCULATOR <span className="text-[#628ca2]">FEATURES</span>
            </h2>
            <motion.div
              className="w-24 h-px bg-[#628ca2] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ACCURATE CALCULATIONS',
                description: 'Precise mathematical algorithms ensuring accurate results for all financial calculations.',
                icon: Calculator
              },
              {
                title: 'DETAILED BREAKDOWNS',
                description: 'Comprehensive analysis with detailed breakdowns, charts, and explanatory information.',
                icon: PieChart
              },
              {
                title: 'PROFESSIONAL INSIGHTS',
                description: 'Expert recommendations and insights to optimize your financial planning strategies.',
                icon: TrendingUp
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 text-center h-full hover:border-[#628ca2]/40 transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 border border-[#628ca2]/30 mx-auto mb-6 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-[#628ca2]" />
                      </div>
                      <h3 className="text-lg font-light mb-4 text-white tracking-wider">{feature.title}</h3>
                      <p className="text-white/70 font-light leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[#628ca2]/10 relative z-10">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              NEED PROFESSIONAL <span className="text-[#628ca2]">CONSULTATION?</span>
            </h2>
            <p className="text-lg font-light text-white/70 mb-8 leading-relaxed">
              Our calculators provide preliminary insights. For comprehensive financial planning 
              and personalized advice, connect with our chartered accountancy team.
            </p>
            <Button className="bg-[#628ca2] text-white hover:bg-white hover:text-black px-12 py-4 text-lg font-light tracking-wider transition-all duration-500">
              SCHEDULE CONSULTATION
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}