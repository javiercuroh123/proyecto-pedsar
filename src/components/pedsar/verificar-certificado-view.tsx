"use client";

import { useState } from "react";
import { Award, CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Certificado } from "@/lib/pedsar";

type VerificarCertificadoViewProps = {
  certificados: Certificado[];
  onVerCursos: () => void;
};

export function VerificarCertificadoView({
  certificados,
  onVerCursos,
}: VerificarCertificadoViewProps) {
  const [codigo, setCodigo] = useState("");
  const [buscado, setBuscado] = useState(false);
  const normalizado = codigo.trim().toUpperCase();
  const certificado = certificados.find(
    (item) => item.codigo.toUpperCase() === normalizado
  );

  function buscar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setBuscado(true);
  }

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f4f7f6]">
      <section className="border-b border-[#dce5e1] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7d8] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#315b45]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Validación pública
          </span>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_440px]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[#142c2d] sm:text-5xl">
                Verifica un certificado PEDSAR.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5a6b68] sm:text-lg">
                Confirma la autenticidad de una acreditación con el código que
                aparece en el documento digital.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dce5e1] bg-[#f8faf9] p-4 text-sm text-[#5a6b68]">
              Código disponible en esta versión de demostración:
              <button
                type="button"
                onClick={() => {
                  setCodigo("PED-2026-0001");
                  setBuscado(false);
                }}
                className="ml-2 font-bold text-[#167565] underline decoration-[#bada65] decoration-2 underline-offset-4"
              >
                PED-2026-0001
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-3xl border border-[#dce5e1] bg-white p-5 shadow-[0_20px_60px_rgba(20,44,45,0.08)] sm:p-8">
          <form onSubmit={buscar} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#70807d]"
                aria-hidden="true"
              />
              <Input
                value={codigo}
                onChange={(evento) => {
                  setCodigo(evento.target.value);
                  setBuscado(false);
                }}
                placeholder="Ejemplo: PED-2026-0001"
                aria-label="Código del certificado"
                className="h-12 rounded-xl border-[#cfdad6] pl-12 text-base uppercase focus-visible:ring-[#167565]/25"
              />
            </div>
            <Button
              type="submit"
              disabled={!normalizado}
              className="h-12 rounded-xl bg-[#167565] px-6 font-semibold text-white hover:bg-[#105f53]"
            >
              Verificar certificado
            </Button>
          </form>

          {buscado && certificado && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#bcd9cf] bg-[#f0faf6]">
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#167565] text-white">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#167565]">
                    Certificado válido
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142c2d]">
                    {certificado.estudiante}
                  </h2>
                  <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-[#70807d]">Curso acreditado</dt>
                      <dd className="mt-1 font-semibold text-[#243b3b]">{certificado.curso}</dd>
                    </div>
                    <div>
                      <dt className="text-[#70807d]">Fecha de emisión</dt>
                      <dd className="mt-1 font-semibold text-[#243b3b]">{certificado.fechaEmision}</dd>
                    </div>
                    <div>
                      <dt className="text-[#70807d]">Código único</dt>
                      <dd className="mt-1 font-mono font-semibold text-[#243b3b]">{certificado.codigo}</dd>
                    </div>
                    <div>
                      <dt className="text-[#70807d]">Entidad emisora</dt>
                      <dd className="mt-1 font-semibold text-[#243b3b]">PEDSAR E.I.R.L.</dd>
                    </div>
                  </dl>
                </div>
                <Award className="hidden h-20 w-20 text-[#bada65] sm:block" aria-hidden="true" />
              </div>
            </div>
          )}

          {buscado && !certificado && (
            <div className="mt-8 rounded-2xl border border-[#ead9c3] bg-[#fff9ef] p-6">
              <h2 className="font-bold text-[#5d4325]">No encontramos ese certificado</h2>
              <p className="mt-2 text-sm leading-6 text-[#765f45]">
                Revisa que el código esté escrito tal como aparece en el documento.
                Si el problema continúa, comunícate con PEDSAR.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#142c2d] p-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-white">¿Quieres obtener una nueva habilidad?</p>
            <p className="mt-1 text-sm text-white/65">
              Explora la oferta formativa y elige tu próximo curso.
            </p>
          </div>
          <Button
            type="button"
            onClick={onVerCursos}
            className="rounded-xl bg-[#c8ed69] text-[#142c2d] hover:bg-[#d5f589]"
          >
            Explorar cursos
          </Button>
        </div>
      </section>
    </main>
  );
}
