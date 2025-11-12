#!/usr/bin/env node

/**
 * Script para copiar .htaccess al directorio dist después del build
 * Uso: node copy-htaccess.js
 */

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '.htaccess');
const dest = path.join(__dirname, 'dist/hackeruna-frontend/browser/.htaccess');

console.log('📋 Copiando .htaccess a dist...\n');

// Verificar que el archivo fuente existe
if (!fs.existsSync(source)) {
  console.error('❌ Error: .htaccess no existe en la raíz del proyecto');
  process.exit(1);
}

// Verificar que el directorio dist existe
const distDir = path.dirname(dest);
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: Directorio dist no existe.');
  console.error('   Ejecuta "npm run build" primero.\n');
  process.exit(1);
}

try {
  // Copiar archivo
  fs.copyFileSync(source, dest);
  
  console.log('✅ .htaccess copiado exitosamente!');
  console.log(`   Origen: ${source}`);
  console.log(`   Destino: ${dest}\n`);
  
  // Verificar el contenido
  const content = fs.readFileSync(dest, 'utf-8');
  const hasRedirects = content.includes('RewriteRule ^[0-9]{4}/[0-9]{2}/[0-9]{2}');
  
  if (hasRedirects) {
    console.log('✅ Redirects 301 verificados en el archivo');
  } else {
    console.warn('⚠️  Advertencia: No se encontraron reglas de redirect en .htaccess');
  }
  
  console.log('\n🚀 Listo para deploy!');
  
} catch (error) {
  console.error('❌ Error al copiar .htaccess:', error.message);
  process.exit(1);
}
