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
          <p class="text-xs font-mono uppercase tracking-widest mb-3" style="color: var(--accent-blue);">
            // about
          </p>
          <h1 class="text-4xl lg:text-5xl font-bold mb-3" style="color: var(--text-primary);">
            {{ t('about.title') }}
          </h1>
          <p class="text-xl" style="color: var(--text-secondary);">
            Juan Urquiza — {{ t('about.subtitle') }}
          </p>
          <p class="text-sm font-mono mt-2" style="color: var(--text-tertiary);">
            {{ t('about.roleLine') }}
          </p>
        </div>

        <!-- Profile Section -->
        <div class="mb-14">
          <div class="rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
               style="background: linear-gradient(135deg, #0a0e14 0%, #16223a 55%, #0f2f3d 100%);">
            <span class="material-symbols-outlined absolute -right-6 -bottom-8 text-[12rem] leading-none opacity-10">terminal</span>
            <div class="flex flex-col md:flex-row items-center gap-8 relative">
              <div class="flex-shrink-0">
                <div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center text-6xl lg:text-7xl font-bold"
                     style="background: rgba(34,211,238,0.12); border: 2px solid rgba(34,211,238,0.4); color: #22d3ee;">
                  JU
                </div>
              </div>
              <div class="flex-1 text-center md:text-left">
                <h2 class="text-3xl font-bold mb-4">Juan Urquiza</h2>
                <p class="text-lg mb-6 opacity-90">
                  {{ t('about.profileDescription') }}
                </p>
                <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a href="https://github.com/juanitourquiza" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/juanitourquiza" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://juanitourquiza.github.io" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <span class="material-symbols-outlined text-xl">language</span>
                    {{ t('about.portfolio') }}
                  </a>
                  <a href="mailto:j@hackeruna.com"
                     class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <span class="material-symbols-outlined text-xl">email</span>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          @for (s of stats; track s.label) {
          <div class="text-center p-5 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            <div class="text-3xl lg:text-4xl font-bold mb-1" style="color: var(--accent-blue);">{{ s.value }}</div>
            <div class="text-xs" style="color: var(--text-secondary);">{{ t(s.label) }}</div>
          </div>
          }
        </div>

        <!-- Experience / Specialization -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8" style="color: var(--text-primary);">
            {{ t('about.experience.title') }}
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            @for (c of specializations; track c.key) {
            <div class="p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-3xl" [style.color]="c.accent">{{ c.icon }}</span>
                <h3 class="text-xl font-bold" style="color: var(--text-primary);">
                  {{ t('about.experience.' + c.key + '.title') }}
                </h3>
              </div>
              <p style="color: var(--text-secondary);">
                {{ t('about.experience.' + c.key + '.description') }}
              </p>
            </div>
            }
          </div>
        </div>

        <!-- Professional Timeline -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8" style="color: var(--text-primary);">
            {{ t('about.experienceTimeline') }}
          </h2>
          <ol class="relative border-s-2 ms-3" style="border-color: var(--border-color);">
            @for (e of t('about.timeline'); track e.period) {
            <li class="mb-8 ms-6">
              <span class="absolute -start-2.5 flex items-center justify-center w-5 h-5 rounded-full"
                    style="background-color: var(--accent-blue);"></span>
              <p class="text-xs font-mono mb-1" style="color: var(--accent-blue);">{{ e.period }}</p>
              <h3 class="text-lg font-semibold" style="color: var(--text-primary);">{{ e.role }} · <span style="color: var(--text-secondary);">{{ e.org }}</span></h3>
              <p class="text-sm mt-1" style="color: var(--text-secondary);">{{ e.detail }}</p>
            </li>
            }
          </ol>
        </div>

        <!-- Book -->
        <div class="mb-16">
          <div class="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6"
               style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            <div class="flex items-center justify-center w-20 h-20 rounded-xl shrink-0"
                 style="background: rgba(168,85,247,0.12); color: #a855f7;">
              <span class="material-symbols-outlined text-4xl">menu_book</span>
            </div>
            <div class="flex-1 text-center md:text-left">
              <p class="text-xs font-mono uppercase tracking-widest mb-1" style="color: #a855f7;">{{ t('about.book.label') }}</p>
              <h3 class="text-xl font-bold mb-2" style="color: var(--text-primary);">{{ t('about.book.title') }}</h3>
              <p class="text-sm mb-3" style="color: var(--text-secondary);">{{ t('about.book.description') }}</p>
              <a href="https://leanpub.com/u/juanitourquiza" target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-1 text-sm font-medium hover:underline" style="color: var(--accent-blue);">
                <span class="material-symbols-outlined text-base">open_in_new</span>{{ t('about.book.cta') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">
            {{ t('about.techStack') }}
          </h2>
          <div class="flex flex-wrap gap-2.5">
            @for (tech of technologies; track tech) {
              <span class="px-3.5 py-1.5 rounded-full text-sm font-mono"
                    style="background-color: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color);">
                {{ tech }}
              </span>
            }
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="text-center p-8 rounded-2xl text-white"
             style="background: linear-gradient(135deg, #0a0e14, #0f2f3d);">
          <h2 class="text-2xl lg:text-3xl font-bold mb-4">{{ t('about.cta.title') }}</h2>
          <p class="text-lg mb-6 opacity-90">{{ t('about.cta.subtitle') }}</p>
          <a [routerLink]="['/', currentLang, 'contact']"
             class="inline-block px-8 py-3 font-semibold rounded-lg transition-all hover:opacity-90"
             style="background-color: #22d3ee; color: #0a0e14;">
            {{ t('about.cta.button') }}
          </a>
        </div>

      </div>
    </main>
  `,
  styles: [`:host { display: block; }`]
})
export class AboutComponent implements OnInit {
  private schemaService = inject(SchemaService);
  private metaTagsService = inject(MetaTagsService);
  private languageService = inject(LanguageService);

  stats = [
    { value: '15+', label: 'about.stats.years' },
    { value: '40+', label: 'about.stats.projects' },
    { value: '100+', label: 'about.stats.users' },
    { value: '1', label: 'about.stats.book' },
  ];

  specializations = [
    { key: 'ai', icon: 'smart_toy', accent: '#a855f7' },
    { key: 'webDev', icon: 'code', accent: '#22d3ee' },
    { key: 'blockchain', icon: 'currency_bitcoin', accent: '#8b5cf6' },
    { key: 'security', icon: 'security', accent: '#f43f5e' },
  ];

  technologies = [
    'Angular', 'React', 'Vue.js', 'TypeScript', 'PHP', 'Symfony', 'Laravel',
    'C#', '.NET', 'Java', 'Node.js', 'Python', 'MCP', 'Claude', 'Solidity',
    'Ethereum', 'Kali Linux', 'OWASP', 'Docker', 'Nginx', 'MySQL', 'PostgreSQL',
    'Tailwind', 'PWA', 'React Native',
  ];

  get currentLang() {
    return this.languageService.currentLang();
  }

  ngOnInit(): void {
    this.metaTagsService.updateMetaTags({
      title: 'Sobre Mí — Juan Urquiza | Hackeruna',
      description:
        'Juan Urquiza: Ingeniero de Software Full-Stack y AI-Native con 15+ años de experiencia. Fundador de hackeruna.com, creador de Pulsai y autor de "Programar con IA".',
      image: 'https://hackeruna.com/assets/hackeruna.png',
      url: 'https://hackeruna.com/about',
      type: 'profile',
    });

    this.schemaService.addMultipleSchemas([
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Juan Urquiza',
        alternateName: 'Juan Carlos Urquiza Suárez',
        jobTitle: 'Software Engineer · AI-Native Developer',
        description:
          'Ingeniero de Software Full-Stack e Ingeniero de Sistemas con Maestría en Redes de Comunicación y más de 15 años de experiencia. Fundador de hackeruna.com, creador de Pulsai y autor del libro "Programar con IA, Programar para la IA".',
        url: 'https://hackeruna.com/about',
        image: 'https://hackeruna.com/assets/hackeruna.png',
        email: 'j@hackeruna.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Quito', addressCountry: 'EC' },
        sameAs: [
          'https://www.linkedin.com/in/juanitourquiza',
          'https://github.com/juanitourquiza',
          'https://juanitourquiza.github.io',
          'https://leanpub.com/u/juanitourquiza',
        ],
        knowsAbout: [
          'Desarrollo de Software', 'AI-Native Development', 'Model Context Protocol (MCP)',
          'Angular', 'React', 'Vue.js', 'TypeScript', 'PHP', 'Symfony', 'Laravel', 'C#', '.NET',
          'Java', 'Node.js', 'Python', 'Blockchain', 'Solidity', 'Ethereum', 'Zero-Knowledge Proofs',
          'Ciberseguridad', 'Pentesting', 'OWASP', 'Kali Linux', 'DevOps', 'Docker',
        ],
        worksFor: { '@type': 'Organization', name: 'hackeruna.com', url: 'https://hackeruna.com' },
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Católica del Ecuador (PUCE)' },
          { '@type': 'CollegeOrUniversity', name: 'Universidad Autónoma de Quito (UNAQ)' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: 'Programar con IA, Programar para la IA',
        author: { '@type': 'Person', name: 'Juan Urquiza' },
        inLanguage: 'es',
        about: ['Inteligencia Artificial', 'Model Context Protocol', 'Desarrollo de Software'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: { '@type': 'Person', name: 'Juan Urquiza', url: 'https://hackeruna.com/about' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://hackeruna.com' },
          { '@type': 'ListItem', position: 2, name: 'Sobre Mí', item: 'https://hackeruna.com/about' },
        ],
      },
    ]);
  }
}
