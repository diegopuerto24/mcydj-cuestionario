/**
 * API Endpoint: /api/send-questionnaire
 * MC&DJ Consultores Profesionales
 * 
 * Versión 3.0 - Con detalle completo de servicios por perfil
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * CATÁLOGO COMPLETO DE SERVICIOS
 */
const CATALOGO_SERVICIOS = {
  // SERVICIOS OBLIGATORIOS GENERALES
  'CON-GEN-001': {
    codigo: 'CON-GEN-001',
    nombre: 'Registro Contable Mensual',
    descripcion: 'Captura y clasificación de todas las operaciones del mes',
    categoria: 'Contabilidad General',
    periodicidad: 'Mensual'
  },
  'CON-GEN-002': {
    codigo: 'CON-GEN-002',
    nombre: 'Conciliaciones Bancarias',
    descripcion: 'Conciliación de cuentas bancarias según volumen de operaciones',
    categoria: 'Contabilidad General',
    periodicidad: 'Mensual'
  },
  'CON-GEN-003': {
    codigo: 'CON-GEN-003',
    nombre: 'Estados Financieros Básicos',
    descripcion: 'Balance General y Estado de Resultados',
    categoria: 'Contabilidad General',
    periodicidad: 'Mensual'
  },
  'FIS-DEC-001': {
    codigo: 'FIS-DEC-001',
    nombre: 'Declaración Mensual ISR',
    descripcion: 'Cálculo y presentación del Impuesto Sobre la Renta mensual',
    categoria: 'Declaraciones Fiscales',
    periodicidad: 'Mensual'
  },
  'FIS-DEC-002': {
    codigo: 'FIS-DEC-002',
    nombre: 'Declaración Mensual IVA',
    descripcion: 'Cálculo y presentación del IVA trasladado y acreditable',
    categoria: 'Declaraciones Fiscales',
    periodicidad: 'Mensual'
  },
  'FIS-DEC-003': {
    codigo: 'FIS-DEC-003',
    nombre: 'DIOT (Declaración Informativa)',
    descripcion: 'Declaración Informativa de Operaciones con Terceros',
    categoria: 'Declaraciones Fiscales',
    periodicidad: 'Mensual'
  },
  'FIS-CUM-001': {
    codigo: 'FIS-CUM-001',
    nombre: 'Revisión de Cumplimiento Mensual',
    descripcion: 'Verificación de obligaciones fiscales cumplidas',
    categoria: 'Cumplimiento Fiscal',
    periodicidad: 'Mensual'
  },
  'ADM-GES-001': {
    codigo: 'ADM-GES-001',
    nombre: 'Gestión Documental Básica',
    descripcion: 'Archivo y organización de documentación soporte',
    categoria: 'Administración',
    periodicidad: 'Mensual'
  },
  
  // SERVICIOS ESPECÍFICOS POR ACTIVIDAD
  'CON-INV-001': {
    codigo: 'CON-INV-001',
    nombre: 'Control de Inventarios',
    descripcion: 'Registro y valuación de inventarios (PEPS/Promedio)',
    categoria: 'Contabilidad Especializada',
    periodicidad: 'Mensual'
  },
  'CON-ACT-001': {
    codigo: 'CON-ACT-001',
    nombre: 'Control de Activos Fijos',
    descripcion: 'Registro de activos fijos y cálculo de depreciaciones',
    categoria: 'Contabilidad Especializada',
    periodicidad: 'Mensual'
  },
  'FIS-NOM-001': {
    codigo: 'FIS-NOM-001',
    nombre: 'Procesamiento de Nómina',
    descripcion: 'Cálculo de nómina, IMSS, retenciones y entero',
    categoria: 'Nómina y RH',
    periodicidad: 'Semanal/Quincenal'
  },
  'FIS-NOM-002': {
    codigo: 'FIS-NOM-002',
    nombre: 'Declaraciones de Nómina',
    descripcion: 'Entero IMSS, retenciones ISR, declaraciones informativas',
    categoria: 'Nómina y RH',
    periodicidad: 'Mensual/Bimestral'
  },
  'CON-GEN-010': {
    codigo: 'CON-GEN-010',
    nombre: 'Clasificación Operaciones Sin CFDI',
    descripcion: 'Procesamiento de operaciones bancarias sin comprobante fiscal',
    categoria: 'Contabilidad General',
    periodicidad: 'Mensual'
  },
  
  // SERVICIOS OPCIONALES
  'FIS-PLA-001': {
    codigo: 'FIS-PLA-001',
    nombre: 'Planeación Fiscal Básica',
    descripcion: 'Estrategias de optimización fiscal y aprovechamiento de deducciones',
    categoria: 'Planeación Fiscal',
    periodicidad: 'Trimestral'
  },
  'FIS-PLA-002': {
    codigo: 'FIS-PLA-002',
    nombre: 'Proyecciones Fiscales',
    descripcion: 'Estimación de impuestos anuales y provisiones',
    categoria: 'Planeación Fiscal',
    periodicidad: 'Trimestral'
  },
  'CON-FIN-001': {
    codigo: 'CON-FIN-001',
    nombre: 'Análisis Financiero Básico',
    descripcion: 'Indicadores financieros y razones de liquidez',
    categoria: 'Análisis Financiero',
    periodicidad: 'Mensual'
  },
  'CON-FIN-002': {
    codigo: 'CON-FIN-002',
    nombre: 'Flujo de Efectivo',
    descripcion: 'Estado de flujo de efectivo y proyecciones',
    categoria: 'Análisis Financiero',
    periodicidad: 'Mensual'
  },
  'FIS-REV-001': {
    codigo: 'FIS-REV-001',
    nombre: 'Revisión de Deducibles',
    descripcion: 'Análisis de gastos deducibles vs no deducibles',
    categoria: 'Cumplimiento Fiscal',
    periodicidad: 'Mensual'
  },
  'ADM-GES-002': {
    codigo: 'ADM-GES-002',
    nombre: 'Gestión de Cobranza',
    descripcion: 'Seguimiento de cuentas por cobrar y antigüedad',
    categoria: 'Administración',
    periodicidad: 'Mensual'
  },
  'ADM-GES-003': {
    codigo: 'ADM-GES-003',
    nombre: 'Control Presupuestal',
    descripcion: 'Comparativo presupuesto vs real y variaciones',
    categoria: 'Administración',
    periodicidad: 'Mensual'
  }
};

