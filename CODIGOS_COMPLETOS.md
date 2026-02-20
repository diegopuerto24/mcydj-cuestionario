# TODOS LOS ARCHIVOS CON CÓDIGO COMPLETO
## MC&DJ - Sistema v2.0

Este documento contiene TODOS los archivos con código completo, listos para copiar y pegar.

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
mcydj-deploy-final/
├── api/
│   └── send-questionnaire.js    (ARCHIVO 1)
├── public/
│   └── index.html                (ARCHIVO 2)
├── package.json                  (ARCHIVO 3)
├── vercel.json                   (ARCHIVO 4)
├── .env.example                  (ARCHIVO 5)
├── .gitignore                    (ARCHIVO 6)
└── README.md                     (ARCHIVO 7)
```

---

## ================================
## ARCHIVO 1: api/send-questionnaire.js
## ================================

**Ubicación:** `api/send-questionnaire.js`  
**Descripción:** API que procesa el cuestionario y envía emails con Resend

```javascript
/**
 * API Endpoint: /api/send-questionnaire
 * MC&DJ Consultores Profesionales
 * 
 * Procesa respuestas del cuestionario y envía email usando Resend
 * Versión 2.0 - Con dimensionamiento por volumetría operativa
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Mapea valores técnicos a etiquetas legibles
 */
const LABELS = {
  tipoPersona: {
    fisica: 'Persona Física',
    moral: 'Persona Moral'
  },
  facturacion: {
    micro: 'Menos de $100,000',
    pequeno: '$100,000 - $500,000',
    mediano: '$500,000 - $3,000,000',
    grande: 'Más de $3,000,000'
  },
  volumenOperaciones: {
    muy_bajo: 'Muy Bajo (Menos de 100 ops/mes)',
    bajo: 'Bajo (100-500 ops/mes)',
    medio: 'Medio (501-1,500 ops/mes)',
    alto: 'Alto (1,501-5,000 ops/mes)',
    muy_alto: 'Muy Alto (Más de 5,000 ops/mes)'
  },
  cuentasBancarias: {
    '1': '1 cuenta',
    '2-3': '2-3 cuentas',
    '4-6': '4-6 cuentas',
    '7-10': '7-10 cuentas',
    '10+': 'Más de 10 cuentas'
  },
  operacionesSinCFDI: {
    '0-10': 'Casi ninguna (0-10%)',
    '11-25': 'Pocas (11-25%)',
    '26-50': 'Algunas (26-50%)',
    '51-75': 'Bastantes (51-75%)',
    '76-100': 'La mayoría (76-100%)'
  },
  tieneEmpleados: {
    'no': 'No tengo empleados',
    '1-5': '1 a 5 empleados',
    '6-15': '6 a 15 empleados',
    '16-50': '16 a 50 empleados',
    '50+': 'Más de 50 empleados'
  },
  etapaDelNegocio: {
    preoperacion: 'Pre-operación',
    inicio: 'Inicio (menos de 1 año)',
    crecimiento: 'En crecimiento',
    consolidado: 'Consolidado'
  }
};

/**
 * Genera el HTML del email con la información completa
 */
