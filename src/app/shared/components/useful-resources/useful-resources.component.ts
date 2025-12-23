import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Resource {
    name: string;
    description: string;
    url: string;
    icon: string;
    category: 'tools' | 'learning' | 'libraries' | 'design';
}

@Component({
    selector: 'app-useful-resources',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './useful-resources.component.html',
    styleUrls: ['./useful-resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsefulResourcesComponent {
    selectedCategory = signal<string>('all');

    resources = signal<Resource[]>([
        // Development Tools
        {
            name: 'VS Code',
            description: 'Editor de código potente y extensible',
            url: 'https://code.visualstudio.com/',
            icon: 'code',
            category: 'tools'
        },
        {
            name: 'GitHub',
            description: 'Plataforma de desarrollo colaborativo',
            url: 'https://github.com/',
            icon: 'deployed_code',
            category: 'tools'
        },
        {
            name: 'Postman',
            description: 'Herramienta para testing de APIs',
            url: 'https://www.postman.com/',
            icon: 'api',
            category: 'tools'
        },

        // Learning Platforms
        {
            name: 'Angular Docs',
            description: 'Documentación oficial de Angular',
            url: 'https://angular.dev/',
            icon: 'school',
            category: 'learning'
        },
        {
            name: 'MDN Web Docs',
            description: 'Recursos para desarrolladores web',
            url: 'https://developer.mozilla.org/',
            icon: 'menu_book',
            category: 'learning'
        },
        {
            name: 'Web3 University',
            description: 'Aprende desarrollo blockchain',
            url: 'https://www.web3.university/',
            icon: 'school',
            category: 'learning'
        },

        // Libraries & Frameworks
        {
            name: 'TailwindCSS',
            description: 'Framework CSS utility-first',
            url: 'https://tailwindcss.com/',
            icon: 'palette',
            category: 'libraries'
        },
        {
            name: 'RxJS',
            description: 'Programación reactiva para JavaScript',
            url: 'https://rxjs.dev/',
            icon: 'stream',
            category: 'libraries'
        },
        {
            name: 'Laravel',
            description: 'Framework PHP para aplicaciones web',
            url: 'https://laravel.com/',
            icon: 'code_blocks',
            category: 'libraries'
        },

        // Design Resources
        {
            name: 'Figma',
            description: 'Diseño de interfaces colaborativo',
            url: 'https://www.figma.com/',
            icon: 'draw',
            category: 'design'
        },
        {
            name: 'Material Icons',
            description: 'Biblioteca de iconos de Google',
            url: 'https://fonts.google.com/icons',
            icon: 'category',
            category: 'design'
        },
        {
            name: 'Coolors',
            description: 'Generador de paletas de colores',
            url: 'https://coolors.co/',
            icon: 'palette',
            category: 'design'
        }
    ]);

    get filteredResources(): Resource[] {
        const category = this.selectedCategory();
        if (category === 'all') {
            return this.resources();
        }
        return this.resources().filter(r => r.category === category);
    }

    selectCategory(category: string): void {
        this.selectedCategory.set(category);
    }

    trackByResourceName(index: number, resource: Resource): string {
        return resource.name;
    }
}
