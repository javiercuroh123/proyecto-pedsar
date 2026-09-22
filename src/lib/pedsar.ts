export type EtiquetaCurso = "Curso" | "Taller";

export type Modalidad = "Virtual" | "Presencial" | "Semipresencial";

export type NivelCurso = "Inicial" | "Intermedio" | "Avanzado";

export type TemaCurso = "esmeralda" | "azul" | "violeta" | "ambar" | "coral" | "cian";

export type Curso = {
  id: string;
  etiqueta: EtiquetaCurso;
  nombre: string;
  descripcion: string;
  categoria: string;
  nivel: NivelCurso;
  modalidad: Modalidad;
  duracion: string;
  duracionDetalle: string;
  horario: string;
  horarioCorto: string;
  precio: number;
  instructor: string;
  inicio: string;
  vacantes: number;
  calificacion: number;
  estudiantes: number;
  destacado: boolean;
  tema: TemaCurso;
  requisitos: string[];
  temario: string[];
  resultado: string;
};

export type EstadoInscripcion = "Confirmada" | "Pendiente";

export type MetodoPago = "Tarjeta" | "Yape" | "Plin" | "Transferencia";

export type Inscripcion = {
  id: string;
  codigo: string;
  estudiante: string;
  correo: string;
  curso: string;
  fecha: string;
  estado: EstadoInscripcion;
  metodo: MetodoPago;
  monto: number;
};

export type Certificado = {
  id: string;
  codigo: string;
  inscripcionId: string;
  estudiante: string;
  curso: string;
  fechaEmision: string;
};

export type DatosCursoNuevo = {
  nombre: string;
  etiqueta: EtiquetaCurso;
  modalidad: Modalidad;
  horas: number;
  horario: string;
  precio: number;
  vacantes: number;
  instructor: string;
  inicio: string;
};

export type MensajeContacto = {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
};

export const CREDENCIALES_DEMO = {
  usuario: "admin",
  correo: "admin@pedsar.pe",
  contrasena: "pedsar123",
};

