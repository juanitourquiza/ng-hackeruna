import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-giscus-comments',
    standalone: true,
    imports: [],
    templateUrl: './giscus-comments.component.html',
    styleUrls: ['./giscus-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiscusCommentsComponent implements OnInit, OnDestroy {
    private platformId = inject(PLATFORM_ID);

    ngOnInit(): void {
        // Only load giscus in the browser (not during SSR)
        if (isPlatformBrowser(this.platformId)) {
            this.loadGiscus();
        }
    }

    ngOnDestroy(): void {
        // Clean up giscus script when component is destroyed
        if (isPlatformBrowser(this.platformId)) {
            const giscusScript = document.querySelector('script[src="https://giscus.app/client.js"]');
            if (giscusScript) {
                giscusScript.remove();
            }

            const giscusFrame = document.querySelector('.giscus');
            if (giscusFrame) {
                giscusFrame.remove();
            }
        }
    }

    private loadGiscus(): void {
        // Create script element
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'juanitourquiza/ng-hackeruna');
        script.setAttribute('data-repo-id', 'R_kgDOQTQzSQ');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'DIC_kwDOQTQzSc4C0LRM');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', 'preferred_color_scheme');
        script.setAttribute('data-lang', 'es');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        // Append script to the giscus container
        const giscusContainer = document.getElementById('giscus-container');
        if (giscusContainer) {
            giscusContainer.appendChild(script);
        }
    }
}
