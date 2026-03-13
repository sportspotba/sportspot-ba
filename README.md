# SportSpot BA — Directorio Deportivo de Buenos Aires

El directorio más completo de centros deportivos en Buenos Aires y GBA.

## Deploy en Vercel (Instrucciones paso a paso)

### Paso 1: Subir a GitHub
1. Entrá a [github.com](https://github.com) y logueate
2. Hacé click en el botón verde **"New"** (o **"+"** arriba a la derecha → New repository)
3. Nombre del repositorio: `sportspot-ba`
4. Dejalo en **Public**
5. Click en **"Create repository"**
6. En la página que aparece, hacé click en **"uploading an existing file"**
7. Arrastrá TODOS los archivos de esta carpeta (app/, public/, package.json, etc.)
8. Click en **"Commit changes"**

### Paso 2: Deploy en Vercel
1. Entrá a [vercel.com](https://vercel.com) y logueate con GitHub
2. Click en **"Add New..." → "Project"**
3. Buscá el repositorio `sportspot-ba` y click en **"Import"**
4. En la configuración, dejá todo como está (Vercel detecta Next.js automáticamente)
5. Click en **"Deploy"**
6. Esperá 1-2 minutos. ¡Tu sitio está online!

### Paso 3: Dominio personalizado (opcional)
1. En el dashboard de Vercel, andá a Settings → Domains
2. Escribí tu dominio (ej: sportspot.com.ar)
3. Seguí las instrucciones para configurar los DNS en NIC Argentina

## Estructura del proyecto
```
sportspot-ba/
├── app/
│   ├── globals.css     ← Estilos globales y fuentes
│   ├── layout.js       ← Layout con metadata SEO
│   └── page.js         ← Página principal completa
├── public/             ← Archivos estáticos (favicon, etc.)
├── package.json        ← Dependencias
├── next.config.js      ← Configuración de Next.js
└── README.md           ← Este archivo
```

## Tecnologías
- Next.js 14
- React 18
- Desplegado en Vercel