/**
 * DEFINICIÓN DE PERFILES CON SERVICIOS
 */
const PERFILES_SERVICIOS = {
  'PF-01-PROF': {
    nombre: 'Profesionista Independiente',
    codigo: 'PF-01-PROF',
    descripcion: 'Persona Física con actividad empresarial y profesional',
    obligatorios: [
      'CON-GEN-001', // Registro Contable
      'CON-GEN-002', // Conciliaciones
      'CON-GEN-003', // Estados Financieros
      'FIS-DEC-001', // ISR Mensual
      'FIS-DEC-002', // IVA Mensual
      'FIS-DEC-003', // DIOT
      'FIS-CUM-001', // Cumplimiento
      'ADM-GES-001', // Gestión Documental
      'FIS-REV-001', // Revisión Deducibles
      'CON-FIN-001'  // Análisis Financiero
    ],
    opcionales: [
      'FIS-PLA-001', // Planeación Fiscal
      'FIS-PLA-002', // Proyecciones
      'CON-FIN-002', // Flujo de Efectivo
      'ADM-GES-003'  // Control Presupuestal
    ]
  },
  'PM-01-SINEMP': {
    nombre: 'Persona Moral sin Empleados',
    codigo: 'PM-01-SINEMP',
    descripcion: 'Empresa constituida sin empleados formales',
    obligatorios: [
      'CON-GEN-001',
      'CON-GEN-002',
      'CON-GEN-003',
      'FIS-DEC-001',
      'FIS-DEC-002',
      'FIS-DEC-003',
      'FIS-CUM-001',
      'ADM-GES-001'
    ],
    opcionales: [
      'FIS-PLA-001',
      'FIS-PLA-002',
      'CON-FIN-001',
      'CON-FIN-002',
      'ADM-GES-002'
    ]
  },
  'PM-02-EMP-PEQ': {
    nombre: 'Persona Moral con Empleados (1-15)',
    codigo: 'PM-02-EMP-PEQ',
    descripcion: 'Empresa con nómina pequeña',
    obligatorios: [
      'CON-GEN-001',
      'CON-GEN-002',
      'CON-GEN-003',
      'FIS-DEC-001',
      'FIS-DEC-002',
      'FIS-DEC-003',
      'FIS-CUM-001',
      'ADM-GES-001',
      'FIS-NOM-001', // Nómina
      'FIS-NOM-002'  // Declaraciones Nómina
    ],
    opcionales: [
      'FIS-PLA-001',
      'CON-FIN-001',
      'CON-FIN-002',
      'ADM-GES-002',
      'ADM-GES-003'
    ]
  },
  'PM-03-EMP-MED': {
    nombre: 'Persona Moral con Empleados (16-50)',
    codigo: 'PM-03-EMP-MED',
    descripcion: 'Empresa con nómina mediana',
    obligatorios: [
      'CON-GEN-001',
      'CON-GEN-002',
      'CON-GEN-003',
      'FIS-DEC-001',
      'FIS-DEC-002',
      'FIS-DEC-003',
      'FIS-CUM-001',
      'ADM-GES-001',
      'FIS-NOM-001',
      'FIS-NOM-002',
      'CON-FIN-001' // Obligatorio para este nivel
    ],
    opcionales: [
      'FIS-PLA-001',
      'FIS-PLA-002',
      'CON-FIN-002',
      'ADM-GES-002',
      'ADM-GES-003'
    ]
  },
  'ACT-01-COMER': {
    nombre: 'Comercio al Por Menor',
    codigo: 'ACT-01-COMER',
    descripcion: 'Actividad comercial con manejo de inventarios',
    obligatorios: [
      'CON-INV-001', // Control Inventarios
      'ADM-GES-002'  // Cobranza
    ],
    opcionales: [
      'CON-FIN-002' // Flujo de Efectivo
    ]
  },
  'ACT-02-SERV': {
    nombre: 'Prestación de Servicios',
    codigo: 'ACT-02-SERV',
    descripcion: 'Servicios profesionales o técnicos',
    obligatorios: [],
    opcionales: [
      'CON-FIN-001',
      'ADM-GES-002'
    ]
  },
  'ACT-03-MANUF': {
    nombre: 'Manufactura',
    codigo: 'ACT-03-MANUF',
    descripcion: 'Fabricación y transformación de productos',
    obligatorios: [
      'CON-INV-001', // Control Inventarios
      'CON-ACT-001'  // Activos Fijos
    ],
    opcionales: [
      'CON-FIN-001',
      'CON-FIN-002',
      'ADM-GES-003'
    ]
  },
  'ACT-05-REST': {
    nombre: 'Restaurante / Alimentos',
    codigo: 'ACT-05-REST',
    descripcion: 'Servicio de alimentos con propinas y efectivo',
    obligatorios: [
      'CON-INV-001',      // Inventarios de alimentos
      'CON-GEN-010'       // Ops sin CFDI (propinas, efectivo)
    ],
    opcionales: [
      'CON-FIN-002',
      'ADM-GES-002'
    ]
  },
  'ETA-01-START': {
    nombre: 'Startup / Inicio de Operaciones',
    codigo: 'ETA-01-START',
    descripcion: 'Empresa en fase inicial (menos de 1 año)',
    obligatorios: [
      'FIS-PLA-001',  // Planeación fundamental
      'CON-FIN-001',  // Análisis mensual
      'CON-FIN-002',  // Flujo de efectivo crítico
      'ADM-GES-001',  // Orden documental
      'FIS-REV-001'   // Optimización deducibles
    ],
    opcionales: [
      'FIS-PLA-002',
      'ADM-GES-003'
    ]
  },
  'ETA-02-CREC': {
    nombre: 'En Crecimiento',
    codigo: 'ETA-02-CREC',
    descripcion: 'Empresa en expansión activa',
    obligatorios: [
      'CON-FIN-001',  // Indicadores clave
      'CON-FIN-002'   // Proyecciones flujo
    ],
    opcionales: [
      'FIS-PLA-001',
      'FIS-PLA-002',
      'ADM-GES-003'
    ]
  },
  'ETA-03-CONS': {
    nombre: 'Consolidado',
    codigo: 'ETA-03-CONS',
    descripcion: 'Empresa madura y estable',
    obligatorios: [
      'FIS-PLA-001'  // Optimización fiscal
    ],
    opcionales: [
      'FIS-PLA-002',
      'CON-FIN-001',
      'ADM-GES-003'
    ]
  }
};

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
 * Obtener detalle completo de servicios por perfil
 */
