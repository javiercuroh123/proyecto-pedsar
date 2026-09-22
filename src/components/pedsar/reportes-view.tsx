"use client";

import { useMemo } from "react";
import { formatSolesConDecimales, type Inscripcion } from "@/lib/pedsar";

type ResumenCurso = {
  curso: string;
  matriculas: number;
  confirmadas: number;
  ingresos: number;
};

type ResumenMetodo = {
  metodo: string;
  matriculas: number;
  ingresos: number;
};

export function ReportesView({
  inscripciones,
}: {
  inscripciones: Inscripcion[];
}) {
  const porCurso = useMemo<ResumenCurso[]>(() => {
    const mapa = new Map<string, ResumenCurso>();
    for (const inscripcion of inscripciones) {
      const item = mapa.get(inscripcion.curso) ?? {
        curso: inscripcion.curso,
        matriculas: 0,
        confirmadas: 0,
        ingresos: 0,
      };
      item.matriculas += 1;
      if (inscripcion.estado === "Confirmada") {
        item.confirmadas += 1;
        item.ingresos += inscripcion.monto;
      }
      mapa.set(inscripcion.curso, item);
    }
    return Array.from(mapa.values());
  }, [inscripciones]);

  const porMetodo = useMemo<ResumenMetodo[]>(() => {
    const mapa = new Map<string, ResumenMetodo>();
    for (const inscripcion of inscripciones) {
      const item = mapa.get(inscripcion.metodo) ?? {
        metodo: inscripcion.metodo,
        matriculas: 0,
        ingresos: 0,
      };
      item.matriculas += 1;
      item.ingresos += inscripcion.monto;
      mapa.set(inscripcion.metodo, item);
    }
    return Array.from(mapa.values());
  }, [inscripciones]);

  const confirmadas = inscripciones.filter(
    (inscripcion) => inscripcion.estado === "Confirmada"
  ).length;
  const pendientes = inscripciones.length - confirmadas;
  const ingresosConfirmados = inscripciones
    .filter((inscripcion) => inscripcion.estado === "Confirmada")
    .reduce((total, inscripcion) => total + inscripcion.monto, 0);
  const ingresosPorCobrar = inscripciones
    .filter((inscripcion) => inscripcion.estado === "Pendiente")
    .reduce((total, inscripcion) => total + inscripcion.monto, 0);

  const indicadores = [
    {
      valor: String(inscripciones.length),
      etiqueta: "Matrículas registradas",
    },
    { valor: String(confirmadas), etiqueta: "Confirmadas" },
    { valor: String(pendientes), etiqueta: "Pendientes" },
    {
      valor: formatSolesConDecimales(ingresosConfirmados),
      etiqueta: "Ingresos confirmados",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#1F2A36]">Reportes</h2>
      <p className="mt-1 text-xs text-[#5C6B7A]">
        Resumen de matrículas e ingresos registrados en el sistema.
      </p>

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
            Matrículas e ingresos por curso
          </caption>
          <thead>
            <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
              <th className="px-4 py-2.5 font-medium">Curso</th>
              <th className="px-4 py-2.5 font-medium">Matrículas</th>
              <th className="px-4 py-2.5 font-medium">Confirmadas</th>
              <th className="px-4 py-2.5 font-medium">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {porCurso.map((resumen) => (
              <tr
                key={resumen.curso}
                className="border-b border-[#EDF0F2] last:border-b-0"
              >
                <td className="px-4 py-3 font-medium text-[#1F2A36]">
                  {resumen.curso}
                </td>
                <td className="px-4 py-3 text-[#44525F]">
                  {resumen.matriculas}
                </td>
                <td className="px-4 py-3 text-[#44525F]">
                  {resumen.confirmadas}
                </td>
                <td className="px-4 py-3 font-medium text-[#1F2A36]">
                  {formatSolesConDecimales(resumen.ingresos)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-[#D5DBE1] bg-white">
        <table className="w-full min-w-[520px] text-sm">
          <caption className="sr-only">
            Recaudación por método de pago
          </caption>
          <thead>
            <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
              <th className="px-4 py-2.5 font-medium">Método de pago</th>
              <th className="px-4 py-2.5 font-medium">Matrículas</th>
              <th className="px-4 py-2.5 font-medium">Monto total</th>
            </tr>
          </thead>
          <tbody>
            {porMetodo.map((resumen) => (
              <tr
                key={resumen.metodo}
                className="border-b border-[#EDF0F2] last:border-b-0"
              >
                <td className="px-4 py-3 font-medium text-[#1F2A36]">
                  {resumen.metodo}
                </td>
                <td className="px-4 py-3 text-[#44525F]">
                  {resumen.matriculas}
                </td>
                <td className="px-4 py-3 font-medium text-[#1F2A36]">
                  {formatSolesConDecimales(resumen.ingresos)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[#7A8794]">
        Los ingresos confirmados suman {formatSolesConDecimales(ingresosConfirmados)}
        ; queda por cobrar {formatSolesConDecimales(ingresosPorCobrar)} de
        matrículas pendientes.
      </p>
    </div>
  );
}
