import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  WpPost,
  WpAuthor,
  WpCategory,
  WpTag,
  WpApiResponse
} from '../models/wordpress.models';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService {
  private apiUrl = environment.wordpressApiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Get posts with pagination and optional filters
   */
  getPosts(
    page: number = 1,
    perPage: number = 10,
    categoryId?: number,
    search?: string,
    sticky?: boolean
  ): Observable<WpApiResponse<WpPost>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('_embed', 'true');

    if (categoryId) {
      params = params.set('categories', categoryId.toString());
    }

    if (search) {
      params = params.set('search', search);
    }

    if (sticky !== undefined) {
      params = params.set('sticky', sticky.toString());
    }

    return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, {
      params,
      observe: 'response'
    }).pipe(
      map(response => ({
        data: response.body || [],
        total: parseInt(response.headers.get('X-WP-Total') || '0', 10),
        totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '0', 10)
      }))
    );
  }

  /**
   * Get a single post by slug
   */
  getPostBySlug(slug: string): Observable<WpPost> {
    const params = new HttpParams()
      .set('slug', slug)
      .set('_embed', 'true');

    return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, { params }).pipe(
      map(posts => posts[0])
    );
  }

  /**
   * Get a single post by ID
   */
  getPostById(id: number): Observable<WpPost> {
    const params = new HttpParams().set('_embed', 'true');
    return this.http.get<WpPost>(`${this.apiUrl}/posts/${id}`, { params });
  }

  /**
   * Get featured/sticky posts
   */
  getFeaturedPosts(limit: number = 1): Observable<WpPost[]> {
    const params = new HttpParams()
      .set('sticky', 'true')
      .set('per_page', limit.toString())
      .set('_embed', 'true');

    return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, { params });
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<WpCategory[]> {
    const params = new HttpParams().set('per_page', '100');
    return this.http.get<WpCategory[]>(`${this.apiUrl}/categories`, { params });
  }

  /**
   * Get category by slug
   */
  getCategoryBySlug(slug: string): Observable<WpCategory> {
    const params = new HttpParams().set('slug', slug);
    return this.http.get<WpCategory[]>(`${this.apiUrl}/categories`, { params }).pipe(
      map(categories => categories[0])
    );
  }

  /**
   * Get all tags
   */
  getTags(): Observable<WpTag[]> {
    const params = new HttpParams().set('per_page', '100');
    return this.http.get<WpTag[]>(`${this.apiUrl}/tags`, { params });
  }

  /**
   * Get author by ID
   */
  getAuthorById(id: number): Observable<WpAuthor> {
    return this.http.get<WpAuthor>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * Get author by slug
   */
  getAuthorBySlug(slug: string): Observable<WpAuthor> {
    const params = new HttpParams().set('slug', slug);
    return this.http.get<WpAuthor[]>(`${this.apiUrl}/users`, { params }).pipe(
      map(authors => authors[0])
    );
  }

  /**
   * Get posts by author
   */
  getPostsByAuthor(authorId: number, page: number = 1, perPage: number = 10): Observable<WpApiResponse<WpPost>> {
    const params = new HttpParams()
      .set('author', authorId.toString())
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('_embed', 'true');

    return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, {
      params,
      observe: 'response'
    }).pipe(
      map(response => ({
        data: response.body || [],
        total: parseInt(response.headers.get('X-WP-Total') || '0', 10),
        totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '0', 10)
      }))
    );
  }

  /**
   * Get posts by category
   */
  getPostsByCategory(categoryId: number, page: number = 1, perPage: number = 10): Observable<WpApiResponse<WpPost>> {
    return this.getPosts(page, perPage, categoryId);
  }

  /**
   * Search posts
   */
  searchPosts(query: string, page: number = 1, perPage: number = 10): Observable<WpApiResponse<WpPost>> {
    return this.getPosts(page, perPage, undefined, query);
  }

  /**
   * Get most read posts (ordered by views)
   * Note: WordPress REST API doesn't support orderby=views, so we fetch posts and sort client-side
   */
  getMostReadPosts(limit: number = 4): Observable<WpPost[]> {
    const params = new HttpParams()
      .set('per_page', '20') // Fetch more posts to ensure we get enough with views
      .set('_embed', 'true');

    return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, { params }).pipe(
      map(posts => {
        // Sort by views (checking different field names that plugins might use)
        const sortedPosts = posts.sort((a, b) => {
          const viewsA = a.views || a.post_views || a.post_views_count || 0;
          const viewsB = b.views || b.post_views || b.post_views_count || 0;
          return viewsB - viewsA; // Descending order
        });

        // Return only the requested limit
        return sortedPosts.slice(0, limit);
      })
    );
  }

  // ============================================
  // TRANSLATION API (Hackeruna Translate Plugin)
  // ============================================

  private get translateApiUrl(): string {
    // Use the base WordPress URL for custom endpoints
    return this.apiUrl.replace('/wp/v2', '/hackeruna/v1');
  }

  /**
   * Get translated post by ID
   * @param postId - The original post ID
   * @param lang - Target language (e.g., 'en', 'es')
   */
  getTranslatedPost(postId: number, lang: string): Observable<TranslatedPost> {
    if (lang === 'es') {
      // Spanish is the original language, fetch normally
      return this.getPostById(postId).pipe(
        map(post => this.mapToTranslatedPost(post, 'es'))
      );
    }

    return this.http.get<TranslatedPost>(
      `${this.translateApiUrl}/post/${postId}/translate/${lang}`
    );
  }

  /**
   * Get translated post by slug
   * @param slug - The post slug (original or translated)
   * @param lang - Target language
   */
  getTranslatedPostBySlug(slug: string, lang: string): Observable<TranslatedPost> {
    if (lang === 'es') {
      // Spanish is the original language
      return this.getPostBySlug(slug).pipe(
        map(post => this.mapToTranslatedPost(post, 'es'))
      );
    }

    return this.http.get<TranslatedPost>(
      `${this.translateApiUrl}/post/slug/${slug}/translate/${lang}`
    );
  }

  /**
   * Get translation status for a post
   * @param postId - The post ID
   */
  getTranslationStatus(postId: number): Observable<TranslationStatus> {
    return this.http.get<TranslationStatus>(
      `${this.translateApiUrl}/post/${postId}/translations`
    );
  }

  /**
   * Map a regular WpPost to TranslatedPost format
   */
  private mapToTranslatedPost(post: WpPost, lang: string): TranslatedPost {
    return {
      id: post.id,
      original_id: post.id,
      language: lang,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      cached: true,
      translated_at: null,
      model_used: null,
      _embedded: post._embedded
    };
  }
}

/**
 * Interface for translated post response
 */
export interface TranslatedPost {
  id: number;
  original_id: number;
  language: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  cached: boolean;
  translated_at: string | null;
  model_used: string | null;
  tokens_used?: number;
  cost_usd?: number;
  _embedded?: any;
}

/**
 * Interface for translation status response
 */
export interface TranslationStatus {
  post_id: number;
  available_languages: string[];
  translations: {
    [lang: string]: {
      translated_at: string;
      model_used: string;
      cached: boolean;
    };
  };
}
