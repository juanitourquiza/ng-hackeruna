import { Component, OnInit, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SchemaService } from '../../core/services/schema.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  template: `
    <main class="py-12 lg:py-16" *transloco="let t">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl lg:text-5xl font-bold mb-4" style="color: var(--text-primary);">
            {{ t('about.title') }}
          </h1>
          <p class="text-xl" style="color: var(--text-secondary);">
            Juan Urquiza - {{ t('about.subtitle') }}
          </p>
        </div>

        <!-- Profile Section -->
        <div class="mb-16">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
            <div class="flex flex-col md:flex-row items-center gap-8">
              <div class="flex-shrink-0">
                <div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-6xl lg:text-7xl font-bold">
                  JU
                </div>
              </div>
              <div class="flex-1 text-center md:text-left">
                <h2 class="text-3xl font-bold mb-4">Juan Urquiza</h2>
                <p class="text-lg mb-4 opacity-90">
                  {{ t('about.profileDescription') }}
                </p>
                <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a 
                    href="https://github.com/juanitourquiza"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/juanitourquiza"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://juanitourquiza.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <span class="material-symbols-outlined text-xl">language</span>
                    {{ t('about.portfolio') }}
                  </a>
                  <a 
                    href="mailto:j@hackeruna.com"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <span class="material-symbols-outlined text-xl">email</span>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Section -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8" style="color: var(--text-primary);">
            {{ t('about.experience.title') }}
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-3xl" style="color: var(--accent-blue);">
                  code
                </span>
                <h3 class="text-xl font-bold" style="color: var(--text-primary);">
                  {{ t('about.experience.webDev.title') }}
                </h3>
              </div>
              <p style="color: var(--text-secondary);">
                {{ t('about.experience.webDev.description') }}
              </p>
            </div>

            <div class="p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-3xl" style="color: var(--accent-blue);">
                  account_balance
                </span>
                <h3 class="text-xl font-bold" style="color: var(--text-primary);">
                  {{ t('about.experience.blockchain.title') }}
                </h3>
              </div>
              <p style="color: var(--text-secondary);">
                {{ t('about.experience.blockchain.description') }}
              </p>
            </div>

            <div class="p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-3xl" style="color: var(--accent-blue);">
                  security
                </span>
                <h3 class="text-xl font-bold" style="color: var(--text-primary);">
                  {{ t('about.experience.zkProofs.title') }}
                </h3>
              </div>
              <p style="color: var(--text-secondary);">
                {{ t('about.experience.zkProofs.description') }}
              </p>
            </div>

            <div class="p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-3xl" style="color: var(--accent-blue);">
                  psychology
                </span>
                <h3 class="text-xl font-bold" style="color: var(--text-primary);">
                  {{ t('about.experience.ai.title') }}
                </h3>
              </div>
              <p style="color: var(--text-secondary);">
                {{ t('about.experience.ai.description') }}
              </p>
            </div>
          </div>
        </div>

        <!-- About Blog Section -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">
            {{ t('about.blog.title') }}
          </h2>
          <div class="p-8 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            <p class="text-lg mb-4" style="color: var(--text-secondary);">
              {{ t('about.blog.intro') }}
            </p>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined mt-1" style="color: var(--accent-blue);">
                  check_circle
                </span>
                <span style="color: var(--text-secondary);" [innerHTML]="t('about.blog.items.tutorials')"></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined mt-1" style="color: var(--accent-blue);">
                  check_circle
                </span>
                <span style="color: var(--text-secondary);" [innerHTML]="t('about.blog.items.analysis')"></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined mt-1" style="color: var(--accent-blue);">
                  check_circle
                </span>
                <span style="color: var(--text-secondary);" [innerHTML]="t('about.blog.items.opensource')"></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined mt-1" style="color: var(--accent-blue);">
                  check_circle
                </span>
                <span style="color: var(--text-secondary);" [innerHTML]="t('about.blog.items.guides')"></span>
              </li>
            </ul>
            <p class="text-lg" style="color: var(--text-secondary);">
              {{ t('about.blog.goal') }}
            </p>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">
            {{ t('about.techStack') }}
          </h2>
          <div class="flex flex-wrap gap-3">
            @for (tech of technologies; track tech) {
              <span class="px-4 py-2 rounded-full text-sm font-medium" 
                    style="background-color: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color);">
                {{ tech }}
              </span>
            }
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="text-center p-8 rounded-xl" style="background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple)); color: white;">
          <h2 class="text-2xl lg:text-3xl font-bold mb-4">
            {{ t('about.cta.title') }}
          </h2>
          <p class="text-lg mb-6 opacity-90">
            {{ t('about.cta.subtitle') }}
          </p>
          <a 
            [routerLink]="['/', currentLang, 'contact']"
            class="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          >
            {{ t('about.cta.button') }}
          </a>
        </div>

      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutComponent implements OnInit {
  private schemaService = inject(SchemaService);
  private metaTagsService = inject(MetaTagsService);
  private languageService = inject(LanguageService);

  technologies = [
    'Angular', 'React', 'TypeScript', 'Node.js', 'Solidity', 'Ethereum',
    'Web3', 'Python', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL',
    'TailwindCSS', 'Bootstrap', 'Git', 'PHP', 'Laravel', 'Symfony',
    'Vue.js', 'AI / Machine Learning', 'Windsurf'
  ];

  get currentLang() {
    return this.languageService.currentLang();
  }

  ngOnInit(): void {
    // Meta Tags
    this.metaTagsService.updateMetaTags({
      title: 'Sobre Mí - Juan Urquiza | Hackeruna',
      description: 'Desarrollador Full Stack especializado en Web Development, Blockchain, Zero-Knowledge Proofs e Inteligencia Artificial. Más de 10 años de experiencia en tecnología.',
      image: 'https://hackeruna.com/assets/hackeruna.png',
      url: 'https://hackeruna.com/about',
      type: 'profile'
    });

    // AEO: PersonSchema para motores de búsqueda de IA
    this.schemaService.addMultipleSchemas([
      // 1. Person Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Juan Urquiza',
        alternateName: 'Juanito Urquiza',
        jobTitle: 'Desarrollador Full Stack & Blockchain Engineer',
        description: 'Desarrollador Full Stack con más de 10 años de experiencia en tecnología. Especializado en desarrollo web moderno, blockchain, Zero-Knowledge Proofs e Inteligencia Artificial.',
        url: 'https://hackeruna.com/about',
        image: 'https://hackeruna.com/assets/hackeruna.png',
        email: 'j@hackeruna.com',
        sameAs: [
          'https://www.linkedin.com/in/juanitourquiza',
          'https://github.com/juanitourquiza',
          'https://juanitourquiza.github.io',
          'https://twitter.com/hackeruna',
          'https://www.facebook.com/hackeruna'
        ],
        knowsAbout: [
          'Desarrollo Web',
          'Angular',
          'React',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'PHP',
          'Laravel',
          'Symfony',
          'Blockchain',
          'Zero-Knowledge Proofs',
          'Inteligencia Artificial',
          'Machine Learning',
          'TailwindCSS',
          'Bootstrap',
          'Vue.js',
          'Git'
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Hackeruna',
          url: 'https://hackeruna.com'
        },
        alumniOf: {
          '@type': 'Organization',
          name: 'Universidad'
        }
      },
      // 2. ProfilePage Schema
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Juan Urquiza',
          url: 'https://hackeruna.com/about'
        }
      },
      // 3. Breadcrumb Schema
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://hackeruna.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Sobre Mí',
            item: 'https://hackeruna.com/about'
          }
        ]
      }
    ]);
  }
}
