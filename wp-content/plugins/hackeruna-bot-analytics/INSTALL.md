# 🚀 Instalación del Plugin Hackeruna Bot Analytics

**Versión:** 1.0.0  
**Autor:** Juan Urquiza  
**Website:** https://hackeruna.com

---

## 📋 Requisitos

- ✅ WordPress 5.0 o superior
- ✅ PHP 7.4 o superior
- ✅ MySQL 5.6 o superior
- ✅ Acceso a WordPress Admin (rol Administrator)

---

## 🔧 Método 1: Instalación en Producción (Sitio Web Real)

### **Paso 1: Subir archivos por FTP**

```bash
# Conectar por FTP o SSH a tu servidor
ssh usuario@tu-servidor.com

# Ir a la carpeta de plugins
cd /var/www/html/wp-content/plugins/

# Crear carpeta del plugin
mkdir hackeruna-bot-analytics
```

### **Paso 2: Copiar archivos**

Copia estos archivos desde tu proyecto local al servidor:

```
Local: /Users/juanurquiza/Documents/dev/ng-hackeruna/wp-content/plugins/hackeruna-bot-analytics/
→
Servidor: /var/www/html/wp-content/plugins/hackeruna-bot-analytics/

Archivos:
- hackeruna-bot-analytics.php
- readme.txt
- INSTALL.md (este archivo)
```

**Por FTP:**
```bash
# Desde tu máquina local
scp -r wp-content/plugins/hackeruna-bot-analytics/ usuario@servidor:/var/www/html/wp-content/plugins/
```

### **Paso 3: Activar el plugin**

1. Ir a: **WordPress Admin → Plugins**
2. Buscar: **"Hackeruna Bot Analytics"**
3. Click: **"Activate"**

### **Paso 4: Verificar instalación**

1. Ir a: **WordPress Admin → Bot Analytics**
2. Deberías ver el dashboard (sin datos todavía)

---

## 💻 Método 2: Instalación en Local (XAMPP/MAMP/Local)

### **Opción A: XAMPP (Windows/Mac/Linux)**

```bash
# Ir a la carpeta htdocs
cd C:\xampp\htdocs\tu-sitio\wp-content\plugins\

# Copiar carpeta del plugin
cp -r /Users/juanurquiza/Documents/dev/ng-hackeruna/wp-content/plugins/hackeruna-bot-analytics .
```

### **Opción B: MAMP (Mac)**

```bash
cd /Applications/MAMP/htdocs/tu-sitio/wp-content/plugins/
cp -r /Users/juanurquiza/Documents/dev/ng-hackeruna/wp-content/plugins/hackeruna-bot-analytics .
```

### **Opción C: Local by Flywheel**

```bash
cd ~/Local\ Sites/tu-sitio/app/public/wp-content/plugins/
cp -r /Users/juanurquiza/Documents/dev/ng-hackeruna/wp-content/plugins/hackeruna-bot-analytics .
```

Luego activar en WordPress Admin → Plugins.

---

## 📦 Método 3: Crear ZIP e Instalar por Admin

### **Paso 1: Crear archivo ZIP**

```bash
# Ir a la carpeta plugins
cd /Users/juanurquiza/Documents/dev/ng-hackeruna/wp-content/plugins/

# Crear ZIP
zip -r hackeruna-bot-analytics.zip hackeruna-bot-analytics/
```

### **Paso 2: Subir por WordPress Admin**

1. Ir a: **WordPress Admin → Plugins → Add New**
2. Click: **"Upload Plugin"**
3. Seleccionar: `hackeruna-bot-analytics.zip`
4. Click: **"Install Now"**
5. Click: **"Activate Plugin"**

---

## ✅ Verificación Post-Instalación

### **1. Verificar que la tabla se creó**

Conectar a MySQL:

```bash
mysql -u root -p
```

```sql
USE tu_base_de_datos;

-- Ver si existe la tabla
SHOW TABLES LIKE 'wp_bot_visits';

-- Ver estructura
DESCRIBE wp_bot_visits;

-- Ver registros (debería estar vacía al inicio)
SELECT COUNT(*) FROM wp_bot_visits;
```

**Resultado esperado:**
```
+---------------+-------------+------+-----+---------+----------------+
| Field         | Type        | Null | Key | Default | Extra          |
+---------------+-------------+------+-----+---------+----------------+
| id            | bigint(20)  | NO   | PRI | NULL    | auto_increment |
| visit_date    | datetime    | NO   | MUL | NULL    |                |
| bot_name      | varchar(100)| YES  | MUL | NULL    |                |
| url           | text        | NO   |     | NULL    |                |
| ip_address    | varchar(45) | YES  |     | NULL    |                |
| user_agent    | text        | NO   |     | NULL    |                |
| referer       | text        | YES  |     | NULL    |                |
+---------------+-------------+------+-----+---------+----------------+
```

### **2. Verificar menú en Admin**

1. Ir a WordPress Admin
2. Buscar en sidebar: **"Bot Analytics"** (con icono de gráfica 📊)
3. Click para abrir dashboard

### **3. Probar registro de visitas**

Simular visita de un bot:

```bash
# Visitar tu sitio con User Agent de ChatGPT
curl -A "GPTBot/1.0" https://tu-sitio.com/

# Visitar con User Agent de Perplexity
curl -A "PerplexityBot/1.0" https://tu-sitio.com/algun-post

# Visitar con User Agent de Claude
curl -A "Claude-Web/1.0" https://tu-sitio.com/
```

Luego verificar en: **WordPress Admin → Bot Analytics**

