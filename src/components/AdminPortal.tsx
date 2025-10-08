import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Upload, FileText, BarChart3, Settings, Search, 
  Filter, Download, Eye, Plus, X, Calendar, TrendingUp,
  DollarSign, ChevronDown, Edit, Trash2, Send, Bell
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import AdminFileUpload from './AdminFileUpload';
import AdminFileViewer from './AdminFileViewer';

interface AdminPortalProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  totalTaxesFiled: number;
  documentsCount: number;
  revenue: number;
}

interface Document {
  id: string;
  clientId: string;
  clientName: string;
  fileName: string;
  type: string;
  uploadDate: string;
  size: string;
  status: 'Sent' | 'Pending' | 'Reviewed';
}

export default function AdminPortal({ onNavigate, onLogout }: AdminPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    address: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clients: Client[] = [
    {
      id: '1',
      name: 'Rajesh Kumar Enterprises',
      email: 'rajesh@rke.com',
      phone: '+91 98765 43210',
      businessType: 'Manufacturing',
      status: 'Active',
      lastLogin: '2024-01-15',
      totalTaxesFiled: 12,
      documentsCount: 45,
      revenue: 2500000
    },
    {
      id: '2',
      name: 'Priya Tech Solutions',
      email: 'contact@priyatech.com',
      phone: '+91 87654 32109',
      businessType: 'IT Services',
      status: 'Active',
      lastLogin: '2024-01-14',
      totalTaxesFiled: 8,
      documentsCount: 32,
      revenue: 1800000
    },
    {
      id: '3',
      name: 'Sharma Traders Pvt Ltd',
      email: 'admin@sharmatraders.in',
      phone: '+91 76543 21098',
      businessType: 'Trading',
      status: 'Pending',
      lastLogin: '2024-01-10',
      totalTaxesFiled: 15,
      documentsCount: 67,
      revenue: 3200000
    },
    {
      id: '4',
      name: 'Green Earth Consultancy',
      email: 'info@greenearth.co.in',
      phone: '+91 65432 10987',
      businessType: 'Consulting',
      status: 'Active',
      lastLogin: '2024-01-13',
      totalTaxesFiled: 6,
      documentsCount: 28,
      revenue: 950000
    },
    {
      id: '5',
      name: 'Digital Marketing Hub',
      email: 'hello@dmhub.com',
      phone: '+91 54321 09876',
      businessType: 'Marketing',
      status: 'Inactive',
      lastLogin: '2024-01-05',
      totalTaxesFiled: 10,
      documentsCount: 38,
      revenue: 1400000
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      clientId: '1',
      clientName: 'Rajesh Kumar Enterprises',
      fileName: 'Q3_Financial_Report.pdf',
      type: 'Financial Report',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      status: 'Sent'
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'Priya Tech Solutions',
      fileName: 'GST_Return_December.xlsx',
      type: 'GST Return',
      uploadDate: '2024-01-14',
      size: '1.8 MB',
      status: 'Reviewed'
    },
    {
      id: '3',
      clientId: '1',
      clientName: 'Rajesh Kumar Enterprises',
      fileName: 'Audit_Report_2023.pdf',
      type: 'Audit Report',
      uploadDate: '2024-01-12',
      size: '4.2 MB',
      status: 'Pending'
    }
  ];

  const stats = [
    { label: 'Total Clients', value: '125', change: '+8%', icon: Users, color: 'text-[#628ca2]' },
    { label: 'Active Cases', value: '89', change: '+12%', icon: FileText, color: 'text-green-400' },
    { label: 'Documents Processed', value: '2,847', change: '+23%', icon: BarChart3, color: 'text-blue-400' },
    { label: 'Revenue (Month)', value: '₹15.2L', change: '+18%', icon: DollarSign, color: 'text-yellow-400' }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.businessType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = () => {
    if (!selectedClient) {
      alert('Please select a client first');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedClient) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setShowUploadModal(false);
            alert(`Document "${file.name}" uploaded successfully to ${selectedClient.name}!`);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleCreateClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      alert('Please fill all required fields');
      return;
    }
    
    // Simulate client creation
    alert(`Client "${newClient.name}" created successfully!`);
    setShowClientModal(false);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      businessType: '',
      gstNumber: '',
      panNumber: '',
      address: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Inactive': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Sent': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Reviewed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
              <h1 className="text-4xl font-light tracking-wider mb-4">ADMIN PORTAL</h1>
              <p className="text-white/60 font-light">Comprehensive client and document management system</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-[#628ca2] text-white hover:bg-white hover:text-black transition-all duration-500 px-8 py-3 font-light tracking-wider"
              >
                <Upload className="mr-3 w-5 h-5" />
                UPLOAD DOCUMENT
              </Button>
              <Button
                onClick={() => setShowClientModal(true)}
                variant="outline"
                className="border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white px-8 py-3 font-light tracking-wider"
              >
                <Plus className="mr-3 w-5 h-5" />
                ADD CLIENT
              </Button>
              <Button
                onClick={() => setShowSettingsModal(true)}
                variant="outline"
                className="border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white px-8 py-3 font-light tracking-wider"
              >
                <Settings className="mr-3 w-5 h-5" />
                SETTINGS
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-red-500/40 text-red-400 bg-transparent hover:bg-red-500 hover:text-white px-8 py-3 font-light tracking-wider"
              >
                LOGOUT
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className={`w-8 h-8 ${stat.color}`} />
                        <span className="text-green-400 text-sm font-light">{stat.change}</span>
                      </div>
                      <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
                      <div className="text-white/60 font-light text-sm tracking-wider">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="clients" className="space-y-8">
          <TabsList className="bg-black/50 border border-[#628ca2]/20">
            <TabsTrigger value="clients" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <Users className="mr-2 w-4 h-4" />
              CLIENTS
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <FileText className="mr-2 w-4 h-4" />
              DOCUMENTS
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <Upload className="mr-2 w-4 h-4" />
              UPLOAD
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
              <BarChart3 className="mr-2 w-4 h-4" />
              ANALYTICS
            </TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-4 text-white/40 w-5 h-5" />
                  <Input
                    placeholder="Search clients by name, email, or business type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-14"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48 bg-black/50 border-[#628ca2]/30 text-white h-14">
                    <Filter className="mr-2 w-4 h-4" />
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clients Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredClients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`cursor-pointer ${selectedClient?.id === client.id ? 'ring-2 ring-[#628ca2]' : ''}`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-light text-white">{client.name}</CardTitle>
                          <Badge className={`${getStatusColor(client.status)} border`}>
                            {client.status}
                          </Badge>
                        </div>
                        <p className="text-white/60 text-sm">{client.businessType}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-white/60">
                            <span className="w-2 h-2 bg-[#628ca2] rounded-full mr-3"></span>
                            {client.email}
                          </div>
                          <div className="flex items-center text-sm text-white/60">
                            <span className="w-2 h-2 bg-[#628ca2] rounded-full mr-3"></span>
                            {client.phone}
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#628ca2]/20">
                            <div className="text-center">
                              <div className="text-xl font-light text-[#628ca2]">{client.totalTaxesFiled}</div>
                              <div className="text-xs text-white/60">Tax Files</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-light text-[#628ca2]">{client.documentsCount}</div>
                              <div className="text-xs text-white/60">Documents</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-light text-[#628ca2]">₹{(client.revenue / 100000).toFixed(1)}L</div>
                              <div className="text-xs text-white/60">Revenue</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
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
              <AdminFileViewer />
            </motion.div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AdminFileUpload />
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-black/50 border-[#628ca2]/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-light text-white">CLIENT DISTRIBUTION</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Manufacturing', 'IT Services', 'Trading', 'Consulting', 'Marketing'].map((type, index) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-white/60">{type}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 h-2 bg-black border border-[#628ca2]/20">
                              <motion.div
                                className="h-full bg-[#628ca2]"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.random() * 80 + 20}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <span className="text-[#628ca2] text-sm font-light">{Math.floor(Math.random() * 30 + 10)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/50 border-[#628ca2]/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-light text-white">MONTHLY PERFORMANCE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-light text-[#628ca2] mb-2">₹15.2L</div>
                        <div className="text-white/60 text-sm">Total Revenue</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-light text-white">89</div>
                          <div className="text-white/60 text-sm">Active Cases</div>
                        </div>
                        <div>
                          <div className="text-2xl font-light text-white">2,847</div>
                          <div className="text-white/60 text-sm">Documents</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-[#628ca2]/30 p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-light text-white">UPLOAD DOCUMENT</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">SELECT CLIENT</label>
                <Select onValueChange={(clientId) => {
                  const client = clients.find(c => c.id === clientId);
                  setSelectedClient(client || null);
                }}>
                  <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                    <SelectValue placeholder="Choose client..." />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClient && (
                <div className="border border-[#628ca2]/20 p-4">
                  <div className="text-[#628ca2] font-light">{selectedClient.name}</div>
                  <div className="text-white/60 text-sm">{selectedClient.email}</div>
                </div>
              )}

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                <Button
                  onClick={handleFileUpload}
                  disabled={!selectedClient || isUploading}
                  className="w-full bg-[#628ca2] text-white hover:bg-white hover:text-black transition-all duration-500 py-4"
                >
                  <Upload className="mr-3 w-5 h-5" />
                  {isUploading ? 'UPLOADING...' : 'SELECT FILE TO UPLOAD'}
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Upload Progress</span>
                    <span className="text-[#628ca2]">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-black border border-[#628ca2]/20">
                    <motion.div
                      className="h-full bg-[#628ca2]"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Client Modal */}
      {showClientModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-[#628ca2]/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-white">ADD NEW CLIENT</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClientModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">CLIENT NAME *</label>
                <Input
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">EMAIL ADDRESS *</label>
                <Input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">PHONE NUMBER *</label>
                <Input
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">BUSINESS TYPE</label>
                <Select onValueChange={(value) => setNewClient({...newClient, businessType: value})}>
                  <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="it-services">IT Services</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">GST NUMBER</label>
                <Input
                  value={newClient.gstNumber}
                  onChange={(e) => setNewClient({...newClient, gstNumber: e.target.value})}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Enter GST number"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-3 font-light tracking-wider">PAN NUMBER</label>
                <Input
                  value={newClient.panNumber}
                  onChange={(e) => setNewClient({...newClient, panNumber: e.target.value})}
                  className="bg-black/50 border-[#628ca2]/30 text-white"
                  placeholder="Enter PAN number"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-white/80 mb-3 font-light tracking-wider">ADDRESS</label>
              <textarea
                value={newClient.address}
                onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                className="w-full p-3 bg-black/50 border border-[#628ca2]/30 text-white placeholder-white/40 font-light"
                rows={3}
                placeholder="Enter complete address"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setShowClientModal(false)}
                className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
              >
                CANCEL
              </Button>
              <Button
                onClick={handleCreateClient}
                className="bg-[#628ca2] text-white hover:bg-white hover:text-black"
              >
                CREATE CLIENT
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-[#628ca2]/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-white">ADMIN SETTINGS</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettingsModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-8">
              {/* Profile Settings */}
              <div>
                <h4 className="text-lg font-light text-[#628ca2] mb-4">PROFILE SETTINGS</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2">Admin Name</label>
                    <Input className="bg-black/50 border-[#628ca2]/30 text-white" defaultValue="CA Dinkar Sahni" />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2">Email</label>
                    <Input className="bg-black/50 border-[#628ca2]/30 text-white" defaultValue="admin@sahnico.com" />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2">Phone</label>
                    <Input className="bg-black/50 border-[#628ca2]/30 text-white" defaultValue="+91 98765 43210" />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h4 className="text-lg font-light text-[#628ca2] mb-4">NOTIFICATION SETTINGS</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="accent-[#628ca2]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Client Updates</span>
                    <input type="checkbox" defaultChecked className="accent-[#628ca2]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Document Alerts</span>
                    <input type="checkbox" defaultChecked className="accent-[#628ca2]" />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h4 className="text-lg font-light text-[#628ca2] mb-4">SECURITY SETTINGS</h4>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                  >
                    CHANGE PASSWORD
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                  >
                    ENABLE TWO-FACTOR AUTHENTICATION
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setShowSettingsModal(false)}
                className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
              >
                CANCEL
              </Button>
              <Button
                onClick={() => {
                  alert('Settings saved successfully!');
                  setShowSettingsModal(false);
                }}
                className="bg-[#628ca2] text-white hover:bg-white hover:text-black"
              >
                SAVE SETTINGS
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}