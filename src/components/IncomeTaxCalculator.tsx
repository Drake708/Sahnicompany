import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calculator, FileText, TrendingUp, Info, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { generateTaxReport } from './TaxReportGenerator';
import { toast } from 'sonner@2.0.3';

interface IncomeTaxCalculatorProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

interface TaxCalculation {
  regime: 'old' | 'new';
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  surcharge: number;
  cess: number;
  totalTaxPayable: number;
  netIncome: number;
  breakdown: Array<{
    slab: string;
    rate: string;
    taxableAmount: number;
    tax: number;
  }>;
}

export default function IncomeTaxCalculator({ onBack, onNavigate }: IncomeTaxCalculatorProps) {
  const [formData, setFormData] = useState({
    pan: '',
    name: '',
    itrType: 'other',
    regime: 'new',
    assessmentYear: '2024-25',
    category: 'individual',
    residentialStatus: 'resident',
    age: 'below60',
    dueDate: '2024-07-31',
    actualDate: '2024-04-01',
    
    // Income Details
    salaryIncome: 0,
    housePropertyIncome: 0,
    capitalGainsIncome: 0,
    businessIncome: 0,
    otherIncome: 0,
    
    // Deductions (Old Regime)
    section80C: 0,
    section80D: 0,
    section80E: 0,
    section80G: 0,
    section80EE: 0,
    section80CCD1B: 0,
    
    // TDS and Payments
    tdsAmount: 0,
    advanceTax: 0
  });

  const [calculations, setCalculations] = useState<{
    oldRegime: TaxCalculation;
    newRegime: TaxCalculation;
  } | null>(null);

  const [recommendedRegime, setRecommendedRegime] = useState<'old' | 'new'>('new');

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Tax slabs for new regime (2024-25)
  const newRegimeSlabs = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 5 },
    { min: 700000, max: 1000000, rate: 10 },
    { min: 1000000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 }
  ];

  // Tax slabs for old regime (2024-25)
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
  ];

  const calculateTax = (income: number, slabs: typeof newRegimeSlabs, deductions: number = 0) => {
    const taxableIncome = Math.max(0, income - deductions);
    let tax = 0;
    const breakdown = [];

    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
        const slabTax = (taxableAmount * slab.rate) / 100;
        tax += slabTax;
        
        if (taxableAmount > 0) {
          breakdown.push({
            slab: slab.max === Infinity 
              ? `Above ₹${(slab.min / 100000).toFixed(1)}L`
              : `₹${(slab.min / 100000).toFixed(1)}L - ₹${(slab.max / 100000).toFixed(1)}L`,
            rate: `${slab.rate}%`,
            taxableAmount,
            tax: slabTax
          });
        }
      }
    }

    return { tax, breakdown, taxableIncome };
  };

  const calculateSurchargeAndCess = (baseTax: number, income: number) => {
    let surcharge = 0;
    
    // Surcharge calculation
    if (income > 5000000 && income <= 10000000) {
      surcharge = baseTax * 0.10; // 10%
    } else if (income > 10000000 && income <= 20000000) {
      surcharge = baseTax * 0.15; // 15%
    } else if (income > 20000000 && income <= 50000000) {
      surcharge = baseTax * 0.25; // 25%
    } else if (income > 50000000) {
      surcharge = baseTax * 0.37; // 37%
    }

    const totalTax = baseTax + surcharge;
    const cess = totalTax * 0.04; // 4% Health & Education Cess

    return { surcharge, cess, totalTaxPayable: totalTax + cess };
  };

  useEffect(() => {
    const grossIncome = formData.salaryIncome + formData.housePropertyIncome + 
                      formData.capitalGainsIncome + formData.businessIncome + formData.otherIncome;

    if (grossIncome > 0) {
      // Old Regime Calculation
      const totalOldDeductions = formData.section80C + formData.section80D + formData.section80E + 
                               formData.section80G + formData.section80EE + formData.section80CCD1B;
      
      const oldRegimeCalc = calculateTax(grossIncome, oldRegimeSlabs, totalOldDeductions);
      const oldSurchargeAndCess = calculateSurchargeAndCess(oldRegimeCalc.tax, oldRegimeCalc.taxableIncome);

      // New Regime Calculation (no deductions)
      const newRegimeCalc = calculateTax(grossIncome, newRegimeSlabs, 0);
      const newSurchargeAndCess = calculateSurchargeAndCess(newRegimeCalc.tax, newRegimeCalc.taxableIncome);

      const oldRegime: TaxCalculation = {
        regime: 'old',
        grossIncome,
        taxableIncome: oldRegimeCalc.taxableIncome,
        totalTax: oldRegimeCalc.tax,
        surcharge: oldSurchargeAndCess.surcharge,
        cess: oldSurchargeAndCess.cess,
        totalTaxPayable: oldSurchargeAndCess.totalTaxPayable,
        netIncome: grossIncome - oldSurchargeAndCess.totalTaxPayable,
        breakdown: oldRegimeCalc.breakdown
      };

      const newRegime: TaxCalculation = {
        regime: 'new',
        grossIncome,
        taxableIncome: newRegimeCalc.taxableIncome,
        totalTax: newRegimeCalc.tax,
        surcharge: newSurchargeAndCess.surcharge,
        cess: newSurchargeAndCess.cess,
        totalTaxPayable: newSurchargeAndCess.totalTaxPayable,
        netIncome: grossIncome - newSurchargeAndCess.totalTaxPayable,
        breakdown: newRegimeCalc.breakdown
      };

      setCalculations({ oldRegime, newRegime });
      setRecommendedRegime(newRegime.totalTaxPayable < oldRegime.totalTaxPayable ? 'new' : 'old');
    } else {
      setCalculations(null);
    }
  }, [formData]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGeneratePDF = () => {
    if (!calculations) {
      toast.error('Please enter income details to generate report');
      return;
    }

    if (!formData.pan || !formData.name) {
      toast.error('Please enter PAN and Name to generate report');
      return;
    }

    try {
      generateTaxReport({
        pan: formData.pan,
        name: formData.name,
        assessmentYear: formData.assessmentYear,
        category: formData.category,
        residentialStatus: formData.residentialStatus,
        age: formData.age,
        regime: formData.regime as 'old' | 'new',
        salaryIncome: formData.salaryIncome,
        housePropertyIncome: formData.housePropertyIncome,
        capitalGainsIncome: formData.capitalGainsIncome,
        businessIncome: formData.businessIncome,
        otherIncome: formData.otherIncome,
        section80C: formData.section80C,
        section80D: formData.section80D,
        section80E: formData.section80E,
        section80G: formData.section80G,
        section80EE: formData.section80EE,
        section80CCD1B: formData.section80CCD1B,
        tdsAmount: formData.tdsAmount,
        advanceTax: formData.advanceTax,
        oldRegime: calculations.oldRegime,
        newRegime: calculations.newRegime,
        recommendedRegime
      });
      toast.success('Tax report generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate report. Please try again.');
    }
  };

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

      {/* Header */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-6 flex-1">
              <Button
                onClick={onBack}
                variant="outline"
                className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                BACK
              </Button>
              <div>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                  INCOME TAX <span className="text-[#628ca2]">CALCULATOR</span>
                </h1>
                <p className="text-white/60 font-light mt-2">Assessment Year 2024-25</p>
              </div>
            </div>
            {calculations && (
              <Button
                onClick={handleGeneratePDF}
                className="bg-[#628ca2] text-white hover:bg-white hover:text-black transition-all duration-500 px-8 py-3 mr-4"
              >
                <Download className="w-5 h-5 mr-3" />
                GENERATE PDF REPORT
              </Button>
            )}
            <motion.div
              className="w-16 h-16 border border-[#628ca2]/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: '#628ca2' }}
            >
              <Calculator className="w-8 h-8 text-[#628ca2]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card className="bg-black/50 border-[#628ca2]/20">
              <CardHeader>
                <CardTitle className="text-xl font-light text-white flex items-center">
                  <FileText className="mr-3 w-6 h-6 text-[#628ca2]" />
                  TAXPAYER INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 font-light tracking-wider mb-3 block">PAN</Label>
                    <Input
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                      className="bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40"
                    />
                  </div>
                  <div>
                    <Label className="text-white/80 font-light tracking-wider mb-3 block">NAME OF TAXPAYER</Label>
                    <Input
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 font-light tracking-wider mb-3 block">TYPE OF ITR</Label>
                    <div className="flex space-x-4 mt-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="itrType"
                          value="updated"
                          checked={formData.itrType === 'updated'}
                          onChange={(e) => handleInputChange('itrType', e.target.value)}
                          className="mr-2 accent-[#628ca2]"
                        />
                        <span className="text-white/70 text-sm">Updated Return u/s 139(8A)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="itrType"
                          value="other"
                          checked={formData.itrType === 'other'}
                          onChange={(e) => handleInputChange('itrType', e.target.value)}
                          className="mr-2 accent-[#628ca2]"
                        />
                        <span className="text-white/70 text-sm">Other than Updated return</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/80 font-light tracking-wider mb-3 block">TAX REGIME</Label>
                    <div className="flex space-x-4 mt-3">
                      <Button
                        variant={formData.regime === 'old' ? 'default' : 'outline'}
                        onClick={() => handleInputChange('regime', 'old')}
                        className={formData.regime === 'old' 
                          ? 'bg-[#628ca2] text-white' 
                          : 'border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white'
                        }
                      >
                        Old Tax Regime
                      </Button>
                      <Button
                        variant={formData.regime === 'new' ? 'default' : 'outline'}
                        onClick={() => handleInputChange('regime', 'new')}
                        className={formData.regime === 'new' 
                          ? 'bg-[#628ca2] text-white' 
                          : 'border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white'
                        }
                      >
                        New Tax Regime
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 font-light tracking-wider mb-3 block">ASSESSMENT YEAR</Label>
                    <Select value={formData.assessmentYear} onValueChange={(value) => handleInputChange('assessmentYear', value)}>
                      <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                        <SelectItem value="2022-23">2022-23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white/80 font-light tracking-wider">TAXPAYER CATEGORY</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="huf">HUF</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="firm">Firm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 font-light tracking-wider">RESIDENTIAL STATUS</Label>
                    <Select value={formData.residentialStatus} onValueChange={(value) => handleInputChange('residentialStatus', value)}>
                      <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resident">RES (Resident)</SelectItem>
                        <SelectItem value="nri">NRI (Non-Resident)</SelectItem>
                        <SelectItem value="rnor">RNOR (Resident Not Ordinarily Resident)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white/80 font-light tracking-wider mb-3 block">YOUR AGE</Label>
                    <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
                      <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below60">Below 60 years (Regular Citizen)</SelectItem>
                        <SelectItem value="60-79">Between 60-79 years (Senior Citizen)</SelectItem>
                        <SelectItem value="80above">80 and above (Super Senior Citizen)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Income Details */}
            <Card className="bg-black/50 border-[#628ca2]/20">
              <CardHeader>
                <CardTitle className="text-xl font-light text-white">DETAILS FOR INCOME AND TAX CALCULATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-[#628ca2]/20">
                    <div>
                      <p className="text-white/80">Income under the head Salaries</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white">₹</span>
                      <Input
                        type="number"
                        value={formData.salaryIncome || ''}
                        onChange={(e) => handleInputChange('salaryIncome', Number(e.target.value))}
                        className="w-32 bg-black/50 border-[#628ca2]/30 text-white text-right inline-block ml-2"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#628ca2]/20">
                    <div>
                      <p className="text-white/80">Income under the head House Property</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white">₹</span>
                      <Input
                        type="number"
                        value={formData.housePropertyIncome || ''}
                        onChange={(e) => handleInputChange('housePropertyIncome', Number(e.target.value))}
                        className="w-32 bg-black/50 border-[#628ca2]/30 text-white text-right inline-block ml-2"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#628ca2]/20">
                    <div>
                      <p className="text-white/80">Income under the head Capital Gains</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white">₹</span>
                      <Input
                        type="number"
                        value={formData.capitalGainsIncome || ''}
                        onChange={(e) => handleInputChange('capitalGainsIncome', Number(e.target.value))}
                        className="w-32 bg-black/50 border-[#628ca2]/30 text-white text-right inline-block ml-2"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#628ca2]/20">
                    <div>
                      <p className="text-white/80">Income under the head Business or Profession</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white">₹</span>
                      <Input
                        type="number"
                        value={formData.businessIncome || ''}
                        onChange={(e) => handleInputChange('businessIncome', Number(e.target.value))}
                        className="w-32 bg-black/50 border-[#628ca2]/30 text-white text-right inline-block ml-2"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[#628ca2]/20">
                    <div>
                      <p className="text-white/80">Income under the head Other Sources</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white">₹</span>
                      <Input
                        type="number"
                        value={formData.otherIncome || ''}
                        onChange={(e) => handleInputChange('otherIncome', Number(e.target.value))}
                        className="w-32 bg-black/50 border-[#628ca2]/30 text-white text-right inline-block ml-2"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-light text-white">Gross Total Income</span>
                    <span className="text-xl font-light text-[#628ca2]">
                      ₹{(formData.salaryIncome + formData.housePropertyIncome + formData.capitalGainsIncome + 
                         formData.businessIncome + formData.otherIncome).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deductions (Old Regime Only) */}
            {formData.regime === 'old' && (
              <Card className="bg-black/50 border-[#628ca2]/20">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-white flex items-center">
                    <TrendingUp className="mr-3 w-6 h-6 text-[#628ca2]" />
                    DEDUCTIONS (OLD REGIME)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80 font-light tracking-wider">SECTION 80C (Max ₹1.5L)</Label>
                      <Input
                        type="number"
                        value={formData.section80C || ''}
                        onChange={(e) => handleInputChange('section80C', Math.min(150000, Number(e.target.value)))}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 font-light tracking-wider">SECTION 80D (Health Insurance)</Label>
                      <Input
                        type="number"
                        value={formData.section80D || ''}
                        onChange={(e) => handleInputChange('section80D', Number(e.target.value))}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 font-light tracking-wider">SECTION 80E (Education Loan)</Label>
                      <Input
                        type="number"
                        value={formData.section80E || ''}
                        onChange={(e) => handleInputChange('section80E', Number(e.target.value))}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 font-light tracking-wider">SECTION 80G (Donations)</Label>
                      <Input
                        type="number"
                        value={formData.section80G || ''}
                        onChange={(e) => handleInputChange('section80G', Number(e.target.value))}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 font-light tracking-wider">SECTION 80EE (Home Loan)</Label>
                      <Input
                        type="number"
                        value={formData.section80EE || ''}
                        onChange={(e) => handleInputChange('section80EE', Number(e.target.value))}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 font-light tracking-wider">SECTION 80CCD(1B) NPS (Max ₹50K)</Label>
                      <Input
                        type="number"
                        value={formData.section80CCD1B || ''}
                        onChange={(e) => handleInputChange('section80CCD1B', Math.min(50000, Number(e.target.value)))}
                        className="bg-black/50 border-[#628ca2]/30 text-white"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            {calculations && (
              <>
                {/* Comparison Card */}
                <Card className="bg-black/50 border-[#628ca2]/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-light text-white flex items-center">
                      <CheckCircle className="mr-3 w-6 h-6 text-[#628ca2]" />
                      TAX COMPARISON
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#628ca2]/10 border border-[#628ca2]/20">
                      <span className="text-white/80">Recommended Regime</span>
                      <span className="text-[#628ca2] font-light">
                        {recommendedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Old Regime Tax</span>
                        <span className="text-white">₹{calculations.oldRegime.totalTaxPayable.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">New Regime Tax</span>
                        <span className="text-white">₹{calculations.newRegime.totalTaxPayable.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#628ca2]/20 pt-3">
                        <span className="text-[#628ca2]">Tax Savings</span>
                        <span className="text-[#628ca2]">
                          ₹{Math.abs(calculations.newRegime.totalTaxPayable - calculations.oldRegime.totalTaxPayable).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Calculation */}
                <Tabs defaultValue={recommendedRegime} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-[#628ca2]/20">
                    <TabsTrigger value="new" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
                      New Regime
                    </TabsTrigger>
                    <TabsTrigger value="old" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
                      Old Regime
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="new">
                    <Card className="bg-black/50 border-[#628ca2]/20">
                      <CardHeader>
                        <CardTitle className="text-lg font-light text-white">NEW TAX REGIME</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70">Gross Total Income</span>
                            <span className="text-white">₹{calculations.newRegime.grossIncome.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Taxable Income</span>
                            <span className="text-white">₹{calculations.newRegime.taxableIncome.toLocaleString()}</span>
                          </div>
                          
                          <div className="border-t border-[#628ca2]/20 pt-3">
                            <p className="text-white/80 mb-3">Tax Breakdown:</p>
                            {calculations.newRegime.breakdown.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm mb-2">
                                <span className="text-white/60">{item.slab} @ {item.rate}</span>
                                <span className="text-white/80">₹{item.tax.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t border-[#628ca2]/20 pt-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-white/70">Tax at Normal Rates</span>
                              <span className="text-white">₹{calculations.newRegime.totalTax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Surcharge</span>
                              <span className="text-white">₹{calculations.newRegime.surcharge.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Health & Education Cess</span>
                              <span className="text-white">₹{calculations.newRegime.cess.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-3 mt-4">
                            <div className="flex justify-between">
                              <span className="text-lg font-light text-white">Total Tax Payable</span>
                              <span className="text-xl font-light text-[#628ca2]">
                                ₹{calculations.newRegime.totalTaxPayable.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="old">
                    <Card className="bg-black/50 border-[#628ca2]/20">
                      <CardHeader>
                        <CardTitle className="text-lg font-light text-white">OLD TAX REGIME</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70">Gross Total Income</span>
                            <span className="text-white">₹{calculations.oldRegime.grossIncome.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Deductions</span>
                            <span className="text-white">
                              ₹{(calculations.oldRegime.grossIncome - calculations.oldRegime.taxableIncome).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Taxable Income</span>
                            <span className="text-white">₹{calculations.oldRegime.taxableIncome.toLocaleString()}</span>
                          </div>
                          
                          <div className="border-t border-[#628ca2]/20 pt-3">
                            <p className="text-white/80 mb-3">Tax Breakdown:</p>
                            {calculations.oldRegime.breakdown.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm mb-2">
                                <span className="text-white/60">{item.slab} @ {item.rate}</span>
                                <span className="text-white/80">₹{item.tax.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t border-[#628ca2]/20 pt-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-white/70">Tax at Normal Rates</span>
                              <span className="text-white">₹{calculations.oldRegime.totalTax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Surcharge</span>
                              <span className="text-white">₹{calculations.oldRegime.surcharge.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Health & Education Cess</span>
                              <span className="text-white">₹{calculations.oldRegime.cess.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-3 mt-4">
                            <div className="flex justify-between">
                              <span className="text-lg font-light text-white">Total Tax Payable</span>
                              <span className="text-xl font-light text-[#628ca2]">
                                ₹{calculations.oldRegime.totalTaxPayable.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* TDS and Final Calculation */}
                <Card className="bg-black/50 border-[#628ca2]/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-light text-white">TDS & FINAL BALANCE</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-white/80 font-light tracking-wider">TDS + TCS + MAT / AMT CREDIT UTILIZED</Label>
                        <Input
                          type="number"
                          value={formData.tdsAmount || ''}
                          onChange={(e) => handleInputChange('tdsAmount', Number(e.target.value))}
                          className="bg-black/50 border-[#628ca2]/30 text-white"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <Label className="text-white/80 font-light tracking-wider">SELF-ASSESSMENT TAX / ADVANCE TAX</Label>
                        <Input
                          type="number"
                          value={formData.advanceTax || ''}
                          onChange={(e) => handleInputChange('advanceTax', Number(e.target.value))}
                          className="bg-black/50 border-[#628ca2]/30 text-white"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-[#628ca2]/10 border border-[#628ca2]/20 p-4 mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/70">Total Tax Payable ({recommendedRegime === 'new' ? 'New' : 'Old'} Regime)</span>
                        <span className="text-white">
                          ₹{(recommendedRegime === 'new' ? calculations.newRegime.totalTaxPayable : calculations.oldRegime.totalTaxPayable).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/70">Less: TDS & Advance Tax</span>
                        <span className="text-white">₹{(formData.tdsAmount + formData.advanceTax).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-[#628ca2]/20 pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-light text-white">Balance Tax Payable / Refundable</span>
                          <span className="text-xl font-light text-[#628ca2]">
                            ₹{Math.abs((recommendedRegime === 'new' ? calculations.newRegime.totalTaxPayable : calculations.oldRegime.totalTaxPayable) - 
                               (formData.tdsAmount + formData.advanceTax)).toLocaleString()}
                            {((recommendedRegime === 'new' ? calculations.newRegime.totalTaxPayable : calculations.oldRegime.totalTaxPayable) - 
                              (formData.tdsAmount + formData.advanceTax)) < 0 ? ' (Refund)' : ' (Payable)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Help Card */}
            <Card className="bg-[#628ca2]/10 border-[#628ca2]/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Info className="w-6 h-6 text-[#628ca2] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-light mb-2">Professional Assistance</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      This calculator provides an estimate based on current tax laws. For accurate calculations, 
                      detailed planning, and filing assistance, consult with our chartered accountancy experts.
                    </p>
                    <Button 
                      className="mt-4 bg-[#628ca2] text-white hover:bg-white hover:text-black text-sm px-6 py-2"
                      onClick={() => onNavigate?.('contact')}
                    >
                      GET PROFESSIONAL HELP
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}