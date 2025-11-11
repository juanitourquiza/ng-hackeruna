import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from '../../core/services/wordpress-api.service';
import { WpPost } from '../../core/models/wordpress.models';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, PostCardComponent, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="py-8 lg:py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-light-primary dark:text-dark-primary mb-2">
          Resultados de búsqueda
        </h1>
        <p class="text-lg text-text-light-secondary dark:text-dark-secondary mb-8" *ngIf="searchQuery()">
          Buscando: "{{ searchQuery() }}"
        </p>

        <app-loading-spinner *ngIf="loading()"></app-loading-spinner>

        <div *ngIf="error()" class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-8">
          {{ error() }}
        </div>

        <div *ngIf="!loading() && results().length === 0" class="text-center py-12 text-text-light-secondary dark:text-dark-secondary">
          No se encontraron resultados para tu búsqueda.
        </div>

        <div *ngIf="!loading()" class="space-y-12">
          <app-post-card *ngFor="let post of results(); trackBy: trackByPostId" [post]="post"></app-post-card>
        </div>
      </div>
    </main>
  `
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wpApi = inject(WordpressApiService);

  searchQuery = signal<string>('');
  results = signal<WpPost[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchQuery.set(query);
        this.performSearch(query);
      }
    });
  }

  private performSearch(query: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.wpApi.searchPosts(query).subscribe({
      next: (response) => {
        this.results.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error searching posts:', err);
        this.error.set('Error al realizar la búsqueda');
        this.loading.set(false);
      }
    });
  }

  // TrackBy function for optimized list rendering
  trackByPostId(index: number, post: WpPost): number {
    return post.id;
  }
}
