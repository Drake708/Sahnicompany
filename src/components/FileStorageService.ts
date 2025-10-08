// File Storage Service using localStorage for demo purposes
// In production, this would connect to a real backend

export interface StoredFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  clientId: string;
  clientName: string;
  category: string;
  status: 'New' | 'Reviewed' | 'Completed';
  fileData?: string; // Base64 encoded file data
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan: string;
  password: string;
  businessType: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdDate: string;
}

const STORAGE_KEY_FILES = 'sahni_co_files';
const STORAGE_KEY_CLIENTS = 'sahni_co_clients';

// Initialize with default client Simran
const initializeClients = () => {
  const existingClients = getClients();
  if (existingClients.length === 0) {
    const defaultClient: Client = {
      id: 'simran_001',
      name: 'Simran',
      email: 'simran@example.com',
      phone: '+91 98765 43210',
      pan: 'LOHPS7022A',
      password: 'lohps7022a24121998',
      businessType: 'Individual',
      status: 'Active',
      createdDate: new Date().toISOString()
    };
    saveClients([defaultClient]);
  }
};

// File operations
export const saveFile = (file: StoredFile): boolean => {
  try {
    const files = getFiles();
    files.push(file);
    localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(files));
    return true;
  } catch (error) {
    console.error('Error saving file:', error);
    return false;
  }
};

export const getFiles = (): StoredFile[] => {
  try {
    const filesJson = localStorage.getItem(STORAGE_KEY_FILES);
    return filesJson ? JSON.parse(filesJson) : [];
  } catch (error) {
    console.error('Error getting files:', error);
    return [];
  }
};

export const getFilesByClient = (clientId: string): StoredFile[] => {
  const files = getFiles();
  return files.filter(file => file.clientId === clientId);
};

export const deleteFile = (fileId: string): boolean => {
  try {
    const files = getFiles();
    const filteredFiles = files.filter(file => file.id !== fileId);
    localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(filteredFiles));
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

export const updateFileStatus = (fileId: string, status: 'New' | 'Reviewed' | 'Completed'): boolean => {
  try {
    const files = getFiles();
    const fileIndex = files.findIndex(file => file.id === fileId);
    if (fileIndex !== -1) {
      files[fileIndex].status = status;
      localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(files));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating file status:', error);
    return false;
  }
};

// Client operations
export const saveClients = (clients: Client[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(clients));
    return true;
  } catch (error) {
    console.error('Error saving clients:', error);
    return false;
  }
};

export const getClients = (): Client[] => {
  try {
    const clientsJson = localStorage.getItem(STORAGE_KEY_CLIENTS);
    return clientsJson ? JSON.parse(clientsJson) : [];
  } catch (error) {
    console.error('Error getting clients:', error);
    return [];
  }
};

export const addClient = (client: Client): boolean => {
  try {
    const clients = getClients();
    clients.push(client);
    return saveClients(clients);
  } catch (error) {
    console.error('Error adding client:', error);
    return false;
  }
};

export const getClientByPan = (pan: string): Client | null => {
  const clients = getClients();
  return clients.find(client => client.pan.toUpperCase() === pan.toUpperCase()) || null;
};

export const updateClient = (clientId: string, updates: Partial<Client>): boolean => {
  try {
    const clients = getClients();
    const clientIndex = clients.findIndex(client => client.id === clientId);
    if (clientIndex !== -1) {
      clients[clientIndex] = { ...clients[clientIndex], ...updates };
      return saveClients(clients);
    }
    return false;
  } catch (error) {
    console.error('Error updating client:', error);
    return false;
  }
};

export const deleteClient = (clientId: string): boolean => {
  try {
    const clients = getClients();
    const filteredClients = clients.filter(client => client.id !== clientId);
    return saveClients(filteredClients);
  } catch (error) {
    console.error('Error deleting client:', error);
    return false;
  }
};

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Initialize clients on module load
initializeClients();
