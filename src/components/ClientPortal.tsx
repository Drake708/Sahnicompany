import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Download, Calendar, TrendingUp, DollarSign, 
  Eye, Bell, Settings, User, BarChart3, PieChart,
  ArrowUp, ArrowDown, Clock, CheckCircle, AlertCircle,
  CreditCard, Receipt, Briefcase, Home, File
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import ClientFileViewer from './ClientFileViewer';
import { getClientByPan } from './FileStorageService';

interface ClientPortalProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface TaxRecord {
  year: string;
  type: string;
  amount: number;
  status: 'Filed' | 'Pending' | 'Under Review';
  dueDate: string;
  filedDate?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  status: 'New' | 'Reviewed' | 'Completed';
}

export default function ClientPortal({ onNavigate, onLogout }: ClientPortalProps) {
  const [selectedYear, setSelectedYear] = useState('2023-24');
  const [clientId, setClientId] = useState('simran_001');

  const clientInfo = {
    name: 'Simran',
    clientId: 'CL-2024-001',
    email: 'client@example.com',
    phone: '+91 98765 43210',
    businessType: 'Individual',
    gstNumber: '-',
    panNumber: 'LOHPS7022A'
  };

  // Get client ID from storage based on PAN
  useEffect(() => {
    const storedClient = getClientByPan(clientInfo.panNumber);
    if (storedClient) {
      setClientId(storedClient.id);
    }
  }, []);

  const taxRecords: TaxRecord[] = [
    {
      year: '2023-24',
      type: 'Income Tax',
      amount: 125000,
      status: 'Filed',
      dueDate: '2024-07-31',
      filedDate: '2024-07-15'
    },
    {
      year: '2023-24',
      type: 'GST (Q4)',
      amount: 45000,
      status: 'Filed',
      dueDate: '2024-04-20',
      filedDate: '2024-04-18'
    },
    {
      year: '2023-24',
      type: 'TDS Return',
      amount: 28000,
      status: 'Under Review',
      dueDate: '2024-05-31'
    },
    {
      year: '2022-23',
      type: 'Income Tax',
      amount: 98000,
      status: 'Filed',
      dueDate: '2023-07-31',
      filedDate: '2023-07-20'
    },
    {
      year: '2022-23',
      type: 'GST (Annual)',
      amount: 165000,
      status: 'Filed',
      dueDate: '2023-12-31',
      filedDate: '2023-12-28'
    },
    {
      year: '2021-22',
      type: 'Income Tax',
      amount: 87000,
      status: 'Filed',
      dueDate: '2022-07-31',
      filedDate: '2022-07-25'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Income_Tax_Return_2023-24.pdf',
      type: 'Tax Return',
      uploadDate: '2024-07-15',
      size: '2.4 MB',
      status: 'Completed'
    },
    {
      id: '2',
      name: 'GST_Assessment_Q4.xlsx',
      type: 'GST Filing',
      uploadDate: '2024-04-18',
      size: '1.8 MB',
      status: 'Completed'
    },
    {
      id: '3',
      name: 'Audit_Report_2023.pdf',
      type: 'Audit Report',
      uploadDate: '2024-01-10',
      size: '4.2 MB',
      status: 'New'
    },
    {
      id: '4',
      name: 'TDS_Certificate_Q4.pdf',
      type: 'TDS Certificate',
      uploadDate: '2024-01-05',
      size: '856 KB',
      status: 'Reviewed'
    }
  ];

  const yearlyData = [
    { year: '2021-22', income: 2400000, tax: 87000, savings: 45000 },
    { year: '2022-23', income: 2800000, tax: 98000, savings: 52000 },
    { year: '2023-24', income: 3200000, tax: 125000, savings: 68000 }
  ];

  const upcomingDeadlines = [
    { task: 'GST Return Q1 2024-25', date: '2024-07-20', type: 'GST' },
    { task: 'TDS Return Q1 2024-25', date: '2024-07-31', type: 'TDS' },
    { task: 'Advance Tax Q2', date: '2024-09-15', type: 'Income Tax' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Filed':
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Under Review':
      case 'Reviewed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Pending':
      case 'New':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTaxTypeIcon = (type: string) => {
    if (type.includes('Income Tax')) return Receipt;
    if (type.includes('GST')) return CreditCard;
    if (type.includes('TDS')) return Briefcase;
    return FileText;
  };

  const currentYearTax = taxRecords.filter(record => record.year === selectedYear);
  const totalTaxPaid = currentYearTax.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#628ca2]/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.1, 0.4, 0.1],
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-light tracking-wider mb-4">CLIENT PORTAL</h1>
              <p className="text-white/60 font-light">Welcome back, {clientInfo.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white px-6 py-3 font-light tracking-wider"
              >
                <Bell className="mr-2 w-5 h-5" />
                NOTIFICATIONS
              </Button>
              <Button
                variant="outline"
                className="border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white px-6 py-3 font-light tracking-wider"
              >
                <Settings className="mr-2 w-5 h-5" />
                SETTINGS
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-red-500/40 text-red-400 bg-transparent hover:bg-red-500 hover:text-white px-6 py-3 font-light tracking-wider"
              >
                LOGOUT
              </Button>
            </div>
          </div>

          {/* Client Info Card */}
          <Card className="bg-black/50 border-[#628ca2]/20 mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-light text-[#628ca2] mb-4">CLIENT DETAILS</h3>
                  <div className="space-y-2 text-white/60">
                    <div>ID: {clientInfo.clientId}</div>
                    <div>Email: {clientInfo.email}</div>
                    <div>Phone: {clientInfo.phone}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-light text-[#628ca2] mb-4">BUSINESS INFO</h3>
                  <div className="space-y-2 text-white/60">
                    <div>Type: {clientInfo.businessType}</div>
                    <div>GST: {clientInfo.gstNumber}</div>
                    <div>PAN: {clientInfo.panNumber}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-light text-[#628ca2] mb-4">ACCOUNT STATUS</h3>
                  <div className="space-y-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
                      ACTIVE
                    </Badge>
                    <div className="text-white/60 text-sm">Last Login: Today, 10:30 AM</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="bg-black/50 border border-[#628ca2]/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <Home className="mr-2 w-4 h-4" />
              DASHBOARD
            </TabsTrigger>
            <TabsTrigger value="tax-records" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <BarChart3 className="mr-2 w-4 h-4" />
              TAX RECORDS
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <FileText className="mr-2 w-4 h-4" />
              DOCUMENTS
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <PieChart className="mr-2 w-4 h-4" />
              ANALYTICS
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-[#628ca2]" />
                    <ArrowUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-light text-white mb-2">₹{(totalTaxPaid / 1000).toFixed(0)}K</div>
                  <div className="text-white/60 font-light text-sm">Total Tax Paid ({selectedYear})</div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-light text-white mb-2">{documents.length}</div>
                  <div className="text-white/60 font-light text-sm">Total Documents</div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Receipt className="w-8 h-8 text-green-400" />
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-light text-white mb-2">{currentYearTax.length}</div>
                  <div className="text-white/60 font-light text-sm">Tax Filings ({selectedYear})</div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-yellow-400" />
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-light text-white mb-2">{upcomingDeadlines.length}</div>
                  <div className="text-white/60 font-light text-sm">Upcoming Deadlines</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-black/50 border-[#628ca2]/20">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-white flex items-center">
                    <Calendar className="mr-3 w-6 h-6 text-[#628ca2]" />
                    UPCOMING DEADLINES
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 border border-[#628ca2]/30 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-[#628ca2]" />
                          </div>
                          <div>
                            <h4 className="text-white font-light">{deadline.task}</h4>
                            <p className="text-white/60 text-sm">Due: {deadline.date}</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border">
                          {deadline.type}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tax Records Tab */}
          <TabsContent value="tax-records" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Year Selector */}
              <div className="flex items-center space-x-4 mb-8">
                <label className="text-white/80 font-light tracking-wider">SELECT YEAR:</label>
                <div className="flex space-x-2">
                  {['2023-24', '2022-23', '2021-22'].map(year => (
                    <Button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      variant={selectedYear === year ? "default" : "outline"}
                      className={selectedYear === year 
                        ? "bg-[#628ca2] text-white" 
                        : "border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white"
                      }
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tax Records Grid */}
              <div className="space-y-4">
                {currentYearTax.map((record, index) => {
                  const IconComponent = getTaxTypeIcon(record.type);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="w-16 h-16 border border-[#628ca2]/30 flex items-center justify-center">
                                <IconComponent className="w-8 h-8 text-[#628ca2]" />
                              </div>
                              <div>
                                <h4 className="text-xl font-light text-white mb-2">{record.type}</h4>
                                <div className="text-white/60 text-sm space-y-1">
                                  <div>Year: {record.year}</div>
                                  <div>Due Date: {record.dueDate}</div>
                                  {record.filedDate && <div>Filed: {record.filedDate}</div>}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-light text-[#628ca2] mb-2">
                                ₹{record.amount.toLocaleString()}
                              </div>
                              <Badge className={`${getStatusColor(record.status)} border`}>
                                {record.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ClientFileViewer clientId={clientId} />
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <Card className="bg-black/50 border-[#628ca2]/20">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-white">YEARLY TAX TRENDS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {yearlyData.map((data, index) => (
                      <div key={data.year} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 font-light">{data.year}</span>
                          <span className="text-[#628ca2] font-light">₹{(data.tax / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="w-full h-3 bg-black border border-[#628ca2]/20">
                          <motion.div
                            className="h-full bg-[#628ca2]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.tax / 125000) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                        <div className="text-xs text-white/50">
                          Income: ₹{(data.income / 100000).toFixed(1)}L | Savings: ₹{(data.savings / 1000).toFixed(0)}K
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#628ca2]/20">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-white">TAX BREAKDOWN</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-light text-[#628ca2] mb-2">
                        ₹{(totalTaxPaid / 1000).toFixed(0)}K
                      </div>
                      <div className="text-white/60 text-sm">Total Tax ({selectedYear})</div>
                    </div>
                    <div className="space-y-4">
                      {currentYearTax.map((record, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">{record.type}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 h-2 bg-black border border-[#628ca2]/20">
                              <motion.div
                                className="h-full bg-[#628ca2]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(record.amount / totalTaxPaid) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <span className="text-[#628ca2] text-sm font-light">
                              ₹{(record.amount / 1000).toFixed(0)}K
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}