# 🧪 Guía de Pruebas Unitarias - Hackeruna

## 📋 Resumen de Pruebas Implementadas

Se han implementado **pruebas unitarias críticas** para validar la funcionalidad del sistema usando **Vitest**.

### ✅ Pruebas Creadas

#### 1. **ContactComponent** (`contact.component.spec.ts`)
**Total: 9 pruebas**

##### 📝 Validación de Formulario (3 pruebas)
- ✅ Inicialización con formulario vacío
- ✅ Error cuando formulario está vacío
- ✅ Validación de campos requeridos

**Path validado:**
```
Usuario completa formulario → Validación campos → Error/Success
```

##### 📧 Envío de Email con reCAPTCHA (4 pruebas)
- ✅ Envío exitoso con token reCAPTCHA
- ✅ Manejo de errores del servidor
- ✅ Uso de token dummy cuando reCAPTCHA no está disponible
- ✅ Reset del formulario después de envío exitoso

**Path validado:**
```
Datos válidos → reCAPTCHA token → HTTP POST → Backend → Respuesta → UI Update
```

**Endpoint probado:**
```
POST https://hackeruna.com/wp-json/hackeruna/v1/contact
Content-Type: application/json
Body: { name, email, subject, message, recaptchaToken }
```

##### 🔌 Integración con Backend (2 pruebas)
- ✅ Petición al endpoint correcto
- ✅ Content-Type application/json

**Path validado:**
```
Angular HttpClient → WordPress REST API → Respuesta
```

---

#### 2. **PortfolioComponent** (`portfolio.component.spec.ts`)
**Total: 12 pruebas**

##### 🎯 Filtrado de Proyectos (7 pruebas)
- ✅ Inicialización con categoría "all"
- ✅ 10 proyectos cargados
- ✅ Mostrar todos los proyectos
- ✅ Filtrar por "web"
- ✅ Filtrar por "blockchain" (2 proyectos)
- ✅ Filtrar por "fullstack"
- ✅ Filtrar por "pwa" (1 proyecto)
- ✅ Cambio de categoría

**Path validado:**
```
Categoría seleccionada → Filtrado de array → Proyectos mostrados
```

##### 🏗️ Estructura de Proyectos (5 pruebas)
- ✅ Campos requeridos en todos los proyectos
- ✅ Proyecto medicProof MVP existe
- ✅ Proyecto KipuBank existe
- ✅ Todas las imágenes son de Hackeruna
- ✅ Links de GitHub presentes

**Path validado:**
```
Signal<Project[]> → Estructura de datos → Validación integridad
```

---

## 🎯 Paths Validados por Categoría

### 1. **Conexión con Backend (WordPress API)**
```mermaid
Angular Component
    ↓
HttpClient.post()
    ↓
https://hackeruna.com/wp-json/hackeruna/v1/contact
    ↓
WordPress Plugin (hackeruna-contact.php)
    ↓
Validaciones + reCAPTCHA
    ↓
wp_mail() + WP Mail SMTP
    ↓
Respuesta { status, message }
    ↓
Angular UI Update
```

**Pruebas que lo validan:**
- `contact.component.spec.ts` → Tests 5-9

### 2. **Envío de Email**
```mermaid
Formulario completo
    ↓
Validación cliente (Angular)
    ↓
reCAPTCHA token generation
    ↓
POST request con payload
    ↓
Backend validación (PHP)
    ↓
wp_mail() envía email
    ↓
Success message mostrado
    ↓
Formulario reset
```

**Pruebas que lo validan:**
- `contact.component.spec.ts` → Test "debería enviar formulario con reCAPTCHA token"

### 3. **Filtrado de Proyectos**
```mermaid
Signal<Project[]> (10 proyectos)
    ↓
selectedCategory signal
    ↓
filteredProjects getter
    ↓
Array.filter() si no es 'all'
    ↓
Proyectos filtrados mostrados
```

**Pruebas que lo validan:**
- `portfolio.component.spec.ts` → Tests de filtrado

---

## 🚀 Cómo Ejecutar las Pruebas

### Instalación de dependencias (solo primera vez)
```bash
npm install --save-dev @analogjs/vite-plugin-angular @angular/common/http/testing
```

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar con interfaz UI
```bash
npm run test:ui
```

### Ejecutar con cobertura
```bash
npm run test:coverage
```

### Ejecutar prueba específica
```bash
npx vitest contact.component.spec.ts
```

### Modo watch (auto-reload)
```bash
npx vitest --watch
```

---

## 📊 Cobertura Esperada

### ContactComponent
- **Líneas:** ~85%
- **Funciones:** ~90%
- **Branches:** ~75%

### PortfolioComponent
- **Líneas:** ~95%
- **Funciones:** 100%
- **Branches:** ~80%

---

## 🔍 Detalles Técnicos

### Tecnologías Usadas
- **Vitest** - Test runner moderno y rápido
- **@angular/core/testing** - Angular TestBed
- **@angular/common/http/testing** - HttpTestingController para mock de HTTP
- **happy-dom** - DOM environment para tests

### Estructura de Test
```typescript
describe('ComponentName', () => {
  beforeEach(async () => {
    // Setup TestBed
    await TestBed.configureTestingModule({
      imports: [Component, HttpClientTestingModule]
    }).compileComponents();
  });

  it('should test functionality', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Mocking reCAPTCHA
```typescript
(window as any).grecaptcha = {
  ready: (callback: () => void) => callback(),
  execute: vi.fn().mockResolvedValue('mock-token')
};
```

### Mock HTTP Requests
```typescript
const req = httpMock.expectOne(url);
expect(req.request.method).toBe('POST');
req.flush({ status: 'success' });
```

---

## 🎯 Próximas Pruebas Recomendadas

### Media Prioridad
- [ ] **PostDetailComponent** - Carga de post individual desde WordPress API
- [ ] **HomeComponent** - Listado de posts principales
- [ ] **HeaderComponent** - Búsqueda de posts

### Baja Prioridad
- [ ] **ThemeService** - Toggle dark/light mode
- [ ] **RouterGuards** - Si existen
- [ ] **Pipes personalizados** - Si existen

---

## 📝 Convenciones de Nombres

- Archivos: `*.spec.ts`
- Estructura: `describe` → `it`
- Emojis en describe para categorización visual
- Mensajes descriptivos en español

---

## ⚠️ Notas Importantes

1. **reCAPTCHA en tests:** Se usa un mock porque reCAPTCHA no funciona en entorno de tests
2. **WordPress API:** HttpTestingController simula las respuestas del backend
3. **Signals:** Angular 20 usa signals, se testean con `signal()` y `set()`
4. **Standalone Components:** Se importan directamente en TestBed

---

## 🐛 Troubleshooting

### Error: "Cannot find module @analogjs/vite-plugin-angular"
```bash
npm install --save-dev @analogjs/vite-plugin-angular
```

### Error: "HttpTestingController not found"
```bash
npm install --save-dev @angular/common/http/testing
```

### Tests no se ejecutan
```bash
# Limpiar cache
rm -rf node_modules/.vite
npm test
```

---

## 📚 Referencias

- [Vitest Docs](https://vitest.dev/)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Testing HTTP](https://angular.dev/guide/http/testing)

---

**Creado:** 10 de noviembre, 2025  
**Autor:** Juan Urquiza - Hackeruna  
**Versión:** 1.0
