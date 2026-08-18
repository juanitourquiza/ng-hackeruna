import { Component, signal, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROJECTS, Project, ProjectCategory } from '../../core/data/projects.data';
import { MetaTagsService } from '../../core/services/meta-tags.service';

type Filter = 'all' | ProjectCategory;

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  private metaTagsService = inject(MetaTagsService);

  projects = signal<Project[]>(PROJECTS);
  selectedCategory = signal<Filter>('all');

  readonly filters: { key: Filter; labelKey: string }[] = [
    { key: 'all', labelKey: 'portfolio.allProjects' },
    { key: 'ai', labelKey: 'portfolio.ai' },
    { key: 'fullstack', labelKey: 'portfolio.fullstack' },
    { key: 'web', labelKey: 'portfolio.webDev' },
    { key: 'blockchain', labelKey: 'portfolio.blockchain' },
    { key: 'pwa', labelKey: 'portfolio.pwa' },
  ];

  ngOnInit(): void {
    this.metaTagsService.updateMetaTags({
      title: 'Portafolio de Proyectos — Juan Urquiza | Hackeruna',
      description:
        'Proyectos de Juan Urquiza: plataformas AI-native (Pulsai, ShipFrame), sistemas empresariales, dApps blockchain y aplicaciones web/PWA con Angular, Laravel, Symfony y .NET.',
      url: 'https://hackeruna.com/portfolio',
      type: 'website',
    });
  }

  selectCategory(category: Filter): void {
    this.selectedCategory.set(category);
  }

  get filteredProjects(): Project[] {
    const category = this.selectedCategory();
    if (category === 'all') return this.projects();
    return this.projects().filter((p) => p.category === category);
  }

  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
}
