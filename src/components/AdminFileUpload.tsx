import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { 
  saveFile, 
  getClients, 
  fileToBase64, 
  formatFileSize,
  type StoredFile,
  type Client 
} from './FileStorageService';
import { toast } from 'sonner@2.0.3';

export default function AdminFileUpload() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clients = getClients();

  const categories = [
    'Tax Return',
    'GST Filing',
    'Audit Report',
    'TDS Certificate',
    'Financial Statement',
    'ROC Filing',
    'Legal Document',
    'Other'
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB for localStorage limitations)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedClient) {
      toast.error('Please select a client');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Convert file to base64
      const fileData = await fileToBase64(selectedFile);

      const newFile: StoredFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fileName: selectedFile.name,
        fileType: selectedFile.type || 'application/octet-stream',
        fileSize: formatFileSize(selectedFile.size),
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Admin',
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        category: category,
        status: 'New',
        fileData: fileData
      };

      // Save to localStorage
      const success = saveFile(newFile);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (success) {
        setTimeout(() => {
          toast.success(`File uploaded successfully to ${selectedClient.name}'s account`);
          setIsUploading(false);
          setUploadProgress(0);
          setSelectedFile(null);
          setCategory('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 500);
      } else {
        throw new Error('Failed to save file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="bg-black/50 border-[#628ca2]/20">
      <CardHeader>
        <CardTitle className="text-xl font-light text-white flex items-center">
          <Upload className="mr-3 w-6 h-6 text-[#628ca2]" />
          UPLOAD DOCUMENT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client Selection */}
        <div>
          <Label className="text-white/80 font-light tracking-wider mb-3 block">SELECT CLIENT *</Label>
          <Select 
            value={selectedClient?.id || ''} 
            onValueChange={(clientId) => {
              const client = clients.find(c => c.id === clientId);
              setSelectedClient(client || null);
            }}
          >
            <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
              <SelectValue placeholder="Choose a client..." />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name} - {client.pan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Client Info */}
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#628ca2]/20 p-4 bg-[#628ca2]/5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#628ca2] font-light">{selectedClient.name}</div>
                <div className="text-white/60 text-sm">{selectedClient.email}</div>
                <div className="text-white/60 text-sm">PAN: {selectedClient.pan}</div>
              </div>
              <div className="text-white/40 text-sm">
                {selectedClient.businessType}
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Selection */}
        <div>
          <Label className="text-white/80 font-light tracking-wider mb-3 block">DOCUMENT CATEGORY *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div>
          <Label className="text-white/80 font-light tracking-wider mb-3 block">SELECT FILE *</Label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
          
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#628ca2]/30 hover:border-[#628ca2]/60 transition-all duration-300 p-12 text-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-[#628ca2]/60 mx-auto mb-4" />
              <p className="text-white/60 font-light">Click to browse files</p>
              <p className="text-white/40 text-sm mt-2">
                Supported: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#628ca2]/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-[#628ca2]/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#628ca2]" />
                  </div>
                  <div>
                    <div className="text-white font-light">{selectedFile.name}</div>
                    <div className="text-white/60 text-sm">
                      {formatFileSize(selectedFile.size)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                  className="text-white/60 hover:text-red-400"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Uploading...</span>
              <span className="text-[#628ca2]">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </motion.div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedClient || !selectedFile || !category || isUploading}
          className="w-full bg-[#628ca2] text-white hover:bg-white hover:text-black transition-all duration-500 py-6"
        >
          {isUploading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <AlertCircle className="w-5 h-5" />
              </motion.div>
              UPLOADING...
            </>
          ) : (
            <>
              <Upload className="mr-3 w-5 h-5" />
              UPLOAD DOCUMENT
            </>
          )}
        </Button>

        {/* Instructions */}
        <div className="border-t border-[#628ca2]/20 pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#628ca2] flex-shrink-0 mt-0.5" />
            <div className="text-white/60 text-sm space-y-2">
              <p>Upload instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-white/40">
                <li>Select the client who will receive this document</li>
                <li>Choose appropriate document category</li>
                <li>Files are stored securely and accessible to the client</li>
                <li>Maximum file size: 10MB</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
