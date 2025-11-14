/**
 * Application Version
 * Updated: 14 de Noviembre, 2025
 */

export const APP_VERSION = '1.0.2';

export const VERSION_HISTORY = [
  {
    version: '1.0.2',
    date: '14 de Noviembre, 2025',
    changes: [
      'Agregar Mixpanel Analytics',
      'Arreglar estilos de código preformateado en light mode',
      'Mover noscript de Yandex al body (HTML5 compliance)',
      'Agregar dominios de Google Ad Traffic Quality al CSP',
      'Agregar dominios regionales de Google Analytics al CSP',
      'Crear archivo ads.txt para Google AdSense',
      'Actualizar CSP para permitir Mixpanel',
      'Agregar DNS prefetch para optimización'
    ]
  },
  {
    version: '1.0.1',
    date: '13 de Noviembre, 2025',
    changes: [
      'Instalar Yandex Metrika',
      'Configurar mapa de calor y webvisor',
      'Arreglar CSP para WebSocket de Yandex',
      'Agregar frame-src y child-src para Yandex'
    ]
  },
  {
    version: '1.0.0',
    date: 'Inicial',
    changes: [
      'Versión inicial del proyecto'
    ]
  }
];
