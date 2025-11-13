=== Hackeruna Bot Analytics ===
Contributors: juanurquiza
Tags: analytics, bots, ai, chatgpt, seo, crawlers, statistics
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Detecta y registra visitas de bots de IA (ChatGPT, Perplexity, Claude) y otros crawlers para análisis de tráfico.

== Description ==

**Hackeruna Bot Analytics** te ayuda a rastrear y analizar las visitas de bots de IA y crawlers a tu sitio WordPress.

Con el auge de los motores de búsqueda basados en IA como ChatGPT, Perplexity y Claude, es crucial entender cómo estos bots interactúan con tu contenido. Este plugin te proporciona información detallada sobre qué bots visitan tu sitio, qué páginas acceden y con qué frecuencia.

= Características Principales =

* ✅ **Detección Automática de Bots de IA**
  - ChatGPT (GPTBot, OpenAI)
  - Claude (Anthropic)
  - Perplexity AI

* ✅ **Detección de Crawlers Tradicionales**
  - Google (Googlebot)
  - Bing (bingbot)
  - Facebook, Twitter, LinkedIn
  - DuckDuckGo, Brave, Yandex, Baidu

* ✅ **Detección de Herramientas SEO**
  - Semrush
  - Ahrefs
  - Majestic
  - Screaming Frog

* ✅ **Dashboard Completo en WordPress Admin**
  - Estadísticas totales y por periodo
  - Tabla de visitas por bot
  - Registro de últimas 100 visitas
  - Información de IP y referrer

* ✅ **Almacenamiento en Base de Datos**
  - Todos los datos se guardan localmente
  - Sin envío de información a terceros
  - Total privacidad

= ¿Por Qué Necesitas Este Plugin? =

Los bots de IA están revolucionando cómo se consume información en internet:

1. **ChatGPT** - Indexa contenido para responder preguntas
2. **Perplexity** - Motor de búsqueda con IA que cita fuentes
3. **Claude** - Asistente de IA de Anthropic
4. **Google SGE** - Search Generative Experience

**Saber cuándo estos bots visitan tu sitio te ayuda a:**
- Optimizar tu contenido para AEO (Answer Engine Optimization)
- Verificar que tu sitio sea accesible para IA
- Analizar qué páginas son más relevantes
- Detectar problemas de rastreo

= Casos de Uso =

* **Bloggers y Creadores de Contenido**
  - Verifica que ChatGPT y Perplexity indexen tus artículos
  - Optimiza contenido para respuestas de IA

* **Sitios de Noticias**
  - Rastrea qué artículos son citados por IA
  - Analiza frecuencia de visitas de bots

* **E-commerce**
  - Monitorea crawlers que indexan productos
  - Detecta bots maliciosos o spam

* **Agencias SEO/Marketing**
  - Reportes de visibilidad en IA
  - Análisis de competencia

== Installation ==

= Instalación Automática =

1. Ve a WordPress Admin → Plugins → Add New
2. Busca "Hackeruna Bot Analytics"
3. Click "Install Now"
4. Click "Activate"

= Instalación Manual =

1. Descarga el archivo .zip del plugin
2. Ve a WordPress Admin → Plugins → Add New → Upload Plugin
3. Selecciona el archivo .zip
4. Click "Install Now"
5. Click "Activate"

= Instalación por FTP =

1. Extrae el archivo .zip
2. Sube la carpeta `hackeruna-bot-analytics` a `/wp-content/plugins/`
3. Activa el plugin en WordPress Admin → Plugins

= Post-Instalación =

1. Ve a WordPress Admin → Bot Analytics
2. ¡Listo! El plugin ya está registrando visitas de bots

== Frequently Asked Questions ==

= ¿Afecta el rendimiento de mi sitio? =

No. El plugin solo registra una entrada en la base de datos cuando detecta un bot conocido. El impacto en el rendimiento es mínimo y no afecta la experiencia de usuarios humanos.

= ¿Detecta a todos los bots? =

El plugin detecta los bots más importantes y populares. La lista se actualiza regularmente. Si necesitas detectar un bot específico, puedes solicitarlo en el soporte.

= ¿Los datos se envían a algún servidor externo? =

No. Todos los datos se almacenan localmente en tu base de datos WordPress. No se envía ninguna información a servidores externos.

= ¿Puedo ver visitas de usuarios humanos? =

