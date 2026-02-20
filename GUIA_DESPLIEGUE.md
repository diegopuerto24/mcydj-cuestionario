# 🚀 GUÍA DE DESPLIEGUE COMPLETA
## MC&DJ - Sistema v2.0 con Resend

**Tu configuración:**
- ✅ Vercel
- ✅ GitHub  
- ✅ Resend (email)
- ⚠️ Node.js (lo instalaremos)

**Tiempo total:** 45-60 minutos  
**Dificultad:** Media

---

## 📋 TABLA DE CONTENIDOS

1. [Instalar Node.js](#paso-1-instalar-nodejs-10-min)
2. [Configurar Resend](#paso-2-configurar-resend-15-min)
3. [Subir a GitHub](#paso-3-subir-a-github-10-min)
4. [Desplegar en Vercel](#paso-4-desplegar-en-vercel-15-min)
5. [Verificar funcionamiento](#paso-5-verificar-5-min)
6. [Troubleshooting](#troubleshooting)

---

## 📦 ARCHIVOS QUE TIENES

```
mcydj-deploy-final/
├── api/
│   └── send-questionnaire.js    ← API con Resend
├── public/
│   └── index.html                ← Cuestionario actualizado
├── package.json                  ← Dependencias
├── vercel.json                   ← Config Vercel
├── .env.example                  ← Template variables
├── .gitignore                    ← Archivos a ignorar
└── GUIA_DESPLIEGUE.md           ← Este archivo
```

---

## 🎯 PASO 1: INSTALAR NODE.JS (10 min)

### 1.1 Descargar Node.js

**Ve a:** https://nodejs.org

**Descarga:** Versión LTS (Long Term Support)
- Windows: `node-vXX.X.X-x64.msi`
- Mac: `node-vXX.X.X.pkg`

### 1.2 Instalar

**Windows:**
1. Doble click en el `.msi`
2. Click "Next" en todo
3. **IMPORTANTE:** Marca la opción "Automatically install necessary tools"
4. Click "Install"
5. Espera a que termine (~5 min)
6. Click "Finish"

**Mac:**
1. Doble click en el `.pkg`
2. Sigue las instrucciones
3. Ingresa tu contraseña de admin si pide

### 1.3 Verificar Instalación

Abre una **terminal NUEVA**:

**Windows:**
- Presiona `Windows + R`
- Escribe `cmd`
- Enter

**Mac:**
- Presiona `Cmd + Espacio`
- Escribe `Terminal`
- Enter

**Ejecuta:**
```bash
node -v
```

**Resultado esperado:**
```
v18.20.0
```
(o similar, v18+ está bien)

**Ejecuta:**
```bash
npm -v
```

**Resultado esperado:**
```
10.8.0
```
(o similar)

✅ **Si ambos comandos funcionan → Continúa**  
❌ **Si no funcionan → Cierra y abre la terminal de nuevo**

---

## 🎯 PASO 2: CONFIGURAR RESEND (15 min)

### 2.1 Crear Cuenta en Resend

1. **Ve a:** https://resend.com/signup
2. **Regístrate con:**
   - Email corporativo (recomendado)
   - O GitHub
3. **Verifica tu email**

### 2.2 Obtener API Key

1. **Ve a:** https://resend.com/api-keys
2. **Click:** "Create API Key"
3. **Llena:**
   - Name: `MC&DJ Cuestionario`
   - Permission: `Sending access`
4. **Click:** "Add"
5. **COPIA LA KEY** (empieza con `re_`)
   - ⚠️ Solo la verás UNA VEZ
   - Pégala en un lugar seguro (Notepad, etc)

**Ejemplo de API Key:**
```
re_123abc456def_9XyZ7pQrStUvWx
```

### 2.3 Tu Dominio YA Está Verificado ✅

**¡Buenas noticias!** Tu dominio `mcydj.mx` ya está configurado en Resend.

Puedes usar directamente: **conecta@mcydj.mx**

**No necesitas hacer nada más de configuración de dominio.**

### 2.4 Guardar Configuración

Crea un archivo `.env` en la carpeta del proyecto:

```env
RESEND_API_KEY=re_tu_key_aqui
EMAIL_TO=consultorias_integrales@hotmail.com
EMAIL_FROM=MC&DJ Cuestionario <conecta@mcydj.mx>
```

**Guardar como:** `.env` (sin extensión adicional)

---

## 🎯 PASO 3: SUBIR A GITHUB (10 min)

### 3.1 Instalar Git (si no lo tienes)

**Verifica si ya lo tienes:**
```bash
git --version
```

**Si no está instalado:**
- **Windows:** https://git-scm.com/download/win
- **Mac:** Ejecuta `git --version` y te pedirá instalarlo

### 3.2 Crear Repositorio en GitHub

1. **Ve a:** https://github.com/new
2. **Llena:**
   - Repository name: `mcydj-cuestionario`
   - Description: `Sistema de cuestionario MC&DJ v2.0`
   - **Marca:** Private (recomendado)
3. **Click:** "Create repository"
4. **DEJA LA PÁGINA ABIERTA** (necesitarás las instrucciones)

### 3.3 Inicializar Git Localmente

**Abre terminal** en la carpeta del proyecto:

**Windows:**
- Abre la carpeta `mcydj-deploy-final` en Explorer
- En la barra de dirección escribe `cmd` y Enter

**Mac:**
- Abre Terminal
- `cd` a la carpeta del proyecto

**Ejecuta estos comandos UNO POR UNO:**

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer primer commit
git commit -m "Initial commit: Sistema v2.0 con volumetría"

# Cambiar branch a main
git branch -M main

# Conectar con GitHub (CAMBIA la URL por la tuya)
git remote add origin https://github.com/TU-USUARIO/mcydj-cuestionario.git

# Subir a GitHub
git push -u origin main
```

**⚠️ IMPORTANTE:** 
- En el comando `git remote add origin...` usa TU URL
- La encuentras en la página que dejaste abierta en paso 3.2

**Si pide usuario/contraseña:**
- Usuario: tu usuario de GitHub
- Contraseña: usa un **Personal Access Token**
  - Créalo en: https://github.com/settings/tokens
  - Scopes: marca "repo"

✅ **Resultado esperado:**
```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Writing objects: 100% (10/10), done.
```

### 3.4 Verificar en GitHub

1. **Refresca la página** de tu repositorio
2. **Debes ver** todos los archivos
3. **Verifica** que `.env` NO esté visible (debe estar ignorado)

---

## 🎯 PASO 4: DESPLEGAR EN VERCEL (15 min)

### 4.1 Conectar GitHub con Vercel

1. **Ve a:** https://vercel.com/new
2. **Selecciona:** "Import Git Repository"
3. **Si es tu primera vez:**
   - Click "Add GitHub Account"
   - Autoriza Vercel
4. **Selecciona:** `mcydj-cuestionario`
5. **Click:** "Import"

### 4.2 Configurar Proyecto

**Pantalla de configuración:**

```
Project Name: mcydj-cuestionario
Framework Preset: Other
Root Directory: ./
Build Command: (dejar vacío)
Output Directory: (dejar vacío)
Install Command: npm install
```

**⚠️ NO HAGAS DEPLOY TODAVÍA**

### 4.3 Configurar Variables de Entorno

**Antes de Deploy:**

1. **Expande:** "Environment Variables"
2. **Agrega cada una:**

| Name | Value | Environment |
|------|-------|-------------|
| `RESEND_API_KEY` | `re_tu_key_aqui` | ✓ Production ✓ Preview |
| `EMAIL_TO` | `consultorias_integrales@hotmail.com` | ✓ Production ✓ Preview |
| `EMAIL_FROM` | `MC&DJ Cuestionario <conecta@mcydj.mx>` | ✓ Production ✓ Preview |

**Para agregar cada variable:**
- Escribe el Name
- Escribe el Value
- Marca ambos checkboxes (Production y Preview)
- Click "Add"

✅ **Debes tener 3 variables configuradas**

### 4.4 Deploy

1. **Click:** "Deploy"
2. **Espera** 2-3 minutos
3. **Verás:**
   ```
   ✓ Building...
   ✓ Deploying...
   ✓ Ready!
   ```

4. **Click:** "Visit" o copia la URL
   - Será algo como: `https://mcydj-cuestionario-abc123.vercel.app`

---

## 🎯 PASO 5: VERIFICAR FUNCIONAMIENTO (5 min)

### 5.1 Probar Cuestionario

1. **Abre** tu URL de Vercel
2. **Debes ver** el cuestionario
3. **Llena** con datos de prueba:

```
Nombre: Cliente Test
Email: test@test.com
Teléfono: 9999999999
Tipo: Persona Moral
Facturación: Mediano
Volumen: Alto  
Empleados: 6-15
Cuentas: 4
Ops sin CFDI: 35
Actividad: Manufactura
```

4. **Click:** Enviar

### 5.2 Verificar Email

**Revisa la bandeja de:** `consultorias_integrales@hotmail.com`

**Debe llegar en <10 segundos:**
- ✅ Subject: "🎯 Nuevo Prospecto: Cliente Test - MEDIANO"
- ✅ HTML bien formateado
- ✅ Análisis de complejidad visible
- ✅ Costo calculado correcto
- ✅ JSON adjunto

**Si NO llega:**
1. Revisa SPAM
2. Ve al [Troubleshooting](#troubleshooting)

### 5.3 Verificar Logs en Vercel

1. **Ve a:** Vercel Dashboard
2. **Click:** Tu proyecto
3. **Click:** "Deployments"
4. **Click:** El deployment más reciente
5. **Click:** "Functions"
6. **Click:** `/api/send-questionnaire`
7. **Debes ver:**
   ```
   Email enviado exitosamente: {
     id: "xxx",
     cliente: "Cliente Test",
     ...
   }
   ```

### 5.4 Verificar en Resend Dashboard

1. **Ve a:** https://resend.com/emails
2. **Debes ver** tu email enviado
3. **Status:** "Delivered"
4. **Click** en el email para ver detalles

✅ **TODO FUNCIONA** → ¡Felicidades! Pasa a [Siguientes Pasos](#siguientes-pasos)

---

## 🆘 TROUBLESHOOTING

### ❌ Error: "Cannot find module 'resend'"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
cd mcydj-deploy-final
npm install
git add .
git commit -m "Add dependencies"
git push
```

Vercel redesplegará automáticamente.

---

### ❌ Email no llega

**Diagnóstico:**

1. **Revisa logs en Vercel:**
   - Deployments > [tu deploy] > Functions > send-questionnaire
   - Busca errores

2. **Verifica en Resend:**
   - Ve a https://resend.com/emails
   - ¿Aparece el email?
   - ¿Qué status tiene?

**Soluciones según error:**

**Error: "API key is invalid"**
```
Solución:
1. Genera nueva API key en Resend
2. Ve a Vercel > Settings > Environment Variables
3. Actualiza RESEND_API_KEY
4. Redeploy: Deployments > [...] > Redeploy
```

**Error: "from address not verified"**
```
Esto NO debería pasar porque tu dominio ya está verificado.

Si ves este error:
1. Verifica que EMAIL_FROM sea: conecta@mcydj.mx
2. Verifica en Resend Dashboard que mcydj.mx esté "Verified"
3. Si no está verificado, contacta a tu administrador de Resend
```

**Email en "Bounced" o "Failed"**
```
Solución:
1. Verifica que EMAIL_TO sea correcto
2. Prueba con otro email
3. Revisa en Resend > Emails > [tu email] > Details
```

---

### ❌ Error: "Build failed"

**Solución:**
```bash
# Verifica que package.json existe
ls package.json

# Reinstala dependencias
rm -rf node_modules
npm install

# Commit y push
git add .
git commit -m "Fix dependencies"
git push
```

---

### ❌ Cuestionario no se carga

**Diagnóstico:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. ¿Hay errores?

**Solución:**
```
Si dice "Syntax Error":
1. Revisa que public/index.html esté completo
2. No debe tener errores de HTML

Si dice "404 Not Found":
1. Ve a Vercel > Settings > Functions
2. Verifica que /api/send-questionnaire aparezca
```

---

### ❌ Error: "CORS policy blocked"

**Solución:**

El archivo `send-questionnaire.js` YA incluye headers CORS.

Si aún tienes problemas:
1. Verifica que la URL en el cuestionario sea correcta
2. Debe ser: `/api/send-questionnaire` (relativo)
3. NO debe ser: `https://otro-dominio.com/...` (absoluto)

---

## ✅ SIGUIENTES PASOS

### 1. Configura Dominio Personalizado

**En Vercel:**
1. Settings > Domains
2. Add: `app.mcydj.mx`
3. Sigue instrucciones DNS
4. Espera propagación (~10 min)

### 2. Capacita al Equipo

**Comparte con el equipo:**
- ✅ URL del cuestionario: `https://tu-app.vercel.app`
- ✅ `GUIA_IMPLEMENTACION_EQUIPO.md`
- ✅ `Calculadora_Costeo_MCYDJ_v2.xlsx`

### 3. Monitorea el Sistema

**Vercel Dashboard:**
```
- Deployments → Ver deploys
- Functions → Ver logs de API
- Analytics → Ver uso
```

**Resend Dashboard:**
```
- Emails → Ver envíos
- Analytics → Métricas de entrega
- Logs → Debugging
```

### 4. Plan de Mantenimiento

**Semanalmente:**
- Revisa Resend Dashboard
- Verifica tasa de entrega
- Revisa logs de errores

**Mensualmente:**
- Actualiza dependencias: `npm update`
- Revisa uso de Resend (límite 3,000/mes gratis)

---

## 📊 CHECKLIST FINAL

- [ ] Node.js instalado y verificado
- [ ] Cuenta de Resend creada
- [ ] API Key de Resend obtenida
- [ ] Dominio verificado (o usando onboarding@resend.dev)
- [ ] Repositorio GitHub creado
- [ ] Código subido a GitHub
- [ ] Proyecto conectado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso
- [ ] Cuestionario carga correctamente
- [ ] Email de prueba enviado
- [ ] Email de prueba recibido
- [ ] JSON adjunto presente
- [ ] Sin errores en logs de Vercel
- [ ] Sin errores en logs de Resend

---

## 📞 SOPORTE ADICIONAL

### Documentación Completa

- **Resend Docs:** https://resend.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Esta guía:** Para referencia rápida

### Archivos de Referencia

- `PLAN_DESPLIEGUE_TECNICO.md` → Troubleshooting avanzado
- `GUIA_IMPLEMENTACION_EQUIPO.md` → Para el equipo comercial
- `MATRIZ_COSTEO_COMPLETA.md` → Referencia de costeo

---

## 🎉 ¡FELICIDADES!

Has desplegado exitosamente el sistema MC&DJ v2.0

**Tu sistema ahora:**
- ✅ Captura prospectos 24/7
- ✅ Calcula complejidad automáticamente
- ✅ Envía emails profesionales
- ✅ Genera alertas inteligentes
- ✅ Adjunta JSON con toda la data

**Comparte tu URL y empieza a recibir leads:**
```
https://tu-app.vercel.app
```

---

**MC&DJ Consultores Profesionales**  
**v2.0 - Sistema de Volumetría Operativa**  
**Febrero 2026**
