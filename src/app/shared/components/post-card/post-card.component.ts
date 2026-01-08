import { Component, Input, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { WpPost } from '../../../core/models/wordpress.models';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  private languageService = inject(LanguageService);

  @Input({ required: true }) post!: WpPost;
  @Input() featured = false;

  get featuredImage(): string {
    return this.post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      'https://backend.hackeruna.com/wp-content/themes/magazinebook/img/default-bg-img.png';
  }

  get authorName(): string {
    return this.post._embedded?.author?.[0]?.name || 'Anonymous';
  }

  get categoryName(): string {
    const categories = this.post._embedded?.['wp:term']?.[0];
    return categories?.[0]?.name || 'Uncategorized';
  }

  get currentLang() {
    return this.languageService.currentLang();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const locale = this.currentLang === 'es' ? 'es-ES' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  get postViews(): number {
    return this.post.views ||
      this.post.post_views ||
      this.post.post_views_count ||
      0;
  }

  formatViews(views: number): string {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }
}
