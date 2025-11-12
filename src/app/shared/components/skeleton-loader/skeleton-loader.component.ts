import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (type === 'post-card') {
      <div class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
        <!-- Skeleton Image -->
        <div class="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
        
        <!-- Skeleton Content -->
        <div class="p-6">
          <!-- Category badge -->
          <div class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
          
          <!-- Title -->
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          
          <!-- Meta info -->
          <div class="flex gap-4">
            <div class="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    }

    @if (type === 'post-featured') {
      <div class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 animate-pulse">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Skeleton Image -->
          <div class="h-64 md:h-96 bg-gray-300 dark:bg-gray-700"></div>
          
          <!-- Skeleton Content -->
          <div class="p-8 flex flex-col justify-center">
            <div class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
            <div class="flex gap-4">
              <div class="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }

    @if (type === 'post-list') {
      <div class="space-y-6">
        @for (item of [1, 2, 3]; track item) {
          <div class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
            <div class="grid sm:grid-cols-3 gap-4">
              <div class="h-48 sm:h-40 bg-gray-300 dark:bg-gray-700"></div>
              <div class="sm:col-span-2 p-6">
                <div class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div class="flex gap-4">
                  <div class="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div class="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    }

    @if (type === 'post-detail') {
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <!-- Breadcrumb skeleton -->
        <div class="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
        
        <!-- Category badge -->
        <div class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
        
        <!-- Title skeleton -->
        <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
        <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
        
        <!-- Meta info -->
        <div class="flex gap-6 mb-10">
          <div class="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div class="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        
        <!-- Featured image -->
        <div class="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded mb-10"></div>
        
        <!-- Content skeleton -->
        <div class="space-y-4">
          @for (line of [1, 2, 3, 4, 5, 6, 7, 8]; track line) {
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded" [ngClass]="{'w-11/12': line % 3 === 0, 'w-full': line % 3 !== 0}"></div>
          }
        </div>
      </div>
    }

    @if (type === 'trending') {
      <div class="space-y-4">
        @for (item of [1, 2, 3, 4]; track item) {
          <div class="flex gap-4 animate-pulse">
            <div class="flex-shrink-0 w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
              <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        }
      </div>
    }

    @if (type === 'portfolio') {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (item of [1, 2, 3, 4, 5, 6]; track item) {
          <div class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
            <div class="h-64 bg-gray-300 dark:bg-gray-700"></div>
            <div class="p-6 space-y-3">
              <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              <div class="flex gap-2 mt-4">
                <div class="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div class="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div class="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() type: 'post-card' | 'post-featured' | 'post-list' | 'post-detail' | 'trending' | 'portfolio' = 'post-card';
}