export const CURSOS_INICIALES: Curso[] = [
  {
    id: "react",
    etiqueta: "Curso",
    nombre: "Programación Web con React",
    descripcion:
      "Construye interfaces web modernas y aprende a convertir una idea en una aplicación funcional con React y TypeScript.",
    categoria: "Programación",
    nivel: "Intermedio",
    modalidad: "Virtual",
    duracion: "48 horas",
    duracionDetalle: "48 horas (6 semanas)",
    horario: "Lunes y miércoles, 7:00 p. m.",
    horarioCorto: "Lun. y mié. 7:00–9:00 p. m.",
    precio: 250.0,
    instructor: "Ing. Genaro León Campos",
    inicio: "05 de octubre de 2026",
    vacantes: 12,
    calificacion: 4.9,
    estudiantes: 86,
    destacado: true,
    tema: "esmeralda",
    requisitos: [
      "Conocimientos básicos de HTML, CSS y JavaScript",
      "Laptop con acceso a internet",
      "Disponibilidad para desarrollar un proyecto final",
    ],
    temario: [
      "Fundamentos de React y componentes",
      "Estado, eventos y formularios",
      "Consumo de APIs y manejo de datos",
      "Proyecto web y publicación",
    ],
    resultado: "Una aplicación web publicada para incluir en tu portafolio.",
  },
  {
    id: "ofimatica",
    etiqueta: "Curso",
    nombre: "Ofimática para oficinas",
    descripcion:
      "Domina las herramientas de productividad que necesitas para organizar información, presentar resultados y trabajar con eficiencia.",
    categoria: "Ofimática",
    nivel: "Inicial",
    modalidad: "Presencial",
    duracion: "36 horas",
    duracionDetalle: "36 horas (4 semanas)",
    horario: "Martes y jueves, 6:00 p. m.",
    horarioCorto: "Mar. y jue. 6:00–7:30 p. m.",
    precio: 180.0,
    instructor: "Lic. Andrea Soto Ramírez",
    inicio: "12 de octubre de 2026",
    vacantes: 18,
    calificacion: 4.8,
    estudiantes: 124,
    destacado: true,
    tema: "azul",
    requisitos: [
      "Manejo básico de una computadora",
      "Laptop con Microsoft Office o acceso a Office 365",
    ],
    temario: [
      "Documentos profesionales con Word",
      "Cálculos y reportes con Excel",
      "Presentaciones efectivas",
      "Organización de archivos y colaboración",
    ],
    resultado: "Documentos, reportes y presentaciones listos para el entorno laboral.",
  },
  {
    id: "redes",
    etiqueta: "Taller",
    nombre: "Redes y soporte técnico",
    descripcion:
      "Aprende a diagnosticar equipos, configurar redes pequeñas y resolver las incidencias técnicas más comunes.",
    categoria: "Infraestructura",
    nivel: "Inicial",
    modalidad: "Semipresencial",
    duracion: "40 horas",
    duracionDetalle: "40 horas (5 semanas)",
    horario: "Sábados, 9:00 a. m.",
    horarioCorto: "Sáb. 9:00 a. m.–1:00 p. m.",
    precio: 220.0,
    instructor: "Ing. Marco Torres Espinoza",
    inicio: "10 de octubre de 2026",
    vacantes: 15,
    calificacion: 4.7,
    estudiantes: 64,
    destacado: true,
    tema: "violeta",
    requisitos: [
      "Conocimientos básicos de computación",
      "Laptop para las prácticas guiadas",
    ],
    temario: [
      "Componentes y mantenimiento preventivo",
      "Fundamentos de redes TCP/IP",
      "Configuración de una red local",
      "Diagnóstico y solución de incidencias",
    ],
    resultado: "Un plan de diagnóstico y una red local configurada durante el taller.",
  },
  {
    id: "power-bi",
    etiqueta: "Curso",
    nombre: "Análisis de datos con Power BI",
    descripcion:
      "Transforma datos dispersos en tableros claros para tomar decisiones y comunicar resultados con confianza.",
    categoria: "Datos",
    nivel: "Intermedio",
    modalidad: "Virtual",
    duracion: "32 horas",
    duracionDetalle: "32 horas (4 semanas)",
    horario: "Martes y jueves, 7:00 p. m.",
    horarioCorto: "Mar. y jue. 7:00–9:00 p. m.",
    precio: 240,
    instructor: "Ing. Carla Mendoza Ríos",
    inicio: "20 de octubre de 2026",
    vacantes: 10,
    calificacion: 4.9,
    estudiantes: 52,
    destacado: false,
    tema: "ambar",
    requisitos: ["Excel a nivel básico", "Laptop con Windows 10 o superior"],
    temario: [
      "Preparación y limpieza de datos",
      "Modelado y relaciones",
      "Indicadores con DAX",
      "Diseño y publicación de dashboards",
    ],
    resultado: "Un dashboard ejecutivo conectado a un conjunto de datos real.",
  },
  {
    id: "ux-ui",
    etiqueta: "Taller",
    nombre: "Diseño UX/UI para productos digitales",
    descripcion:
      "Diseña experiencias digitales útiles, accesibles y listas para ser validadas con usuarios reales.",
    categoria: "Diseño",
    nivel: "Inicial",
    modalidad: "Semipresencial",
    duracion: "24 horas",
    duracionDetalle: "24 horas (3 semanas)",
    horario: "Sábados, 3:00 p. m.",
    horarioCorto: "Sáb. 3:00–7:00 p. m.",
    precio: 190,
    instructor: "Dis. Valeria Núñez Peña",
    inicio: "24 de octubre de 2026",
    vacantes: 14,
    calificacion: 4.8,
    estudiantes: 41,
    destacado: false,
    tema: "coral",
    requisitos: ["No se requiere experiencia previa", "Laptop con acceso a Figma"],
    temario: [
      "Investigación y definición del problema",
      "Arquitectura de información",
      "Wireframes y prototipos",
      "Pruebas rápidas de usabilidad",
    ],
    resultado: "Un prototipo navegable validado con una prueba de usabilidad.",
  },
  {
    id: "gestion-agil",
    etiqueta: "Curso",
    nombre: "Gestión ágil de proyectos",
    descripcion:
      "Organiza equipos, prioriza trabajo y entrega resultados con prácticas ágiles aplicadas a proyectos reales.",
    categoria: "Gestión",
    nivel: "Inicial",
    modalidad: "Virtual",
    duracion: "30 horas",
    duracionDetalle: "30 horas (5 semanas)",
    horario: "Lunes y miércoles, 8:00 p. m.",
    horarioCorto: "Lun. y mié. 8:00–9:30 p. m.",
    precio: 210,
    instructor: "Mg. Rosa Chávez Medina",
    inicio: "02 de noviembre de 2026",
    vacantes: 20,
    calificacion: 4.7,
    estudiantes: 73,
    destacado: false,
    tema: "cian",
    requisitos: ["Participar en un proyecto académico o laboral"],
    temario: [
      "Principios ágiles y enfoque de producto",
      "Backlog, historias y priorización",
      "Planificación y seguimiento de sprints",
      "Métricas, retrospectivas y mejora continua",
    ],
    resultado: "Un plan de trabajo ágil aplicable a tu propio proyecto.",
  },
];

