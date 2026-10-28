import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';

import { GoogleAnalyticsService } from '../../../core/services/google-analytics.service';

interface ShareNetwork {
  name: string;
  label: string;
  href: string;
  path: string;
}

/**
 * Riel vertical de compartir estilo Wired/NYT para la columna izquierda
 * del detalle de artículo. En pantallas menores a xl se oculta y queda
 * la barra de compartir horizontal del final del artículo.
 */
@Component({
  selector: 'app-article-share-rail',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sticky top-28 flex flex-col items-center gap-3">
      <span class="text-[10px] font-mono uppercase tracking-widest mb-1"
        style="color: var(--text-tertiary); writing-mode: vertical-rl;">
        Compartir
      </span>

      @for (network of networks(); track network.name) {
      <a [href]="network.href" target="_blank" rel="noopener noreferrer"
        class="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:opacity-90"
        style="background-color: var(--bg-secondary); color: var(--text-secondary); border: 1px solid var(--border-color);"
        [attr.aria-label]="'Compartir en ' + network.label" [title]="network.label"
        (click)="track(network.label)">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path [attr.d]="network.path" />
        </svg>
      </a>
      }

      <button type="button" (click)="copyLink()"
        class="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:opacity-90"
        style="background-color: var(--bg-secondary); color: var(--text-secondary); border: 1px solid var(--border-color);"
        [attr.aria-label]="copied() ? '¡Enlace copiado!' : 'Copiar enlace'"
        [title]="copied() ? '¡Enlace copiado!' : 'Copiar enlace'">
        <span class="material-symbols-outlined text-lg" aria-hidden="true">
          {{ copied() ? 'check' : 'link' }}
        </span>
      </button>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ArticleShareRailComponent {
  @Input() url = '';
  @Input() title = '';
  @Input() description = '';

  readonly copied = signal(false);

  private analytics = inject(GoogleAnalyticsService);

  private readonly linkedInPath = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
  private readonly facebookPath = 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z';
  private readonly whatsappPath = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
  private readonly xPath = 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';

  networks(): ShareNetwork[] {
    const url = encodeURIComponent(this.url);
    const text = encodeURIComponent(`${this.title}\n\n${this.description}`);

    return [
      {
        name: 'x',
        label: 'X / Twitter',
        href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        path: this.xPath
      },
      {
        name: 'linkedin',
        label: 'LinkedIn',
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        path: this.linkedInPath
      },
      {
        name: 'facebook',
        label: 'Facebook',
        href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        path: this.facebookPath
      },
      {
        name: 'whatsapp',
        label: 'WhatsApp',
        href: `https://wa.me/?text=${encodeURIComponent(`${this.title}\n\n${this.description}\n\n${this.url}`)}`,
        path: this.whatsappPath
      }
    ];
  }

  track(label: string): void {
    this.analytics.trackShare(label, 'article', this.url);
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.url);
    } catch {
      this.copyLinkFallback();
    }

    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    this.analytics.trackShare('Copiar enlace', 'article', this.url);
  }

  private copyLinkFallback(): void {
    const textArea = document.createElement('textarea');
    textArea.value = this.url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
    }

    document.body.removeChild(textArea);
  }
}
