# PEDSAR — Sistema de gestión de cursos y capacitaciones

Sistema web para la empresa PEDSAR E.I.R.L. que integra sus módulos principales en una sola aplicación:

1. **Sitio público** — páginas de Inicio, Cursos (catálogo con buscador), Nosotros y Contacto (formulario de consultas), con tarjetas de la oferta formativa (modalidad, horario, duración y precio).
2. **Ficha del curso e inscripción en línea** — formulario validado con datos del estudiante, modalidad y método de pago (Tarjeta, Yape, Plin, Transferencia); genera el código de matrícula y la confirmación en pantalla.
3. **Panel de administración** — acceso con usuario y contraseña; incluye Panel principal (indicadores y últimas inscripciones), Estudiantes, Inscripciones con filtros, Cursos (publicación de nuevos cursos), Certificados digitales (emisión con código único) y Reportes (matrículas e ingresos por curso y método de pago).

Todo está conectado: al registrar una inscripción desde el sitio público, esta aparece en el panel de administración, actualiza los indicadores, los reportes y las vacantes del curso; un curso publicado desde el panel aparece de inmediato en el catálogo público.

Desarrollado con **Next.js 16 (App Router) + TypeScript + TailwindCSS + shadcn/ui**.

---

## Requisitos previos

| Requisito | Versión recomendada | Verificación |
|---|---|---|
| Node.js | 20.9 o superior (LTS 22) | `node -v` |
| npm | 10 o superior (viene con Node.js) | `npm -v` |

Descarga Node.js desde <https://nodejs.org> si no lo tienes instalado. No se requiere base de datos ni configuración adicional: los datos del sistema se cargan en memoria al iniciar.

---

## Pasos para levantar el programa

1. **Descomprimir** el archivo ZIP en una carpeta de tu preferencia, por ejemplo `Documentos\pedsar-sistema`.

2. **Abrir una terminal dentro de la carpeta del proyecto**:
   - Windows: abre la carpeta, escribe `cmd` en la barra de direcciones del Explorador y presiona Enter (o usa PowerShell).
   - macOS / Linux: abre Terminal y ejecuta `cd ruta/a/pedsar-sistema`.

3. **Instalar las dependencias** (solo la primera vez; toma algunos minutos):

   ```bash
   npm install
   ```

   > Alternativa con Bun: `bun install`. Con pnpm: `pnpm install`.

4. **Levantar el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

5. **Abrir el sistema en el navegador**:

   ```
   http://localhost:3000
   ```

   La pantalla inicial es el sitio público. Desde ahí:

   - Navega por **Inicio, Cursos, Nosotros y Contacto** con el menú azul superior.
   - Pulsa **Inscribirme** en cualquier curso para abrir la ficha y registrar la matrícula en línea.
   - Pulsa **Ingresar** para entrar al panel de administración.

### Credenciales de acceso al panel

| Usuario | Contraseña |
|---|---|
| `admin` | `pedsar123` |

---

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000` (con recarga en caliente). |
| `npm run build` | Compila la versión de producción en la carpeta `.next`. |
| `npm run start` | Sirve la versión compilada de producción en `http://localhost:3000`. |
| `npm run lint` | Revisa la calidad del código con ESLint. |

Para detener el servidor, presiona `Ctrl + C` en la terminal.

---

## Solución de problemas

- **"npm no se reconoce como comando"**: Node.js no está instalado o la terminal no se reinició después de instalarlo. Instala Node.js y abre una terminal nueva.
- **El puerto 3000 está ocupado**: cierra la otra aplicación que lo usa o ejecuta el servidor en otro puerto, por ejemplo `npm run dev -- -p 3001`, y abre `http://localhost:3001`.
- **La instalación falla por red o proxy corporativo**: verifica tu conexión a internet; npm necesita descargar los paquetes del registro público (`registry.npmjs.org`).
- **Primera carga lenta**: en modo desarrollo, Next.js compila la página al primer acceso; las recargas siguientes son inmediatas.

---

## Estructura del proyecto

```
pedsar-sistema/
├── src/
│   ├── app/                  # Página principal y diseño global (App Router)
│   ├── components/
│   │   ├── pedsar/           # Vistas del sistema (sitio público, login, panel)
│   │   └── ui/               # Componentes base shadcn/ui
│   ├── hooks/                # Hooks de React (notificaciones toast)
│   └── lib/                  # Datos, tipos y utilidades del dominio
├── public/                   # Archivos estáticos
├── package.json              # Dependencias y comandos
└── README.md
```

El contenido de referencia del sistema (nombres de cursos, instructores, precios e indicadores) corresponde al documento del proyecto de mejora para la empresa "PEDSAR".