export const CERTIFICADOS_INICIALES: Certificado[] = [
  {
    id: "cert-demo-001",
    codigo: "PED-2026-0001",
    inscripcionId: "ins-001",
    estudiante: "Juan Carlos Quispe Ramos",
    curso: "Programación Web con React",
    fechaEmision: "18/09/2026",
  },
];

export const INSCRIPCIONES_INICIALES: Inscripcion[] = [
  {
    id: "ins-001",
    codigo: "MAT-2026-0128",
    estudiante: "Juan Carlos Quispe Ramos",
    correo: "jquispe@gmail.com",
    curso: "Programación Web con React",
    fecha: "12/09/2026",
    estado: "Confirmada",
    metodo: "Tarjeta",
    monto: 250.0,
  },
  {
    id: "ins-002",
    codigo: "MAT-2026-0129",
    estudiante: "María Elena Rojas Huamán",
    correo: "mrojas@hotmail.com",
    curso: "Ofimática para oficinas",
    fecha: "12/09/2026",
    estado: "Confirmada",
    metodo: "Yape",
    monto: 180.0,
  },
  {
    id: "ins-003",
    codigo: "MAT-2026-0130",
    estudiante: "Pedro Antonio Flores Ccahuana",
    correo: "pflores@gmail.com",
    curso: "Redes y soporte técnico",
    fecha: "11/09/2026",
    estado: "Pendiente",
    metodo: "Transferencia",
    monto: 220.0,
  },
];

export const KPI_BASE = {
  estudiantes: 128,
  inscripciones: 42,
  cursosPublicados: 6,
  ingresos: 15400,
};

export function formatSoles(monto: number): string {
  const entero = Math.round(monto);
  const conSeparador = entero
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const decimales = monto % 1 !== 0 ? monto.toFixed(2).split(".")[1] : null;
  return decimales
    ? `S/ ${conSeparador}.${decimales}`
    : `S/ ${conSeparador}`;
}

export function formatSolesConDecimales(monto: number): string {
  return `S/ ${monto.toFixed(2)}`;
}

export function fechaHoy(): string {
  const hoy = new Date();
  const dd = String(hoy.getDate()).padStart(2, "0");
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${hoy.getFullYear()}`;
}

export function generarCodigoInscripcion(): string {
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `MAT-2026-${numero}`;
}

export function generarCodigoCertificado(): string {
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `CERT-2026-${numero}`;
}
