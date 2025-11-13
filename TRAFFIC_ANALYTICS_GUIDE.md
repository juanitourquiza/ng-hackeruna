# 📊 Guía Completa: Rastreo de Fuentes de Tráfico

**Fecha:** 13 de Noviembre, 2025  
**Objetivo:** Detectar de dónde vienen las visitas (Google, ChatGPT, links, etc.)

---

## 🎯 Soluciones Implementadas

### **1. Google Analytics 4** ✅ (Ya funciona)
- ✅ Detecta humanos (Google, redes sociales, links)
- ❌ NO detecta bots de IA (ChatGPT, Perplexity)

### **2. Tracking Mejorado en Angular** ✅ (Nuevo)
- ✅ Trackea referrer en cada visita
- ✅ Detecta fuente automáticamente
- ✅ Envía evento `traffic_source` a GA4

### **3. Plugin WordPress para Bots** ⭐ (Recomendado)
- ✅ Detecta ChatGPT, Perplexity, Claude
- ✅ Log en base de datos
- ✅ Dashboard en WordPress Admin

---

## 📊 Método 1: Google Analytics 4 (Humanos)

### **Ver en GA4:**

```
Google Analytics → Reports → Acquisition → Traffic acquisition
```

**Categorías que muestra:**

| Fuente | Medium | Significado |
|--------|--------|-------------|
| `google` | `organic` | Búsqueda en Google |
| `bing` | `organic` | Búsqueda en Bing |
| `twitter.com` | `referral` | Click desde Twitter |
| `facebook.com` | `referral` | Click desde Facebook |
| `(direct)` | `(none)` | URL directa o bookmark |

### **Ver referrer específico por página:**

```
Reports → Engagement → Pages and screens
→ Click en página específica
→ Ver "Session source/medium"
```

### **Ver evento custom `traffic_source`:**

```
Reports → Events → traffic_source
→ Ver parámetros: source, medium, campaign, referrer
```

---

## 🔥 Método 2: Tracking Mejorado (Angular)

### **✅ Ya Implementado**

Agregamos `trackTrafficSource()` que detecta:

- ✅ **Google** → `google / organic`
- ✅ **Bing** → `bing / organic`
- ✅ **Facebook** → `facebook / social`
- ✅ **Twitter** → `twitter / social`
- ✅ **LinkedIn** → `linkedin / social`
- ✅ **Otros sitios** → `domain.com / referral`
- ✅ **URL directa** → `direct / none`

### **Cómo funciona:**

```typescript
// En app.component.ts
ngOnInit(): void {
  this.analytics.init();
  this.analytics.trackTrafficSource(); // ← Detecta fuente
}
```

**Detecta automáticamente:**
1. `document.referrer` → De dónde viene el usuario
2. URL params → UTM tags (utm_source, utm_medium)
3. Envía evento a GA4 con toda la info

### **Ver en GA4:**

```
Reports → Events → traffic_source
```

**Verás:**
```
Event: traffic_source
Parámetros:
  - source: google
  - medium: organic
  - campaign: (not set)
  - referrer: https://www.google.com/
```

---

## 🤖 Método 3: Plugin WordPress (Bots de IA)

### **Por qué necesitas esto:**

Los bots de IA (ChatGPT, Perplexity, Claude) **NO ejecutan JavaScript**, por lo tanto:
- ❌ Google Analytics NO los detecta
- ❌ Los eventos de Angular NO se disparan

**Solución:** Logging del lado del servidor (WordPress)

---

### **Plugin: Hackeruna Bot Analytics**

#### **Instalación:**

**Paso 1: Crear carpeta**
```bash
ssh user@servidor.com
cd /var/www/html/wp-content/plugins/
mkdir hackeruna-bot-analytics
```

**Paso 2: Crear archivo**
```bash
nano hackeruna-bot-analytics/hackeruna-bot-analytics.php
```

**Paso 3: Pegar código** (ver más abajo)

**Paso 4: Activar**
```
WordPress Admin → Plugins → Hackeruna Bot Analytics → Activar
```

---

#### **Código del Plugin:**

