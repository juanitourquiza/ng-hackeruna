import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  WpPost,
  WpAuthor,
  WpCategory,
  WpTag,
  WpApiResponse
} from '../models/wordpress.models';

/**
 * Post ligero usado por el sidebar de la home ("Un día como hoy" y curiosidades).
 * Lo sirve el plugin hackeruna-onthisday; los fallbacks usan el REST estándar.
 */
export interface SidebarPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  years_ago: number;
  match: 'on_this_day' | 'archive' | 'random';
}

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
   * Note: WordPress REST API doesn't support orderby=views, so we fetch posts and sort client-side.
   * Uses `_fields` instead of `_embed` because the sidebar only needs id/slug/title/views:
   * the embedded payload made this request take ~9s instead of ~1.3s.
   */
  getMostReadPosts(limit: number = 4): Observable<WpPost[]> {
    const params = new HttpParams()
      .set('per_page', '20') // Fetch more posts to ensure we get enough with views
      .set('_fields', 'id,slug,title,date,views,post_views,post_views_count');

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
  // SIDEBAR API (Hackeruna On This Day Plugin)
  // ============================================

  private get hackerunaApiUrl(): string {
    // Use the base WordPress URL for Hackeruna custom endpoints
    return this.apiUrl.replace('/wp/v2', '/hackeruna/v1');
  }

  /**
   * Posts publicados en la misma fecha (día/mes) de años anteriores.
   * Usa el endpoint hackeruna/v1/onthisday y, si el plugin aún no está activo,
   * cae a una búsqueda multi-año contra el REST estándar de WordPress.
   */
  getOnThisDay(limit: number = 1, excludeIds: number[] = []): Observable<SidebarPost[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('exclude', excludeIds.join(','));

    return this.http.get<SidebarPost[]>(`${this.hackerunaApiUrl}/onthisday`, { params }).pipe(
      map(posts => posts ?? []),
      catchError(() => of(null)),
      switchMap(posts => posts && posts.length > 0
        ? of(posts)
        : this.getOnThisDayFallback(limit, excludeIds))
    );
  }

  /**
   * Posts aleatorios para el bloque de curiosidades del sidebar.
   * @param scope 'all' = todo el blog, 'archive' = solo años anteriores.
   */
  getRandomSidebarPosts(
    limit: number = 2,
    excludeIds: number[] = [],
    scope: 'all' | 'archive' = 'all'
  ): Observable<SidebarPost[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('exclude', excludeIds.join(','))
      .set('scope', scope);

    return this.http.get<SidebarPost[]>(`${this.hackerunaApiUrl}/random`, { params }).pipe(
      map(posts => posts ?? []),
      catchError(() => of(null)),
      switchMap(posts => posts && posts.length > 0
        ? of(posts)
        : this.getRandomSidebarFallback(limit, excludeIds, scope))
    );
  }

  /**
   * Fallback sin plugin: consulta el REST estándar para los últimos 10 años
   * con la misma fecha y elige uno al azar. Los requests son livianos (_fields).
   */
  private getOnThisDayFallback(limit: number, excludeIds: number[]): Observable<SidebarPost[]> {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const years = Array.from({ length: 10 }, (_, index) => now.getFullYear() - 1 - index);

    const requests = years.map(year => {
      let params = new HttpParams()
        .set('after', `${year}-${month}-${day}T00:00:00`)
        .set('before', `${year}-${month}-${day}T23:59:59`)
        .set('per_page', '5')
        .set('_fields', 'id,slug,title,date');

      if (excludeIds.length > 0) {
        params = params.set('exclude', excludeIds.join(','));
      }

      return this.fetchSidebarPosts(params, 'on_this_day');
    });

    return forkJoin(requests).pipe(
      map(groups => groups.flat()),
      switchMap(posts => posts.length > 0
        ? of(this.shuffle(posts).slice(0, limit))
        : this.getRandomSidebarFallback(limit, excludeIds, 'archive'))
    );
  }

  /**
   * Fallback sin plugin: trae los posts más recientes y los baraja en cliente.
   */
  private getRandomSidebarFallback(
    limit: number,
    excludeIds: number[],
    scope: 'all' | 'archive'
  ): Observable<SidebarPost[]> {
    let params = new HttpParams()
      .set('per_page', '30')
      .set('_fields', 'id,slug,title,date');

    if (excludeIds.length > 0) {
      params = params.set('exclude', excludeIds.join(','));
    }

    if (scope === 'archive') {
      params = params.set('before', `${new Date().getFullYear()}-01-01T00:00:00`);
    }

    return this.fetchSidebarPosts(params, scope === 'archive' ? 'archive' : 'random').pipe(
      map(posts => this.shuffle(posts).slice(0, limit))
    );
  }

  private fetchSidebarPosts(
    params: HttpParams,
    match: SidebarPost['match']
  ): Observable<SidebarPost[]> {
    return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, { params }).pipe(
      map(posts => (posts ?? []).map(post => this.toSidebarPost(post, match))),
      catchError(() => of([]))
    );
  }

  private toSidebarPost(post: WpPost, match: SidebarPost['match']): SidebarPost {
    const date = post.date;
    const year = new Date(date).getFullYear();
    const currentYear = new Date().getFullYear();

    return {
      id: post.id,
      slug: post.slug,
      title: this.decodeHtml(post.title?.rendered || ''),
      date,
      years_ago: Math.max(0, currentYear - year),
      match
    };
  }

  private decodeHtml(html: string): string {
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]*>/g, '').trim();
    }

    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return (textarea.value || '').trim();
  }

  private shuffle<T>(items: T[]): T[] {
    const copy = [...items];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  // ============================================
  // TRANSLATION API (Hackeruna Translate Plugin)
  // ============================================

  private get translateApiUrl(): string {
    return this.hackerunaApiUrl;
  }

  /**
   * Get translated post by ID
   * @param postId - The original post ID
   * @param lang - Target language (e.g., 'en', 'es')
   */
  private noCacheParams = { _t: Date.now().toString() };

  getTranslatedPost(postId: number, lang: string): Observable<TranslatedPost> {
    if (lang === 'es') {
      // Spanish is the original language, fetch normally
      return this.getPostById(postId).pipe(
        map(post => this.mapToTranslatedPost(post, 'es'))
      );
    }

    return this.http.get<TranslatedPost>(
      `${this.translateApiUrl}/post/${postId}/translate/${lang}`,
      { params: { ...this.noCacheParams, lang } }
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
      `${this.translateApiUrl}/post/slug/${slug}/translate/${lang}`,
      { params: { ...this.noCacheParams, lang } }
    );
  }

  /**
   * Get translation status for a post
   */
  getTranslationStatus(postId: number): Observable<TranslationStatus> {
    return this.http.get<TranslationStatus>(
      `${this.translateApiUrl}/post/${postId}/translations`,
      { params: this.noCacheParams }
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
