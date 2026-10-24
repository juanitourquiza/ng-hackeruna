import 'zone.js';
import 'zone.js/testing';

import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { FooterComponent } from './footer.component';
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

// Transloco only stamps the *transloco template once the lang loads, so the
// translations are bundled inline via TranslocoTestingModule with preloadLangs.
const esTranslation = {
  footer: {
    copyright: 'Todos los derechos reservados',
    privacy: 'Privacidad',
    terms: 'Términos'
  }
};

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        TranslocoTestingModule.forRoot({
          langs: { es: esTranslation, en: esTranslation },
          preloadLangs: true,
          translocoConfig: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            fallbackLang: 'es',
            missingHandler: { useFallbackTranslation: true }
          }
        })
      ],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe('✅ Redes sociales', () => {
    it('debería renderizar 6 enlaces sociales', () => {
      const socialLinks = fixture.nativeElement.querySelectorAll('a[aria-label]');
      expect(socialLinks.length).toBe(6);
    });

    it('debería tener el enlace de YouTube con la URL del canal', () => {
      const link = fixture.nativeElement.querySelector('a[aria-label="YouTube"]');
      expect(link).not.toBeNull();
      expect(link.getAttribute('href')).toBe('https://www.youtube.com/juanitourquiza');
    });

    it('debería tener el enlace de Spotify con la URL del show', () => {
      const link = fixture.nativeElement.querySelector('a[aria-label="Spotify"]');
      expect(link).not.toBeNull();
      expect(link.getAttribute('href')).toBe('https://open.spotify.com/show/0ifNrkBCtqYS42zg1Eben9');
    });

    it('debería abrir los enlaces sociales en pestaña nueva con noopener noreferrer', () => {
      const socialLinks = fixture.nativeElement.querySelectorAll('a[aria-label]');
      socialLinks.forEach((link: HTMLAnchorElement) => {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });

    it('debería ocultar los SVG decorativos de los lectores de pantalla', () => {
      const svgs = fixture.nativeElement.querySelectorAll('a[aria-label] svg');
      expect(svgs.length).toBe(6);
      svgs.forEach((svg: SVGElement) => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('debería mantener el orden esperado de iconos sociales', () => {
      const labels = Array.from(
        fixture.nativeElement.querySelectorAll('a[aria-label]') as NodeListOf<Element>
      ).map((el: Element) => el.getAttribute('aria-label'));
      expect(labels).toEqual(['Facebook', 'Twitter', 'LinkedIn', 'GitHub', 'YouTube', 'Spotify']);
    });
  });
});
