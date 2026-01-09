import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export type SupportedLanguage = 'es' | 'en';

export interface LanguageConfig {
    code: SupportedLanguage;
    name: string;
    nativeName: string;
    flag: string;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    readonly availableLanguages: LanguageConfig[] = [
        { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
    ];

    readonly defaultLanguage: SupportedLanguage = 'es';

    // Current language signal
    private _currentLang = signal<SupportedLanguage>(this.getInitialLanguage());

    // Public readonly signal
    readonly currentLang = this._currentLang.asReadonly();

    // Computed values
    readonly currentLanguageConfig = computed(() =>
        this.availableLanguages.find(l => l.code === this._currentLang()) || this.availableLanguages[0]
    );

    readonly isSpanish = computed(() => this._currentLang() === 'es');
    readonly isEnglish = computed(() => this._currentLang() === 'en');

    constructor() {
        // Sync language from URL on navigation
        if (isPlatformBrowser(this.platformId)) {
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
                this.syncLanguageFromUrl(event.urlAfterRedirects || event.url);
            });

            // Also sync localStorage with URL language on initial load
            const urlLang = this.getLanguageFromPath();
            if (urlLang) {
                localStorage.setItem('hackeruna_lang', urlLang);
            }
        }
    }

    /**
     * Sync language signal with URL (called on navigation)
     */
    private syncLanguageFromUrl(url: string): void {
        const pathSegments = url.split('/').filter(Boolean);
        const firstSegment = pathSegments[0] as SupportedLanguage;

        if (this.isValidLanguage(firstSegment) && firstSegment !== this._currentLang()) {
            this._currentLang.set(firstSegment);
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('hackeruna_lang', firstSegment);
            }
        }
    }

    /**
     * Get initial language from URL, localStorage, or browser preference
     */
    private getInitialLanguage(): SupportedLanguage {
        if (!isPlatformBrowser(this.platformId)) {
            return this.defaultLanguage;
        }

        // 1. Check URL path
        const pathLang = this.getLanguageFromPath();
        if (pathLang) return pathLang;

        // 2. Check localStorage
        const storedLang = localStorage.getItem('hackeruna_lang') as SupportedLanguage;
        if (storedLang && this.isValidLanguage(storedLang)) {
            return storedLang;
        }

        // 3. Check browser language
        const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
        if (this.isValidLanguage(browserLang)) {
            return browserLang;
        }

        return this.defaultLanguage;
    }

    /**
     * Extract language from current URL path
     */
    private getLanguageFromPath(): SupportedLanguage | null {
        if (!isPlatformBrowser(this.platformId)) return null;

        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0] as SupportedLanguage;

        if (this.isValidLanguage(firstSegment)) {
            return firstSegment;
        }
        return null;
    }

    /**
     * Check if language code is valid
     */
    isValidLanguage(lang: string): lang is SupportedLanguage {
        return this.availableLanguages.some(l => l.code === lang);
    }

    /**
     * Switch to a different language
     * @param lang Target language
     * @param force Force switch even if same (useful for resync)
     */
    switchLanguage(lang: SupportedLanguage, force: boolean = false): void {
        if (!this.isValidLanguage(lang)) {
            return;
        }

        // Skip if same language and not forced
        if (!force && lang === this._currentLang()) {
            return;
        }

        this._currentLang.set(lang);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('hackeruna_lang', lang);

            // Update URL to reflect new language
            this.updateUrlLanguage(lang);
        }
    }

    /**
     * Update URL with new language prefix
     */
    private updateUrlLanguage(newLang: SupportedLanguage): void {
        const currentUrl = this.router.url;
        const pathSegments = currentUrl.split('/').filter(Boolean);

        // Check if first segment is a language code
        if (this.isValidLanguage(pathSegments[0])) {
            // Replace existing language
            pathSegments[0] = newLang;
        } else {
            // Add language prefix
            pathSegments.unshift(newLang);
        }

        const newUrl = '/' + pathSegments.join('/');
        this.router.navigateByUrl(newUrl);
    }

    /**
     * Set language from URL (called by route guard or resolver)
     */
    setLanguageFromUrl(lang: string): void {
        if (this.isValidLanguage(lang)) {
            this._currentLang.set(lang);
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('hackeruna_lang', lang);
            }
        }
    }

    /**
     * Get opposite language for language switcher
     */
    getAlternateLanguage(): LanguageConfig {
        const current = this._currentLang();
        return this.availableLanguages.find(l => l.code !== current) || this.availableLanguages[1];
    }
}
