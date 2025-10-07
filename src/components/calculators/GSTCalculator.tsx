import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Percent, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface GSTCalculatorProps {
  onBack: () => void;
}

export default function GSTCalculator({ onBack }: GSTCalculatorProps) {
  const [amount, setAmount] = useState<number>(0);
  const [gstRate, setGSTRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const calculateGST = () => {
    if (calculationType === 'exclusive') {
      const gstAmount = (amount * gstRate) / 100;
      const totalAmount = amount + gstAmount;
      return {
        baseAmount: amount,
        gstAmount,
        totalAmount,
        cgst: gstAmount / 2,
        sgst: gstAmount / 2
      };
    } else {
      const baseAmount = (amount * 100) / (100 + gstRate);
      const gstAmount = amount - baseAmount;
      return {
        baseAmount,
        gstAmount,
        totalAmount: amount,
        cgst: gstAmount / 2,
        sgst: gstAmount / 2
      };
    }
  };

  const result = calculateGST();

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-5xl mx-auto px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK
          </Button>
          <h1 className="text-4xl font-light tracking-tight mb-4">
            GST <span className="text-[#628ca2]">CALCULATOR</span>
          </h1>
          <p className="text-white/60">Calculate GST amount for your transactions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-black/50 border-[#628ca2]/20">
            <CardHeader>
              <CardTitle className="text-xl font-light">INPUT DETAILS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white/80 font-light mb-3 block">CALCULATION TYPE</Label>
                <Select value={calculationType} onValueChange={(value: 'exclusive' | 'inclusive') => setCalculationType(value)}>
                  <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exclusive">GST Exclusive (Add GST)</SelectItem>
                    <SelectItem value="inclusive">GST Inclusive (Remove GST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white/80 font-light mb-3 block">
                  {calculationType === 'exclusive' ? 'BASE AMOUNT (₹)' : 'TOTAL AMOUNT (₹)'}
                </Label>
                <Input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <Label className="text-white/80 font-light mb-3 block">GST RATE (%)</Label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {[5, 12, 18, 28].map(rate => (
                    <Button
                      key={rate}
                      onClick={() => setGSTRate(rate)}
                      variant={gstRate === rate ? 'default' : 'outline'}
                      className={gstRate === rate 
                        ? 'bg-[#628ca2] text-white' 
                        : 'border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white'
                      }
                    >
                      {rate}%
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGSTRate(Number(e.target.value))}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Custom rate"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-black/50 border-[#628ca2]/20">
            <CardHeader>
              <CardTitle className="text-xl font-light">CALCULATION RESULTS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#628ca2]/10 border border-[#628ca2]/20">
                  <span className="text-white/70">Base Amount</span>
                  <span className="text-xl text-white">₹{result.baseAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center p-4 border border-[#628ca2]/20">
                  <span className="text-white/70">CGST ({gstRate / 2}%)</span>
                  <span className="text-white">₹{result.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center p-4 border border-[#628ca2]/20">
                  <span className="text-white/70">SGST ({gstRate / 2}%)</span>
                  <span className="text-white">₹{result.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center p-4 border border-[#628ca2]/20">
                  <span className="text-white/70">Total GST ({gstRate}%)</span>
                  <span className="text-xl text-[#628ca2]">₹{result.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center p-6 bg-[#628ca2]/10 border border-[#628ca2]/30">
                  <span className="text-lg text-white">Total Amount</span>
                  <span className="text-2xl text-[#628ca2]">₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="bg-[#628ca2]/5 p-4 border border-[#628ca2]/10">
                <h4 className="text-white font-light mb-2">Formula Used:</h4>
                <p className="text-white/60 text-sm font-light">
                  {calculationType === 'exclusive' 
                    ? `GST Amount = Base Amount × ${gstRate}%\nTotal = Base Amount + GST`
                    : `Base Amount = Total / (1 + ${gstRate}%)\nGST = Total - Base Amount`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GST Rates Reference */}
        <Card className="bg-black/50 border-[#628ca2]/20 mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-light">GST RATES REFERENCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { rate: 5, items: ['Essential items', 'Packaged foods', 'Coal', 'Medicines'] },
                { rate: 12, items: ['Computers', 'Processed food', 'Butter', 'Ghee'] },
                { rate: 18, items: ['Most services', 'IT services', 'Capital goods', 'Industrial items'] },
                { rate: 28, items: ['Luxury items', 'Tobacco', 'Automobiles', 'Consumer durables'] }
              ].map(category => (
                <div key={category.rate} className="p-4 border border-[#628ca2]/20">
                  <h3 className="text-2xl text-[#628ca2] mb-3">{category.rate}%</h3>
                  <ul className="space-y-2 text-white/60 text-sm">
                    {category.items.map(item => (
                      <li key={item} className="flex items-start">
                        <span className="w-1 h-1 bg-[#628ca2] rounded-full mr-2 mt-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}