import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaTagsConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  updateMetaTags(config: MetaTagsConfig): void {
    // Título de la página
    this.titleService.setTitle(config.title);

    // Meta tags básicos
    this.updateTag('description', config.description);
    this.updateTag('author', config.author || 'Hackeruna');

    // Open Graph (Facebook)
    this.updateTag('og:title', config.title, 'property');
    this.updateTag('og:description', config.description, 'property');
    this.updateTag('og:type', config.type || 'article', 'property');
    this.updateTag('og:site_name', 'Hackeruna', 'property');
    
    if (config.url) {
      this.updateTag('og:url', config.url, 'property');
    }
    
    if (config.image) {
      this.updateTag('og:image', config.image, 'property');
      this.updateTag('og:image:alt', config.title, 'property');
      this.updateTag('og:image:width', '1200', 'property');
      this.updateTag('og:image:height', '630', 'property');
    }

    // Twitter Cards
    this.updateTag('twitter:card', 'summary_large_image');
    this.updateTag('twitter:site', '@hackeruna');
    this.updateTag('twitter:creator', '@hackeruna');
    this.updateTag('twitter:title', config.title);
    this.updateTag('twitter:description', config.description);
    
    if (config.image) {
      this.updateTag('twitter:image', config.image);
    }

    // Article specific tags
    if (config.type === 'article') {
      if (config.publishedTime) {
        this.updateTag('article:published_time', config.publishedTime, 'property');
      }
      if (config.modifiedTime) {
        this.updateTag('article:modified_time', config.modifiedTime, 'property');
      }
      if (config.author) {
        this.updateTag('article:author', config.author, 'property');
      }
      if (config.tags && config.tags.length > 0) {
        // Agregar tags como keywords
        this.updateTag('keywords', config.tags.join(', '));
        
        // Agregar cada tag como article:tag
        config.tags.forEach((tag, index) => {
          this.updateTag(`article:tag`, tag, 'property');
        });
      }
    }
  }

  updateHomeMetaTags(): void {
    const config: MetaTagsConfig = {
      title: 'Hackeruna - Tecnología, Programación y Desarrollo',
      description: 'Blog de tecnología, programación, desarrollo web, blockchain y tutoriales. Aprende sobre Angular, Laravel, React, Node.js y más.',
      image: 'https://hackeruna.com/assets/hackeruna.png',
      url: 'https://hackeruna.com',
      type: 'website'
    };
    this.updateMetaTags(config);
  }

  clearMetaTags(): void {
    // Limpiar tags específicos de artículos
    this.meta.removeTag('property="article:published_time"');
    this.meta.removeTag('property="article:modified_time"');
    this.meta.removeTag('property="article:author"');
    this.meta.removeTag('property="article:tag"');
    this.meta.removeTag('name="keywords"');
  }

  private updateTag(name: string, content: string, attribute: string = 'name'): void {
    if (!content) return;

    const selector = `${attribute}="${name}"`;
    const existingTag = this.meta.getTag(selector);

    if (existingTag) {
      this.meta.updateTag({ [attribute]: name, content });
    } else {
      this.meta.addTag({ [attribute]: name, content });
    }
  }
}
