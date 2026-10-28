import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { catchError, forkJoin, of, take, tap } from 'rxjs';
import { SidebarPost, WordpressApiService } from '../../../core/services/wordpress-api.service';
import { WpPost } from '../../../core/models/wordpress.models';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-trending-sidebar',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './trending-sidebar.component.html',
  styleUrls: ['./trending-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendingSidebarComponent implements OnInit {
  private wpApi = inject(WordpressApiService);
  private languageService = inject(LanguageService);

  readonly mostRead = signal<WpPost[]>([]);
  readonly onThisDay = signal<SidebarPost | null>(null);
  readonly randomPosts = signal<SidebarPost[]>([]);

  readonly loadingMostRead = signal(true);
  readonly loadingOnThisDay = signal(true);
  readonly loadingRandom = signal(true);

  get currentLang() {
    return this.languageService.currentLang();
  }

  ngOnInit(): void {
    // "Más leídas" y "Un día como hoy" cargan en paralelo; las curiosidades
    // esperan a ambos para excluir los IDs ya visibles en el sidebar.
    const mostRead$ = this.wpApi.getMostReadPosts(5).pipe(
      catchError(() => of([] as WpPost[])),
      tap(posts => {
        this.mostRead.set(posts);
        this.loadingMostRead.set(false);
      })
    );

    const onThisDay$ = this.wpApi.getOnThisDay(1).pipe(
      catchError(() => of([] as SidebarPost[])),
      tap(posts => {
        this.onThisDay.set(posts[0] ?? null);
        this.loadingOnThisDay.set(false);
      })
    );

    forkJoin([mostRead$, onThisDay$]).pipe(take(1)).subscribe(([mostRead, onThisDay]) => {
      const excludeIds = [
        ...mostRead.map(post => post.id),
        ...onThisDay.map(post => post.id)
      ];

      this.loadRandomPosts(excludeIds);
    });
  }

  private loadRandomPosts(excludeIds: number[]): void {
    this.wpApi.getRandomSidebarPosts(2, excludeIds).pipe(take(1)).subscribe({
      next: posts => {
        this.randomPosts.set(posts);
        this.loadingRandom.set(false);
      },
      error: () => this.loadingRandom.set(false)
    });
  }

  yearOf(date: string): number {
    return new Date(date).getFullYear();
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
