import React from 'react';

export default function ServicesPage() {
  const services = [
    {
      title: 'Taxation Services',
      items: [
        'Income Tax Planning & Filing',
        'GST Registration & Compliance',
        'TDS & TCS Management',
        'Tax Advisory',
        'Appeal & Litigation Support'
      ]
    },
    {
      title: 'Audit & Assurance',
      items: [
        'Statutory Audit',
        'Internal Audit',
        'Tax Audit',
        'Bank Audit',
        'Concurrent Audit'
      ]
    },
    {
      title: 'Financial Advisory',
      items: [
        'Financial Planning',
        'Investment Advisory',
        'Risk Assessment',
        'Cash Flow Management',
        'Financial Restructuring'
      ]
    },
    {
      title: 'Corporate Services',
      items: [
        'Company Registration',
        'ROC Compliance',
        'Board Meetings & Resolutions',
        'Annual Filing',
        'Corporate Restructuring'
      ]
    },
    {
      title: 'Accounting Services',
      items: [
        'Bookkeeping & Accounting',
        'Financial Statement Preparation',
        'Management Reporting',
        'Payroll Processing',
        'Computerized Accounting'
      ]
    },
    {
      title: 'Business Registration',
      items: [
        'Partnership Registration',
        'LLP Registration',
        'Proprietorship Setup',
        'License & Approvals',
        'Foreign Company Registration'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-3xl mb-6">Our Services</h1>
          <p className="text-white/70 text-lg max-w-3xl">
            We provide comprehensive chartered accountancy services to individuals and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border border-[#628ca2]/20 p-6">
              <h3 className="text-xl mb-4">{service.title}</h3>
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white/70 text-sm flex items-start">
                    <div className="w-1 h-1 bg-[#628ca2] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#628ca2]/20 pt-16">
          <h2 className="text-2xl mb-8">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 border border-[#628ca2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#628ca2]">01</span>
              </div>
              <h3 className="text-lg mb-2">Consultation</h3>
              <p className="text-white/70 text-sm">Understanding your requirements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-[#628ca2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#628ca2]">02</span>
              </div>
              <h3 className="text-lg mb-2">Analysis</h3>
              <p className="text-white/70 text-sm">Detailed assessment of your situation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-[#628ca2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#628ca2]">03</span>
              </div>
              <h3 className="text-lg mb-2">Implementation</h3>
              <p className="text-white/70 text-sm">Execution of agreed services</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-[#628ca2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#628ca2]">04</span>
              </div>
              <h3 className="text-lg mb-2">Support</h3>
              <p className="text-white/70 text-sm">Ongoing assistance and follow-up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}