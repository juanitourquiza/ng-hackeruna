import { Component } from '@angular/core';


@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  template: `
    <main class="py-8 lg:py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-text-light-primary dark:text-dark-primary mb-4">
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
