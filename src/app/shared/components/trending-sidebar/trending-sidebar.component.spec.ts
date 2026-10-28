import 'zone.js';
import 'zone.js/testing';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { Subject } from 'rxjs';
import { TrendingSidebarComponent } from './trending-sidebar.component';
import { SidebarPost, WordpressApiService } from '../../../core/services/wordpress-api.service';
import { LanguageService } from '../../../core/services/language.service';
import { WpPost } from '../../../core/models/wordpress.models';

const esTranslation = {
  home: {
    mostRead: 'Más Leídas',
    onThisDay: 'Un día como hoy',
    randomPicks: 'Curiosidades',
    publishedIn: 'Publicado en {{ year }}',
    fromArchive: 'Del archivo · {{ year }}',
    yearsAgo: 'hace {{ years }} años',
    yearAgo: 'hace 1 año'
  },
  common: {
    loading: 'Cargando...'
  }
};

function mostReadPost(id: number): WpPost {
  return {
    id,
    date: '2026-01-01T00:00:00',
    slug: `post-${id}`,
    title: { rendered: `Más leída ${id}` }
  } as WpPost;
}

function sidebarPost(id: number, title: string, match: SidebarPost['match']): SidebarPost {
  return {
    id,
    slug: `sidebar-${id}`,
    title,
    date: '2015-10-27T09:00:00',
    years_ago: 11,
    match
  };
}

describe('TrendingSidebarComponent', () => {
  let fixture: ComponentFixture<TrendingSidebarComponent>;
  let mostRead$: Subject<WpPost[]>;
  let onThisDay$: Subject<SidebarPost[]>;
  let random$: Subject<SidebarPost[]>;
  let wpApiMock: {
    getMostReadPosts: ReturnType<typeof vi.fn>;
    getOnThisDay: ReturnType<typeof vi.fn>;
    getRandomSidebarPosts: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mostRead$ = new Subject<WpPost[]>();
    onThisDay$ = new Subject<SidebarPost[]>();
    random$ = new Subject<SidebarPost[]>();

    wpApiMock = {
      getMostReadPosts: vi.fn(() => mostRead$.asObservable()),
      getOnThisDay: vi.fn(() => onThisDay$.asObservable()),
      getRandomSidebarPosts: vi.fn(() => random$.asObservable())
    };

    await TestBed.configureTestingModule({
      imports: [
        TrendingSidebarComponent,
        TranslocoTestingModule.forRoot({
          langs: { es: esTranslation, en: esTranslation },
          preloadLangs: true,
          translocoConfig: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            fallbackLang: 'es',
            missingHandler: { useFallbackTranslation: true }
          }
        })
      ],
      providers: [
        provideRouter([]),
        { provide: WordpressApiService, useValue: wpApiMock },
        { provide: LanguageService, useValue: { currentLang: () => 'es' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingSidebarComponent);
    fixture.detectChanges();
  });

  it('muestra skeletons por sección mientras carga', () => {
    expect(fixture.nativeElement.querySelectorAll('[role="status"]')).toHaveLength(3);

    mostRead$.next(Array.from({ length: 5 }, (_, index) => mostReadPost(index + 1)));
    mostRead$.complete();
    onThisDay$.next([sidebarPost(99, 'Un clásico del 2015', 'on_this_day')]);
    onThisDay$.complete();
    fixture.detectChanges();

    // Curiosidades sigue cargando hasta que responde su request.
    expect(fixture.nativeElement.querySelectorAll('[role="status"]')).toHaveLength(1);
  });

  it('renderiza 5 más leídas, el post del pasado y 2 curiosidades', () => {
    const mostRead = Array.from({ length: 5 }, (_, index) => mostReadPost(index + 1));
    mostRead$.next(mostRead);
    mostRead$.complete();
    onThisDay$.next([sidebarPost(99, 'Un clásico del 2015', 'on_this_day')]);
    onThisDay$.complete();
    fixture.detectChanges();

    expect(wpApiMock.getRandomSidebarPosts).toHaveBeenCalledWith(
      2,
      [1, 2, 3, 4, 5, 99]
    );

    random$.next([
      sidebarPost(7, 'Curiosidad siete', 'random'),
      sidebarPost(8, 'Curiosidad ocho', 'random')
    ]);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const mostReadItems = element.querySelectorAll('[data-testid="most-read"] article');
    const randomItems = element.querySelectorAll('[data-testid="random-picks-list"] article');
    const onThisDay = element.querySelector('[data-testid="on-this-day"]');

    expect(mostReadItems).toHaveLength(5);
    expect(randomItems).toHaveLength(2);
    expect(onThisDay?.textContent).toContain('Un clásico del 2015');
    expect(onThisDay?.textContent).toContain('Publicado en 2015');
    expect(onThisDay?.textContent).toContain('hace 11 años');
    expect(element.querySelectorAll('[role="status"]')).toHaveLength(0);
  });
});
