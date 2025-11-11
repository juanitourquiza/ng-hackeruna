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

  constructor(private http: HttpClient) {}

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
}
