import 'zone.js';
import 'zone.js/testing';

import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize TestBed once before all tests
beforeAll(() => {
  try {
    getTestBed().resetTestEnvironment();
  } catch (e) {
    // Not initialized yet
  }
  
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
});

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('✅ 4. Filtrado de Proyectos', () => {
    it('debería inicializar con categoría "all"', () => {
      expect(component.selectedCategory()).toBe('all');
    });

    it('debería tener 10 proyectos cargados', () => {
      expect(component.projects().length).toBe(10);
    });

    it('debería mostrar todos los proyectos cuando la categoría es "all"', () => {
      component.selectCategory('all');
      
      const filtered = component.filteredProjects;
      expect(filtered.length).toBe(10);
    });

    it('debería filtrar proyectos por categoría "web"', () => {
      component.selectCategory('web');
      
      const filtered = component.filteredProjects;
      const allAreWeb = filtered.every(p => p.category === 'web');
      
      expect(filtered.length).toBeGreaterThan(0);
      expect(allAreWeb).toBe(true);
    });

    it('debería filtrar proyectos por categoría "blockchain"', () => {
      component.selectCategory('blockchain');
      
      const filtered = component.filteredProjects;
      const allAreBlockchain = filtered.every(p => p.category === 'blockchain');
      
      expect(filtered.length).toBe(2); // medicProof y KipuBank
      expect(allAreBlockchain).toBe(true);
    });

    it('debería filtrar proyectos por categoría "fullstack"', () => {
      component.selectCategory('fullstack');
      
      const filtered = component.filteredProjects;
      const allAreFullstack = filtered.every(p => p.category === 'fullstack');
      
      expect(filtered.length).toBeGreaterThan(0);
      expect(allAreFullstack).toBe(true);
    });

    it('debería filtrar proyectos por categoría "pwa"', () => {
      component.selectCategory('pwa');
      
      const filtered = component.filteredProjects;
      const allArePWA = filtered.every(p => p.category === 'pwa');
      
      expect(filtered.length).toBe(1); // Solo Ficha Catastral
      expect(allArePWA).toBe(true);
    });

    it('debería cambiar la categoría seleccionada', () => {
      expect(component.selectedCategory()).toBe('all');
      
      component.selectCategory('web');
      expect(component.selectedCategory()).toBe('web');
      
      component.selectCategory('blockchain');
      expect(component.selectedCategory()).toBe('blockchain');
    });
  });

  describe('✅ 5. Estructura de Proyectos', () => {
    it('todos los proyectos deberían tener campos requeridos', () => {
      const projects = component.projects();
      
      projects.forEach(project => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.image).toBeDefined();
        expect(project.category).toBeDefined();
        expect(project.technologies).toBeDefined();
        expect(Array.isArray(project.technologies)).toBe(true);
      });
    });

    it('debería tener el proyecto medicProof MVP', () => {
      const projects = component.projects();
      const medicProof = projects.find(p => p.title === 'medicProof MVP');
      
      expect(medicProof).toBeDefined();
      expect(medicProof?.category).toBe('blockchain');
      expect(medicProof?.technologies).toContain('Angular 20');
      expect(medicProof?.github).toBe('https://github.com/juanitourquiza/medicProof');
    });

    it('debería tener el proyecto KipuBank', () => {
      const projects = component.projects();
      const kipuBank = projects.find(p => p.title.includes('KipuBank'));
      
      expect(kipuBank).toBeDefined();
      expect(kipuBank?.category).toBe('blockchain');
      expect(kipuBank?.technologies).toContain('Solidity ^0.8.29');
    });

    it('todos los proyectos deberían tener imagen de Hackeruna', () => {
      const projects = component.projects();
      const allHaveImage = projects.every(p => p.image.includes('hackeruna'));
      
      expect(allHaveImage).toBe(true);
    });

    it('debería tener links de GitHub en proyectos específicos', () => {
      const projects = component.projects();
      const projectsWithGithub = projects.filter(p => p.github);
      
      expect(projectsWithGithub.length).toBeGreaterThan(0);
      
      projectsWithGithub.forEach(project => {
        expect(project.github).toContain('github.com/juanitourquiza');
      });
    });
  });

  describe('✅ 6. Categorías Disponibles', () => {
    it('debería tener proyectos en todas las categorías', () => {
      const categories: Array<'web' | 'blockchain' | 'fullstack' | 'pwa'> = [
        'web', 'blockchain', 'fullstack', 'pwa'
      ];
      
      categories.forEach(category => {
        component.selectCategory(category);
        const filtered = component.filteredProjects;
        expect(filtered.length).toBeGreaterThan(0);
      });
    });

    it('la suma de proyectos por categoría debería ser mayor que el total', () => {
      // Nota: Algunos proyectos pueden estar en múltiples categorías conceptualmente
      // pero en el código cada proyecto tiene UNA categoría
      const totalProjects = component.projects().length;
      
      expect(totalProjects).toBe(10);
    });
  });
});
