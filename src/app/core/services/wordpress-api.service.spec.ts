import 'zone.js';
import 'zone.js/testing';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WordpressApiService, SidebarPost } from './wordpress-api.service';
import { environment } from '../../../environments/environment';
import { WpPost } from '../models/wordpress.models';

const HACKERUNA_API = environment.wordpressApiUrl.replace('/wp/v2', '/hackeruna/v1');
const WP_API = environment.wordpressApiUrl;

function wpPost(id: number, title: string, date: string): WpPost {
  return {
    id,
    date,
    slug: `post-${id}`,
    title: { rendered: title }
  } as WpPost;
}

describe('WordpressApiService — sidebar', () => {
  let service: WordpressApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(WordpressApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('getOnThisDay', () => {
    it('llama al endpoint del plugin con limit y exclude', () => {
      let result: SidebarPost[] = [];

      service.getOnThisDay(1, [10, 20]).subscribe(posts => (result = posts));

      const req = httpMock.expectOne(request => request.url === `${HACKERUNA_API}/onthisday`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('limit')).toBe('1');
      expect(req.request.params.get('exclude')).toBe('10,20');

      req.flush([
        {
          id: 5,
          slug: 'del-pasado',
          title: 'Del pasado',
          date: '2015-10-27T09:00:00',
          years_ago: 11,
          match: 'on_this_day'
        }
      ]);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ id: 5, match: 'on_this_day', years_ago: 11 });
    });

    it('cae al REST estándar multi-año cuando el plugin no está activo', () => {
      let result: SidebarPost[] = [];

      service.getOnThisDay(1, [10]).subscribe(posts => (result = posts));

      const pluginRequest = httpMock.expectOne(request => request.url === `${HACKERUNA_API}/onthisday`);
      pluginRequest.flush({ code: 'rest_no_route' }, { status: 404, statusText: 'Not Found' });

      const yearRequests = httpMock.match(
        request => request.url === `${WP_API}/posts` && request.params.has('after')
      );

      expect(yearRequests).toHaveLength(10);

      yearRequests.forEach((request, index) => {
        expect(request.request.params.get('per_page')).toBe('5');
        expect(request.request.params.get('_fields')).toBe('id,slug,title,date');
        expect(request.request.params.get('exclude')).toBe('10');

        if (index === 0) {
          request.flush([wpPost(99, 'Viejo &amp; sabio', '2018-10-27T09:00:00')]);
        } else {
          request.flush([]);
        }
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ id: 99, match: 'on_this_day' });
      expect(result[0].title).toBe('Viejo & sabio');
      expect(result[0].years_ago).toBeGreaterThan(0);
    });
  });

  describe('getRandomSidebarPosts', () => {
    it('envía scope y exclude para deduplicar el sidebar', () => {
      let result: SidebarPost[] = [];

      service.getRandomSidebarPosts(2, [1, 2, 3]).subscribe(posts => (result = posts));

      const req = httpMock.expectOne(request => request.url === `${HACKERUNA_API}/random`);
      expect(req.request.params.get('limit')).toBe('2');
      expect(req.request.params.get('exclude')).toBe('1,2,3');
      expect(req.request.params.get('scope')).toBe('all');

      req.flush([
        {
          id: 7,
          slug: 'curiosidad',
          title: 'Curiosidad',
          date: '2024-01-01T00:00:00',
          years_ago: 2,
          match: 'random'
        }
      ]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(7);
    });

    it('usa el fallback nativo y baraja los posts recientes si el plugin falla', () => {
      let result: SidebarPost[] = [];

      service.getRandomSidebarPosts(2, [1], 'archive').subscribe(posts => (result = posts));

      const pluginRequest = httpMock.expectOne(request => request.url === `${HACKERUNA_API}/random`);
      pluginRequest.flush({ code: 'rest_no_route' }, { status: 404, statusText: 'Not Found' });

      const fallbackRequest = httpMock.expectOne(
        request => request.url === `${WP_API}/posts` && request.params.has('before')
      );
      expect(fallbackRequest.request.params.get('exclude')).toBe('1');
      expect(fallbackRequest.request.params.get('per_page')).toBe('30');

      fallbackRequest.flush([
        wpPost(11, 'Archivo uno', '2016-01-01T00:00:00'),
        wpPost(12, 'Archivo dos', '2017-01-01T00:00:00'),
        wpPost(13, 'Archivo tres', '2018-01-01T00:00:00')
      ]);

      expect(result).toHaveLength(2);
      result.forEach(post => expect(post.match).toBe('archive'));
    });
  });
});
