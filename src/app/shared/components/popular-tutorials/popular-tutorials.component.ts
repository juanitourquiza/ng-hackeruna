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
    private static readonly LIMIT = 4;
    private static readonly SHOWN_STORAGE_KEY = 'hackeruna.tutorials.shown';

    private wpApi = inject(WordpressApiService);
    private languageService = inject(LanguageService);

    get currentLang() {
        return this.languageService.currentLang();
    }

    tutorials = signal<WpPost[]>([]);
    loading = signal(true);

    ngOnInit(): void {
        // Trae un pool amplio de posts recientes, prioriza tutoriales/guías y
        // elige 4 al azar evitando repetir los ya mostrados en esta sesión.
        this.wpApi.getPosts(1, 20).subscribe({
            next: (response) => {
                const posts = response.data ?? [];
                const isTutorial = (p: WpPost) => {
                    const title = p.title.rendered.toLowerCase();
                    return ['tutorial', 'guía', 'guia', 'cómo', 'como', 'aprende', 'paso a paso', 'introducción']
                        .some(k => title.includes(k));
                };

                const preferred = this.shuffle(posts.filter(isTutorial));
                const rest = this.shuffle(posts.filter(p => !isTutorial(p)));
                const shownIds = this.readShownIds();

                const selected: WpPost[] = [];
                const seen = new Set<number>();

                const addFrom = (pool: WpPost[], onlyFresh: boolean) => {
                    for (const post of pool) {
                        if (selected.length >= PopularTutorialsComponent.LIMIT) return;
                        if (seen.has(post.id)) continue;
                        if (onlyFresh && shownIds.includes(post.id)) continue;

                        seen.add(post.id);
                        selected.push(post);
                    }
                };

                // Primero tutoriales no vistos, luego cualquier post no visto y,
                // si no alcanza, se permite repetir para completar la sección.
                addFrom(preferred, true);
                addFrom(rest, true);
                addFrom(preferred, false);
                addFrom(rest, false);

                this.tutorials.set(selected);
                this.storeShownIds([...shownIds, ...selected.map(post => post.id)]);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error loading tutorials:', err);
                this.loading.set(false);
            }
        });
    }

    private readShownIds(): number[] {
        try {
            const raw = sessionStorage.getItem(PopularTutorialsComponent.SHOWN_STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number') : [];
        } catch {
            return [];
        }
    }

    private storeShownIds(ids: number[]): void {
        try {
            // Solo guardamos las últimas rotaciones para que el pool vuelva a
            // estar disponible cuando el usuario siga navegando.
            sessionStorage.setItem(
                PopularTutorialsComponent.SHOWN_STORAGE_KEY,
                JSON.stringify(ids.slice(-12))
            );
        } catch {
            // sessionStorage puede no estar disponible (modo privado).
        }
    }

    private shuffle<T>(items: T[]): T[] {
        const copy = [...items];

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
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
