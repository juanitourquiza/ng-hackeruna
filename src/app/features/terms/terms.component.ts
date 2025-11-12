import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article class="prose prose-lg max-w-none">
          <!-- Breadcrumb -->
          <nav class="mb-8 text-sm">
            <a 
              routerLink="/" 
              class="no-underline hover:underline transition-all"
              style="color: var(--text-secondary);"
            >
              Inicio
            </a>
            <span class="mx-2" style="color: var(--text-tertiary);">/</span>
            <span style="color: var(--text-tertiary);">Términos de Servicio</span>
          </nav>

          <!-- Title -->
          <h1 
            class="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style="color: var(--text-primary);"
          >
            Términos de Servicio
          </h1>

          <!-- Last Updated -->
          <p class="text-sm mb-8" style="color: var(--text-tertiary);">
            Última actualización: 11 de Noviembre, 2025
          </p>

          <!-- Content -->
          <div style="color: var(--text-primary);">
            <p class="mb-6" style="color: var(--text-secondary);">
              Bienvenido a Hackeruna. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos de servicio. Si no estás de acuerdo con alguno de estos términos, por favor no uses nuestro sitio.
            </p>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">1. Aceptación de Términos</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Al utilizar Hackeruna, aceptas estar legalmente vinculado por estos términos de servicio, nuestra política de privacidad y todas las leyes y regulaciones aplicables.
            </p>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">2. Uso del Sitio Web</h2>
            
            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">2.1 Uso Permitido</h3>
            <p class="mb-4" style="color: var(--text-secondary);">
              Puedes utilizar este sitio para:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Leer y compartir contenido</li>
              <li>Comentar en artículos</li>
              <li>Contactarnos para consultas legítimas</li>
              <li>Suscribirte a actualizaciones</li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">2.2 Uso Prohibido</h3>
            <p class="mb-4" style="color: var(--text-secondary);">
              No puedes:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Copiar, reproducir o distribuir contenido sin permiso</li>
              <li>Usar el sitio para actividades ilegales</li>
              <li>Intentar hackear o comprometer la seguridad del sitio</li>
              <li>Enviar spam o contenido malicioso</li>
              <li>Usar bots o scrapers automatizados sin autorización</li>
              <li>Suplantar la identidad de otros usuarios</li>
              <li>Publicar contenido ofensivo, difamatorio o ilegal</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">3. Propiedad Intelectual</h2>
            
            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">3.1 Nuestro Contenido</h3>
            <p class="mb-4" style="color: var(--text-secondary);">
              Todo el contenido publicado en Hackeruna, incluyendo textos, imágenes, gráficos, logos, código y diseño, está protegido por derechos de autor y otras leyes de propiedad intelectual.
            </p>

            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">3.2 Licencia de Uso</h3>
            <p class="mb-4" style="color: var(--text-secondary);">
              Te otorgamos una licencia limitada, no exclusiva y revocable para:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Ver y descargar contenido para uso personal y no comercial</li>
              <li>Compartir enlaces a nuestros artículos</li>
              <li>Citar fragmentos con atribución adecuada</li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3" style="color: var(--text-primary);">3.3 Tu Contenido</h3>
            <p class="mb-4" style="color: var(--text-secondary);">
              Al enviar comentarios, mensajes o cualquier otro contenido:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Mantienes la propiedad de tu contenido</li>
              <li>Nos otorgas una licencia para usar, modificar y mostrar tu contenido</li>
              <li>Garantizas que tienes derecho a compartir ese contenido</li>
              <li>Aceptas que podemos eliminar contenido inapropiado</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">4. Contenido de Terceros</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Nuestro sitio puede contener:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Enlaces a sitios web externos</li>
              <li>Contenido embebido de terceros (YouTube, GitHub, etc.)</li>
              <li>Anuncios de Google AdSense</li>
            </ul>
            <p class="mb-4" style="color: var(--text-secondary);">
              No somos responsables del contenido de terceros ni de las prácticas de sitios externos.
            </p>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">5. Precisión del Contenido</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Nos esforzamos por proporcionar información precisa y actualizada, pero:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>El contenido se proporciona "tal cual" sin garantías</li>
              <li>Las tecnologías cambian rápidamente y el contenido puede quedar obsoleto</li>
              <li>No garantizamos que el contenido esté libre de errores</li>
              <li>No somos responsables de daños causados por el uso de nuestro contenido</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">6. Limitación de Responsabilidad</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              En la medida permitida por la ley:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>No somos responsables de daños directos, indirectos o consecuentes</li>
              <li>No garantizamos disponibilidad ininterrumpida del sitio</li>
              <li>No somos responsables de pérdida de datos o beneficios</li>
              <li>Tu uso del sitio es bajo tu propio riesgo</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">7. Comentarios y Contenido de Usuarios</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Nos reservamos el derecho de:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Moderar todos los comentarios</li>
              <li>Eliminar contenido inapropiado sin previo aviso</li>
              <li>Banear usuarios que violen estos términos</li>
              <li>Reportar actividad ilegal a las autoridades</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">8. Publicidad y Patrocinios</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Este sitio utiliza:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li><strong>Google AdSense:</strong> Para mostrar anuncios relevantes</li>
              <li><strong>Enlaces de afiliados:</strong> Algunos enlaces pueden generar comisiones</li>
              <li><strong>Contenido patrocinado:</strong> Claramente identificado como tal</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">9. Modificaciones del Servicio</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Nos reservamos el derecho de:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Modificar o descontinuar cualquier parte del sitio</li>
              <li>Cambiar estos términos en cualquier momento</li>
              <li>Suspender o terminar tu acceso al sitio</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">10. Ley Aplicable</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Estos términos se rigen por las leyes aplicables en el país donde opera Hackeruna. Cualquier disputa se resolverá en los tribunales competentes.
            </p>

            <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--text-primary);">11. Contacto</h2>
            <p class="mb-4" style="color: var(--text-secondary);">
              Para preguntas sobre estos términos:
            </p>
            <ul class="list-disc pl-6 mb-4" style="color: var(--text-secondary);">
              <li>Email: <a href="mailto:j&#64;hackeruna.com" class="hover:underline" style="color: var(--accent-blue);">j&#64;hackeruna.com</a></li>
              <li>Formulario: <a routerLink="/contact" class="hover:underline" style="color: var(--accent-blue);">Contáctanos</a></li>
            </ul>

            <div class="mt-8 p-4 rounded-lg" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
              <p class="text-sm" style="color: var(--text-secondary);">
                <strong>Nota Importante:</strong> Al continuar usando Hackeruna, aceptas estos términos. Si no estás de acuerdo, debes dejar de usar el sitio inmediatamente.
              </p>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="mt-12 pt-8 not-prose" style="border-top: 1px solid var(--border-color);">
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
    </main>
  `
})
export class TermsComponent {}
