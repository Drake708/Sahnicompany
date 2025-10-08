// Tax Report Generator using jsPDF
import jsPDF from 'jspdf';

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

interface TaxReportData {
  pan: string;
  name: string;
  assessmentYear: string;
  category: string;
  residentialStatus: string;
  age: string;
  regime: 'old' | 'new';
  
  // Income Details
  salaryIncome: number;
  housePropertyIncome: number;
  capitalGainsIncome: number;
  businessIncome: number;
  otherIncome: number;
  
  // Deductions (Old Regime)
  section80C: number;
  section80D: number;
  section80E: number;
  section80G: number;
  section80EE: number;
  section80CCD1B: number;
  
  // TDS and Payments
  tdsAmount: number;
  advanceTax: number;
  
  // Calculations
  oldRegime: TaxCalculation;
  newRegime: TaxCalculation;
  recommendedRegime: 'old' | 'new';
}

export const generateTaxReport = (data: TaxReportData): void => {
  const doc = new jsPDF();
  
  const primaryColor = [98, 140, 162]; // #628ca2
  const darkColor = [0, 0, 0];
  const lightColor = [100, 100, 100];
  const accentColor = [240, 240, 240];
  const whiteColor = [255, 255, 255];
  
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.width;
  const leftMargin = 25;
  const rightMargin = 25;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  
  // Premium Header with gradient effect
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Add subtle border line
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 47, pageWidth, 3, 'F');
  
  // Company name with enhanced typography
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('SAHNI & CO.', leftMargin, 25);
  
  // Subtitle with professional styling
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Chartered Accountants', leftMargin, 35);
  
  // Report title on the right
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('INCOME TAX COMPUTATION REPORT', pageWidth - rightMargin, 25, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Assessment Year ' + data.assessmentYear, pageWidth - rightMargin, 35, { align: 'right' });
  
  yPosition = 60;
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'normal');
  
  // Document Info with premium styling
  doc.setFillColor(...accentColor);
  doc.rect(leftMargin, yPosition, contentWidth, 12, 'F');
  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.text('DOCUMENT INFORMATION', leftMargin + 5, yPosition + 8);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 8, { align: 'right' });
  yPosition += 20;
  
  // Premium Taxpayer Information Section
  doc.setFillColor(...primaryColor);
  doc.rect(leftMargin, yPosition, contentWidth, 8, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('TAXPAYER INFORMATION', leftMargin + 5, yPosition + 6);
  yPosition += 15;
  
  // Information grid with proper alignment
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'normal');
  
  // Row 1
  doc.setFont('helvetica', 'bold');
  doc.text('PAN Number:', leftMargin + 5, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.pan || 'Not Provided', leftMargin + 60, yPosition);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Assessment Year:', pageWidth / 2 + 10, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.assessmentYear, pageWidth / 2 + 80, yPosition);
  yPosition += 8;
  
  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.text('Full Name:', leftMargin + 5, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.name || 'Not Provided', leftMargin + 60, yPosition);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Category:', pageWidth / 2 + 10, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.category.charAt(0).toUpperCase() + data.category.slice(1), pageWidth / 2 + 80, yPosition);
  yPosition += 8;
  
  // Row 3
  doc.setFont('helvetica', 'bold');
  doc.text('Residential Status:', leftMargin + 5, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.residentialStatus.charAt(0).toUpperCase() + data.residentialStatus.slice(1), leftMargin + 60, yPosition);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Age Category:', pageWidth / 2 + 10, yPosition);
  doc.setFont('helvetica', 'normal');
  const ageText = data.age === 'below60' ? 'Below 60 Years' : 
                  data.age === '60to80' ? '60-80 Years' : 'Above 80 Years';
  doc.text(ageText, pageWidth / 2 + 80, yPosition);
  yPosition += 20;
  
  // Premium Income Details Section
  doc.setFillColor(...primaryColor);
  doc.rect(leftMargin, yPosition, contentWidth, 8, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('INCOME DETAILS', leftMargin + 5, yPosition + 6);
  yPosition += 15;
  
  // Income table with alternating row colors
  const incomeItems = [
    { label: 'Income from Salaries', amount: data.salaryIncome },
    { label: 'Income from House Property', amount: data.housePropertyIncome },
    { label: 'Income from Capital Gains', amount: data.capitalGainsIncome },
    { label: 'Income from Business or Profession', amount: data.businessIncome },
    { label: 'Income from Other Sources', amount: data.otherIncome }
  ];
  
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  
  incomeItems.forEach((item, index) => {
    // Alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250);
      doc.rect(leftMargin, yPosition - 2, contentWidth, 10, 'F');
    }
    
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, leftMargin + 5, yPosition + 4);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹ ${item.amount.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 4, { align: 'right' });
    yPosition += 10;
  });
  
  // Gross Total Income with enhanced styling
  doc.setFillColor(...primaryColor);
  doc.rect(leftMargin, yPosition, contentWidth, 12, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('GROSS TOTAL INCOME', leftMargin + 5, yPosition + 8);
  doc.text(`₹ ${data.oldRegime.grossIncome.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 8, { align: 'right' });
  yPosition += 20;
  
  // Deductions Section (if Old Regime)
  if (data.regime === 'old') {
    doc.setFillColor(...primaryColor);
    doc.rect(leftMargin, yPosition, contentWidth, 8, 'F');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('DEDUCTIONS (OLD REGIME)', leftMargin + 5, yPosition + 6);
    yPosition += 15;
    
    const deductions = [
      { label: 'Section 80C (Investment/Insurance)', amount: data.section80C, limit: '₹1,50,000' },
      { label: 'Section 80D (Health Insurance)', amount: data.section80D, limit: 'Varies' },
      { label: 'Section 80E (Education Loan Interest)', amount: data.section80E, limit: 'No Limit' },
      { label: 'Section 80G (Donations)', amount: data.section80G, limit: 'Varies' },
      { label: 'Section 80EE (Home Loan Interest)', amount: data.section80EE, limit: '₹50,000' },
      { label: 'Section 80CCD(1B) (NPS)', amount: data.section80CCD1B, limit: '₹50,000' }
    ];
    
    doc.setFontSize(11);
    doc.setTextColor(...darkColor);
    
    let deductionIndex = 0;
    deductions.forEach(item => {
      if (item.amount > 0) {
        // Alternating row background
        if (deductionIndex % 2 === 0) {
          doc.setFillColor(248, 249, 250);
          doc.rect(leftMargin, yPosition - 2, contentWidth, 10, 'F');
        }
        
        doc.setFont('helvetica', 'normal');
        doc.text(item.label, leftMargin + 5, yPosition + 4);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.text(`(Limit: ${item.limit})`, leftMargin + 5, yPosition + 8);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`₹ ${item.amount.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 4, { align: 'right' });
        yPosition += 12;
        deductionIndex++;
      }
    });
    
    const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
    
    // Total deductions with enhanced styling
    doc.setFillColor(...primaryColor);
    doc.rect(leftMargin, yPosition, contentWidth, 12, 'F');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL DEDUCTIONS', leftMargin + 5, yPosition + 8);
    doc.text(`₹ ${totalDeductions.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 8, { align: 'right' });
    yPosition += 20;
  }
  
  // Tax Computation Comparison with Premium Layout
  doc.setFillColor(...primaryColor);
  doc.rect(leftMargin, yPosition, contentWidth, 8, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('TAX COMPUTATION COMPARISON', leftMargin + 5, yPosition + 6);
  yPosition += 18;
  
  // Check if we need a new page
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 30;
  }
  
  // Old Regime Section with enhanced styling
  doc.setFillColor(240, 248, 255);
  doc.rect(leftMargin, yPosition, contentWidth, 8, 'F');
  doc.setFontSize(12);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.text('OLD TAX REGIME', leftMargin + 5, yPosition + 6);
  yPosition += 15;
  
  // Taxable Income
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Taxable Income:', leftMargin + 5, yPosition);
  doc.setFont('helvetica', 'bold');
  doc.text(`₹ ${data.oldRegime.taxableIncome.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition, { align: 'right' });
  yPosition += 10;
  
  // Tax Breakdown - Old Regime with table format
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Tax Slab Calculation:', leftMargin + 5, yPosition);
  yPosition += 8;
  
  data.oldRegime.breakdown.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(252, 252, 252);
      doc.rect(leftMargin + 5, yPosition - 2, contentWidth - 10, 8, 'F');
    }
    doc.setTextColor(...lightColor);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${item.slab} @ ${item.rate}`, leftMargin + 10, yPosition + 3);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹ ${item.tax.toLocaleString('en-IN')}`, pageWidth - rightMargin - 10, yPosition + 3, { align: 'right' });
    yPosition += 8;
  });
  
  yPosition += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Tax calculation rows
  const oldTaxRows = [
    { label: 'Tax at Normal Rates', amount: data.oldRegime.totalTax },
    { label: 'Surcharge', amount: data.oldRegime.surcharge },
    { label: 'Health & Education Cess (4%)', amount: data.oldRegime.cess }
  ];
  
  oldTaxRows.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250);
      doc.rect(leftMargin, yPosition - 2, contentWidth, 8, 'F');
    }
    doc.text(row.label, leftMargin + 5, yPosition + 3);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹ ${row.amount.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    yPosition += 8;
  });
  
  // Total for Old Regime
  doc.setFillColor(...primaryColor);
  doc.rect(leftMargin, yPosition, contentWidth, 10, 'F');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL TAX PAYABLE (OLD REGIME)', leftMargin + 5, yPosition + 7);
  doc.text(`₹ ${data.oldRegime.totalTaxPayable.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 7, { align: 'right' });
  yPosition += 20;
  
  // New Regime Section with enhanced styling
  doc.setFillColor(255, 248, 240);
  doc.rect(leftMargin, yPosition, contentWidth, 8, 'F');
  doc.setFontSize(12);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.text('NEW TAX REGIME', leftMargin + 5, yPosition + 6);
  yPosition += 15;
  
  // Taxable Income
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Taxable Income:', leftMargin + 5, yPosition);
  doc.setFont('helvetica', 'bold');
  doc.text(`₹ ${data.newRegime.taxableIncome.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition, { align: 'right' });
  yPosition += 10;
  
  // Tax Breakdown - New Regime with table format
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Tax Slab Calculation:', leftMargin + 5, yPosition);
  yPosition += 8;
  
  data.newRegime.breakdown.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(252, 252, 252);
      doc.rect(leftMargin + 5, yPosition - 2, contentWidth - 10, 8, 'F');
    }
    doc.setTextColor(...lightColor);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${item.slab} @ ${item.rate}`, leftMargin + 10, yPosition + 3);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹ ${item.tax.toLocaleString('en-IN')}`, pageWidth - rightMargin - 10, yPosition + 3, { align: 'right' });
    yPosition += 8;
  });
  
  yPosition += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Tax calculation rows
  const newTaxRows = [
    { label: 'Tax at Normal Rates', amount: data.newRegime.totalTax },
    { label: 'Surcharge', amount: data.newRegime.surcharge },
    { label: 'Health & Education Cess (4%)', amount: data.newRegime.cess }
  ];
  
  newTaxRows.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250);
      doc.rect(leftMargin, yPosition - 2, contentWidth, 8, 'F');
    }
    doc.text(row.label, leftMargin + 5, yPosition + 3);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹ ${row.amount.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    yPosition += 8;
  });
  
  // Total for New Regime
  doc.setFillColor(...primaryColor);
  doc.rect(leftMargin, yPosition, contentWidth, 10, 'F');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL TAX PAYABLE (NEW REGIME)', leftMargin + 5, yPosition + 7);
  doc.text(`₹ ${data.newRegime.totalTaxPayable.toLocaleString('en-IN')}`, pageWidth - rightMargin - 5, yPosition + 7, { align: 'right' });
  yPosition += 20;
  
  // Premium Recommendation Box
  const savings = Math.abs(data.oldRegime.totalTaxPayable - data.newRegime.totalTaxPayable);
  const recommendedText = data.recommendedRegime === 'new' ? 'NEW TAX REGIME' : 'OLD TAX REGIME';
  const isBenefit = data.recommendedRegime === 'new' ? 
    data.newRegime.totalTaxPayable < data.oldRegime.totalTaxPayable :
    data.oldRegime.totalTaxPayable < data.newRegime.totalTaxPayable;
  
  // Recommendation header
  doc.setFillColor(34, 139, 34); // Green color for recommendation
  doc.rect(leftMargin, yPosition, contentWidth, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL RECOMMENDATION', leftMargin + 5, yPosition + 10);
  
  doc.setFontSize(16);
  doc.text(recommendedText, leftMargin + 5, yPosition + 20);
  
  // Savings information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const savingsText = isBenefit ? `Potential Tax Savings: ₹${savings.toLocaleString('en-IN')}` : 
                                 `Additional Tax: ₹${savings.toLocaleString('en-IN')}`;
  doc.text(savingsText, pageWidth - rightMargin - 5, yPosition + 20, { align: 'right' });
  
  yPosition += 35;
  
  // Analysis summary
  doc.setFillColor(245, 245, 245);
  doc.rect(leftMargin, yPosition, contentWidth, 25, 'F');
  doc.setTextColor(...darkColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('ANALYSIS SUMMARY:', leftMargin + 5, yPosition + 8);
  doc.text(`Old Regime Tax: ₹${data.oldRegime.totalTaxPayable.toLocaleString('en-IN')}`, leftMargin + 5, yPosition + 15);
  doc.text(`New Regime Tax: ₹${data.newRegime.totalTaxPayable.toLocaleString('en-IN')}`, leftMargin + 5, yPosition + 22);
  
  doc.setFont('helvetica', 'italic');
  doc.text('Note: This analysis is based on current tax laws and provided information.', pageWidth - rightMargin - 5, yPosition + 15, { align: 'right' });
  doc.text('Please consult for personalized tax planning advice.', pageWidth - rightMargin - 5, yPosition + 22, { align: 'right' });
  
  yPosition += 35;
  
  // Enhanced Footer with professional styling
  const footerY = doc.internal.pageSize.height - 35;
  
  // Footer background
  doc.setFillColor(248, 249, 250);
  doc.rect(0, footerY - 5, pageWidth, 40, 'F');
  
  // Footer border
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(0, footerY - 5, pageWidth, footerY - 5);
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SAHNI & CO. - CHARTERED ACCOUNTANTS', pageWidth / 2, footerY + 5, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Professional Tax Computation Report for Assessment Year ${data.assessmentYear}`, pageWidth / 2, footerY + 12, { align: 'center' });
  doc.text('This is a computer-generated report based on the information provided', pageWidth / 2, footerY + 18, { align: 'center' });
  doc.text('For comprehensive tax planning and professional advice, please schedule a consultation', pageWidth / 2, footerY + 24, { align: 'center' });
  
  // Contact information in footer
  doc.setFontSize(8);
  doc.setTextColor(...lightColor);
  doc.text('Email: contact@sahnico.com | Website: www.sahnico.com', pageWidth / 2, footerY + 30, { align: 'center' });
  
  // Save the PDF
  const fileName = `Income_Tax_Report_${data.pan}_${data.assessmentYear}.pdf`;
  doc.save(fileName);
};
