import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private readonly GA_ID = 'G-RXGCTBC67S';

  constructor(private router: Router) {}

  /**
   * Inicializar tracking de navegación
   * Llamar en AppComponent
   */
  init(): void {
    this.trackPageViews();
  }

  /**
   * Rastrear navegación de páginas automáticamente
   */
  private trackPageViews(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pageView(event.urlAfterRedirects);
      });
  }

  /**
   * Enviar pageview a GA4
   */
  pageView(path: string): void {
    if (this.isGtagAvailable()) {
      // Detectar referrer
      const referrer = document.referrer;
      const params: any = {
        page_path: path
      };
      
      // Agregar referrer si existe
      if (referrer) {
        params.page_referrer = referrer;
      }
      
      window.gtag!('config', this.GA_ID, params);
    }
  }

  /**
   * Trackear fuente de tráfico (referrer)
   */
  trackTrafficSource(): void {
    if (!this.isGtagAvailable()) return;
    
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Detectar fuente
    let source = 'direct';
    let medium = 'none';
    
    if (referrer) {
      const referrerUrl = new URL(referrer);
      const referrerDomain = referrerUrl.hostname;
      
      // Detectar motores de búsqueda
      if (referrerDomain.includes('google')) {
        source = 'google';
        medium = 'organic';
      } else if (referrerDomain.includes('bing')) {
        source = 'bing';
        medium = 'organic';
      } else if (referrerDomain.includes('facebook')) {
        source = 'facebook';
        medium = 'social';
      } else if (referrerDomain.includes('twitter') || referrerDomain.includes('t.co')) {
        source = 'twitter';
        medium = 'social';
      } else if (referrerDomain.includes('linkedin')) {
        source = 'linkedin';
        medium = 'social';
      } else {
        source = referrerDomain;
        medium = 'referral';
      }
    }
    
    // Detectar UTM params
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource) source = utmSource;
    if (utmMedium) medium = utmMedium;
    
    // Enviar evento
    this.event('traffic_source', {
      source: source,
      medium: medium,
      campaign: utmCampaign || '(not set)',
      referrer: referrer || '(direct)'
    });
  }

  /**
   * Enviar evento custom
   * Ejemplos:
   * - Click en botón compartir
   * - Envío de formulario
   * - Error de carga
   */
  event(
    eventName: string,
    params?: {
      category?: string;
      label?: string;
      value?: number;
      [key: string]: any;
    }
  ): void {
    if (this.isGtagAvailable()) {
      window.gtag!('event', eventName, params);
    }
  }

  /**
   * Rastrear compartir en redes sociales
   */
  trackShare(method: string, contentType: string, itemId: string): void {
    this.event('share', {
      method: method,
      content_type: contentType,
      item_id: itemId
    });
  }

  /**
   * Rastrear búsquedas
   */
  trackSearch(searchTerm: string): void {
    this.event('search', {
      search_term: searchTerm
    });
  }

  /**
   * Rastrear clicks en posts
   */
  trackPostClick(postId: number, postTitle: string): void {
    this.event('select_content', {
      content_type: 'post',
      item_id: postId.toString(),
      item_name: postTitle
    });
  }

  /**
   * Rastrear tiempo en página (llamar antes de salir)
   */
  trackTimeOnPage(pagePath: string, timeInSeconds: number): void {
    this.event('time_on_page', {
      page_path: pagePath,
      value: timeInSeconds,
      engagement_time_msec: timeInSeconds * 1000
    });
  }

  /**
   * Rastrear scroll depth
   */
  trackScrollDepth(percentage: number): void {
    this.event('scroll', {
      percent_scrolled: percentage
    });
  }

  /**
   * Rastrear envío de formulario de contacto
   */
  trackContactFormSubmit(success: boolean): void {
    this.event('form_submit', {
      form_name: 'contact',
      success: success
    });
  }

  /**
   * Rastrear errores
   */
  trackError(errorMessage: string, errorLocation: string): void {
    this.event('exception', {
      description: errorMessage,
      fatal: false,
      location: errorLocation
    });
  }

  /**
   * Verificar si gtag está disponible
   */
  private isGtagAvailable(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.gtag === 'function';
  }
}
