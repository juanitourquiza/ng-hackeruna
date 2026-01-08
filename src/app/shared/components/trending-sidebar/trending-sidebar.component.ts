import { Component, Input, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { WpPost } from '../../../core/models/wordpress.models';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-trending-sidebar',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './trending-sidebar.component.html',
  styleUrls: ['./trending-sidebar.component.scss']
})
export class TrendingSidebarComponent {
  private languageService = inject(LanguageService);
  @Input() posts: WpPost[] = [];

  get currentLang() {
    return this.languageService.currentLang();
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