function obtenerDetalleServicios(perfiles) {
  return perfiles.map(perfil => {
    const perfilInfo = PERFILES_SERVICIOS[perfil.code];
    if (!perfilInfo) return null;
    
    const serviciosObligatorios = perfilInfo.obligatorios.map(codigo => ({
      ...CATALOGO_SERVICIOS[codigo],
      tipo: 'Obligatorio'
    }));
    
    const serviciosOpcionales = perfilInfo.opcionales.map(codigo => ({
      ...CATALOGO_SERVICIOS[codigo],
      tipo: 'Opcional'
    }));
    
    return {
      perfil: perfil.name,
      codigo: perfil.code,
      descripcion: perfilInfo.descripcion,
      serviciosObligatorios,
      serviciosOpcionales,
      totales: {
        obligatorios: serviciosObligatorios.length,
        opcionales: serviciosOpcionales.length,
        total: serviciosObligatorios.length + serviciosOpcionales.length
      }
    };
  }).filter(Boolean);
}

/**
 * Genera tabla HTML de servicios por perfil
 */
function generarTablaServicios(detalleServicios) {
  return detalleServicios.map(perfil => `
    <div class="perfil-detalle">
      <h3 class="perfil-titulo">${perfil.perfil}</h3>
      <p class="perfil-descripcion">${perfil.descripcion}</p>
      <p class="perfil-codigo"><strong>Código:</strong> ${perfil.codigo}</p>
      
      <div class="servicios-seccion">
        <h4 class="servicios-subtitulo">✅ Servicios Obligatorios (${perfil.serviciosObligatorios.length})</h4>
        <table class="tabla-servicios">
          <thead>
            <tr>
              <th>Código</th>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Periodicidad</th>
            </tr>
          </thead>
          <tbody>
            ${perfil.serviciosObligatorios.map(s => `
              <tr>
                <td><code>${s.codigo}</code></td>
                <td><strong>${s.nombre}</strong></td>
                <td>${s.descripcion}</td>
                <td>${s.periodicidad}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      ${perfil.serviciosOpcionales.length > 0 ? `
      <div class="servicios-seccion">
        <h4 class="servicios-subtitulo">💡 Servicios Opcionales (${perfil.serviciosOpcionales.length})</h4>
        <table class="tabla-servicios">
          <thead>
            <tr>
              <th>Código</th>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Periodicidad</th>
            </tr>
          </thead>
          <tbody>
            ${perfil.serviciosOpcionales.map(s => `
              <tr>
                <td><code>${s.codigo}</code></td>
                <td><strong>${s.nombre}</strong></td>
                <td>${s.descripcion}</td>
                <td>${s.periodicidad}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}
    </div>
  `).join('');
}

/**
 * Genera el HTML del email con la información completa
 */
function generarEmailHTML(data) {
  const { respuestas, perfiles, complejidad, fecha, serviciosTotales } = data;
  const contacto = respuestas.datosContacto || {};
  
  // Obtener detalle completo de servicios
  const detalleServicios = obtenerDetalleServicios(perfiles);
  
  // Calcular totales
  let totalObligatorios = 0;
  let totalOpcionales = 0;
  detalleServicios.forEach(p => {
    totalObligatorios += p.totales.obligatorios;
    totalOpcionales += p.totales.opcionales;
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
      max-width: 900px;
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
    
    /* ESTILOS PARA TABLAS DE SERVICIOS */
    .perfil-detalle {
      background: #f9f9f9;
      padding: 20px;
      margin-bottom: 25px;
      border-radius: 8px;
      border-left: 4px solid #F65904;
    }
    .perfil-titulo {
      font-size: 20px;
      font-weight: 700;
      color: #16150E;
      margin: 0 0 10px 0;
    }
    .perfil-descripcion {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
    }
    .perfil-codigo {
      font-size: 13px;
      color: #666;
      margin: 5px 0 15px 0;
    }
    .servicios-seccion {
      margin: 20px 0;
    }
    .servicios-subtitulo {
      font-size: 16px;
      font-weight: 700;
      color: #16150E;
      margin-bottom: 10px;
    }
    .tabla-servicios {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 15px;
    }
    .tabla-servicios thead {
      background: #16150E;
      color: white;
    }
    .tabla-servicios th {
      padding: 12px 10px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .tabla-servicios td {
      padding: 12px 10px;
      border-bottom: 1px solid #e8e8e8;
      font-size: 13px;
    }
    .tabla-servicios tbody tr:hover {
      background: #f5f5f5;
    }
    .tabla-servicios code {
      background: #e8e8e8;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-family: 'Courier New', monospace;
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
        <div class="section-title">📋 CATÁLOGO COMPLETO DE SERVICIOS POR PERFIL</div>
        <p style="color: #666; margin-bottom: 20px;">
          <strong>Total de perfiles identificados:</strong> ${detalleServicios.length} | 
          <strong>Servicios obligatorios:</strong> ${totalObligatorios} | 
          <strong>Servicios opcionales:</strong> ${totalOpcionales} | 
          <strong>Total:</strong> ${totalObligatorios + totalOpcionales}
        </p>
        ${generarTablaServicios(detalleServicios)}
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
          <li><strong>Revisar catálogo de servicios adjunto</strong> y confirmar necesidades específicas</li>
          <li><strong>Preparar cotización formal</strong> usando la matriz de costeo</li>
          <li><strong>Agendar reunión</strong> de presentación de propuesta</li>
        </ol>
      </div>

    </div>

    <div class="footer">
      <a href="mailto:${contacto.email}" class="btn-action">📧 Contactar Cliente</a>
      <a href="tel:${contacto.telefono}" class="btn-action">📞 Llamar Ahora</a>
      <p class="footer-text">MC&DJ Consultores Profesionales</p>
      <p class="footer-text">Sistema de Gestión de Prospectos v3.0</p>
      <p class="footer-text" style="font-size: 12px; opacity: 0.6;">
        Email generado automáticamente | Ver JSON adjunto para datos completos
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
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = req.body;
    
    if (!data.respuestas || !data.perfiles) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Obtener detalle completo de servicios
    const detalleServicios = obtenerDetalleServicios(data.perfiles);
    
    // Agregar detalle al data object
    const dataCompleto = {
      ...data,
      detalleServicios
    };

    // Generar contenido del email
    const htmlContent = generarEmailHTML(dataCompleto);
    const contacto = data.respuestas.datosContacto || {};

    // Enviar email con Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'MC&DJ Cuestionario <conecta@mcydj.mx>',
      to: (process.env.EMAIL_TO || 'direcciongeneralcyeps@gmail.com,diego.puerto@live.com.mx').split(','),
      subject: `🎯 Nuevo Prospecto: ${contacto.nombre || 'Sin nombre'} - ${data.complejidad?.nivelReal || 'N/A'}`,
      html: htmlContent,
      attachments: [
        {
          filename: `prospecto-${contacto.nombre?.replace(/\s+/g, '-')}-${Date.now()}.json`,
          content: Buffer.from(JSON.stringify(dataCompleto, null, 2)).toString('base64'),
        }
      ]
    });

    console.log('Email enviado exitosamente:', {
      id: emailResult.id,
      cliente: contacto.nombre,
      email: contacto.email,
      nivel: data.complejidad?.nivelReal,
      horas: data.complejidad?.horasEstimadas,
      perfiles: data.perfiles.length,
      serviciosTotales: detalleServicios.reduce((sum, p) => sum + p.totales.total, 0),
      fecha: data.fecha
    });

    return res.status(200).json({
      success: true,
      message: 'Cuestionario procesado y email enviado',
      emailId: emailResult.id,
      data: {
        cliente: contacto.nombre,
        nivel: data.complejidad?.nivelReal,
        horasEstimadas: data.complejidad?.horasEstimadas,
        serviciosTotales: detalleServicios.reduce((sum, p) => sum + p.totales.total, 0)
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
