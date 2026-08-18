import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { WordpressApiService } from '../../../core/services/wordpress-api.service';
import { WpPost } from '../../../core/models/wordpress.models';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-popular-tutorials',
    standalone: true,
    imports: [RouterLink, TranslocoModule],
    templateUrl: './popular-tutorials.component.html',
    styleUrls: ['./popular-tutorials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularTutorialsComponent implements OnInit {
    private wpApi = inject(WordpressApiService);
    private languageService = inject(LanguageService);

    get currentLang() {
        return this.languageService.currentLang();
    }

    tutorials = signal<WpPost[]>([]);
    loading = signal(true);

    ngOnInit(): void {
        const LIMIT = 4;
        // Trae bastantes posts recientes, prioriza los que parecen tutoriales/guías
        // y rellena con recientes para que la sección siempre se vea completa.
        this.wpApi.getPosts(1, 20).subscribe({
            next: (response) => {
                const posts = response.data ?? [];
                const isTutorial = (p: WpPost) => {
                    const title = p.title.rendered.toLowerCase();
                    return ['tutorial', 'guía', 'guia', 'cómo', 'como', 'aprende', 'paso a paso', 'introducción']
                        .some(k => title.includes(k));
                };

                const preferred = posts.filter(isTutorial);
                const rest = posts.filter(p => !isTutorial(p));
                const selected: WpPost[] = [];
                const seen = new Set<number>();
                for (const p of [...preferred, ...rest]) {
                    if (selected.length >= LIMIT) break;
                    if (!seen.has(p.id)) { seen.add(p.id); selected.push(p); }
                }

                this.tutorials.set(selected);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error loading tutorials:', err);
                this.loading.set(false);
            }
        });
    }

    stripHtml(html: string): string {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    trackByPostId(index: number, post: WpPost): number {
        return post.id;
    }
}