function generarEmailHTML(data) {
  const { respuestas, perfiles, complejidad, fecha, serviciosTotales } = data;
  const contacto = respuestas.datosContacto || {};
  
  // Calcular totales de servicios
  let totalObligatorios = 0;
  let totalOpcionales = 0;
  perfiles.forEach(p => {
    totalObligatorios += p.services?.obligatorios || 0;
    totalOpcionales += p.services?.opcionales || 0;
  });

  // Determinar rango de cotización
  const horasEstimadas = complejidad?.horasEstimadas || 0;
  const costoEstimado = horasEstimadas * 310;
  let rangoMin, rangoMax;
  
  if (horasEstimadas < 15) {
    rangoMin = 3000; rangoMax = 12000;
  } else if (horasEstimadas < 40) {
    rangoMin = 8000; rangoMax = 40000;
  } else if (horasEstimadas < 70) {
    rangoMin = 20000; rangoMax = 100000;
  } else if (horasEstimadas < 120) {
    rangoMin = 60000; rangoMax = 250000;
  } else {
    rangoMin = 150000; rangoMax = 350000;
  }

  // Determinar alertas
  const cuentas = respuestas.cuentasBancarias || '1';
  const opsSinCFDI = respuestas.operacionesSinCFDI || '0-10';
  const volumen = respuestas.volumenOperaciones || 'bajo';
  
  let alerta = '🟢 VERDE';
  let alertaTexto = 'Cotización estándar';
  
  if (cuentas === '10+' || volumen === 'muy_alto' || opsSinCFDI === '76-100') {
    alerta = '🔴 ROJA';
    alertaTexto = 'Requiere revisión de dirección - Alta complejidad';
  } else if (cuentas === '7-10' || volumen === 'alto' || opsSinCFDI === '51-75') {
    alerta = '🟡 AMARILLA';
    alertaTexto = 'Revisar con coordinador senior';
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #16150E;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #FFF97D 0%, #A0C7FE 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 900;
      color: #16150E;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      color: #16150E;
      opacity: 0.8;
    }
    .content {
      padding: 40px 30px;
    }
    .section {
      margin-bottom: 35px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #16150E;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 3px solid #FFF97D;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }
    .info-item {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #A0C7FE;
    }
    .info-label {
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 16px;
      color: #16150E;
      font-weight: 500;
    }
    .complexity-box {
      background: linear-gradient(135deg, #FFF97D 0%, #F65904 100%);
      padding: 25px;
      border-radius: 12px;
      margin: 20px 0;
      box-shadow: 0 4px 16px rgba(246, 89, 4, 0.2);
    }
    .complexity-title {
      font-size: 22px;
      font-weight: 900;
      color: #16150E;
      margin-bottom: 15px;
    }
    .complexity-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 15px;
    }
    .complexity-item {
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .complexity-item-label {
      font-size: 11px;
      text-transform: uppercase;
      color: #666;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .complexity-item-value {
      font-size: 18px;
      font-weight: 900;
      color: #16150E;
    }
    .alert-box {
      background: #fff;
      border: 3px solid;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: 600;
    }
    .alert-verde { border-color: #4CAF50; color: #2E7D32; }
    .alert-amarilla { border-color: #FFC107; color: #F57C00; }
    .alert-roja { border-color: #F44336; color: #C62828; }
    .profile-list {
      list-style: none;
      padding: 0;
      margin: 15px 0;
    }
    .profile-item {
      background: #f9f9f9;
      padding: 15px 20px;
      margin-bottom: 10px;
      border-radius: 8px;
      border-left: 4px solid #F65904;
    }
    .profile-name {
      font-weight: 700;
      font-size: 16px;
      color: #16150E;
      margin-bottom: 5px;
    }
    .profile-code {
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #666;
      background: #e8e8e8;
      padding: 2px 8px;
      border-radius: 4px;
      margin-right: 10px;
    }
    .profile-services {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    .services-badge {
      display: inline-block;
      background: #A0C7FE;
      color: #16150E;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      margin-right: 8px;
    }
    .costo-box {
      background: #16150E;
      color: #FFF97D;
      padding: 25px;
      border-radius: 12px;
      margin: 20px 0;
      text-align: center;
    }
    .costo-label {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 10px;
    }
    .costo-value {
      font-size: 36px;
      font-weight: 900;
      margin: 10px 0;
    }
    .costo-rango {
      font-size: 16px;
      opacity: 0.8;
    }
    .footer {
      background: #f9f9f9;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e8e8e8;
    }
    .footer-text {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
    }
    .btn-action {
      display: inline-block;
      background: #F65904;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      margin: 15px 5px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 NUEVO PROSPECTO</h1>
      <p>Cuestionario completado el ${fecha}</p>
    </div>

    <div class="content">
      
      <div class="section">
        <div class="section-title">📋 DATOS DE CONTACTO</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Nombre / Razón Social</div>
            <div class="info-value">${contacto.nombre || 'No proporcionado'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">${contacto.email || 'No proporcionado'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Teléfono</div>
            <div class="info-value">${contacto.telefono || 'No proporcionado'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Fecha</div>
            <div class="info-value">${fecha}</div>
          </div>
        </div>
        ${contacto.comentarios ? `
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Comentarios adicionales</div>
          <div class="info-value">${contacto.comentarios}</div>
        </div>
        ` : ''}
      </div>

      <div class="complexity-box">
        <div class="complexity-title">📊 ANÁLISIS DE COMPLEJIDAD OPERATIVA</div>
        <div class="complexity-grid">
          <div class="complexity-item">
            <div class="complexity-item-label">Por Facturación</div>
            <div class="complexity-item-value">${complejidad?.nivelPorFacturacion || 'N/A'}</div>
          </div>
          <div class="complexity-item">
            <div class="complexity-item-label">Por Volumetría</div>
            <div class="complexity-item-value">${complejidad?.nivelPorVolumetria || 'N/A'}</div>
          </div>
          <div class="complexity-item">
            <div class="complexity-item-label">Nivel Real</div>
            <div class="complexity-item-value" style="color: #F65904;">${complejidad?.nivelReal || 'N/A'}</div>
          </div>
        </div>
        <div class="complexity-grid">
          <div class="complexity-item">
            <div class="complexity-item-label">Cuentas Bancarias</div>
            <div class="complexity-item-value">${LABELS.cuentasBancarias[respuestas.cuentasBancarias] || respuestas.cuentasBancarias || 'N/A'}</div>
          </div>
          <div class="complexity-item">
            <div class="complexity-item-label">Ops Sin CFDI</div>
            <div class="complexity-item-value">${complejidad?.porcentajeSinCFDI || 0}%</div>
          </div>
          <div class="complexity-item">
            <div class="complexity-item-label">Horas Estimadas</div>
            <div class="complexity-item-value" style="color: #F65904;">${horasEstimadas}h/mes</div>
          </div>
        </div>
      </div>

      <div class="alert-box alert-${alerta.includes('ROJA') ? 'roja' : alerta.includes('AMARILLA') ? 'amarilla' : 'verde'}">
        <strong>${alerta}</strong> - ${alertaTexto}
      </div>

      <div class="section">
        <div class="section-title">👤 PERFILES IDENTIFICADOS (${perfiles.length})</div>
        <ul class="profile-list">
          ${perfiles.map(p => `
            <li class="profile-item">
              <div class="profile-name">${p.name}</div>
              <div>
                <span class="profile-code">${p.code}</span>
                ${p.description ? `<span style="color: #666; font-size: 14px;">${p.description}</span>` : ''}
              </div>
              <div class="profile-services">
                <span class="services-badge">${p.services?.obligatorios || 0} Obligatorios</span>
                <span class="services-badge">${p.services?.opcionales || 0} Opcionales</span>
              </div>
            </li>
          `).join('')}
        </ul>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <strong>Total de servicios:</strong> ${totalObligatorios} obligatorios + ${totalOpcionales} opcionales = <strong>${serviciosTotales}</strong>
        </div>
      </div>

      <div class="costo-box">
        <div class="costo-label">💰 ESTIMACIÓN DE INVERSIÓN MENSUAL</div>
        <div class="costo-value">$${costoEstimado.toLocaleString('es-MX')}</div>
        <div class="costo-rango">Rango sugerido: $${rangoMin.toLocaleString('es-MX')} - $${rangoMax.toLocaleString('es-MX')}</div>
        <div style="font-size: 12px; opacity: 0.7; margin-top: 10px;">
          Basado en ${horasEstimadas} horas/mes × $310/hora promedio
        </div>
      </div>

      <div class="section">
        <div class="section-title">✅ PRÓXIMOS PASOS RECOMENDADOS</div>
        <ol style="padding-left: 20px; line-height: 2;">
          <li><strong>Contactar al prospecto</strong> en las próximas 24 horas</li>
          <li><strong>Validar información</strong> de volumetría (cuentas y operaciones)</li>
          <li><strong>Revisar servicios</strong> específicos según perfiles identificados</li>
          <li><strong>Preparar cotización formal</strong> usando la matriz de costeo</li>
          <li><strong>Agendar reunión</strong> de presentación de propuesta</li>
        </ol>
      </div>

    </div>

    <div class="footer">
      <a href="mailto:${contacto.email}" class="btn-action">📧 Contactar Cliente</a>
      <a href="tel:${contacto.telefono}" class="btn-action">📞 Llamar Ahora</a>
      <p class="footer-text">MC&DJ Consultores Profesionales</p>
      <p class="footer-text">Sistema de Gestión de Prospectos v2.0</p>
      <p class="footer-text" style="font-size: 12px; opacity: 0.6;">
        Este email fue generado automáticamente desde app.mcydj.mx
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Handler principal de la API
 */
export default async function handler(req, res) {
  // CORS headers para permitir peticiones desde el frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = req.body;
    
    // Validar datos mínimos
    if (!data.respuestas || !data.perfiles) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Generar contenido del email
    const htmlContent = generarEmailHTML(data);
    const contacto = data.respuestas.datosContacto || {};

    // Enviar email con Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'MC&DJ <noreply@mcydj.mx>',
      to: [process.env.EMAIL_TO || 'consultorias_integrales@hotmail.com'],
      subject: `🎯 Nuevo Prospecto: ${contacto.nombre || 'Sin nombre'} - ${data.complejidad?.nivelReal || 'N/A'}`,
      html: htmlContent,
      // Adjuntar JSON
      attachments: [
        {
          filename: `prospecto-${contacto.nombre?.replace(/\s+/g, '-')}-${Date.now()}.json`,
          content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
        }
      ]
    });

    // Log para analytics
    console.log('Email enviado exitosamente:', {
      id: emailResult.id,
      cliente: contacto.nombre,
      email: contacto.email,
      nivel: data.complejidad?.nivelReal,
      horas: data.complejidad?.horasEstimadas,
      perfiles: data.perfiles.length,
      fecha: data.fecha
    });

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Cuestionario procesado y email enviado',
      emailId: emailResult.id,
      data: {
        cliente: contacto.nombre,
        nivel: data.complejidad?.nivelReal,
        horasEstimadas: data.complejidad?.horasEstimadas,
        serviciosTotales: data.serviciosTotales
      }
    });

  } catch (error) {
    console.error('Error procesando cuestionario:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
```

---

## ================================
## ARCHIVO 2: public/index.html
## ================================

**Ubicación:** `public/index.html`  
**Descripción:** Cuestionario HTML completo con cálculo de complejidad

**NOTA:** Este archivo es muy largo (>3000 líneas). 
Ya lo tienes en: `public/index.html` de la carpeta.

Es el archivo `cuestionario_cliente_produccion_ACTUALIZADO.html` que ya te entregué.

**NO necesitas copiarlo manualmente** - Ya está en su lugar correcto.

---

## ================================
## ARCHIVO 3: package.json
## ================================

**Ubicación:** `package.json` (raíz del proyecto)  
**Descripción:** Dependencias y configuración del proyecto

```json
{
  "name": "mcydj-cuestionario-v2",
  "version": "2.0.0",
  "description": "Sistema de cuestionario con análisis de complejidad operativa - MC&DJ",
  "type": "module",
  "scripts": {
    "dev": "vercel dev",
    "deploy": "vercel --prod"
  },
  "dependencies": {
    "resend": "^3.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## ================================
## ARCHIVO 4: vercel.json
## ================================

**Ubicación:** `vercel.json` (raíz del proyecto)  
**Descripción:** Configuración de Vercel

```json
{
  "version": 2,
  "name": "mcydj-cuestionario",
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

---

## ================================
## ARCHIVO 5: .env.example
## ================================

**Ubicación:** `.env.example` (raíz del proyecto)  
**Descripción:** Template de variables de entorno

```env
# CONFIGURACIÓN DE RESEND
# Obtén tu API Key en: https://resend.com/api-keys

RESEND_API_KEY=re_123456789_TuAPIKeyAqui

# Email de destino (quien recibe los prospectos)
EMAIL_TO=consultorias_integrales@hotmail.com

# Email remitente (debe estar verificado en Resend)
# Formato: "Nombre <email@dominio.com>"
# IMPORTANTE: El dominio debe estar verificado en Resend
EMAIL_FROM=MC&DJ Cuestionario <noreply@mcydj.mx>

# ============================================
# INSTRUCCIONES DE CONFIGURACIÓN
# ============================================
#
# 1. Crea cuenta en Resend: https://resend.com/signup
#
# 2. Verifica tu dominio:
#    - Ve a: https://resend.com/domains
#    - Agrega tu dominio (mcydj.mx)
#    - Configura registros DNS (MX, TXT, CNAME)
#    - Espera verificación (~5 minutos)
#
# 3. Genera API Key:
#    - Ve a: https://resend.com/api-keys
#    - Click "Create API Key"
#    - Nombre: "MC&DJ Cuestionario"
#    - Permission: "Sending access"
#    - Copia la key (empieza con "re_")
#
# 4. Configura en Vercel:
#    - Ve a tu proyecto > Settings > Environment Variables
#    - Agrega cada variable de arriba
#    - Marca: Production y Preview
#
# 5. Si NO tienes dominio propio aún:
#    - Usa: onboarding@resend.dev (solo para testing)
#    - Límite: 100 emails/día
#    - Para producción: DEBES verificar tu dominio
```

---

## ================================
## ARCHIVO 6: .gitignore
## ================================

**Ubicación:** `.gitignore` (raíz del proyecto)  
**Descripción:** Archivos que Git debe ignorar

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment variables
.env
.env.local
.env.production
.env.*.local

# Vercel
.vercel

# OS files
.DS_Store
Thumbs.db
*.swp
*.swo

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# IDE
.vscode/
.idea/
*.sublime-*
```

---

## ================================
## RESUMEN DE ARCHIVOS
## ================================

✅ **ARCHIVO 1:** `api/send-questionnaire.js` (API con Resend)  
✅ **ARCHIVO 2:** `public/index.html` (Cuestionario - ya incluido)  
✅ **ARCHIVO 3:** `package.json` (Dependencias)  
✅ **ARCHIVO 4:** `vercel.json` (Config Vercel)  
✅ **ARCHIVO 5:** `.env.example` (Template variables)  
✅ **ARCHIVO 6:** `.gitignore` (Archivos a ignorar)  

---

## 🎯 PRÓXIMO PASO

**Lee ahora:** `GUIA_DESPLIEGUE.md`

Ahí está el paso a paso completo para desplegar estos archivos.

---

**MC&DJ Consultores Profesionales**  
**v2.0 - Todos los Códigos Completos**
