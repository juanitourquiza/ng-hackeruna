import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../../../core/services/language.service';

interface FeaturedProject {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    link?: string;
    github?: string;
}

@Component({
    selector: 'app-featured-projects',
    standalone: true,
    imports: [CommonModule, RouterLink, TranslocoModule],
    templateUrl: './featured-projects.component.html',
    styleUrls: ['./featured-projects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProjectsComponent {
    private languageService = inject(LanguageService);

    get currentLang() {
        return this.languageService.currentLang();
    }

    // Featured projects - showing top 4 most recent/important projects
    featuredProjects = signal<FeaturedProject[]>([
        {
            id: 1,
            title: 'PrisLash - Beauty Studio Platform',
            description: 'Plataforma completa para salón de belleza con Sistema VIP, Tienda Online y Reserva de Citas.',
            image: 'assets/hackeruna.png',
            category: 'fullstack',
            technologies: ['Angular 19', 'Laravel 11', 'Pusher', 'MySQL'],
            github: 'https://github.com/juanitourquiza/ng-pris',
            link: 'https://prislash.com/'
        },
        {
            id: 2,
            title: 'medicProof MVP',
            description: 'Sistema Zero-Knowledge Proof para verificación de compras de medicamentos.',
            image: 'assets/hackeruna.png',
            category: 'blockchain',
            technologies: ['Laravel 11', 'Angular 20', 'Noir', 'ZK-Proofs'],
            github: 'https://github.com/juanitourquiza/medicProof',
            link: 'https://github.com/juanitourquiza/medicProof'
        },
        {
            id: 3,
            title: 'KipuBank - Smart Contract',
            description: 'Contrato inteligente descentralizado como bóveda de ahorros personal en Ethereum.',
            image: 'assets/hackeruna.png',
            category: 'blockchain',
            technologies: ['Solidity', 'Ethereum', 'Sepolia'],
            github: 'https://github.com/juanitourquiza/kipu-bank',
            link: 'https://sepolia.etherscan.io/address/0x3aCA094C70D5198541BE52C828703A84D66deE94'
        },
        {
            id: 4,
            title: 'Financial Products App',
            description: 'Gestión de productos financieros con arquitectura SOLID y cobertura del 74.11%.',
            image: 'assets/hackeruna.png',
            category: 'web',
            technologies: ['Angular 20', 'TypeScript', 'Jest', 'SOLID'],
            github: 'https://github.com/juanitourquiza/ng-bank',
            link: 'https://github.com/juanitourquiza/ng-bank'
        }
    ]);

    trackByProjectId(index: number, project: FeaturedProject): number {
        return project.id;
    }
}
