"use client";

import { Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  fechaHoy,
  type Certificado,
  type Inscripcion,
} from "@/lib/pedsar";

type CertificadosViewProps = {
  inscripciones: Inscripcion[];
  certificados: Certificado[];
  onEmitir: (inscripcion: Inscripcion) => void;
};

export function CertificadosView({
  inscripciones,
  certificados,
  onEmitir,
}: CertificadosViewProps) {
  const { toast } = useToast();
  const confirmadas = inscripciones.filter(
    (inscripcion) => inscripcion.estado === "Confirmada"
  );
  const certificadoDe = (inscripcionId: string) =>
    certificados.find((certificado) => certificado.inscripcionId === inscripcionId);

  function emitir(inscripcion: Inscripcion) {
    onEmitir(inscripcion);
    toast({
      title: "Certificado emitido",
      description: `Se generó el certificado digital de ${inscripcion.estudiante} con código único de verificación.`,
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#1F2A36]">
            Certificados digitales
          </h2>
          <p className="mt-1 text-xs text-[#5C6B7A]">
            Emisión para matrículas confirmadas. Cada certificado incluye un
            código único de verificación en línea.
          </p>
        </div>
        <span className="rounded-full border border-[#D5DBE1] bg-white px-3 py-1 text-xs font-medium text-[#44525F]">
          Emitidos: {certificados.length}
        </span>
      </div>

      {confirmadas.length === 0 ? (
        <p className="mt-5 rounded-md border border-dashed border-[#C6D0D9] bg-[#F8FAFB] px-4 py-8 text-center text-sm text-[#5C6B7A]">
          Aún no hay matrículas confirmadas. Los certificados se habilitan
          cuando el pago del estudiante queda confirmado.
        </p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-[#D5DBE1] bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <caption className="sr-only">
              Matrículas confirmadas y estado de su certificado
            </caption>
            <thead>
              <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
                <th className="px-4 py-2.5 font-medium">Estudiante</th>
                <th className="px-4 py-2.5 font-medium">Curso</th>
                <th className="px-4 py-2.5 font-medium">Fecha de matrícula</th>
                <th className="px-4 py-2.5 font-medium">Certificado</th>
                <th className="px-4 py-2.5 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {confirmadas.map((inscripcion) => {
                const certificado = certificadoDe(inscripcion.id);
                return (
                  <tr
                    key={inscripcion.id}
                    className="border-b border-[#EDF0F2] last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium text-[#1F2A36]">
                      {inscripcion.estudiante}
                    </td>
                    <td className="px-4 py-3 text-[#44525F]">
                      {inscripcion.curso}
                    </td>
                    <td className="px-4 py-3 text-[#44525F]">
                      {inscripcion.fecha}
                    </td>
                    <td className="px-4 py-3 text-[#44525F]">
                      {certificado ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#2F7D4F]">
                          <CheckCircle2
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          {certificado.codigo}
                        </span>
                      ) : (
                        <span className="text-[#7A8794]">Pendiente</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {certificado ? (
                        <span className="inline-flex rounded-full border border-[#BFE0CB] bg-[#E3F2E8] px-2.5 py-0.5 text-xs font-medium text-[#2F7D4F]">
                          Emitido
                        </span>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => emitir(inscripcion)}
                          className="bg-[#2E5F8A] text-white hover:bg-[#27527A]"
                        >
                          <Award className="mr-1.5 h-4 w-4" aria-hidden="true" />
                          Emitir
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {certificados.length > 0 && (
        <p className="mt-4 text-xs text-[#7A8794]">
          Última emisión: {certificados[certificados.length - 1].fechaEmision}
          . Fecha de referencia del sistema: {fechaHoy()}.
        </p>
      )}
    </div>
  );
}
