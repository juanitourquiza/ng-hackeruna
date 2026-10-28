import { Component } from '@angular/core';


@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  template: `
    <main class="py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl lg:text-5xl font-bold text-text-light-primary dark:text-dark-primary mb-4">
          Sobre el Autor
        </h1>
        <p class="text-lg text-text-light-secondary dark:text-dark-secondary">
          Componente de autor - próximamente
        </p>
      </div>
    </main>
  `
})
export class AuthorComponent {}
