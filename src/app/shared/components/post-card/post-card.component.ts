import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WpPost } from '../../../core/models/wordpress.models';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
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
}
