"use client";

import { useMemo } from "react";
import {
  INSCRIPCIONES_INICIALES,
  type Inscripcion,
} from "@/lib/pedsar";

type EstudianteResumen = {
  nombre: string;
  correo: string;
  inscripciones: number;
  cursos: string[];
  ultima: string;
};

function agruparEstudiantes(
  inscripciones: Inscripcion[]
): EstudianteResumen[] {
  const mapa = new Map<string, EstudianteResumen>();
  for (const inscripcion of inscripciones) {
    const existente = mapa.get(inscripcion.estudiante);
    if (existente) {
      existente.inscripciones += 1;
      if (!existente.cursos.includes(inscripcion.curso)) {
        existente.cursos.push(inscripcion.curso);
      }
      existente.ultima = inscripcion.fecha;
    } else {
      mapa.set(inscripcion.estudiante, {
        nombre: inscripcion.estudiante,
        correo: inscripcion.correo,
        inscripciones: 1,
        cursos: [inscripcion.curso],
        ultima: inscripcion.fecha,
      });
    }
  }
  return Array.from(mapa.values());
}

export function EstudiantesView({
  inscripciones,
}: {
  inscripciones: Inscripcion[];
}) {
  const estudiantes = useMemo(
    () => agruparEstudiantes(inscripciones),
    [inscripciones]
  );
  const nuevas = inscripciones.slice(INSCRIPCIONES_INICIALES.length).length;

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#1F2A36]">Estudiantes</h2>
      <p className="mt-1 text-xs text-[#5C6B7A]">
        Personas registradas a partir de las inscripciones del sistema.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="rounded-lg border border-[#D5DBE1] bg-white p-4">
          <p className="text-2xl font-bold text-[#1F2A36]">
            {128 + nuevas}
          </p>
          <p className="mt-1 text-xs text-[#5C6B7A]">Estudiantes activos</p>
        </div>
        <div className="rounded-lg border border-[#D5DBE1] bg-white p-4">
          <p className="text-2xl font-bold text-[#1F2A36]">
            {estudiantes.length}
          </p>
          <p className="mt-1 text-xs text-[#5C6B7A]">
            Registros en el sistema
          </p>
        </div>
      </div>

      {estudiantes.length === 0 ? (
        <p className="mt-5 rounded-md border border-dashed border-[#C6D0D9] bg-[#F8FAFB] px-4 py-8 text-center text-sm text-[#5C6B7A]">
          Aún no hay estudiantes registrados.
        </p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-[#D5DBE1] bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <caption className="sr-only">
              Listado de estudiantes registrados
            </caption>
            <thead>
              <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
                <th className="px-4 py-2.5 font-medium">Estudiante</th>
                <th className="px-4 py-2.5 font-medium">Correo</th>
                <th className="px-4 py-2.5 font-medium">Inscripciones</th>
                <th className="px-4 py-2.5 font-medium">Cursos</th>
                <th className="px-4 py-2.5 font-medium">Última</th>
                <th className="px-4 py-2.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr
                  key={estudiante.nombre}
                  className="border-b border-[#EDF0F2] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium text-[#1F2A36]">
                    {estudiante.nombre}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {estudiante.correo}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {estudiante.inscripciones}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {estudiante.cursos.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-[#44525F]">
                    {estudiante.ultima}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full border border-[#BFE0CB] bg-[#E3F2E8] px-2.5 py-0.5 text-xs font-medium text-[#2F7D4F]">
                      Activo
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
