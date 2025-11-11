import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WordpressApiService } from '../../../core/services/wordpress-api.service';
import { WpPost } from '../../../core/models/wordpress.models';

@Component({
  selector: 'app-related-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section *ngIf="relatedPosts().length > 0" class="mt-16 pt-12" style="border-top: 1px solid var(--border-color);">
      <h2 class="text-2xl font-bold mb-8" style="color: var(--text-primary);">
        Artículos Relacionados
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article *ngFor="let post of relatedPosts()" class="group">
          <a [routerLink]="['/post', post.slug]">
            <div class="mb-4 overflow-hidden rounded-lg">
              <img 
                [src]="getPostImage(post)" 
                [alt]="stripHtml(post.title.rendered)" 
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 
              class="text-lg font-semibold leading-snug mb-2 group-hover:underline"
              style="color: var(--text-primary);"
              [innerHTML]="post.title.rendered"
            ></h3>
            <p class="text-sm mb-2" style="color: var(--text-tertiary);">
              {{ formatDate(post.date) }}
            </p>
            <div 
              class="text-sm line-clamp-2"
              style="color: var(--text-secondary);"
              [innerHTML]="post.excerpt.rendered"
            ></div>
          </a>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class RelatedPostsComponent implements OnInit {
  @Input() currentPostId!: number;
  @Input() categoryId?: number;
  
  private wpApi = inject(WordpressApiService);
  relatedPosts = signal<WpPost[]>([]);

  ngOnInit(): void {
    this.loadRelatedPosts();
  }

  private loadRelatedPosts(): void {
    // If we have a category, get posts from the same category
    if (this.categoryId) {
      this.wpApi.getPostsByCategory(this.categoryId, 1, 6).subscribe({
        next: (response: { data: WpPost[] }) => {
          // Filter out the current post
          const filtered = response.data.filter((post: WpPost) => post.id !== this.currentPostId);
          this.relatedPosts.set(filtered.slice(0, 3));
        },
        error: (err: unknown) => {
          console.error('Error loading related posts:', err);
          // Fallback to recent posts
          this.loadRecentPosts();
        }
      });
    } else {
      this.loadRecentPosts();
    }
  }

  private loadRecentPosts(): void {
    this.wpApi.getPosts(1, 6).subscribe({
      next: (response: { data: WpPost[] }) => {
        const filtered = response.data.filter((post: WpPost) => post.id !== this.currentPostId);
        this.relatedPosts.set(filtered.slice(0, 3));
      },
      error: (err: unknown) => {
        console.error('Error loading recent posts:', err);
      }
    });
  }

  getPostImage(post: WpPost): string {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://www.hackeruna.com/wp-content/themes/magazinebook/img/default-bg-img.png';
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
