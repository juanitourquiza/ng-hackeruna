import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GoogleAnalyticsService } from '../../core/services/google-analytics.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData = signal<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  recaptchaToken = signal<string | null>(null);

  // Endpoint personalizado de Hackeruna
  private CF7_ENDPOINT = 'https://backend.hackeruna.com/wp-json/hackeruna/v1/contact';
  private recaptchaSiteKey = environment.recaptchaV3SiteKey;
  
  private http = inject(HttpClient);
  private analytics = inject(GoogleAnalyticsService);

  constructor() {
    this.loadRecaptchaScript();
  }

  private loadRecaptchaScript(): void {
    if (!(window as any).grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  private getRecaptchaToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if ((window as any).grecaptcha) {
          (window as any).grecaptcha.ready(() => {
            (window as any).grecaptcha
              .execute(this.recaptchaSiteKey, { action: 'submit' })
              .then((token: string) => {
                resolve(token);
              })
              .catch((error: any) => {
                console.error('reCAPTCHA execute error:', error);
                reject(error);
              });
          });
        } else {
          // Si grecaptcha no está disponible, usar un token dummy para desarrollo
          console.warn('grecaptcha not loaded, using dummy token for development');
          resolve('dummy-token-development');
        }
      } catch (error) {
        console.error('reCAPTCHA error:', error);
        reject(error);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      this.errorMessage.set('Por favor completa todos los campos requeridos.');
      return;
    }

    this.loading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      // Obtener token de reCAPTCHA
      const recaptchaToken = await this.getRecaptchaToken();
      this.recaptchaToken.set(recaptchaToken);

      // Preparar datos como JSON
      const payload = {
        name: this.formData().name,
        email: this.formData().email,
        subject: this.formData().subject,
        message: this.formData().message,
        recaptchaToken: recaptchaToken
      };

      // Enviar como JSON
      this.http.post(this.CF7_ENDPOINT, payload).subscribe({
        next: (response: any) => {
          this.loading.set(false);
          if (response.status === 'mail_sent') {
            this.successMessage.set('¡Mensaje enviado correctamente! Te contactaremos pronto.');
            this.resetForm();
            
            // Track envío exitoso en Google Analytics
            this.analytics.trackContactFormSubmit(true);
          } else {
            this.errorMessage.set(response.message || 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
            
            // Track error en envío
            this.analytics.trackContactFormSubmit(false);
          }
        },
        error: (err) => {
          console.error('Error sending message:', err);
          this.loading.set(false);
          this.errorMessage.set(err.error?.message || 'Error al enviar el mensaje. Por favor intenta más tarde.');
          
          // Track error en Google Analytics
          this.analytics.trackContactFormSubmit(false);
          this.analytics.trackError(
            err.error?.message || 'Contact form submission failed',
            'ContactComponent'
          );
        }
      });
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      this.loading.set(false);
      this.errorMessage.set('Error de verificación. Por favor intenta nuevamente.');
    }
  }

  private validateForm(): boolean {
    const data = this.formData();
    return !!(data.name && data.email && data.subject && data.message);
  }

  private resetForm(): void {
    this.formData.set({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  }

  updateName(value: string): void {
    this.formData.update(data => ({ ...data, name: value }));
  }

  updateEmail(value: string): void {
    this.formData.update(data => ({ ...data, email: value }));
  }

  updateSubject(value: string): void {
    this.formData.update(data => ({ ...data, subject: value }));
  }

  updateMessage(value: string): void {
    this.formData.update(data => ({ ...data, message: value }));
  }
}
