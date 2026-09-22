"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  formatSolesConDecimales,
  type EstadoInscripcion,
  type Inscripcion,
} from "@/lib/pedsar";

type Filtro = "todas" | EstadoInscripcion;

const FILTROS: { valor: Filtro; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "Confirmada", etiqueta: "Confirmadas" },
  { valor: "Pendiente", etiqueta: "Pendientes" },
];

export function InscripcionesView({
  inscripciones,
}: {
  inscripciones: Inscripcion[];
}) {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const filtradas =
    filtro === "todas"
      ? inscripciones
      : inscripciones.filter((inscripcion) => inscripcion.estado === filtro);

  const confirmadas = inscripciones.filter(
    (inscripcion) => inscripcion.estado === "Confirmada"
  ).length;
  const pendientes = inscripciones.length - confirmadas;

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#1F2A36]">Inscripciones</h2>
      <p className="mt-1 text-xs text-[#5C6B7A]">
        Historial completo de matrículas registradas en el sistema.
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {FILTROS.map((item) => (
          <Button
            key={item.valor}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setFiltro(item.valor)}
            aria-pressed={filtro === item.valor}
            className={
              filtro === item.valor
                ? "border-[#2E5F8A] bg-[#2E5F8A] text-white hover:bg-[#27527A] hover:text-white"
                : "border-[#C6D0D9] text-[#44525F] hover:bg-[#F1F3F5]"
            }
          >
            {item.etiqueta} (
            {item.valor === "todas"
              ? inscripciones.length
              : item.valor === "Confirmada"
                ? confirmadas
                : pendientes}
            )
          </Button>
        ))}
      </div>

      {filtradas.length === 0 ? (
        <p className="mt-5 rounded-md border border-dashed border-[#C6D0D9] bg-[#F8FAFB] px-4 py-8 text-center text-sm text-[#5C6B7A]">
          No hay inscripciones con el estado seleccionado.
        </p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-[#D5DBE1] bg-white">
          <table className="w-full min-w-[820px] text-sm">
            <caption className="sr-only">
              Listado de inscripciones con su estado y método de pago
            </caption>
            <thead>
              <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
                <th className="px-4 py-2.5 font-medium">Código</th>
                <th className="px-4 py-2.5 font-medium">Estudiante</th>
                <th className="px-4 py-2.5 font-medium">Curso</th>
                <th className="px-4 py-2.5 font-medium">Método de pago</th>
                <th className="px-4 py-2.5 font-medium">Fecha</th>
                <th className="px-4 py-2.5 font-medium">Monto</th>
                <th className="px-4 py-2.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((inscripcion) => (
                <tr
                  key={inscripcion.id}
                  className="border-b border-[#EDF0F2] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium text-[#1F2A36]">
                    {inscripcion.codigo}
                  </td>
                  <td className="px-4 py-3 text-[#1F2A36]">
                    {inscripcion.estudiante}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {inscripcion.curso}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {inscripcion.metodo}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {inscripcion.fecha}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1F2A36]">
                    {formatSolesConDecimales(inscripcion.monto)}
                  </td>
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
      )}
    </div>
  );
}
