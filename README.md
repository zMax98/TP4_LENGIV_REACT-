# TP3 - Lenguajes IV (React + Vite + EmailJS)

Estructura basada en tu TP2, agregando navegación y página **Contacto** con envío de email mediante **EmailJS**.

## Pasos
1. Duplicar `.env.example` como `.env` y completar:
```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
```
2. Instalar deps: `npm i`
3. Dev: `npm run dev`
4. Deploy GH Pages: setear `base` en `vite.config.js` y correr `npm run deploy`.

> Los estilos están separados por componente en sus archivos `.css`.
