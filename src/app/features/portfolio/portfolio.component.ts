import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'web' | 'blockchain' | 'fullstack' | 'pwa' | 'all';
  technologies: string[];
  link?: string;
  github?: string;
  period?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  projects = signal<Project[]>([
    {
      id: 1,
      title: 'PrisLash - Beauty Studio Platform',
      description: 'Plataforma completa para salón de belleza: Sistema VIP con tarjeta de lealtad QR, Tienda Online con carrito persistente, Reserva de Citas, integración PayPhone. Frontend Angular 19 con Bootstrap 5.3, backend Laravel 11 con Pusher para actualizaciones en tiempo real.',
      image: 'assets/hackeruna.png',
      category: 'fullstack',
      period: '2025',
      technologies: ['Angular 19', 'Laravel 11', 'Bootstrap 5.3', 'Pusher', 'MySQL', 'PayPhone', 'QR System'],
      github: 'https://github.com/juanitourquiza/ng-pris',
      link: 'https://prislash.com/'
    },
    {
      id: 2,
      title: 'medicProof MVP',
      description: 'Sistema Zero-Knowledge Proof para verificación de compras de medicamentos usando facturas electrónicas del SRI Ecuador. Implementa circuitos ZK con Noir para demostrar hechos sin exponer información personal.',
      image: 'assets/hackeruna.png',
      category: 'blockchain',
      period: '2025',
      technologies: ['Laravel 11', 'Angular 20', 'Noir', 'ZK-Proofs', 'MySQL'],
      github: 'https://github.com/juanitourquiza/medicProof',
      link: 'https://github.com/juanitourquiza/medicProof'
    },
    {
      id: 3,
      title: 'Ficha Catastral (PWA)',
      description: 'Aplicación web progresiva (PWA) para gestión catastral diseñada para trabajo en campo. Frontend en Angular con interfaz dinámica y responsive, backend en Java para manejo eficiente y seguro de datos.',
      image: 'assets/hackeruna.png',
      category: 'pwa',
      period: 'feb. 2025 - mar. 2025',
      technologies: ['PWA', 'Angular', 'REST APIs', 'HTML', 'Git', 'Java']
    },
    {
      id: 4,
      title: 'Hackeruna - Blog Tech',
      description: 'Blog personal sobre tecnología y programación construido con Angular 20, WordPress API y Tailwind CSS. Sistema de contacto con reCAPTCHA v3 y validaciones completas.',
      image: 'assets/hackeruna.png',
      category: 'web',
      period: '2025',
      technologies: ['Angular 20', 'TypeScript', 'Tailwind CSS', 'WordPress API', 'reCAPTCHA'],
      link: 'https://hackeruna.com',
      github: 'https://github.com/juanitourquiza/ng-hackeruna'
    },
    {
      id: 5,
      title: 'Facturación Electrónica',
      description: 'Sistema de facturación electrónica con Angular frontend ofreciendo interfaz ágil e intuitiva, y Laravel backend garantizando seguridad y eficiencia. Cumple con normativas vigentes del SRI.',
      image: 'assets/hackeruna.png',
      category: 'fullstack',
      period: 'ago. 2024 - ene. 2025',
      technologies: ['Angular', 'Laravel', 'PostgreSQL', 'CSS', 'PHP']
    },
    {
      id: 6,
      title: 'KipuBank - Smart Contract',
      description: 'Contrato inteligente descentralizado que funciona como bóveda de ahorros personal en Ethereum. Implementa patrón anti-reentrancy, límites de retiro y documentación NatSpec completa.',
      image: 'assets/hackeruna.png',
      category: 'blockchain',
      period: '2024',
      technologies: ['Solidity ^0.8.29', 'Ethereum', 'Sepolia Testnet', 'Remix IDE'],
      github: 'https://github.com/juanitourquiza/kipu-bank',
      link: 'https://sepolia.etherscan.io/address/0x3aCA094C70D5198541BE52C828703A84D66deE94'
    },
    {
      id: 7,
      title: 'Financial Products App',
      description: 'Aplicación web moderna para gestión de productos financieros con arquitectura SOLID. CRUD completo, búsqueda avanzada, paginación dinámica y cobertura de tests del 74.11%. Optimizada con OnPush change detection.',
      image: 'assets/hackeruna.png',
      category: 'web',
      period: '2024',
      technologies: ['Angular 20', 'TypeScript', 'Jest', 'Reactive Forms', 'SOLID'],
      github: 'https://github.com/juanitourquiza/ng-bank',
      link: 'https://github.com/juanitourquiza/ng-bank'
    },
    {
      id: 8,
      title: 'TOTS - Sistema de Reservas',
      description: 'Plataforma completa para gestión de reservas de espacios. Frontend en Angular 19 con Material Design, backend RESTful en Symfony 6.4 con autenticación JWT y panel de administración.',
      image: 'assets/hackeruna.png',
      category: 'fullstack',
      period: '2024',
      technologies: ['Angular 19', 'Symfony 6.4', 'JWT', 'MySQL', 'Material Design'],
      github: 'https://github.com/juanitourquiza/ng-tots',
      link: 'https://github.com/juanitourquiza/ng-tots'
    },
    {
      id: 9,
      title: 'Declaración Juramentada - Control Cuarentenario',
      description: 'Sistema innovador que optimiza controles cuarentenarios en aeropuertos mediante automatización de Declaración Jurada de Mercancías. Mejora eficiencia, cumplimiento normativo y experiencia del usuario.',
      image: 'assets/hackeruna.png',
      category: 'fullstack',
      period: 'ago. 2024 - nov. 2024',
      technologies: ['Angular', 'Laravel', 'PHP', 'TypeScript', 'Bootstrap', 'MySQL'],
      link: 'https://declaracion.abgalapagos.gob.ec/'
    },
    {
      id: 10,
      title: 'SIIC - Sistema de Inspección y Cuarentena',
      description: 'Software para automatización del sistema de inspección y control cuarentenario en carga marítima desde Guayaquil hacia Galápagos. Agencia de Regulación y Control de la Bioseguridad y Cuarentena.',
      image: 'assets/hackeruna.png',
      category: 'fullstack',
      period: 'abr. 2021 - nov. 2021',
      technologies: ['Angular', 'MySQL', 'PostgreSQL', 'Laravel', 'REST APIs', 'Scrum'],
      link: 'https://siic.abgalapagos.gob.ec/'
    },
    {
      id: 11,
      title: 'Developer Landing Page',
      description: 'Landing page personal pensada para desarrolladores con información básica y links a redes sociales. Viene con 9 material themes. Traducción y mejoras del proyecto original de Dinesh Pandiyan.',
      image: 'assets/hackeruna.png',
      category: 'web',
      period: '2019',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
      github: 'https://github.com/juanitourquiza/juanitourquiza.github.io',
      link: 'https://juanitourquiza.github.io'
    }
  ]);

  selectedCategory = signal<'all' | 'web' | 'blockchain' | 'fullstack' | 'pwa'>('all');

  ngOnInit(): void {
    // Initialize component
  }

  selectCategory(category: 'all' | 'web' | 'blockchain' | 'fullstack' | 'pwa'): void {
    this.selectedCategory.set(category);
  }

  get filteredProjects(): Project[] {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.projects();
    }
    return this.projects().filter(project => project.category === category);
  }

  // TrackBy function for optimized list rendering
  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
}