```php
<?php
/**
 * Plugin Name: Hackeruna Bot Analytics
 * Description: Detecta visitas de bots de IA (ChatGPT, Perplexity, Claude)
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

// Crear tabla en activación
register_activation_hook(__FILE__, 'hba_install');
function hba_install() {
    global $wpdb;
    $table = $wpdb->prefix . 'bot_visits';
    
    $sql = "CREATE TABLE IF NOT EXISTS $table (
        id bigint(20) AUTO_INCREMENT PRIMARY KEY,
        visit_date datetime NOT NULL,
        bot_name varchar(100),
        url text NOT NULL,
        ip_address varchar(45),
        user_agent text,
        referer text,
        KEY visit_date (visit_date),
        KEY bot_name (bot_name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Log cada visita
add_action('init', 'hba_log_visit');
function hba_log_visit() {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $bot = hba_detect_bot($ua);
    
    if ($bot) {
        global $wpdb;
        $wpdb->insert($wpdb->prefix . 'bot_visits', [
            'visit_date' => current_time('mysql'),
            'bot_name' => $bot,
            'url' => $_SERVER['REQUEST_URI'] ?? '',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $ua,
            'referer' => $_SERVER['HTTP_REFERER'] ?? ''
        ]);
    }
}

// Detectar tipo de bot
function hba_detect_bot($ua) {
    $bots = [
        'ChatGPT' => ['ChatGPT', 'GPTBot', 'OpenAI'],
        'Claude' => ['Claude', 'Anthropic'],
        'Perplexity' => ['PerplexityBot'],
        'Google' => ['Googlebot'],
        'Bing' => ['bingbot'],
        'Facebook' => ['facebookexternalhit'],
        'Twitter' => ['Twitterbot'],
        'LinkedIn' => ['LinkedInBot']
    ];
    
    foreach ($bots as $name => $patterns) {
        foreach ($patterns as $pattern) {
            if (stripos($ua, $pattern) !== false) {
                return $name;
            }
        }
    }
    return null;
}

// Menu en admin
add_action('admin_menu', 'hba_menu');
function hba_menu() {
    add_menu_page(
        'Bot Analytics',
        'Bot Analytics',
        'manage_options',
        'bot-analytics',
        'hba_page',
        'dashicons-chart-line'
    );
}

// Página de estadísticas
function hba_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'bot_visits';
    
    // Estadísticas por bot
    $stats = $wpdb->get_results("
        SELECT 
            bot_name,
            COUNT(*) as visits,
            MAX(visit_date) as last_visit
        FROM $table
        GROUP BY bot_name
        ORDER BY visits DESC
    ");
    
    // Visitas recientes
    $recent = $wpdb->get_results("
        SELECT *
        FROM $table
        ORDER BY visit_date DESC
        LIMIT 100
    ");
    
    // Total de visitas
    $total = $wpdb->get_var("SELECT COUNT(*) FROM $table");
    
    // Últimas 24 horas
    $today = $wpdb->get_var("
        SELECT COUNT(*) 
        FROM $table 
        WHERE visit_date >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ");
    
    ?>
    <div class="wrap">
        <h1>🤖 Bot Analytics</h1>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
            <div style="background: #fff; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h3>Total de Visitas</h3>
                <p style="font-size: 32px; margin: 0; color: #2271b1;">
                    <?php echo number_format($total); ?>
                </p>
            </div>
            <div style="background: #fff; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h3>Últimas 24 Horas</h3>
                <p style="font-size: 32px; margin: 0; color: #2271b1;">
                    <?php echo number_format($today); ?>
                </p>
            </div>
        </div>
        
        <h2>📊 Estadísticas por Bot</h2>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th style="width: 30%">Bot</th>
                    <th style="width: 20%">Visitas</th>
                    <th style="width: 50%">Última Visita</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($stats)): ?>
                <tr>
                    <td colspan="3">
                        <em>No hay visitas de bots todavía. Espera a que los bots de IA descubran tu sitio.</em>
                    </td>
                </tr>
                <?php else: ?>
                <?php foreach ($stats as $s): ?>
                <tr>
                    <td><strong><?php echo esc_html($s->bot_name); ?></strong></td>
                    <td><?php echo number_format($s->visits); ?></td>
                    <td><?php echo esc_html($s->last_visit); ?></td>
                </tr>
                <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
        
        <h2>🕒 Visitas Recientes (últimas 100)</h2>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th style="width: 15%">Fecha</th>
                    <th style="width: 15%">Bot</th>
                    <th style="width: 40%">URL</th>
                    <th style="width: 15%">IP</th>
                    <th style="width: 15%">Referer</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($recent as $v): ?>
                <tr>
                    <td><?php echo esc_html(date('Y-m-d H:i', strtotime($v->visit_date))); ?></td>
                    <td><strong><?php echo esc_html($v->bot_name); ?></strong></td>
                    <td><code style="font-size: 11px;"><?php echo esc_html(substr($v->url, 0, 60)); ?></code></td>
                    <td><?php echo esc_html($v->ip_address); ?></td>
                    <td>
                        <?php 
                        if ($v->referer) {
                            $ref_short = substr($v->referer, 0, 30);
                            echo '<code style="font-size: 11px;">' . esc_html($ref_short) . '</code>';
                        } else {
                            echo '<em>-</em>';
                        }
                        ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <p style="margin-top: 20px;">
            <strong>User Agents detectados:</strong>
        </p>
        <ul style="font-size: 11px; list-style: disc; margin-left: 20px;">
            <li><code>ChatGPT, GPTBot, OpenAI</code> → ChatGPT</li>
            <li><code>Claude, Anthropic</code> → Claude AI</li>
            <li><code>PerplexityBot</code> → Perplexity AI</li>
            <li><code>Googlebot</code> → Google Search</li>
            <li><code>bingbot</code> → Bing Search</li>
        </ul>
    </div>
    <?php
}
?>
```

---

### **Uso del Plugin:**

**1. Activar plugin:**
```
WordPress Admin → Plugins → Hackeruna Bot Analytics → Activar
```

**2. Ver estadísticas:**
```
WordPress Admin → Bot Analytics
```

