"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogoView } from "@/components/pedsar/catalogo-view";
import { ContactoView } from "@/components/pedsar/contacto-view";
import { FichaView } from "@/components/pedsar/ficha-view";
import { NosotrosView } from "@/components/pedsar/nosotros-view";
import { VerificarCertificadoView } from "@/components/pedsar/verificar-certificado-view";
import { cn } from "@/lib/utils";
import type { Certificado, Curso, Inscripcion } from "@/lib/pedsar";

export type SeccionPublica =
  | "inicio"
  | "cursos"
  | "nosotros"
  | "contacto"
  | "verificar"
  | "ficha";

const ENLACES: { seccion: SeccionPublica; etiqueta: string }[] = [
  { seccion: "cursos", etiqueta: "Cursos" },
  { seccion: "verificar", etiqueta: "Verificar certificado" },
  { seccion: "nosotros", etiqueta: "Nosotros" },
  { seccion: "contacto", etiqueta: "Contacto" },
];

type SitioPublicoProps = {
  seccion: SeccionPublica;
  cursos: Curso[];
  cursoFicha: Curso;
  certificados: Certificado[];
  onNavegar: (seccion: SeccionPublica) => void;
  onInscribirse: (curso: Curso) => void;
  onIngresar: () => void;
  onCrearCuenta: () => void;
  onRegistrar: (inscripcion: Inscripcion) => void;
};

function Marca() {
  return (
    <span className="inline-flex items-center gap-3 text-left">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#c8ed69] text-xl font-black text-[#142c2d] shadow-[inset_0_-2px_0_rgba(20,44,45,0.12)]">
        P
      </span>
      <span>
        <strong className="block text-[1.2rem] font-black leading-none tracking-[0.08em] text-[#142c2d]">
          PEDSAR
        </strong>
        <small className="mt-1 block text-[0.58rem] font-semibold tracking-[0.2em] text-[#81908d]">
          APRENDE. AVANZA. TRANSFORMA.
        </small>
      </span>
    </span>
  );
}

export function SitioPublico({
  seccion,
  cursos,
  cursoFicha,
  certificados,
  onNavegar,
  onInscribirse,
  onIngresar,
  onCrearCuenta,
  onRegistrar,
}: SitioPublicoProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const seccionActiva: SeccionPublica = seccion === "ficha" ? "cursos" : seccion;

  function navegar(destino: SeccionPublica) {
    setMenuAbierto(false);
    onNavegar(destino);
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-[#e1e8e5] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navegar("inicio")}
            aria-label="Ir al inicio de PEDSAR"
            className="rounded-xl outline-none ring-[#167565]/30 focus-visible:ring-4"
          >
            <Marca />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            {ENLACES.map((enlace) => (
              <button
                key={enlace.seccion}
                type="button"
                onClick={() => navegar(enlace.seccion)}
                aria-current={seccionActiva === enlace.seccion ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  seccionActiva === enlace.seccion
                    ? "bg-[#eff6f2] text-[#126557]"
                    : "text-[#425452] hover:bg-[#f4f7f6] hover:text-[#142c2d]"
                )}
              >
                {enlace.etiqueta}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              type="button"
              variant="ghost"
              onClick={onIngresar}
              className="rounded-xl px-4 text-[#243b3b] hover:bg-[#f0f5f3] hover:text-[#142c2d]"
            >
              Ingresar
            </Button>
            <Button
              type="button"
              onClick={onCrearCuenta}
              className="rounded-xl bg-[#167565] px-5 text-white shadow-sm hover:bg-[#105f53]"
            >
              Crear cuenta
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#dce5e1] text-[#243b3b] lg:hidden"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            {menuAbierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuAbierto && (
          <nav id="menu-movil" className="border-t border-[#e1e8e5] bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {ENLACES.map((enlace) => (
                <button
                  key={enlace.seccion}
                  type="button"
                  onClick={() => navegar(enlace.seccion)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[#334947] hover:bg-[#f0f5f3]"
                >
                  {enlace.etiqueta}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuAbierto(false);
                  onIngresar();
                }}
                className="mt-2 rounded-xl border border-[#dce5e1] px-4 py-3 text-left text-sm font-semibold text-[#243b3b] hover:bg-[#f0f5f3]"
              >
                Ingresar a mi cuenta
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuAbierto(false);
                  onCrearCuenta();
                }}
                className="rounded-xl bg-[#167565] px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Crear una cuenta
              </button>
            </div>
          </nav>
        )}
      </header>

      {seccion === "ficha" && (
        <main className="bg-[#f4f7f6]">
          <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
            <nav aria-label="Ruta de navegación" className="text-sm text-[#70807d]">
              <button
                type="button"
                onClick={() => navegar("cursos")}
                className="font-medium text-[#167565] hover:underline"
              >
                Catálogo
              </button>
              <span className="mx-2">/</span>
              <span>{cursoFicha.nombre}</span>
            </nav>
            <div className="mt-5">
              <FichaView
                key={cursoFicha.id}
                curso={cursoFicha}
                onRegistrar={onRegistrar}
                onVolverACursos={() => navegar("cursos")}
                onIrAlPanel={onIngresar}
              />
            </div>
          </div>
        </main>
      )}

      {(seccion === "inicio" || seccion === "cursos") && (
        <CatalogoView
          cursos={cursos}
          variante={seccion}
          onInscribirse={onInscribirse}
          onVerCursos={seccion === "inicio" ? () => navegar("cursos") : undefined}
        />
      )}
      {seccion === "verificar" && (
        <VerificarCertificadoView
          certificados={certificados}
          onVerCursos={() => navegar("cursos")}
        />
      )}
      {seccion === "nosotros" && <NosotrosView onVerCursos={() => navegar("cursos")} />}
      {seccion === "contacto" && <ContactoView />}

      {seccion !== "ficha" && (
        <footer className="bg-[#102829] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
            <div>
              <div className="[&_small]:text-white/45 [&_strong]:text-white">
                <Marca />
              </div>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
                Formación práctica en tecnología, gestión y herramientas digitales para personas y organizaciones.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold">Explora</h2>
              <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/60">
                <button onClick={() => navegar("cursos")} className="hover:text-white">Cursos</button>
                <button onClick={() => navegar("verificar")} className="hover:text-white">Verificar certificado</button>
                <button onClick={() => navegar("nosotros")} className="hover:text-white">Nosotros</button>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold">Contacto</h2>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Ica, Perú<br />Atención de lunes a sábado
              </p>
              <button onClick={() => navegar("contacto")} className="mt-3 text-sm font-semibold text-[#c8ed69] hover:underline">
                Hablar con un asesor
              </button>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
              <span>© 2026 PEDSAR E.I.R.L.</span>
              <span>Privacidad · Términos · Libro de reclamaciones</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
