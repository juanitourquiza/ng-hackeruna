import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface StackGroup {
  key: string;
  icon: string;
  accent: string;
  items: string[];
}

/**
 * Sección "Mi Stack" — reemplaza la antigua "Recursos Útiles" (links genéricos)
 * por las tecnologías reales que domina y usa en producción. Aporta a la marca
 * profesional en lugar de enlazar herramientas de terceros.
 */
@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *transloco="let t">
      <section class="py-12 lg:py-16" style="background-color: var(--bg-secondary);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <p class="text-xs font-mono uppercase tracking-widest mb-2" style="color: var(--accent-blue);">
              // stack
            </p>
            <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">
              {{ t('stack.title') }}
            </h2>
            <p class="text-base" style="color: var(--text-secondary);">
              {{ t('stack.subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (group of groups; track group.key) {
            <div class="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
              style="background-color: var(--bg-primary); border: 1px solid var(--border-color);">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-2xl flex items-center justify-center w-10 h-10 rounded-lg"
                  [style.color]="group.accent" [style.background]="group.accent + '1a'">
                  {{ group.icon }}
                </span>
                <h3 class="text-sm font-semibold uppercase tracking-wide" style="color: var(--text-primary);">
                  {{ t('stack.categories.' + group.key) }}
                </h3>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (item of group.items; track item) {
                <span class="inline-block px-2.5 py-1 text-xs font-mono rounded-md"
                  style="background-color: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid var(--border-color);">
                  {{ item }}
                </span>
                }
              </div>
            </div>
            }
          </div>
        </div>
      </section>
    </ng-container>
  `,
})
export class TechStackComponent {
  groups: StackGroup[] = [
    {
      key: 'backend',
      icon: 'dns',
      accent: '#22d3ee',
      items: ['Symfony', 'Laravel', 'API Platform', 'PHP', 'C#', 'Java', 'Node.js'],
    },
    {
      key: 'frontend',
      icon: 'devices',
      accent: '#38bdf8',
      items: ['Angular', 'React', 'Vue.js', 'TypeScript', 'PWA', 'Tailwind', 'Bootstrap'],
    },
    {
      key: 'ai',
      icon: 'smart_toy',
      accent: '#a855f7',
      items: ['MCP', 'Claude', 'ChatGPT', 'Gemini', 'OAuth', 'Prompt Engineering'],
    },
    {
      key: 'web3',
      icon: 'currency_bitcoin',
      accent: '#8b5cf6',
      items: ['Solidity', 'Ethereum', 'Smart Contracts', 'dApps', 'ZK-Proofs'],
    },
    {
      key: 'security',
      icon: 'security',
      accent: '#f43f5e',
      items: ['Kali Linux', 'OWASP', 'Pentesting', 'Metasploit', 'Wireless'],
    },
    {
      key: 'devops',
      icon: 'cloud',
      accent: '#10b981',
      items: ['Git', 'Docker', 'Jenkins', 'Nginx', 'Apache', 'CI/CD', 'Linux'],
    },
    {
      key: 'databases',
      icon: 'database',
      accent: '#f59e0b',
      items: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'MongoDB'],
    },
  ];
}
