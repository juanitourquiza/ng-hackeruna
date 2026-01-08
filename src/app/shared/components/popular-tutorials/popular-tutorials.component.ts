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
        // Fetch recent posts and filter for tutorials
        // You can adjust this to filter by a specific category ID if you have a "Tutoriales" category
        this.wpApi.getPosts(1, 10).subscribe({
            next: (response) => {
                // Filter posts that contain "tutorial" or relevant keywords in title or content
                const tutorialPosts = response.data
                    .filter(post =>
                        post.title.rendered.toLowerCase().includes('tutorial') ||
                        post.title.rendered.toLowerCase().includes('guía') ||
                        post.title.rendered.toLowerCase().includes('cómo')
                    )
                    .slice(0, 3); // Take only top 3

                this.tutorials.set(tutorialPosts);
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
