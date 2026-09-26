import type { Curso, Inscripcion } from "./pedsar";

export function fechaInscripcion(fecha: string): number | null {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(fecha);
  if (!partes) return null;
  const [, dia, mes, anio] = partes.map(Number);
  const valor = Date.UTC(anio, mes - 1, dia);
  const comprobacion = new Date(valor);
  return comprobacion.getUTCDate() === dia && comprobacion.getUTCMonth() === mes - 1
    && comprobacion.getUTCFullYear() === anio ? valor : null;
}

export function resumenPanel(cursos: Curso[], inscripciones: Inscripcion[], meses = 6) {
  const confirmadas = inscripciones.filter((item) => item.estado === "Confirmada");
  const pendientes = inscripciones.filter((item) => item.estado === "Pendiente");
  const fechas = inscripciones.map((item) => fechaInscripcion(item.fecha)).filter((fecha): fecha is number => fecha !== null);
  const ultimaFecha = fechas.length ? new Date(Math.max(...fechas)) : null;
  const serie = ultimaFecha ? Array.from({ length: meses }, (_, indice) => {
    const fecha = new Date(Date.UTC(ultimaFecha.getUTCFullYear(), ultimaFecha.getUTCMonth() - meses + indice + 1, 1));
    const siguiente = Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth() + 1, 1);
    return {
      clave: `${fecha.getUTCFullYear()}-${fecha.getUTCMonth() + 1}`,
      etiqueta: fecha.toLocaleDateString("es-PE", { month: "short", timeZone: "UTC" }).replace(".", ""),
      periodo: fecha.toLocaleDateString("es-PE", { month: "long", year: "numeric", timeZone: "UTC" }),
      cantidad: fechas.filter((valor) => valor >= fecha.getTime() && valor < siguiente).length,
    };
  }) : [];

  return {
    estudiantes: new Set(inscripciones.map((item) => item.correo.trim().toLowerCase()).filter(Boolean)).size,
    confirmadas: confirmadas.length,
    pendientes: pendientes.length,
    ingresos: confirmadas.reduce((total, item) => total + item.monto, 0),
    montoPendiente: pendientes.reduce((total, item) => total + item.monto, 0),
    serie,
    modalidades: (["Virtual", "Presencial", "Semipresencial"] as const).map((modalidad) => ({
      nombre: modalidad,
      cantidad: cursos.filter((curso) => curso.modalidad === modalidad).length,
    })),
    demanda: cursos.map((curso) => ({
      curso,
      cantidad: inscripciones.filter((item) => item.curso === curso.nombre).length,
    })).sort((a, b) => b.cantidad - a.cantidad).slice(0, 4),
    recientes: [...inscripciones].reverse().sort((a, b) =>
      (fechaInscripcion(b.fecha) ?? -Infinity) - (fechaInscripcion(a.fecha) ?? -Infinity)
    ).slice(0, 5),
  };
}
