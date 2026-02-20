# MC&DJ - Sistema de Cuestionario v2.0
## Con Análisis de Complejidad Operativa

Sistema automatizado de captura y análisis de prospectos con dimensionamiento inteligente basado en volumetría operativa.

---

## 🎯 ¿QUÉ ES ESTE SISTEMA?

Un cuestionario inteligente que:
- ✅ Captura datos de prospectos
- ✅ Calcula complejidad operativa automáticamente
- ✅ Estima horas de trabajo necesarias
- ✅ Calcula costo mensual
- ✅ Envía email profesional con análisis completo
- ✅ Genera alertas de complejidad (🟢🟡🔴)

---

## 📦 CONTENIDO DE ESTE PAQUETE

```
mcydj-deploy-final/
│
├── 📄 README.md                    ← Este archivo
├── 📘 GUIA_DESPLIEGUE.md          ← EMPIEZA AQUÍ (guía paso a paso)
│
├── api/
│   └── send-questionnaire.js      ← API completa con Resend
│
├── public/
│   └── index.html                  ← Cuestionario actualizado (3 preguntas nuevas)
│
├── package.json                    ← Dependencias (Resend)
├── vercel.json                     ← Configuración de Vercel
├── .env.example                    ← Template de variables de entorno
└── .gitignore                      ← Archivos a ignorar en Git
```

---

## 🚀 INICIO RÁPIDO

### Paso 1: Lee la Guía

**Abre:** `GUIA_DESPLIEGUE.md`

Ahí encontrarás:
- ✅ Instalación de Node.js
- ✅ Configuración de Resend
- ✅ Subir a GitHub
- ✅ Desplegar en Vercel
- ✅ Troubleshooting completo

### Paso 2: Configuración Mínima

Necesitas:
1. **Node.js** (te enseño a instalarlo)
2. **Cuenta en Resend** (gratis, 3,000 emails/mes)
3. **Cuenta en GitHub** (si no tienes)
4. **Cuenta en Vercel** (gratis)

### Paso 3: Tiempo Estimado

- ⏱️ **Primera vez:** 45-60 minutos
- ⏱️ **Si ya tienes todo configurado:** 15-20 minutos

---

## 🔑 VARIABLES DE ENTORNO

Necesitas configurar en Vercel:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `RESEND_API_KEY` | API Key de Resend | `re_123abc...` |
| `EMAIL_TO` | Email destino | `consultorias_integrales@hotmail.com` |
| `EMAIL_FROM` | Email remitente | `MC&DJ Cuestionario <conecta@mcydj.mx>` |

**Obtén tu API Key en:** https://resend.com/api-keys

---

## 📧 SOBRE RESEND

### ¿Por qué Resend?

- ✅ **Gratis:** 3,000 emails/mes
- ✅ **Rápido:** Emails en <1 segundo
- ✅ **Fácil:** Sin configuración compleja
- ✅ **Confiable:** 99.9% deliverability
- ✅ **Logs:** Dashboard con analytics

### ¿Cómo funciona?

1. Te registras en https://resend.com
2. Obtienes una API Key
3. (Opcional) Verificas tu dominio
4. ¡Listo para enviar emails!

---

## 🏗️ ARQUITECTURA

```
Cliente (Navegador)
    ↓
Cuestionario HTML (index.html)
    ↓ POST /api/send-questionnaire
API de Vercel (send-questionnaire.js)
    ↓
Resend API
    ↓
Email → consultorias_integrales@hotmail.com
```

---

## 🧪 TESTING LOCAL (Opcional)

Si quieres probar antes de desplegar:

```bash
# 1. Instala dependencias
npm install

# 2. Crea .env con tus datos
cp .env.example .env
# Edita .env con tus valores reales

# 3. Instala Vercel CLI
npm install -g vercel

# 4. Inicia servidor local
vercel dev

# 5. Abre en navegador
# http://localhost:3000
```

---

## 📊 RESULTADO ESPERADO

Después del despliegue, cuando alguien llene el cuestionario:

1. **El sistema calcula automáticamente:**
   - Nivel de complejidad (MICRO, PEQUEÑO, MEDIANO, GRANDE, CORPORATIVO)
   - Horas estimadas de trabajo
   - Costo mensual estimado
   - Alerta de complejidad (🟢🟡🔴)

