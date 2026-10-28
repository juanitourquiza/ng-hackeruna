import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TableOfContentsComponent, TocItem } from '../../shared/components/table-of-contents/table-of-contents.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink, TableOfContentsComponent],
  template: `
    <main class="py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="mb-10 text-sm">
          <a 
            routerLink="/" 
            class="no-underline hover:underline transition-all"
            style="color: var(--text-secondary);"
          >
            Inicio
          </a>
          <span class="mx-2" style="color: var(--text-tertiary);">/</span>
          <span style="color: var(--text-tertiary);">Política de Privacidad</span>
        </nav>

        <!-- Header -->
        <header class="max-w-4xl mb-12 lg:mb-16">
          <p class="text-xs font-mono uppercase tracking-widest mb-3" style="color: var(--accent-blue);">
            // legal
          </p>
          <h1 
            class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4"
            style="color: var(--text-primary);"
          >
            Política de Privacidad
          </h1>
          <p class="text-sm" style="color: var(--text-tertiary);">
            Última actualización: 11 de Noviembre, 2025
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10 xl:gap-16 items-start">
          <!-- Table of contents -->
          <aside class="hidden lg:block">
            <app-table-of-contents [items]="sections"></app-table-of-contents>
          </aside>

          <!-- Content -->
          <article class="prose prose-lg max-w-none lg:max-w-3xl xl:max-w-4xl">
            <p class="text-lg mb-8" style="color: var(--text-secondary);">
              En Hackeruna, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe qué información recopilamos y cómo la utilizamos.
            </p>

            <h2 id="informacion-recopilamos" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">1. Información que Recopilamos</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Recopilamos información cuando usas el sitio, nos contactas o navegas por nuestro contenido.
            </p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">1.1 Información Personal</h3>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Nombre y dirección de correo electrónico (cuando usas el formulario de contacto)</li>
              <li>Comentarios y mensajes que envías</li>
              <li>Información de uso del sitio web</li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">1.2 Información Técnica</h3>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Dirección IP</li>
              <li>Tipo de navegador</li>
              <li>Sistema operativo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Cookies (ver sección de cookies)</li>
            </ul>

            <h2 id="como-usamos-tu-informacion" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">2. Cómo Usamos tu Información</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Utilizamos la información recopilada para:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Responder a tus consultas y comentarios</li>
              <li>Mejorar nuestro contenido y experiencia de usuario</li>
              <li>Analizar tendencias y comportamiento de los usuarios</li>
              <li>Enviar actualizaciones sobre nuevos artículos (solo si te suscribes)</li>
              <li>Proteger la seguridad del sitio web</li>
            </ul>

            <h2 id="cookies" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">3. Cookies</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies son pequeños archivos de texto que se almacenan en tu navegador.
            </p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">Tipos de Cookies que Usamos:</h3>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
              <li><strong>Cookies de análisis:</strong> Google Analytics para entender cómo usas el sitio</li>
              <li><strong>Cookies de publicidad:</strong> Google AdSense para mostrar anuncios relevantes</li>
              <li><strong>Cookies de preferencias:</strong> Recordar tu tema (claro/oscuro)</li>
            </ul>

            <h2 id="compartir-informacion" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">4. Compartir Información</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li><strong>Servicios de terceros:</strong> Google Analytics y Google AdSense</li>
              <li><strong>Requisitos legales:</strong> Si la ley lo requiere</li>
              <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos legales</li>
            </ul>

            <h2 id="seguridad" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">5. Seguridad</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Implementamos medidas de seguridad para proteger tu información:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Conexión HTTPS/SSL encriptada</li>
              <li>Almacenamiento seguro de datos</li>
              <li>Acceso restringido a información personal</li>
              <li>Actualizaciones regulares de seguridad</li>
            </ul>

            <h2 id="tus-derechos" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">6. Tus Derechos</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Tienes derecho a:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
              <li><strong>Rectificación:</strong> Corregir información incorrecta</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información</li>
              <li><strong>Oposición:</strong> Oponerte al procesamiento de tu información</li>
              <li><strong>Portabilidad:</strong> Recibir tu información en formato digital</li>
            </ul>

            <h2 id="sitios-externos" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">7. Enlaces a Sitios Externos</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Nuestro sitio puede contener enlaces a sitios web externos. No somos responsables de las prácticas de privacidad de estos sitios. Te recomendamos leer sus políticas de privacidad.
            </p>

            <h2 id="cambios-politica" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">8. Cambios a Esta Política</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página con una fecha de actualización.
            </p>

            <h2 id="contacto" class="text-2xl font-bold mt-8 mb-4 scroll-mt-28" style="color: var(--text-primary);">9. Contacto</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Email: <a href="mailto:j&#64;hackeruna.com" class="hover:underline" style="color: var(--accent-blue);">j&#64;hackeruna.com</a></li>
              <li>Formulario de contacto: <a routerLink="/contact" class="hover:underline" style="color: var(--accent-blue);">Contáctanos</a></li>
            </ul>

            <!-- Back to Home -->
            <div class="mt-12 pt-8" style="border-top: 1px solid var(--border-color);">
              <a 
                routerLink="/" 
                class="inline-flex items-center font-semibold hover:underline transition-all"
                style="color: var(--accent-blue);"
              >
                <span class="material-symbols-outlined mr-2">arrow_back</span>
                Volver al inicio
              </a>
            </div>
          </article>
        </div>
      </div>
    </main>
  `
})
export class PrivacyComponent {
  readonly sections: TocItem[] = [
    { id: 'informacion-recopilamos', label: '1. Información que Recopilamos' },
    { id: 'como-usamos-tu-informacion', label: '2. Cómo Usamos tu Información' },
    { id: 'cookies', label: '3. Cookies' },
    { id: 'compartir-informacion', label: '4. Compartir Información' },
    { id: 'seguridad', label: '5. Seguridad' },
    { id: 'tus-derechos', label: '6. Tus Derechos' },
    { id: 'sitios-externos', label: '7. Enlaces a Sitios Externos' },
    { id: 'cambios-politica', label: '8. Cambios a Esta Política' },
    { id: 'contacto', label: '9. Contacto' },
  ];
}