Deberías ver:
```
Total de Visitas: 3
Últimas 24 Horas: 3

Estadísticas por Bot:
ChatGPT     → 1 visita
Perplexity  → 1 visita
Claude      → 1 visita
```

---

## 🔍 Solución de Problemas

### **Problema: No aparece el menú "Bot Analytics"**

**Solución:**
1. Verificar que el plugin esté activado: WordPress Admin → Plugins
2. Verificar permisos: El usuario debe tener rol "Administrator"
3. Limpiar caché: WordPress Admin → Settings → Permalinks → Save Changes

---

### **Problema: La tabla no se crea**

**Solución:**

```bash
# Conectar a MySQL
mysql -u root -p

# Seleccionar base de datos
USE tu_base_de_datos;

# Crear tabla manualmente
CREATE TABLE IF NOT EXISTS wp_bot_visits (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### **Problema: No se registran visitas**

**Verificar:**

1. **Tabla existe:**
   ```sql
   SHOW TABLES LIKE 'wp_bot_visits';
   ```

2. **Logs de errores de PHP:**
   ```bash
   tail -f /var/log/apache2/error.log
   # o
   tail -f /Applications/MAMP/logs/php_error.log
   ```

3. **Probar inserción manual:**
   ```php
   // En WordPress Admin → Tools → Site Health → Info → Copiar al portapapeles
   // O crear un archivo test.php en wp-content/plugins/
   
   <?php
   require_once('../../../wp-load.php');
   
   global $wpdb;
   $table = $wpdb->prefix . 'bot_visits';
   
   $result = $wpdb->insert($table, [
       'visit_date' => current_time('mysql'),
       'bot_name' => 'Test Bot',
       'url' => '/test',
       'ip_address' => '127.0.0.1',
       'user_agent' => 'Test',
       'referer' => ''
   ]);
   
   echo $result ? 'OK' : 'Error: ' . $wpdb->last_error;
   ?>
   ```

---

### **Problema: Errores de PHP**

**Si ves:**
```
Fatal error: Call to undefined function add_action()
```

**Solución:**
- Asegúrate que el archivo `hackeruna-bot-analytics.php` esté en:
  ```
  wp-content/plugins/hackeruna-bot-analytics/hackeruna-bot-analytics.php
  ```
  
- NO debe estar en otra carpeta como:
  ```
  ❌ wp-content/plugins/hackeruna-bot-analytics.php (sin carpeta)
  ❌ wp-content/hackeruna-bot-analytics/ (fuera de plugins)
  ```

---

## 🗑️ Desinstalación

### **Opción A: Desactivar y mantener datos**

1. WordPress Admin → Plugins
2. Click "Deactivate" en Hackeruna Bot Analytics
3. Los datos se mantienen en la tabla `wp_bot_visits`

### **Opción B: Desinstalar y eliminar datos**

```bash
# 1. Desactivar plugin en WordPress Admin

# 2. Conectar a MySQL
mysql -u root -p

# 3. Eliminar tabla
USE tu_base_de_datos;
DROP TABLE IF EXISTS wp_bot_visits;

# 4. Eliminar archivos
rm -rf wp-content/plugins/hackeruna-bot-analytics/
```

---

## 📊 Uso del Plugin

### **Ver estadísticas:**

```
WordPress Admin → Bot Analytics
```

### **Estadísticas disponibles:**

1. **Tarjetas de resumen:**
   - Total de visitas
   - Últimas 24 horas
   - Últimos 7 días
   - Últimos 30 días

2. **Tabla por Bot:**
   - Nombre del bot
   - Total de visitas
   - Última visita

3. **Visitas recientes (últimas 100):**
   - Fecha y hora
   - Bot detectado
   - URL visitada
   - IP address
   - Referer

---

## 🔧 Configuración Avanzada

### **Agregar bots personalizados**

Editar `hackeruna-bot-analytics.php` línea 100:

```php
$bots = [
    'ChatGPT' => ['ChatGPT', 'GPTBot', 'OpenAI'],
    'MiBot' => ['MiBotUserAgent'],  // ← Agregar aquí
];
```

### **Cambiar límite de visitas recientes**

Línea 196:

```php
$recent_visits = $wpdb->get_results("
    SELECT *
    FROM $table_name
    ORDER BY visit_date DESC
    LIMIT 100  -- ← Cambiar este número
");
```

### **Exportar datos a CSV**

```sql
-- Conectar a MySQL
mysql -u root -p

USE tu_base_de_datos;

-- Exportar a CSV
SELECT bot_name, COUNT(*) as visits
FROM wp_bot_visits
GROUP BY bot_name
INTO OUTFILE '/tmp/bot_stats.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

---

## 📞 Soporte

**Si tienes problemas:**

1. **Documentación:** Este archivo (INSTALL.md)
2. **Email:** contacto@hackeruna.com
3. **Website:** https://hackeruna.com
4. **GitHub:** https://github.com/juanitourquiza

---

## ✅ Checklist de Instalación

- [ ] WordPress 5.0+ y PHP 7.4+
- [ ] Plugin copiado a `wp-content/plugins/hackeruna-bot-analytics/`
- [ ] Plugin activado en WordPress Admin
- [ ] Tabla `wp_bot_visits` creada en MySQL
- [ ] Menú "Bot Analytics" visible en Admin
- [ ] Dashboard se abre sin errores
- [ ] Visita de prueba registrada correctamente

---

**¡Listo para producción!** 🚀

El plugin está ahora instalado y registrando visitas de bots automáticamente.