No, este plugin solo rastrea bots y crawlers. Para analítica de usuarios humanos, usa Google Analytics o similar.

= ¿Cómo sé si ChatGPT está visitando mi sitio? =

Ve a WordPress Admin → Bot Analytics. Si ChatGPT ha visitado tu sitio, aparecerá en la tabla de estadísticas con el número de visitas y la última fecha.

= ¿Puedo exportar los datos? =

Actualmente no hay función de exportación, pero puedes acceder directamente a la tabla `wp_bot_visits` en tu base de datos MySQL.

= ¿El plugin bloquea bots? =

No. Este plugin solo registra visitas. No bloquea ni modifica el comportamiento de los bots.

= ¿Funciona con cualquier tema? =

Sí, es completamente independiente del tema. Solo agrega un menú en WordPress Admin.

= ¿Es compatible con otros plugins de SEO? =

Sí, no tiene conflictos con Yoast SEO, Rank Math, o cualquier otro plugin de SEO.

= ¿Cómo puedo permitir que ChatGPT indexe mi sitio? =

Este plugin solo registra. Para permitir bots de IA:
1. No bloquees `GPTBot` en robots.txt
2. Asegúrate que tu sitio sea accesible públicamente
3. Usa Schema.org JSON-LD en tus páginas

== Screenshots ==

1. Dashboard principal con estadísticas totales
2. Tabla de estadísticas por bot
3. Registro de visitas recientes con detalles
4. Vista de User Agents detectados

== Changelog ==

= 1.0.0 - 2025-11-13 =
* 🎉 Release inicial
* ✅ Detección de ChatGPT, Claude, Perplexity
* ✅ Detección de Google, Bing, Facebook, Twitter
* ✅ Detección de herramientas SEO (Semrush, Ahrefs)
* ✅ Dashboard completo en WordPress Admin
* ✅ Estadísticas por periodo (24h, 7d, 30d)
* ✅ Registro de últimas 100 visitas
* ✅ Almacenamiento en base de datos local
* ✅ Detección de IP real (considerando proxies)

== Upgrade Notice ==

= 1.0.0 =
Primera versión del plugin. ¡Instala y comienza a rastrear bots de IA!

== Privacy Policy ==

Hackeruna Bot Analytics no recopila, almacena ni comparte datos personales con terceros. Toda la información se almacena localmente en tu base de datos WordPress.

Los datos registrados son:
- User Agent del bot
- URL visitada
- IP address
- Fecha y hora de visita
- Referrer (si existe)

Esta información se usa únicamente para estadísticas internas y no se comparte con ningún servicio externo.

== Support ==

Para soporte, visita:
- Website: https://hackeruna.com
- Email: contacto@hackeruna.com
- GitHub: https://github.com/juanitourquiza

== Roadmap ==

Próximas características planeadas:

* 📊 Exportación de datos a CSV/Excel
* 📈 Gráficas de tendencias
* 🔔 Notificaciones cuando un bot específico visite tu sitio
* 🌍 Mapa de IPs de bots
* 📱 Widget para dashboard principal de WordPress
* 🔍 Filtros avanzados (por fecha, bot, URL)
* 📧 Reportes automáticos por email
* 🎯 Detección de nuevos bots de IA
* 🔧 API REST para integración con otros servicios

== Developer Info ==

**Estructura de la Tabla:**

```sql
CREATE TABLE wp_bot_visits (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    visit_date datetime NOT NULL,
    bot_name varchar(100),
    url text NOT NULL,
    ip_address varchar(45),
    user_agent text NOT NULL,
    referer text,
    PRIMARY KEY (id),
    KEY visit_date (visit_date),
    KEY bot_name (bot_name)
);
```

**Hooks Disponibles:**

- `hba_before_log_visit` - Antes de registrar visita
- `hba_after_log_visit` - Después de registrar visita
- `hba_detect_custom_bot` - Para detectar bots personalizados

**Constantes:**

- `HBA_VERSION` - Versión del plugin
- `HBA_PLUGIN_DIR` - Directorio del plugin
- `HBA_PLUGIN_URL` - URL del plugin

== Credits ==

Desarrollado por **Juan Urquiza** - https://hackeruna.com
Inspirado en la necesidad de optimizar contenido para motores de respuesta basados en IA.

== License ==

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
