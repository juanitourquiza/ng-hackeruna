import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'hackeruna-theme';
  
  // Using Angular signals for reactive theme management
  public theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Effect to update DOM and localStorage when theme changes
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
      this.saveTheme(currentTheme);
    });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme: Theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  /**
   * Get the initial theme from localStorage or default to light
   */
  private getInitialTheme(): Theme {
    // Check localStorage first
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
      if (savedTheme) {
        return savedTheme;
      }
    }

    // Always default to light (white) theme
    return 'light';
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') {
      const htmlElement = document.documentElement;
      
      // Remove both classes first
      htmlElement.classList.remove('light', 'dark');
      
      // Add the current theme class
      htmlElement.classList.add(theme);
    }
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    }
  }

  /**
   * Listen to system theme changes
   */
  listenToSystemThemeChanges(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem(this.THEME_STORAGE_KEY)) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}
