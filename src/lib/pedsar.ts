export type EtiquetaCurso = "Curso" | "Taller";

export type Modalidad = "Virtual" | "Presencial" | "Semipresencial";

export type Curso = {
  id: string;
  etiqueta: EtiquetaCurso;
  nombre: string;
  modalidad: Modalidad;
  duracion: string;
  duracionDetalle: string;
  horario: string;
  horarioCorto: string;
  precio: number;
  instructor: string;
  inicio: string;
  vacantes: number;
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
  contrasena: "pedsar123",
};

export const CURSOS_INICIALES: Curso[] = [
  {
    id: "react",
    etiqueta: "Curso",
    nombre: "Programación Web con React",
    modalidad: "Virtual",
    duracion: "48 horas",
    duracionDetalle: "48 horas (6 semanas)",
    horario: "Lunes y miércoles, 7:00 p. m.",
    horarioCorto: "Lun. y mié. 7:00–9:00 p. m.",
    precio: 250.0,
    instructor: "Ing. Genaro León Campos",
    inicio: "05 de octubre de 2026",
    vacantes: 12,
  },
  {
    id: "ofimatica",
    etiqueta: "Curso",
    nombre: "Ofimática para oficinas",
    modalidad: "Presencial",
    duracion: "36 horas",
    duracionDetalle: "36 horas (4 semanas)",
    horario: "Martes y jueves, 6:00 p. m.",
    horarioCorto: "Mar. y jue. 6:00–7:30 p. m.",
    precio: 180.0,
    instructor: "Lic. Andrea Soto Ramírez",
    inicio: "12 de octubre de 2026",
    vacantes: 18,
  },
  {
    id: "redes",
    etiqueta: "Taller",
    nombre: "Redes y soporte técnico",
    modalidad: "Semipresencial",
    duracion: "40 horas",
    duracionDetalle: "40 horas (5 semanas)",
    horario: "Sábados, 9:00 a. m.",
    horarioCorto: "Sáb. 9:00 a. m.–1:00 p. m.",
    precio: 220.0,
    instructor: "Ing. Marco Torres Espinoza",
    inicio: "10 de octubre de 2026",
    vacantes: 15,
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
