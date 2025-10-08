import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Eye, Trash2, Calendar, User, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getFiles, deleteFile, updateFileStatus, getClients, type StoredFile } from './FileStorageService';
import { toast } from 'sonner@2.0.3';

export default function AdminFileViewer() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<StoredFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const clients = getClients();

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [files, searchTerm, clientFilter, categoryFilter, statusFilter]);

  const loadFiles = () => {
    const allFiles = getFiles();
    setFiles(allFiles);
  };

  const applyFilters = () => {
    let filtered = [...files];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Client filter
    if (clientFilter !== 'all') {
      filtered = filtered.filter(file => file.clientId === clientFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(file => file.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(file => file.status === statusFilter);
    }

    // Sort by upload date (newest first)
    filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    setFilteredFiles(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Reviewed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'New':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleStatusChange = (fileId: string, newStatus: 'New' | 'Reviewed' | 'Completed') => {
    if (updateFileStatus(fileId, newStatus)) {
      toast.success('File status updated');
      loadFiles();
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = (file: StoredFile) => {
    if (window.confirm(`Are you sure you want to delete "${file.fileName}"?`)) {
      if (deleteFile(file.id)) {
        toast.success('File deleted successfully');
        loadFiles();
      } else {
        toast.error('Failed to delete file');
      }
    }
  };

  const handleDownload = (file: StoredFile) => {
    if (!file.fileData) {
      toast.error('File data not available');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = file.fileData;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const categories = Array.from(new Set(files.map(f => f.category)));

  return (
    <Card className="bg-black/50 border-[#628ca2]/20">
      <CardHeader>
        <CardTitle className="text-xl font-light text-white flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-3 w-6 h-6 text-[#628ca2]" />
            ALL DOCUMENTS ({filteredFiles.length})
          </div>
        </CardTitle>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-white/40 w-4 h-4" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40"
            />
          </div>

          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
              <Filter className="mr-2 w-4 h-4" />
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
              <Filter className="mr-2 w-4 h-4" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
              <Filter className="mr-2 w-4 h-4" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Reviewed">Reviewed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredFiles.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 font-light">No documents found</p>
            <p className="text-white/30 text-sm mt-2">
              {searchTerm || clientFilter !== 'all' || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Upload documents to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center justify-between p-6 border border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-300"
              >
                <div className="flex items-center space-x-6 flex-1">
                  <div className="w-14 h-14 border border-[#628ca2]/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-[#628ca2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-light truncate mb-1">{file.fileName}</h4>
                    <p className="text-[#628ca2] text-sm mb-1">{file.clientName}</p>
                    <div className="flex items-center space-x-4 text-xs text-white/40">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {file.uploadedBy}
                      </div>
                      <span>{file.fileSize}</span>
                      <span className="px-2 py-0.5 bg-[#628ca2]/20 text-[#628ca2] rounded">
                        {file.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Select
                    value={file.status}
                    onValueChange={(value) => handleStatusChange(file.id, value as 'New' | 'Reviewed' | 'Completed')}
                  >
                    <SelectTrigger className="w-32 bg-black/50 border-[#628ca2]/30 text-white h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Reviewed">Reviewed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(file)}
                    className="border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
