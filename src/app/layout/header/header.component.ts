import { Component, computed, inject } from '@angular/core';

import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService, SupportedLanguage } from '../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translocoService = inject(TranslocoService);
  readonly languageService = inject(LanguageService);

  searchQuery = '';

  // Computed value for theme icon
  themeIcon = computed(() =>
    this.themeService.theme() === 'light' ? 'dark_mode' : 'light_mode'
  );

  // Current language computed
  currentLang = this.languageService.currentLang;
  alternateLanguage = computed(() => this.languageService.getAlternateLanguage());

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  switchLanguage(): void {
    const newLang = this.alternateLanguage().code;
    this.languageService.switchLanguage(newLang);
    this.translocoService.setActiveLang(newLang);
  }

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      const lang = this.currentLang();
      this.router.navigate([`/${lang}/search`], {
        queryParams: { q: this.searchQuery.trim() }
      });
    }
  }
}
