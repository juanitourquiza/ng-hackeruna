import { Component, OnInit, inject, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordpressApiService } from '../../../core/services/wordpress-api.service';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8">
      <div class="flex flex-wrap gap-3 items-center">
        <button
          (click)="selectCategory(null)"
          [class.active]="!selectedCategoryId()"
          class="category-btn px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
          [style.background-color]="!selectedCategoryId() ? 'var(--accent-blue)' : 'var(--bg-tertiary)'"
          [style.color]="!selectedCategoryId() ? 'white' : 'var(--text-secondary)'"
        >
          Todos
        </button>
        
        <button
          *ngFor="let category of categories(); trackBy: trackByCategoryId"
          (click)="selectCategory(category.id)"
          [class.active]="selectedCategoryId() === category.id"
          class="category-btn px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105"
          [style.background-color]="selectedCategoryId() === category.id ? 'var(--accent-blue)' : 'var(--bg-tertiary)'"
          [style.color]="selectedCategoryId() === category.id ? 'white' : 'var(--text-secondary)'"
        >
          {{ category.name }} <span class="ml-1 text-xs opacity-75">({{ category.count }})</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .category-btn {
      cursor: pointer;
      border: none;
      outline: none;
      white-space: nowrap;
    }
    
    .category-btn:hover {
      opacity: 0.9;
    }

    .category-btn:active {
      transform: scale(0.98);
    }
  `]
})
export class CategoryFilterComponent implements OnInit {
  private wpApi = inject(WordpressApiService);

  categories = signal<Category[]>([]);
  selectedCategoryId = signal<number | null>(null);
  
  categorySelected = output<number | null>();

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.wpApi.getCategories().subscribe({
      next: (categories) => {
        // Filter out uncategorized and limit to top categories
        const filtered = categories
          .filter(cat => cat.slug !== 'uncategorized' && cat.count > 0)
          .slice(0, 8);
        this.categories.set(filtered);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId.set(categoryId);
    this.categorySelected.emit(categoryId);
  }

  // TrackBy function for optimized list rendering
  trackByCategoryId(index: number, category: Category): number {
    return category.id;
  }
}
