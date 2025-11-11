import 'zone.js';
import 'zone.js/testing';

import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize TestBed once before all tests
beforeAll(() => {
  try {
    getTestBed().resetTestEnvironment();
  } catch (e) {
    // Not initialized yet
  }
  
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
});

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  describe('✅ 1. Validación de Formulario', () => {
    it('debería inicializar con formulario vacío', () => {
      expect(component.formData().name).toBe('');
      expect(component.formData().email).toBe('');
      expect(component.formData().subject).toBe('');
      expect(component.formData().message).toBe('');
    });

    it('debería mostrar error si el formulario está vacío', async () => {
      await component.onSubmit();
      
      expect(component.errorMessage()).toBe('Por favor completa todos los campos requeridos.');
      expect(component.loading()).toBe(false);
    });

    it('debería validar que todos los campos sean requeridos', async () => {
      // Solo nombre
      component.formData.set({
        name: 'Juan',
        email: '',
        subject: '',
        message: ''
      });
      
      await component.onSubmit();
      expect(component.errorMessage()).toBeTruthy();

      // Limpiar error
      component.errorMessage.set(null);

      // Todos los campos completos
      component.formData.set({
        name: 'Juan',
        email: 'juan@test.com',
        subject: 'Test',
        message: 'Mensaje de prueba'
      });
      
      // Mock reCAPTCHA para esta prueba
      (window as any).grecaptcha = {
        ready: (callback: () => void) => callback(),
        execute: vi.fn().mockResolvedValue('test-token')
      };

      // No debería mostrar error de validación inicial
      expect(component.errorMessage()).toBeFalsy();
    });
  });

  describe('✅ 2. Envío de Email con reCAPTCHA', () => {
    beforeEach(() => {
      // Mock de grecaptcha con promesa correcta
      (window as any).grecaptcha = {
        ready: (callback: () => void) => {
          // Ejecutar callback inmediatamente
          Promise.resolve().then(callback);
        },
        execute: vi.fn(() => Promise.resolve('mock-recaptcha-token'))
      };
    });

    it('debería enviar formulario con reCAPTCHA token', async () => {
      component.formData.set({
        name: 'Juan Urquiza',
        email: 'juan@hackeruna.com',
        subject: 'Prueba unitaria',
        message: 'Este es un mensaje de prueba'
      });

      // Ejecutar envío (no esperamos aún)
      component.onSubmit();
      
      // Verificar loading state
      expect(component.loading()).toBe(true);

      // Esperar a que la promesa de reCAPTCHA se resuelva y el HTTP request se ejecute
      await new Promise(resolve => setTimeout(resolve, 50));

      // Ahora sí esperar la petición HTTP
      const req = httpMock.expectOne('https://hackeruna.com/wp-json/hackeruna/v1/contact');
      
      // Verificar método y payload
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        name: 'Juan Urquiza',
        email: 'juan@hackeruna.com',
        subject: 'Prueba unitaria',
        message: 'Este es un mensaje de prueba',
        recaptchaToken: 'mock-recaptcha-token'
      });

      // Simular respuesta exitosa
      req.flush({
        status: 'mail_sent',
        message: 'Mensaje enviado correctamente'
      });

      // Esperar a que Angular procese la respuesta
      await new Promise(resolve => setTimeout(resolve, 10));

      // Verificar estado después del envío
      expect(component.loading()).toBe(false);
      expect(component.successMessage()).toBe('¡Mensaje enviado correctamente! Te contactaremos pronto.');
      expect(component.errorMessage()).toBeNull();
      
      // Verificar que el formulario se resetea
      expect(component.formData().name).toBe('');
      expect(component.formData().email).toBe('');
    });

    it('debería manejar error de envío', async () => {
      component.formData.set({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test message'
      });

      component.onSubmit();

      await new Promise(resolve => setTimeout(resolve, 50));

      const req = httpMock.expectOne('https://hackeruna.com/wp-json/hackeruna/v1/contact');
      
      // Simular error del servidor
      req.flush(
        { status: 'error', message: 'Email inválido' },
        { status: 400, statusText: 'Bad Request' }
      );

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.loading()).toBe(false);
      expect(component.errorMessage()).toBeTruthy();
      expect(component.successMessage()).toBeNull();
    });

    it('debería usar token dummy si reCAPTCHA no está disponible', async () => {
      // Remover grecaptcha
      delete (window as any).grecaptcha;

      component.formData.set({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test'
      });

      component.onSubmit();

      await new Promise(resolve => setTimeout(resolve, 50));

      const req = httpMock.expectOne('https://hackeruna.com/wp-json/hackeruna/v1/contact');
      
      // Verificar que usa token dummy
      expect(req.request.body.recaptchaToken).toBe('dummy-token-development');

      req.flush({ status: 'mail_sent' });
      await new Promise(resolve => setTimeout(resolve, 10));
    });
  });

  describe('✅ 3. Integración con Backend', () => {
    it('debería enviar petición al endpoint correcto', async () => {
      (window as any).grecaptcha = {
        ready: (callback: () => void) => Promise.resolve().then(callback),
        execute: vi.fn(() => Promise.resolve('token'))
      };

      component.formData.set({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test'
      });

      component.onSubmit();

      await new Promise(resolve => setTimeout(resolve, 50));

      const req = httpMock.expectOne((request) => {
        return request.url === 'https://hackeruna.com/wp-json/hackeruna/v1/contact' &&
               request.method === 'POST';
      });

      expect(req.request.url).toBe('https://hackeruna.com/wp-json/hackeruna/v1/contact');
      
      req.flush({ status: 'mail_sent' });
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    it('debería enviar Content-Type correcto', async () => {
      (window as any).grecaptcha = {
        ready: (callback: () => void) => Promise.resolve().then(callback),
        execute: vi.fn(() => Promise.resolve('token'))
      };

      component.formData.set({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test'
      });

      component.onSubmit();

      await new Promise(resolve => setTimeout(resolve, 50));

      const req = httpMock.expectOne('https://hackeruna.com/wp-json/hackeruna/v1/contact');
      
      // Verificar headers (Angular envía JSON por defecto)
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      
      req.flush({ status: 'mail_sent' });
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Verificar que no hay peticiones pendientes
      httpMock.verify();
    });
  });
});
