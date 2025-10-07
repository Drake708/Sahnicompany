// src/EmailService.ts
import emailjs from '@emailjs/browser';

interface EmailData {
  to_email: string;
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
  [key: string]: string | undefined;
}

class EmailService {
  private serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
  private contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID!;
  private forgotPasswordTemplateId = import.meta.env.VITE_EMAILJS_FORGOT_TEMPLATE_ID!;
  private publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;
  private adminEmail = import.meta.env.VITE_ADMIN_EMAIL!;

  /** CONTACT FORM EMAIL **/
  async sendContactFormEmail(data: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    businessType?: string;
    service?: string;
    message: string;
  }): Promise<boolean> {
    try {
      console.log('📩 Sending contact form email to:', this.adminEmail);

      const response = await emailjs.send(
        this.serviceId,
        this.contactTemplateId,
        {
          to_email: this.adminEmail,
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          company: data.company || 'N/A',
          business_type: data.businessType || 'N/A',
          service: data.service || 'N/A',
          message: data.message,
          submission_time: new Date().toLocaleString('en-IN'),
        },
        this.publicKey
      );

      console.log('✅ Contact email sent:', response.status, response.text);
      return true;
    } catch (error) {
      console.error('❌ Error sending contact email:', error);
      return false;
    }
  }

  /** FORGOT PASSWORD EMAIL **/
  async sendForgotPasswordEmail(data: {
    name: string;
    email: string;
    phone: string;
    pan: string;
    clientId?: string;
  }): Promise<boolean> {
    try {
      console.log('📩 Sending forgot password email to:', this.adminEmail);
      console.log('Reset request data:', data);

      const response = await emailjs.send(
        this.serviceId,
        this.forgotPasswordTemplateId,
        {
          to_email: this.adminEmail,
          client_name: data.name,
          client_email: data.email,
          client_phone: data.phone,
          client_pan: data.pan,
          client_id: data.clientId || 'N/A',
          request_time: new Date().toLocaleString('en-IN'),
        },
        this.publicKey
      );

      console.log('✅ Forgot password email sent:', response.status, response.text);
      return true;
    } catch (error: any) {
      console.error('❌ Error sending forgot password email:', error);
      alert(`Error sending email: ${error?.text || error?.message || 'Unknown error'}`);
      return false;
    }
  }

  /** GENERIC NOTIFICATION EMAIL **/
  async sendNotificationEmail(data: {
    clientEmail: string;
    clientName: string;
    subject: string;
    message: string;
    notificationType: string;
  }): Promise<boolean> {
    try {
      console.log('📩 Sending notification to client:', data.clientEmail);

      const response = await emailjs.send(
        this.serviceId,
        this.contactTemplateId, // You can create a dedicated template later if needed
        {
          to_email: data.clientEmail,
          from_name: 'Sahni & Co',
          subject: data.subject,
          message: data.message,
          notification_type: data.notificationType,
          sent_at: new Date().toLocaleString('en-IN'),
        },
        this.publicKey
      );

      console.log('✅ Notification sent:', response.status, response.text);
      return true;
    } catch (error) {
      console.error('❌ Error sending notification:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
