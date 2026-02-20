# ⚡ CONFIGURACIÓN RÁPIDA
## MC&DJ - Email Verificado: conecta@mcydj.mx

---

## ✅ TU CONFIGURACIÓN CONFIRMADA

- ✅ **Email de Resend:** conecta@mcydj.mx (YA VERIFICADO)
- ✅ **Dominio:** mcydj.mx (YA CONFIGURADO)
- ✅ **Vercel:** Listo para usar
- ✅ **GitHub:** Listo para usar

---

## 🎯 LO QUE NECESITAS HACER

### **Solo 2 cosas:**

1. ✅ **Obtener API Key de Resend** (2 minutos)
2. ✅ **Configurar en Vercel** (5 minutos)

**Eso es todo.** El dominio ya está listo.

---

## 🔑 PASO 1: OBTENER API KEY

### 1. Ve a Resend
```
https://resend.com/api-keys
```

### 2. Login
- Usa la cuenta que tiene `conecta@mcydj.mx` configurado

### 3. Crear API Key
- Click: **"Create API Key"**
- Name: `MC&DJ Cuestionario`
- Permission: **Sending access**
- Click: **"Add"**

### 4. Copiar Key
```
re_xxxxxxxxxxxxxxxxxxxx
```
**⚠️ CÓPIALA AHORA - Solo la verás una vez**

Pégala en un lugar seguro (Notepad, etc.)

---

## ⚙️ PASO 2: CONFIGURAR EN VERCEL

### Variables que necesitas configurar:

```env
RESEND_API_KEY=re_tu_key_de_arriba
EMAIL_TO=consultorias_integrales@hotmail.com
EMAIL_FROM=MC&DJ Cuestionario <conecta@mcydj.mx>
```

### Cómo configurarlas:

1. **Ve a Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **Selecciona tu proyecto:** `mcydj-cuestionario`

3. **Settings → Environment Variables**

4. **Agrega cada variable:**

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_tu_key_aqui` |
| `EMAIL_TO` | `consultorias_integrales@hotmail.com` |
| `EMAIL_FROM` | `MC&DJ Cuestionario <conecta@mcydj.mx>` |

**Para cada variable:**
- Escribe el Key
- Escribe el Value
- ✓ Production
- ✓ Preview
- Click "Add"

---

## ✅ VERIFICACIÓN

### Después de configurar:

1. **Redeploy en Vercel:**
   - Deployments → [...] → Redeploy

2. **Prueba el cuestionario:**
   - Abre tu URL
   - Llena el formulario
   - Envía

3. **Revisa email:**
   - Debe llegar a: `consultorias_integrales@hotmail.com`
   - En <10 segundos
   - Con análisis completo

4. **Verifica en Resend:**
   - Ve a: https://resend.com/emails
   - Debe aparecer el email
   - Status: "Delivered"

---

## 🎯 VENTAJAS DE USAR CONECTA@MCYDJ.MX

✅ **Ya verificado** - No necesitas configurar DNS  
✅ **Profesional** - Email con tu dominio  
✅ **Confiable** - Alta deliverability  
✅ **Sin límites** - Ilimitados recipients/día  
✅ **Gratis** - Hasta 3,000 emails/mes  

---

## 📊 COMPARACIÓN

### Antes (sin dominio):
```
FROM: onboarding@resend.dev
Límite: 100 emails/día
Profesionalismo: ⭐⭐
```

### Ahora (con tu dominio):
```
FROM: conecta@mcydj.mx
Límite: Sin límite de recipients
Profesionalismo: ⭐⭐⭐⭐⭐
```

---

## 🆘 SI ALGO FALLA

### Error: "API key is invalid"

**Solución:**
1. Genera nueva API key en Resend
2. Actualiza en Vercel
3. Redeploy

---

### Error: "from address not verified"

**Esto NO debería pasar** porque `conecta@mcydj.mx` ya está verificado.

**Si pasa:**
1. Verifica que escribiste bien: `conecta@mcydj.mx`
2. Ve a Resend Dashboard
3. Verifica que `mcydj.mx` aparezca como "Verified"

---

### Email no llega

**Checklist:**
- [ ] API Key correcta en Vercel
- [ ] EMAIL_FROM = `conecta@mcydj.mx`
- [ ] EMAIL_TO = `consultorias_integrales@hotmail.com`
- [ ] Redeploy después de cambios
- [ ] Revisar carpeta SPAM

---

## 📧 EJEMPLO DE EMAIL QUE RECIBIRÁS

```
FROM: MC&DJ Cuestionario <conecta@mcydj.mx>
TO: consultorias_integrales@hotmail.com
SUBJECT: 🎯 Nuevo Prospecto: [Nombre] - [Nivel]

[Email HTML profesional con:]
- Datos del prospecto
- Análisis de complejidad
- Horas estimadas
- Costo mensual
- Alerta de complejidad (🟢🟡🔴)
- JSON adjunto
```

---

## 🎉 RESUMEN

Tu configuración es **MÁS SIMPLE** que la mayoría porque:

✅ Dominio ya verificado  
✅ Email ya configurado  
✅ DNS ya configurado  

Solo necesitas:
1. API Key de Resend (2 min)
2. Configurar en Vercel (5 min)

**Total: 7 minutos**

---

## 📞 SIGUIENTE PASO

**Ahora sigue la guía completa:**  
`GUIA_DESPLIEGUE.md`

**Pero puedes SALTAR:**
- ❌ Paso 2.3 (Verificar dominio) → Ya está verificado
- ❌ Configuración de DNS → Ya está hecha

**Tu proceso:**
1. ✅ Paso 1: Instalar Node.js (si no lo tienes)
2. ✅ Paso 2.1-2.2: Login y API Key de Resend
3. ✅ **SALTA 2.3** (tu dominio ya está)
4. ✅ Paso 2.4: Guardar configuración
5. ✅ Paso 3: Subir a GitHub
6. ✅ Paso 4: Desplegar en Vercel
7. ✅ Paso 5: Verificar

---

**¡Tu configuración de email está lista! 🎉**

Solo obtén tu API Key y configúrala en Vercel.

---

**MC&DJ Consultores Profesionales**  
**Email Verificado: conecta@mcydj.mx** ✅
