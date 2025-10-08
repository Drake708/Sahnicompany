import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Eye, Calendar, User, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getFilesByClient, updateFileStatus, type StoredFile } from './FileStorageService';
import { toast } from 'sonner@2.0.3';

interface ClientFileViewerProps {
  clientId: string;
}

export default function ClientFileViewer({ clientId }: ClientFileViewerProps) {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<StoredFile[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadFiles();
  }, [clientId]);

  useEffect(() => {
    applyFilters();
  }, [files, categoryFilter, statusFilter]);

  const loadFiles = () => {
    const clientFiles = getFilesByClient(clientId);
    setFiles(clientFiles);
  };

  const applyFilters = () => {
    let filtered = [...files];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(file => file.category === categoryFilter);
    }

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

  const handleDownload = (file: StoredFile) => {
    if (!file.fileData) {
      toast.error('File data not available');
      return;
    }

    try {
      // Create a download link
      const link = document.createElement('a');
      link.href = file.fileData;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update status to Reviewed if it was New
      if (file.status === 'New') {
        updateFileStatus(file.id, 'Reviewed');
        loadFiles();
      }

      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleView = (file: StoredFile) => {
    if (!file.fileData) {
      toast.error('File data not available');
      return;
    }

    try {
      // Open file in new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${file.fileName}</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  background: #000;
                }
                img {
                  max-width: 100%;
                  max-height: 100vh;
                }
                iframe {
                  width: 100vw;
                  height: 100vh;
                  border: none;
                }
              </style>
            </head>
            <body>
              ${file.fileType.startsWith('image/') 
                ? `<img src="${file.fileData}" alt="${file.fileName}" />` 
                : `<iframe src="${file.fileData}"></iframe>`
              }
            </body>
          </html>
        `);

        // Update status to Reviewed if it was New
        if (file.status === 'New') {
          updateFileStatus(file.id, 'Reviewed');
          loadFiles();
        }
      }

      toast.success('File opened in new window');
    } catch (error) {
      console.error('View error:', error);
      toast.error('Failed to view file');
    }
  };

  const categories = Array.from(new Set(files.map(f => f.category)));

  return (
    <Card className="bg-black/50 border-[#628ca2]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-light text-white flex items-center">
            <FileText className="mr-3 w-6 h-6 text-[#628ca2]" />
            YOUR DOCUMENTS ({filteredFiles.length})
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 bg-black/50 border-[#628ca2]/30 text-white">
                <Filter className="mr-2 w-4 h-4" />
                <SelectValue />
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
              <SelectTrigger className="w-48 bg-black/50 border-[#628ca2]/30 text-white">
                <Filter className="mr-2 w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredFiles.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 font-light">No documents found</p>
            <p className="text-white/30 text-sm mt-2">
              {categoryFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Documents uploaded by your CA will appear here'}
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
                <div className="flex items-center space-x-4">
                  <Badge className={`${getStatusColor(file.status)} border`}>
                    {file.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(file)}
                    className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    VIEW
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    DOWNLOAD
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
