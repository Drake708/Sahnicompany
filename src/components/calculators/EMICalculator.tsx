import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface EMICalculatorProps {
  onBack: () => void;
}

export default function EMICalculator({ onBack }: EMICalculatorProps) {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(10);
  const [tenure, setTenure] = useState<number>(12);

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
    
    return { emi, totalPayment, totalInterest };
  };

  const result = calculateEMI();

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-5xl mx-auto px-8 pb-20">
        <Button onClick={onBack} variant="outline" className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />BACK
        </Button>
        <h1 className="text-4xl font-light tracking-tight mb-8">EMI <span className="text-[#628ca2]">CALCULATOR</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-[#628ca2]/20">
            <CardHeader><CardTitle className="text-xl font-light">LOAN DETAILS</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white/80 font-light mb-3 block">LOAN AMOUNT (₹)</Label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="bg-black/50 border-[#628ca2]/30 text-white" />
              </div>
              <div>
                <Label className="text-white/80 font-light mb-3 block">INTEREST RATE (% per annum)</Label>
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="bg-black/50 border-[#628ca2]/30 text-white" />
              </div>
              <div>
                <Label className="text-white/80 font-light mb-3 block">LOAN TENURE (months)</Label>
                <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="bg-black/50 border-[#628ca2]/30 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#628ca2]/20">
            <CardHeader><CardTitle className="text-xl font-light">RESULTS</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-[#628ca2]/10 border border-[#628ca2]/30">
                <p className="text-white/70 mb-2">Monthly EMI</p>
                <p className="text-3xl text-[#628ca2]">₹{result.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-4 border border-[#628ca2]/20">
                <p className="text-white/70 mb-2">Total Payment</p>
                <p className="text-xl text-white">₹{result.totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-4 border border-[#628ca2]/20">
                <p className="text-white/70 mb-2">Total Interest</p>
                <p className="text-xl text-white">₹{result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}