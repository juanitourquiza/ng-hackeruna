import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

import { TranslocoModule } from '@jsverse/transloco';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Índice sticky estilo editorial (NYT / Wired) para páginas largas de texto.
 * Hace scroll-spy con IntersectionObserver y navegación suave por anclas.
 */
@Component({
  selector: 'app-table-of-contents',
  standalone: true,
  imports: [TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *transloco="let t">
      <nav [attr.aria-label]="t('common.onThisPage')" class="sticky top-24">
        <p class="text-xs font-mono uppercase tracking-widest mb-4" style="color: var(--text-tertiary);">
          {{ t('common.onThisPage') }}
        </p>
        <ul class="border-l" style="border-color: var(--border-color);">
          @for (item of items; track item.id) {
          <li>
            <a [href]="'#' + item.id" (click)="navigate($event, item.id)"
              class="-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors hover:opacity-80"
              [style.border-color]="activeId() === item.id ? 'var(--accent-blue)' : 'transparent'"
              [style.color]="activeId() === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)'">
              {{ item.label }}
            </a>
          </li>
          }
        </ul>
      </nav>
    </ng-container>
  `,
  styles: [`:host { display: block; }`]
})
export class TableOfContentsComponent implements OnInit, OnDestroy {
  @Input() items: TocItem[] = [];

  readonly activeId = signal<string | null>(null);

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible[0]) {
        this.activeId.set(visible[0].target.id);
      }
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    for (const item of this.items) {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  navigate(event: Event, id: string): void {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeId.set(id);
    history.replaceState(null, '', `#${id}`);
  }
}
