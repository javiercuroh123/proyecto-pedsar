"use client";

import { ArrowRight, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CURSOS_INICIALES,
  INSCRIPCIONES_INICIALES,
  KPI_BASE,
  formatSoles,
  type Curso,
  type Inscripcion,
} from "@/lib/pedsar";

type PanelViewProps = {
  cursos: Curso[];
  inscripciones: Inscripcion[];
  onVerReportes: () => void;
  onIrCertificados: () => void;
};

export function PanelView({
  cursos,
  inscripciones,
  onVerReportes,
  onIrCertificados,
}: PanelViewProps) {
  const nuevas = inscripciones.slice(INSCRIPCIONES_INICIALES.length);
  const ingresosExtra = nuevas
    .filter((inscripcion) => inscripcion.estado === "Confirmada")
    .reduce((total, inscripcion) => total + inscripcion.monto, 0);

  const indicadores = [
    {
      valor: String(KPI_BASE.estudiantes + nuevas.length),
      etiqueta: "Estudiantes activos",
    },
    {
      valor: String(KPI_BASE.inscripciones + nuevas.length),
      etiqueta: "Inscripciones del mes",
    },
    {
      valor: String(
        KPI_BASE.cursosPublicados + (cursos.length - CURSOS_INICIALES.length)
      ),
      etiqueta: "Cursos publicados",
    },
    {
      valor: formatSoles(KPI_BASE.ingresos + ingresosExtra),
      etiqueta: "Ingresos del mes",
    },
  ];

  const confirmadas = inscripciones.filter(
    (inscripcion) => inscripcion.estado === "Confirmada"
  ).length;

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#1F2A36]">Panel principal</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {indicadores.map((indicador) => (
          <div
            key={indicador.etiqueta}
            className="rounded-lg border border-[#D5DBE1] bg-white p-4"
          >
            <p className="text-2xl font-bold text-[#1F2A36]">
              {indicador.valor}
            </p>
            <p className="mt-1 text-xs text-[#5C6B7A]">{indicador.etiqueta}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-[#D5DBE1] bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <caption className="sr-only">
            Inscripciones registradas en el sistema
          </caption>
          <thead>
            <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
              <th className="px-4 py-2.5 font-medium">Estudiante</th>
              <th className="px-4 py-2.5 font-medium">Curso</th>
              <th className="px-4 py-2.5 font-medium">Fecha</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((inscripcion) => (
              <tr
                key={inscripcion.id}
                className="border-b border-[#EDF0F2] last:border-b-0"
              >
                <td className="px-4 py-3 text-[#1F2A36]">
                  {inscripcion.estudiante}
                </td>
                <td className="px-4 py-3 text-[#44525F]">{inscripcion.curso}</td>
                <td className="px-4 py-3 text-[#44525F]">{inscripcion.fecha}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      inscripcion.estado === "Confirmada"
                        ? "border-[#BFE0CB] bg-[#E3F2E8] text-[#2F7D4F]"
                        : "border-[#EAD3A8] bg-[#FBF0DA] text-[#9A6712]"
                    }`}
                  >
                    {inscripcion.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[#7A8794]">
        Registradas hasta la fecha: {inscripciones.length} · Confirmadas:{" "}
        {confirmadas} · Pendientes: {inscripciones.length - confirmadas}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          onClick={onVerReportes}
          className="bg-[#2E5F8A] text-white hover:bg-[#27527A]"
        >
          <BarChart3 className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Ver reportes
          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onIrCertificados}
          className="border-[#C6D0D9] text-[#44525F] hover:bg-[#F1F3F5]"
        >
          <Award className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Emitir certificado digital
        </Button>
      </div>
    </div>
  );
}
