"use client";

import { useMemo, useState } from "react";
import { Award, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formatSolesConDecimales,
  type Curso,
} from "@/lib/pedsar";

type CatalogoViewProps = {
  cursos: Curso[];
  variante: "inicio" | "cursos";
  onInscribirse: (curso: Curso) => void;
  onVerCursos?: () => void;
};

const VENTAJAS = [
  {
    icono: BookOpen,
    titulo: "Instructores certificados",
    texto:
      "Docentes con experiencia profesional en la industria que acompañan tu aprendizaje de principio a fin.",
  },
  {
    icono: Clock,
    titulo: "Horarios flexibles",
    texto:
      "Grupos en modalidad virtual, presencial y semipresencial con sesiones en horario nocturno y de fin de semana.",
  },
  {
    icono: Award,
    titulo: "Certificado digital",
    texto:
      "Al aprobar el programa recibes tu certificado con código único de verificación en línea.",
  },
];

export function CatalogoView({
  cursos,
  variante,
  onInscribirse,
  onVerCursos,
}: CatalogoViewProps) {
  const [busqueda, setBusqueda] = useState("");

  const cursosFiltrados = useMemo(() => {
    const texto = busqueda
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (!texto) return cursos;
    return cursos.filter((curso) =>
      `${curso.nombre} ${curso.modalidad} ${curso.etiqueta}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(texto)
    );
  }, [busqueda, cursos]);

  return (
    <div className="bg-white">
      {variante === "inicio" ? (
        <section className="border-b border-[#E2E7EC] bg-[#DCE6EF]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
            <h1 className="text-2xl font-bold text-[#1F3A54] sm:text-3xl">
              Capacítate en tecnología y programación
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#44525F] sm:text-base">
              Conoce la oferta formativa de PEDSAR E.I.R.L. e inscríbete en
              línea desde cualquier dispositivo.
            </p>
            <form
              className="mt-5 flex max-w-xl gap-2"
              onSubmit={(evento) => evento.preventDefault()}
            >
              <Input
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Buscar curso o capacitación..."
                aria-label="Buscar curso o capacitación"
                className="h-10 border-[#C6D0D9] bg-white text-sm focus-visible:ring-[#2E5F8A]/30"
              />
              <Button
                type="submit"
                className="h-10 bg-[#2E5F8A] px-5 text-white hover:bg-[#27527A]"
              >
                Buscar
              </Button>
            </form>
          </div>
        </section>
      ) : (
        <section className="border-b border-[#E2E7EC] bg-[#DCE6EF]">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold text-[#1F3A54] sm:text-3xl">
              Nuestros cursos y capacitaciones
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#44525F] sm:text-base">
              Explora la oferta completa, filtra por nombre o modalidad y
              asegura tu vacante en línea.
            </p>
            <form
              className="mt-5 flex max-w-xl gap-2"
              onSubmit={(evento) => evento.preventDefault()}
            >
              <Input
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Buscar curso o capacitación..."
                aria-label="Buscar curso o capacitación"
                className="h-10 border-[#C6D0D9] bg-white text-sm focus-visible:ring-[#2E5F8A]/30"
              />
              <Button
                type="submit"
                className="h-10 bg-[#2E5F8A] px-5 text-white hover:bg-[#27527A]"
              >
                Buscar
              </Button>
            </form>
          </div>
        </section>
      )}

      <section
        className="mx-auto max-w-6xl px-4 py-6 sm:px-6"
        aria-label="Oferta formativa"
      >
        {cursosFiltrados.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#C6D0D9] bg-[#F8FAFB] px-4 py-8 text-center text-sm text-[#5C6B7A]">
            No se encontraron cursos para la búsqueda indicada.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => (
              <article
                key={curso.id}
                className="flex flex-col overflow-hidden rounded-lg border border-[#D5DBE1] bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-28 bg-[repeating-linear-gradient(45deg,#DFE5EA_0px,#DFE5EA_10px,#F2F5F7_10px,#F2F5F7_20px)]">
                  <span className="absolute left-2 top-2 rounded border border-[#D5DBE1] bg-white/95 px-2 py-0.5 text-[11px] font-medium text-[#44525F]">
                    {curso.etiqueta}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <h3 className="font-semibold text-[#1F3A54]">
                    {curso.nombre}
                  </h3>
                  <p className="text-xs text-[#5C6B7A]">
                    {curso.modalidad} · {curso.duracion}
                  </p>
                  <p className="text-xs text-[#5C6B7A]">{curso.horario}</p>
                  <p className="mt-auto pt-2 text-base font-bold text-[#1F2A36]">
                    {formatSolesConDecimales(curso.precio)}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => onInscribirse(curso)}
                    className="w-fit bg-[#2E5F8A] px-4 text-white hover:bg-[#27527A]"
                  >
                    Inscribirme
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {variante === "inicio" && (
        <>
          <section
            className="mx-auto max-w-6xl px-4 pb-8 sm:px-6"
            aria-label="Ventajas de estudiar con nosotros"
          >
            <h2 className="text-xl font-bold text-[#1F3A54]">
              ¿Por qué capacitarte con nosotros?
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {VENTAJAS.map((ventaja) => (
                <article
                  key={ventaja.titulo}
                  className="rounded-lg border border-[#D5DBE1] bg-white p-5"
                >
                  <ventaja.icono
                    className="h-6 w-6 text-[#2E5F8A]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-semibold text-[#1F3A54]">
                    {ventaja.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#5C6B7A]">
                    {ventaja.texto}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {onVerCursos && (
            <section className="border-t border-[#E2E7EC] bg-[#2E5F8A]">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    ¿Listo para empezar?
                  </h2>
                  <p className="mt-1 text-sm text-white/85">
                    Explora el catálogo completo y registra tu inscripción en
                    pocos minutos.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={onVerCursos}
                  className="bg-white px-5 text-[#2E5F8A] hover:bg-white/90"
                >
                  Ver todos los cursos
                </Button>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
