// Notification System - Central State Management
export interface Notification {
  id: string;
  type: 'document' | 'message' | 'alert' | 'deadline';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  from: 'admin' | 'system';
  clientId?: string;
  documentName?: string;
}

// Simulated notification store (in real app, this would be a database)
class NotificationStore {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    };
    
    this.notifications.unshift(newNotification);
    this.notifyListeners();
    return newNotification;
  }

  getNotifications(clientId?: string): Notification[] {
    if (clientId) {
      return this.notifications.filter(n => !n.clientId || n.clientId === clientId);
    }
    return this.notifications;
  }

  markAsRead(id: string) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  markAllAsRead(clientId?: string) {
    this.notifications.forEach(n => {
      if (!clientId || n.clientId === clientId) {
        n.read = true;
      }
    });
    this.notifyListeners();
  }

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Add some initial demo notifications
  seedDemoNotifications() {
    this.addNotification({
      type: 'document',
      title: 'New Document Uploaded',
      message: 'Your Tax Return for AY 2024-25 has been uploaded',
      from: 'admin',
      clientId: 'demo-client',
      documentName: 'ITR_AY2024-25.pdf'
    });

    this.addNotification({
      type: 'deadline',
      title: 'Upcoming Deadline',
      message: 'GST Filing deadline is approaching - Due on 20th January',
      from: 'system',
      clientId: 'demo-client'
    });

    this.addNotification({
      type: 'message',
      title: 'Message from CA',
      message: 'Please provide additional documents for audit completion',
      from: 'admin',
      clientId: 'demo-client'
    });
  }
}

export const notificationStore = new NotificationStore();

// Seed demo notifications on initialization
if (typeof window !== 'undefined') {
  notificationStore.seedDemoNotifications();
}
