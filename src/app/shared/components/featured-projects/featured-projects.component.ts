import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../../../core/services/language.service';
import { FEATURED_PROJECTS, Project } from '../../../core/data/projects.data';

@Component({
    selector: 'app-featured-projects',
    standalone: true,
    imports: [RouterLink, TranslocoModule],
    templateUrl: './featured-projects.component.html',
    styleUrls: ['./featured-projects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProjectsComponent {
    private languageService = inject(LanguageService);

    get currentLang() {
        return this.languageService.currentLang();
    }

    // Top proyectos destacados (fuente única de datos).
    featuredProjects = signal<Project[]>(FEATURED_PROJECTS);

    trackByProjectId(index: number, project: Project): number {
        return project.id;
    }
}
