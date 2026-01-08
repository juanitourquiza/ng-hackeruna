import { Component, OnInit, inject, signal, computed } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WordpressApiService } from '../../core/services/wordpress-api.service';
import { WpPost } from '../../core/models/wordpress.models';
import { RelatedPostsComponent } from '../../shared/components/related-posts/related-posts.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { GiscusCommentsComponent } from '../../shared/components/giscus-comments/giscus-comments.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { SchemaService } from '../../core/services/schema.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink, RelatedPostsComponent, SkeletonLoaderComponent, SocialShareComponent, GiscusCommentsComponent],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wpApi = inject(WordpressApiService);
  private metaTagsService = inject(MetaTagsService);
  private schemaService = inject(SchemaService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

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

        // Incrementar contador de vistas
        this.incrementViewCount(post.id);

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

  private incrementViewCount(postId: number): void {
    // Llamar al endpoint de WordPress para incrementar el contador
    const url = `${environment.wordpressApiUrl.replace('/wp/v2', '')}/hackeruna/v1/view/${postId}`;

    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        console.log('✅ Vista contada:', response);
      },
      error: (err) => {
        console.error('❌ Error al contar vista:', err);
      }
    });
  }

  private updateMetaTags(post: WpPost): void {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      'https://backend.hackeruna.com/wp-content/themes/magazinebook/img/default-bg-img.png';

    const excerpt = this.stripHtml(post.excerpt?.rendered || '');
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const tags = categories.map(cat => cat.name);
    const authorName = post._embedded?.author?.[0]?.name || 'Juan Urquiza';
    const postUrl = `https://hackeruna.com/post/${post.slug}`;

    // Meta Tags (Open Graph, Twitter)
    this.metaTagsService.updateMetaTags({
      title: `${this.stripHtml(post.title.rendered)} | Hackeruna`,
      description: excerpt,
      image: featuredImage,
      url: postUrl,
      type: 'article',
      author: authorName,
      publishedTime: post.date,
      modifiedTime: post.modified,
      tags: tags
    });

    // AEO: JSON-LD Schema para motores de búsqueda de IA
    this.schemaService.addMultipleSchemas([
      // 1. BlogPosting Schema
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: this.stripHtml(post.title.rendered),
        description: excerpt,
        image: featuredImage,
        datePublished: post.date,
        dateModified: post.modified,
        author: {
          '@type': 'Person',
          name: authorName,
          url: 'https://hackeruna.com/about',
          sameAs: [
            'https://www.linkedin.com/in/juanitourquiza',
            'https://github.com/juanitourquiza',
            'https://juanitourquiza.github.io'
          ]
        },
        publisher: {
          '@type': 'Organization',
          name: 'Hackeruna',
          url: 'https://hackeruna.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://hackeruna.com/assets/hackeruna.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl
        },
        keywords: tags.join(', '),
        articleBody: this.stripHtml(post.content?.rendered || ''),
        inLanguage: 'es-ES',
        wordCount: this.stripHtml(post.content?.rendered || '').split(/\s+/).length
      },
      // 2. Breadcrumb Schema
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://hackeruna.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: this.stripHtml(post.title.rendered),
            item: postUrl
          }
        ]
      }
    ]);
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // Computed signal para contenido sanitizado (permite iframes)
  // Usamos bypassSecurityTrustHtml porque el CSP ya controla qué iframes se permiten
  safeContent = computed<SafeHtml>(() => {
    const post = this.post();
    if (!post?.content?.rendered) return '';
    return this.sanitizer.bypassSecurityTrustHtml(post.content.rendered);
  });

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