**Verás:**
```
Total de Visitas: 234
Últimas 24 Horas: 12

Estadísticas por Bot:
ChatGPT     → 45 visitas (última: 2025-11-13 14:30)
Perplexity  → 23 visitas (última: 2025-11-13 13:15)
Google      → 156 visitas (última: 2025-11-13 14:45)
Facebook    → 10 visitas (última: 2025-11-13 12:00)
```

---

## 🔍 Método 4: Server Logs (Avanzado)

Si tienes acceso SSH, puedes analizar logs de Apache/Nginx:

### **Apache:**

```bash
# Ver todos los user agents
tail -f /var/log/apache2/access.log | grep -i "bot"

# Ver solo ChatGPT
tail -f /var/log/apache2/access.log | grep -i "gptbot"

# Ver solo Perplexity
tail -f /var/log/apache2/access.log | grep -i "perplexitybot"

# Contar visitas por bot
cat /var/log/apache2/access.log | grep -i "gptbot" | wc -l
```

### **Nginx:**

```bash
# Ver todos los bots
tail -f /var/log/nginx/access.log | grep -i "bot"

# Analizar log completo
awk '{print $12}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
```

---

## 📊 Comparación de Métodos

| Método | Detecta Humanos | Detecta Bots IA | UI Amigable | Costo |
|--------|-----------------|-----------------|-------------|-------|
| **Google Analytics** | ✅ Sí | ❌ No | ✅ Excelente | Free |
| **Angular Tracking** | ✅ Sí | ❌ No | ✅ Buena | Free |
| **Plugin WordPress** | ❌ No | ✅ Sí | ✅ Buena | Free |
| **Server Logs** | ✅ Sí | ✅ Sí | ❌ CLI | Free |

---

## 🎯 Recomendación

### **Usa los 3 métodos juntos:**

1. **Google Analytics** → Para humanos (Google, social, referrals)
2. **Angular Tracking** → Para eventos detallados
3. **Plugin WordPress** → Para bots de IA (ChatGPT, Perplexity)

**Resultado:**
- ✅ Visión completa de TODO el tráfico
- ✅ Detectas humanos Y bots de IA
- ✅ UI amigable en ambos (GA4 + WordPress Admin)

---

## 🧪 Verificación

### **1. Probar Angular Tracking:**

```bash
# En local
ng serve

# En navegador
http://localhost:4200

# Abrir consola (F12) → Network → Buscar "google-analytics"
# Deberías ver evento "traffic_source"
```

### **2. Probar Plugin WordPress:**

```bash
# Visitar tu sitio con diferentes User Agents
curl -A "GPTBot/1.0" https://hackeruna.com/post/algun-post
curl -A "PerplexityBot/1.0" https://hackeruna.com/post/algun-post

# Luego ver en WordPress Admin → Bot Analytics
```

### **3. Ver en Google Analytics:**

```
Google Analytics → Reports → Events → traffic_source
```

---

## 📈 Ejemplos de Datos que Verás

### **Google Analytics 4:**

```
Session source / medium:
- google / organic → 234 sesiones
- twitter.com / referral → 45 sesiones
- facebook.com / referral → 23 sesiones
- (direct) / (none) → 89 sesiones
```

### **Plugin WordPress:**

```
Bot Analytics:
- ChatGPT → 15 visitas
- Perplexity → 8 visitas
- Google → 145 visitas
- Facebook → 12 visitas
```

### **Combinado:**

```
Total de tráfico:
- Humanos (GA4): 391 sesiones
- Bots IA (Plugin): 23 visitas
- Total: 414 visitas
```

---

## 💡 Tips Extra

### **1. UTM Tags para Campañas:**

Cuando compartas links, agrega UTM params:

```
https://hackeruna.com/post/algun-post?utm_source=twitter&utm_medium=social&utm_campaign=promo_nov
```

**Verás en GA4:**
- Source: `twitter`
- Medium: `social`
- Campaign: `promo_nov`

### **2. Track Shares:**

Cuando alguien comparte en redes:

```typescript
// En tu componente
this.analytics.trackShare('twitter', 'post', postId);
```

### **3. Export Data:**

**Desde WordPress:**

```sql
-- Conectar a MySQL
mysql -u user -p database_name

-- Export CSV
SELECT bot_name, COUNT(*) as visits
FROM wp_bot_visits
GROUP BY bot_name
INTO OUTFILE '/tmp/bot_stats.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
```

---

## ✅ Checklist

Después de implementar:

- [ ] **Google Analytics funcionando** - Ver Reports → Acquisition
- [ ] **trackTrafficSource() agregado** - En app.component.ts
- [ ] **Plugin WordPress instalado** - En wp-content/plugins/
- [ ] **Plugin activado** - WordPress Admin → Plugins
- [ ] **Dashboard visible** - WordPress Admin → Bot Analytics
- [ ] **Evento traffic_source en GA4** - Reports → Events
- [ ] **Logs de bots visibles** - Bot Analytics page

---

**Última Actualización:** 13 de Noviembre, 2025  
**Estado:** ✅ Implementado  
**Next Steps:** Monitorear durante 7 días y analizar datos
