import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * SchemaService - Servicio para AEO (Answer Engine Optimization)
 * Gestiona JSON-LD structured data para motores de búsqueda de IA
 * Compatible con: ChatGPT, Perplexity, Google SGE, Bing Copilot
 */
@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private schemaScriptId = 'structured-data-schema';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Schema para BlogPosting - Artículos individuales
   */
  addBlogPostingSchema(post: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: {
      name: string;
      url?: string;
    };
    url: string;
    keywords?: string[];
    articleBody?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.headline,
      description: post.description,
      image: post.image,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: post.author.url || 'https://hackeruna.com/about',
        sameAs: [
          'https://www.linkedin.com/in/juanitourquiza',
          'https://github.com/juanitourquiza',
          'https://juanitourquiza.github.io'
        ]
      },
      publisher: {
        '@type': 'Organization',
        name: 'Hackeruna',
        url: 'https://hackeruna.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hackeruna.com/assets/hackeruna.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': post.url
      },
      keywords: post.keywords?.join(', '),
      articleBody: post.articleBody,
      inLanguage: 'es-ES'
    };

    this.insertSchema(schema);
  }

  /**
   * Schema para Article - Más genérico que BlogPosting
   */
  addArticleSchema(article: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
    url: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      image: article.image,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: {
        '@type': 'Person',
        name: article.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Hackeruna',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hackeruna.com/assets/hackeruna.png'
        }
      },
      mainEntityOfPage: article.url
    };

    this.insertSchema(schema);
  }

  /**
   * Schema para FAQPage - Preguntas y respuestas
   */
  addFAQSchema(faqs: Array<{ question: string; answer: string }>): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    this.insertSchema(schema);
  }

  /**
   * Schema para Person - Autor/Perfil
   */
  addPersonSchema(person: {
    name: string;
    jobTitle: string;
    description: string;
    url: string;
    image?: string;
    email?: string;
    sameAs?: string[];
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      url: person.url,
      image: person.image,
      email: person.email,
      sameAs: person.sameAs || [],
      knowsAbout: [
        'Desarrollo Web',
        'Angular',
        'TypeScript',
        'Blockchain',
        'Zero-Knowledge Proofs',
        'Inteligencia Artificial',
        'Node.js',
        'PHP',
        'Laravel',
        'Symfony'
      ]
    };

    this.insertSchema(schema);
  }

  /**
   * Schema para BreadcrumbList - Navegación
   */
  addBreadcrumbSchema(items: Array<{ name: string; url: string }>): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };

    this.insertSchema(schema);
  }

  /**
   * Schema para Website - Sitio completo
   */
  addWebSiteSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Hackeruna',
      alternateName: 'Hackeruna Blog',
      url: 'https://hackeruna.com',
      description: 'Blog de tecnología, programación, desarrollo web, blockchain, IA y tutoriales avanzados.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://hackeruna.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'es-ES',
      publisher: {
        '@type': 'Organization',
        name: 'Hackeruna',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hackeruna.com/assets/hackeruna.png'
        }
      }
    };

    this.insertSchema(schema);
  }

  /**
   * Schema para HowTo - Tutoriales paso a paso
   */
  addHowToSchema(howTo: {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    steps: Array<{ name: string; text: string; image?: string }>;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      image: howTo.image,
      totalTime: howTo.totalTime,
      step: howTo.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image
      }))
    };

    this.insertSchema(schema);
  }

  /**
   * Insertar schema en el DOM
   */
  private insertSchema(schema: any): void {
    // Remover schema anterior si existe
    this.removeSchema();

    // Crear nuevo script tag
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.schemaScriptId;
    script.text = JSON.stringify(schema, null, 2);

    // Insertar en head
    this.document.head.appendChild(script);
  }

  /**
   * Remover schema del DOM
   */
  removeSchema(): void {
    const existingScript = this.document.getElementById(this.schemaScriptId);
    if (existingScript) {
      existingScript.remove();
    }
  }

  /**
   * Agregar múltiples schemas (JSON-LD array)
   */
  addMultipleSchemas(schemas: any[]): void {
    this.removeSchema();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.schemaScriptId;
    script.text = JSON.stringify(schemas, null, 2);

    this.document.head.appendChild(script);
  }
}
