"use client";

import { Button } from "@/components/ui/button";
import { CatalogoView } from "@/components/pedsar/catalogo-view";
import { ContactoView } from "@/components/pedsar/contacto-view";
import { FichaView } from "@/components/pedsar/ficha-view";
import { NosotrosView } from "@/components/pedsar/nosotros-view";
import { cn } from "@/lib/utils";
import type { Curso } from "@/lib/pedsar";

export type SeccionPublica =
  | "inicio"
  | "cursos"
  | "nosotros"
  | "contacto"
  | "ficha";

const ENLACES: { seccion: SeccionPublica; etiqueta: string }[] = [
  { seccion: "inicio", etiqueta: "Inicio" },
  { seccion: "cursos", etiqueta: "Cursos" },
  { seccion: "nosotros", etiqueta: "Nosotros" },
  { seccion: "contacto", etiqueta: "Contacto" },
];

type SitioPublicoProps = {
  seccion: SeccionPublica;
  cursos: Curso[];
  cursoFicha: Curso;
  onNavegar: (seccion: SeccionPublica) => void;
  onInscribirse: (curso: Curso) => void;
  onIngresar: () => void;
  onRegistrar: (inscripcion: import("@/lib/pedsar").Inscripcion) => void;
};

export function SitioPublico({
  seccion,
  cursos,
  cursoFicha,
  onNavegar,
  onInscribirse,
  onIngresar,
  onRegistrar,
}: SitioPublicoProps) {
  const seccionActiva: SeccionPublica = seccion === "ficha" ? "cursos" : seccion;

  return (
    <div className="bg-white">
      {/* Encabezado del sitio */}
      <header className="bg-[#2E5F8A]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => onNavegar("inicio")}
            className="rounded bg-white px-3 py-1 text-sm font-bold tracking-wide text-[#2E5F8A] transition-opacity hover:opacity-90"
            aria-label="Ir a la página de inicio"
          >
            PEDSAR
          </button>
          <nav
            className="flex flex-wrap items-center gap-1 text-sm"
            aria-label="Navegación principal"
          >
            {ENLACES.map((enlace) => (
              <button
                key={enlace.seccion}
                type="button"
                onClick={() => onNavegar(enlace.seccion)}
                aria-current={seccionActiva === enlace.seccion ? "page" : undefined}
                className={cn(
                  "rounded px-3 py-1.5 transition-colors",
                  seccionActiva === enlace.seccion
                    ? "bg-white/15 font-medium text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                )}
              >
                {enlace.etiqueta}
              </button>
            ))}
          </nav>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onIngresar}
            className="border-white/70 bg-transparent px-4 text-white hover:bg-white/15 hover:text-white"
          >
            Ingresar
          </Button>
        </div>
      </header>

      {/* Contenido de la sección */}
      {seccion === "ficha" && (
        <div className="bg-[#F5F6F7]">
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
            <nav aria-label="Ruta de navegación" className="text-sm">
              <button
                type="button"
                onClick={() => onNavegar("cursos")}
                className="text-[#2E5F8A] hover:underline"
              >
                Cursos
              </button>
              <span className="mx-2 text-[#7A8794]">/</span>
              <span className="font-medium text-[#1F2A36]">
                {cursoFicha.nombre}
              </span>
            </nav>
            <div className="mt-4 overflow-hidden rounded-lg border border-[#D5DBE1] bg-white">
              <FichaView
                key={cursoFicha.id}
                curso={cursoFicha}
                onRegistrar={onRegistrar}
                onVolverACursos={() => onNavegar("cursos")}
                onIrAlPanel={onIngresar}
              />
            </div>
          </div>
        </div>
      )}
      {(seccion === "inicio" || seccion === "cursos") && (
        <CatalogoView
          cursos={cursos}
          variante={seccion}
          onInscribirse={onInscribirse}
          onVerCursos={seccion === "inicio" ? () => onNavegar("cursos") : undefined}
        />
      )}
      {seccion === "nosotros" && <NosotrosView onVerCursos={() => onNavegar("cursos")} />}
      {seccion === "contacto" && <ContactoView />}
    </div>
  );
}
