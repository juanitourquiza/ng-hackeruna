import 'zone.js';
import 'zone.js/testing';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PopularTutorialsComponent } from './popular-tutorials.component';
import { environment } from '../../../../environments/environment';
import { WpPost } from '../../../core/models/wordpress.models';

const SHOWN_KEY = 'hackeruna.tutorials.shown';
const WP_API = environment.wordpressApiUrl;

const esTranslation = {
  tutorials: {
    title: 'Tutoriales Populares',
    subtitle: 'Aprende con guías paso a paso'
  },
  search: {
    noResults: 'No se encontraron resultados'
  }
};

function tutorialPost(id: number): WpPost {
  return {
    id,
    date: '2026-01-01T00:00:00',
    slug: `tutorial-${id}`,
    title: { rendered: `Tutorial ${id}: guía práctica` },
    excerpt: { rendered: `Resumen del tutorial ${id}` }
  } as WpPost;
}

describe('PopularTutorialsComponent', () => {
  let fixture: ComponentFixture<PopularTutorialsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    sessionStorage.clear();

    await TestBed.configureTestingModule({
      imports: [
        PopularTutorialsComponent,
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
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularTutorialsComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  function flushPosts(posts: WpPost[]): void {
    fixture.detectChanges();

    const request = httpMock.expectOne(
      req => req.url === `${WP_API}/posts` && req.params.get('per_page') === '20'
    );
    request.flush(posts);

    fixture.detectChanges();
  }

  it('selecciona 4 tutoriales únicos del pool', () => {
    const posts = Array.from({ length: 8 }, (_, index) => tutorialPost(index + 1));
    flushPosts(posts);

    const tutorials = fixture.componentInstance.tutorials();
    const ids = tutorials.map(post => post.id);

    expect(tutorials).toHaveLength(4);
    expect(new Set(ids).size).toBe(4);
    ids.forEach(id => expect(id).toBeGreaterThanOrEqual(1));
    ids.forEach(id => expect(id).toBeLessThanOrEqual(8));
  });

  it('prioriza posts no mostrados en la sesión actual', () => {
    sessionStorage.setItem(SHOWN_KEY, JSON.stringify([1, 2, 3, 4]));

    flushPosts(Array.from({ length: 8 }, (_, index) => tutorialPost(index + 1)));

    const ids = fixture.componentInstance.tutorials().map(post => post.id).sort((a, b) => a - b);

    expect(ids).toEqual([5, 6, 7, 8]);
  });

  it('guarda los IDs mostrados para la siguiente rotación', () => {
    flushPosts(Array.from({ length: 8 }, (_, index) => tutorialPost(index + 1)));

    const stored = JSON.parse(sessionStorage.getItem(SHOWN_KEY) || '[]');

    expect(stored).toHaveLength(4);
    expect(stored).toEqual(fixture.componentInstance.tutorials().map(post => post.id));
  });
});
