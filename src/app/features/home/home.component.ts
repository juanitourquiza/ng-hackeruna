import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordpressApiService } from '../../core/services/wordpress-api.service';
import { WpPost } from '../../core/models/wordpress.models';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { TrendingSidebarComponent } from '../../shared/components/trending-sidebar/trending-sidebar.component';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    PostCardComponent, 
    TrendingSidebarComponent,
    CategoryFilterComponent,
    SkeletonLoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private wpApi = inject(WordpressApiService);

  // Using signals for reactive state management
  featuredPost = signal<WpPost | null>(null);
  recentPosts = signal<WpPost[]>([]);
  trendingPosts = signal<WpPost[]>([]);
  loading = signal(true);
  loadingMore = signal(false);
  error = signal<string | null>(null);
  
  // Pagination
  currentPage = signal(1);
  totalPages = signal(1);
  postsPerPage = 6;
  hasMorePosts = signal(true);
  
  // Category filter
  selectedCategoryId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadHomeData();
  }

  private loadHomeData(): void {
    this.loading.set(true);
    this.error.set(null);

    // Load featured post
    this.wpApi.getFeaturedPosts(1).subscribe({
      next: (posts) => {
        if (posts && posts.length > 0) {
          this.featuredPost.set(posts[0]);
        } else {
          // If no featured post, get the most recent one
          this.wpApi.getPosts(1, 1).subscribe({
            next: (response) => {
              if (response.data.length > 0) {
                this.featuredPost.set(response.data[0]);
              }
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading featured post:', err);
        this.error.set('Error al cargar el artículo destacado');
      }
    });

    // Load recent posts
    this.wpApi.getPosts(1, this.postsPerPage).subscribe({
      next: (response) => {
        this.recentPosts.set(response.data);
        this.totalPages.set(response.totalPages);
        this.hasMorePosts.set(this.currentPage() < response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading recent posts:', err);
        this.error.set('Error al cargar los artículos recientes');
        this.loading.set(false);
      }
    });

    // Load trending posts (using recent posts with different limit)
    this.wpApi.getPosts(1, 4).subscribe({
      next: (response) => {
        this.trendingPosts.set(response.data);
      },
      error: (err) => {
        console.error('Error loading trending posts:', err);
      }
    });
  }

  loadMorePosts(): void {
    if (this.loadingMore() || !this.hasMorePosts()) {
      return;
    }

    this.loadingMore.set(true);
    const nextPage = this.currentPage() + 1;
    const categoryId = this.selectedCategoryId();

    this.wpApi.getPosts(nextPage, this.postsPerPage, categoryId || undefined).subscribe({
      next: (response) => {
        // Append new posts to existing ones
        this.recentPosts.update(posts => [...posts, ...response.data]);
        this.currentPage.set(nextPage);
        this.hasMorePosts.set(nextPage < response.totalPages);
        this.loadingMore.set(false);
      },
      error: (err) => {
        console.error('Error loading more posts:', err);
        this.loadingMore.set(false);
      }
    });
  }

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId.set(categoryId);
    this.currentPage.set(1);
    this.recentPosts.set([]);
    this.loading.set(true);

    this.wpApi.getPosts(1, this.postsPerPage, categoryId || undefined).subscribe({
      next: (response) => {
        this.recentPosts.set(response.data);
        this.totalPages.set(response.totalPages);
        this.hasMorePosts.set(1 < response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading filtered posts:', err);
        this.error.set('Error al cargar los artículos');
        this.loading.set(false);
      }
    });
  }

  // TrackBy function for optimized list rendering
  trackByPostId(index: number, post: WpPost): number {
    return post.id;
  }
}
