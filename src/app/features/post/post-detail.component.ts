import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WordpressApiService } from '../../core/services/wordpress-api.service';
import { WpPost } from '../../core/models/wordpress.models';
import { RelatedPostsComponent } from '../../shared/components/related-posts/related-posts.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RelatedPostsComponent, SkeletonLoaderComponent, SocialShareComponent],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wpApi = inject(WordpressApiService);
  private metaTagsService = inject(MetaTagsService);

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
        
        // DEBUG: Ver qué campos de vistas vienen de la API
        console.log('📊 DEBUG Post Views:', {
          post: post,
          views: post.views,
          post_views: post.post_views,
          post_views_count: post.post_views_count,
          allKeys: Object.keys(post)
        });
        
        // Actualizar meta tags para SEO y compartir en redes sociales
        this.updateMetaTags(post);
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.error.set('No se pudo cargar el artículo');
        this.loading.set(false);
      }
    });
  }

  private updateMetaTags(post: WpPost): void {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                         'https://backend.hackeruna.com/wp-content/themes/magazinebook/img/default-bg-img.png';
    
    const excerpt = this.stripHtml(post.excerpt?.rendered || '');
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const tags = categories.map(cat => cat.name);
    
    this.metaTagsService.updateMetaTags({
      title: `${this.stripHtml(post.title.rendered)} | Hackeruna`,
      description: excerpt,
      image: featuredImage,
      url: `https://hackeruna.com/post/${post.slug}`,
      type: 'article',
      author: post._embedded?.author?.[0]?.name || 'Hackeruna',
      publishedTime: post.date,
      modifiedTime: post.modified,
      tags: tags
    });
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
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

  get postViews(): number {
    const post = this.post();
    if (!post) return 0;
    
    // Intentar diferentes nombres de campo del plugin
    return post.views || 
           post.post_views || 
           post.post_views_count || 
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
