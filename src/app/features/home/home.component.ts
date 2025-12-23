import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from '../../core/services/wordpress-api.service';
import { WpPost } from '../../core/models/wordpress.models';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { TrendingSidebarComponent } from '../../shared/components/trending-sidebar/trending-sidebar.component';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { FeaturedProjectsComponent } from '../../shared/components/featured-projects/featured-projects.component';
import { PopularTutorialsComponent } from '../../shared/components/popular-tutorials/popular-tutorials.component';
import { UsefulResourcesComponent } from '../../shared/components/useful-resources/useful-resources.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    TrendingSidebarComponent,
    CategoryFilterComponent,
    SkeletonLoaderComponent,
    FeaturedProjectsComponent,
    PopularTutorialsComponent,
    UsefulResourcesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private wpApi = inject(WordpressApiService);
  private route = inject(ActivatedRoute);

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
    // Leer parámetro de categoría desde URL
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'] ? Number(params['category']) : null;
      this.selectedCategoryId.set(categoryId);
      this.loadHomeData();
    });
  }

  private loadHomeData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage.set(1); // Reset page when loading new data

    const categoryId = this.selectedCategoryId();

    // Load featured post (only if no category filter)
    if (!categoryId) {
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
    } else {
      // Clear featured post when filtering by category
      this.featuredPost.set(null);
    }

    // Load recent posts with category filter
    this.wpApi.getPosts(1, this.postsPerPage, categoryId || undefined).subscribe({
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

    // Load most read posts (sorted by views)
    this.wpApi.getMostReadPosts(4).subscribe({
      next: (posts) => {
        this.trendingPosts.set(posts);
      },
      error: (err) => {
        console.error('Error loading most read posts:', err);
        // Fallback to recent posts if views endpoint fails
        this.wpApi.getPosts(1, 4).subscribe({
          next: (response) => {
            this.trendingPosts.set(response.data);
          }
        });
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