2. **Envía email con:**
   - Datos completos del prospecto
   - Análisis de complejidad operativa
   - Perfiles identificados
   - Servicios recomendados
   - Estimación de inversión
   - Próximos pasos sugeridos
   - JSON adjunto con toda la data

3. **El equipo recibe:**
   - Información para cotizar inmediatamente
   - Alertas de casos complejos
   - Datos organizados y profesionales

---

## 🎓 DOCUMENTACIÓN ADICIONAL

Además de esta carpeta, tienes:

- ✅ **Calculadora Excel** → Para cotizar en vivo
- ✅ **Guía para el Equipo** → Cómo usar el sistema
- ✅ **Catálogo de Servicios** → Servicios actualizados
- ✅ **Matriz de Costeo** → Referencia completa

---

## ⚙️ STACK TECNOLÓGICO

- **Frontend:** HTML5 + JavaScript vanilla
- **Backend:** Vercel Functions (Node.js)
- **Email:** Resend API
- **Hosting:** Vercel
- **Código:** GitHub

---

## 🔒 SEGURIDAD

- ✅ API Keys en variables de entorno (nunca en código)
- ✅ CORS configurado correctamente
- ✅ Rate limiting por Vercel
- ✅ HTTPS por defecto
- ✅ .env en .gitignore

---

## 📈 MONITOREO

### Vercel Dashboard
- **URL:** https://vercel.com/dashboard
- **Ver:** Deployments, Functions, Logs

### Resend Dashboard
- **URL:** https://resend.com/emails
- **Ver:** Emails enviados, Deliverability, Errors

---

## 🆘 SOPORTE

### ¿Algo no funciona?

1. **Lee:** `GUIA_DESPLIEGUE.md` → Sección Troubleshooting
2. **Revisa:** Logs en Vercel Dashboard
3. **Verifica:** Status en Resend Dashboard

### ¿Necesitas ayuda adicional?

Documentación incluida:
- `GUIA_DESPLIEGUE.md` → Troubleshooting completo
- `PLAN_DESPLIEGUE_TECNICO.md` → Detalles técnicos
- `GUIA_IMPLEMENTACION_EQUIPO.md` → Para el equipo

---

## 📝 NOTAS IMPORTANTES

### Límites de Resend (Plan Gratuito)

- **Emails:** 3,000/mes
- **Recipients:** 100/día con `onboarding@resend.dev`
- **Recipients:** Ilimitado con dominio verificado

### Para Producción

**Se recomienda:**
1. Verificar tu dominio en Resend
2. Usar `noreply@mcydj.mx` como remitente
3. Monitorear uso mensual

### Costos

- ✅ **Vercel:** GRATIS (Hobby plan)
- ✅ **Resend:** GRATIS hasta 3,000 emails/mes
- ✅ **GitHub:** GRATIS (repos privados incluidos)

**Total: $0 USD/mes** (hasta 3,000 prospectos/mes)

---

## 🎯 PRÓXIMOS PASOS

Después de desplegar:

1. **Configura dominio personalizado**
   - En Vercel: Settings > Domains
   - Agrega: `app.mcydj.mx`

2. **Comparte con el equipo**
   - URL del cuestionario
   - Guía de implementación
   - Calculadora Excel

3. **Prueba con clientes reales**
   - Envía la URL
   - Monitorea emails recibidos
   - Ajusta si es necesario

---

## 📞 CONTACTO

**MC&DJ Consultores Profesionales**  
Email: consultorias_integrales@hotmail.com  
Sistema v2.0 - Febrero 2026

---

## ✅ CHECKLIST PRE-DESPLIEGUE

Antes de empezar, asegúrate de tener:

- [ ] Cuenta en Resend (https://resend.com/signup)
- [ ] Cuenta en GitHub (https://github.com/signup)
- [ ] Cuenta en Vercel (https://vercel.com/signup)
- [ ] 45-60 minutos disponibles
- [ ] Esta carpeta completa descargada

---

## 🚀 ¡LISTO PARA EMPEZAR!

**Lee ahora:** `GUIA_DESPLIEGUE.md`

Ahí encontrarás el paso a paso completo para:
1. Instalar Node.js
2. Configurar Resend
3. Subir a GitHub
4. Desplegar en Vercel
5. Verificar que todo funciona

**¡Éxito con tu despliegue!** 🎉

---

*Última actualización: Febrero 2026*
