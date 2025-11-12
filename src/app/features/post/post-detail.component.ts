import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WordpressApiService } from '../../core/services/wordpress-api.service';
import { WpPost } from '../../core/models/wordpress.models';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RelatedPostsComponent } from '../../shared/components/related-posts/related-posts.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, RelatedPostsComponent],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wpApi = inject(WordpressApiService);

  post = signal<WpPost | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  private loadPost(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.wpApi.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.error.set('No se pudo cargar el artículo');
        this.loading.set(false);
      }
    });
  }

  get featuredImage(): string {
    return this.post()?._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://backend.hackeruna.com/wp-content/themes/magazinebook/img/default-bg-img.png';
  }

  get authorName(): string {
    return this.post()?._embedded?.author?.[0]?.name || 'Anonymous';
  }

  get categoryName(): string {
    const categories = this.post()?._embedded?.['wp:term']?.[0];
    return categories?.[0]?.name || 'Uncategorized';
  }

  get categories(): Array<{ id: number; name: string; slug: string }> {
    const categories = this.post()?._embedded?.['wp:term']?.[0];
    return categories || [];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
