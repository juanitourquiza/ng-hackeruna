# 🤖 Hackeruna Bot Analytics

**Plugin de WordPress para detectar y analizar visitas de bots de IA (ChatGPT, Perplexity, Claude) y otros crawlers.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-blue.svg)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)
![License](https://img.shields.io/badge/license-GPL--2.0-green.svg)

---

## 📋 Descripción

Con el auge de los motores de búsqueda basados en IA como **ChatGPT**, **Perplexity** y **Claude**, es crucial entender cómo estos bots interactúan con tu contenido.

Este plugin te permite:
- ✅ **Rastrear** visitas de bots de IA en tiempo real
- ✅ **Analizar** qué páginas son indexadas
- ✅ **Monitorear** frecuencia de visitas
- ✅ **Optimizar** tu contenido para AEO (Answer Engine Optimization)

---

## 🎯 Bots Detectados

### **Bots de IA:**
- 🤖 **ChatGPT** - GPTBot, OpenAI
- 🧠 **Claude** - Anthropic, claude-web
- 🔍 **Perplexity** - PerplexityBot

### **Buscadores Tradicionales:**
- 🔎 **Google** - Googlebot, Google-InspectionTool
- 🌐 **Bing** - bingbot, BingPreview
- 🦆 **DuckDuckGo** - DuckDuckBot
- 🦁 **Brave** - brave-search-bot
- 🇷🇺 **Yandex** - YandexBot
- 🇨🇳 **Baidu** - Baiduspider

### **Redes Sociales:**
- 📘 **Facebook** - facebookexternalhit
- 🐦 **Twitter** - Twitterbot
- 💼 **LinkedIn** - LinkedInBot
- 🔗 **Slack** - Slackbot
- 📱 **WhatsApp** - WhatsApp
- 💬 **Discord** - Discordbot
- ✈️ **Telegram** - TelegramBot

### **Herramientas SEO:**
- 🔧 **Semrush** - SemrushBot
- 🔗 **Ahrefs** - AhrefsBot
- 👑 **Majestic** - MJ12bot
- 🐸 **Screaming Frog** - Screaming Frog SEO Spider

---

## 📊 Características

### **Dashboard Completo**
- 📈 Estadísticas totales y por periodo (24h, 7d, 30d)
- 📊 Tabla de visitas agrupadas por bot
- 🕒 Registro de últimas 100 visitas con detalles
- 🌍 IP address y referrer de cada visita

### **Almacenamiento Local**
- 💾 Base de datos MySQL local
- 🔒 Sin envío de datos a terceros
- 🔐 Total privacidad

### **Performance**
- ⚡ Registro rápido y eficiente
- 📉 Mínimo impacto en rendimiento
- 🚫 No afecta usuarios humanos

---

## 🚀 Instalación Rápida

### **Método 1: Copiar carpeta**

```bash
# Copiar plugin a tu WordPress
cp -r wp-content/plugins/hackeruna-bot-analytics /ruta/a/tu/wordpress/wp-content/plugins/

# O por SSH
scp -r wp-content/plugins/hackeruna-bot-analytics usuario@servidor:/var/www/html/wp-content/plugins/
```

### **Método 2: Crear ZIP**

```bash
# Crear archivo ZIP
cd wp-content/plugins/
zip -r hackeruna-bot-analytics.zip hackeruna-bot-analytics/

# Subir en WordPress Admin → Plugins → Add New → Upload Plugin
```

### **Activar:**

```
WordPress Admin → Plugins → Hackeruna Bot Analytics → Activate
```

---

## 💻 Uso

### **1. Ver Dashboard:**

```
WordPress Admin → Bot Analytics
```

### **2. Estadísticas que verás:**

```
┌─────────────────────────────────────────────────┐
│  Total de Visitas: 234                          │
│  Últimas 24 Horas: 12                           │
│  Últimos 7 Días: 89                             │
│  Últimos 30 Días: 234                           │
└─────────────────────────────────────────────────┘

📊 Estadísticas por Bot:
┌──────────────┬──────────┬────────────────────┐
│ Bot          │ Visitas  │ Última Visita      │
├──────────────┼──────────┼────────────────────┤
│ ChatGPT 🤖   │ 45       │ 2025-11-13 14:30   │
│ Perplexity 🔍│ 23       │ 2025-11-13 13:15   │
│ Google 🔎    │ 156      │ 2025-11-13 14:45   │
│ Facebook 📘  │ 10       │ 2025-11-13 12:00   │
└──────────────┴──────────┴────────────────────┘

🕒 Visitas Recientes:
┌────────────┬──────────┬──────────────┬─────────────┐
│ Fecha      │ Bot      │ URL          │ IP          │
├────────────┼──────────┼──────────────┼─────────────┤
│ 2025-11-13 │ ChatGPT  │ /post/titulo │ 66.249.79.1 │
│ 14:30:15   │          │              │             │
└────────────┴──────────┴──────────────┴─────────────┘
```

### **3. Probar manualmente:**

```bash
# Simular visita de ChatGPT
curl -A "GPTBot/1.0" https://tu-sitio.com/

# Simular visita de Perplexity
curl -A "PerplexityBot/1.0" https://tu-sitio.com/algun-post

# Simular visita de Claude
curl -A "Claude-Web/1.0" https://tu-sitio.com/
```

---

## 📁 Estructura del Plugin

```
hackeruna-bot-analytics/
├── hackeruna-bot-analytics.php  # Archivo principal del plugin
├── readme.txt                    # README oficial de WordPress
├── INSTALL.md                    # Guía de instalación detallada
└── README.md                     # Este archivo
```

---

## 🗄️ Estructura de Base de Datos

```sql
CREATE TABLE wp_bot_visits (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    visit_date datetime NOT NULL,
    bot_name varchar(100) DEFAULT NULL,
    url text NOT NULL,
    ip_address varchar(45) DEFAULT NULL,
    user_agent text NOT NULL,
    referer text DEFAULT NULL,
    PRIMARY KEY (id),
    KEY visit_date (visit_date),
    KEY bot_name (bot_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🔍 Casos de Uso

### **1. Bloggers y Creadores de Contenido**
```
Verifica que ChatGPT y Perplexity indexen tus artículos
→ Optimiza contenido para respuestas de IA
→ Identifica artículos más citados
```

### **2. Sitios de Noticias**
```
Rastrea qué artículos son citados por IA
→ Analiza frecuencia de visitas
→ Detecta tendencias de indexación
```

### **3. E-commerce**
```
Monitorea crawlers que indexan productos
→ Detecta bots maliciosos
→ Optimiza fichas de productos para IA
```

### **4. Agencias SEO/Marketing**
```
Reportes de visibilidad en IA
→ Análisis de competencia
→ Optimización AEO para clientes
```

---

## 🛠️ Desarrollo

### **Agregar bot personalizado:**

Editar `hackeruna-bot-analytics.php` línea ~100:

```php
function hba_detect_bot($user_agent) {
    $bots = [
        'ChatGPT' => ['ChatGPT', 'GPTBot', 'OpenAI'],
        'MiBot' => ['MiBotUserAgent'],  // ← Agregar aquí
    ];
    // ...
}
```

### **Exportar datos:**

```sql
-- Estadísticas por bot
SELECT bot_name, COUNT(*) as visits
FROM wp_bot_visits
GROUP BY bot_name
ORDER BY visits DESC;

-- Visitas por día
SELECT DATE(visit_date) as date, COUNT(*) as visits
FROM wp_bot_visits
GROUP BY DATE(visit_date)
ORDER BY date DESC;

-- URLs más visitadas
SELECT url, COUNT(*) as visits
FROM wp_bot_visits
GROUP BY url
ORDER BY visits DESC
LIMIT 20;
```

---

## 📊 Roadmap

### **v1.1.0** (Próximo)
- [ ] Exportación de datos a CSV/Excel
- [ ] Gráficas de tendencias
- [ ] Filtros avanzados (por fecha, bot, URL)

### **v1.2.0** (Futuro)
- [ ] Notificaciones cuando un bot específico visite
- [ ] Widget para dashboard principal
- [ ] Reportes automáticos por email
- [ ] API REST para integración

### **v2.0.0** (Ideas)
- [ ] Machine Learning para detectar bots desconocidos
- [ ] Integración con Google Analytics
- [ ] Mapa de IPs de bots
- [ ] Comparativa de sitios

---

## ❓ FAQ

**¿Afecta el rendimiento?**  
No. Solo registra una entrada cuando detecta un bot conocido. Impacto mínimo.

**¿Los datos se envían a algún lado?**  
No. Todo se almacena localmente en tu base de datos MySQL.

**¿Puedo ver visitas de humanos?**  
No, este plugin solo rastrea bots. Usa Google Analytics para usuarios humanos.

**¿Cómo sé si ChatGPT visita mi sitio?**  
Ve a WordPress Admin → Bot Analytics. Si ChatGPT visitó, aparecerá en la tabla.

**¿Bloquea bots?**  
No. Solo registra visitas, no modifica el comportamiento de los bots.

---

## 🆘 Soporte

- 🌐 **Website:** https://hackeruna.com
- 📧 **Email:** contacto@hackeruna.com
- 💻 **GitHub:** https://github.com/juanitourquiza

---

## 📄 Licencia

GPL v2 or later - https://www.gnu.org/licenses/gpl-2.0.html

---

## 👨‍💻 Autor

**Juan Urquiza**  
Website: [hackeruna.com](https://hackeruna.com)  
Twitter: [@hackeruna](https://twitter.com/hackeruna)  
LinkedIn: [juanitourquiza](https://www.linkedin.com/in/juanitourquiza)

---

## 🙏 Créditos

Desarrollado con ❤️ para la comunidad WordPress.

Inspirado en la necesidad de optimizar contenido para la era de los motores de respuesta basados en IA.

---

**¿Te gusta el plugin? ⭐ Dale una estrella en GitHub!**
