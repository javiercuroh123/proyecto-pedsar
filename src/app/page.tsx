"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { CertificadosView } from "@/components/pedsar/certificados-view";
import { CursosAdmin } from "@/components/pedsar/cursos-admin";
import { EstudiantesView } from "@/components/pedsar/estudiantes-view";
import { InscripcionesView } from "@/components/pedsar/inscripciones-view";
import {
  LoginView,
  type VistaAcceso,
} from "@/components/pedsar/login-view";
import { PanelView } from "@/components/pedsar/panel-view";
import { ReportesView } from "@/components/pedsar/reportes-view";
import {
  SitioPublico,
  type SeccionPublica,
} from "@/components/pedsar/sitio-publico";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  CURSOS_INICIALES,
  CERTIFICADOS_INICIALES,
  INSCRIPCIONES_INICIALES,
  fechaHoy,
  generarCodigoCertificado,
  type Certificado,
  type Curso,
  type DatosCursoNuevo,
  type Inscripcion,
} from "@/lib/pedsar";

type Pantalla = "sitio" | "login" | "panel";

type SeccionPanel =
  | "panel"
  | "estudiantes"
  | "inscripciones"
  | "cursos"
  | "certificados"
  | "reportes";

const SECCIONES_PANEL: {
  seccion: SeccionPanel;
  etiqueta: string;
  icono: typeof LayoutDashboard;
}[] = [
  { seccion: "panel", etiqueta: "Panel principal", icono: LayoutDashboard },
  { seccion: "estudiantes", etiqueta: "Estudiantes", icono: Users },
  { seccion: "inscripciones", etiqueta: "Inscripciones", icono: ClipboardList },
  { seccion: "cursos", etiqueta: "Cursos", icono: BookOpen },
  { seccion: "certificados", etiqueta: "Certificados", icono: Award },
  { seccion: "reportes", etiqueta: "Reportes", icono: BarChart3 },
];

const RUTAS_PUBLICAS: Record<Exclude<SeccionPublica, "ficha">, string> = {
  inicio: "#/inicio",
  cursos: "#/cursos",
  nosotros: "#/nosotros",
  contacto: "#/contacto",
  verificar: "#/verificar-certificado",
};

const RUTAS_ACCESO: Record<VistaAcceso, string> = {
  ingresar: "#/ingresar",
  registro: "#/registro",
  verificar: "#/registro/verificar",
  registrado: "#/registro/completado",
  recuperar: "#/recuperar-acceso",
  enviado: "#/recuperar-acceso/enviado",
};

function guardarRuta(ruta: string) {
  if (window.location.hash === ruta) return;
  window.history.pushState({ pedsar: true }, "", ruta);
}

export default function Page() {
  const { toast } = useToast();
  const [pantalla, setPantalla] = useState<Pantalla>("sitio");
  const [seccionPublica, setSeccionPublica] = useState<SeccionPublica>("inicio");
  const [vistaAcceso, setVistaAcceso] = useState<VistaAcceso>("ingresar");
  const [seccionPanel, setSeccionPanel] = useState<SeccionPanel>("panel");
  const [cursos, setCursos] = useState<Curso[]>(CURSOS_INICIALES);
  const [cursoFicha, setCursoFicha] = useState<Curso>(CURSOS_INICIALES[0]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>(
    INSCRIPCIONES_INICIALES
  );
  const [certificados, setCertificados] = useState<Certificado[]>(
    CERTIFICADOS_INICIALES
  );
  const cursosRef = useRef(cursos);

  useEffect(() => {
    cursosRef.current = cursos;
  }, [cursos]);

  useEffect(() => {
    function aplicarRuta() {
      const ruta = window.location.hash || "#/inicio";
      const partes = ruta.replace(/^#\//, "").split("/");
      const [principal, detalle] = partes;

      if (principal === "curso" && detalle) {
        const curso = cursosRef.current.find(
          (item) => item.id === decodeURIComponent(detalle)
        );
        if (curso) {
          setCursoFicha(curso);
          setPantalla("sitio");
          setSeccionPublica("ficha");
          return;
        }
      }

      const seccionesPublicas: Record<string, Exclude<SeccionPublica, "ficha">> = {
        inicio: "inicio",
        cursos: "cursos",
        nosotros: "nosotros",
        contacto: "contacto",
        "verificar-certificado": "verificar",
      };
      if (seccionesPublicas[principal]) {
        setPantalla("sitio");
        setSeccionPublica(seccionesPublicas[principal]);
        return;
      }

      const vistasAcceso: Record<string, VistaAcceso> = {
        ingresar: "ingresar",
        registro: detalle === "verificar" ? "verificar" : detalle === "completado" ? "registrado" : "registro",
        "recuperar-acceso": detalle === "enviado" ? "enviado" : "recuperar",
      };
      if (vistasAcceso[principal]) {
        setVistaAcceso(vistasAcceso[principal]);
        setPantalla("login");
        return;
      }

      if (principal === "panel") {
        const seccionesValidas: SeccionPanel[] = [
          "panel",
          "estudiantes",
          "inscripciones",
          "cursos",
          "certificados",
          "reportes",
        ];
        const seccion = seccionesValidas.includes(detalle as SeccionPanel)
          ? (detalle as SeccionPanel)
          : "panel";
        setSeccionPanel(seccion);
        setPantalla("panel");
        return;
      }

      window.history.replaceState({ pedsar: true }, "", "#/inicio");
      setPantalla("sitio");
      setSeccionPublica("inicio");
    }

    if (!window.location.hash) {
      window.history.replaceState({ pedsar: true }, "", "#/inicio");
    }
    aplicarRuta();
    window.addEventListener("popstate", aplicarRuta);
    window.addEventListener("hashchange", aplicarRuta);
    return () => {
      window.removeEventListener("popstate", aplicarRuta);
      window.removeEventListener("hashchange", aplicarRuta);
    };
  }, []);

  const cursoActual =
    cursos.find((curso) => curso.id === cursoFicha.id) ?? cursoFicha;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pantalla, seccionPublica, seccionPanel, vistaAcceso]);

  function navegarSitio(seccion: SeccionPublica) {
    if (seccion !== "ficha") guardarRuta(RUTAS_PUBLICAS[seccion]);
    setPantalla("sitio");
    setSeccionPublica(seccion);
  }

  function navegarAcceso(vista: VistaAcceso) {
    guardarRuta(RUTAS_ACCESO[vista]);
    setVistaAcceso(vista);
    setPantalla("login");
  }

  function navegarPanel(seccion: SeccionPanel) {
    guardarRuta(seccion === "panel" ? "#/panel" : `#/panel/${seccion}`);
    setSeccionPanel(seccion);
    setPantalla("panel");
  }

  function inscribirse(curso: Curso) {
    guardarRuta(`#/curso/${encodeURIComponent(curso.id)}`);
    setCursoFicha(curso);
    setPantalla("sitio");
    setSeccionPublica("ficha");
  }

  function registrarInscripcion(inscripcion: Inscripcion) {
    setInscripciones((previo) => [...previo, inscripcion]);
    setCursos((previo) =>
      previo.map((curso) =>
        curso.id === cursoFicha.id
          ? { ...curso, vacantes: Math.max(0, curso.vacantes - 1) }
          : curso
      )
    );
    toast({
      title: "Inscripción registrada",
      description: `La matrícula ${inscripcion.codigo} aparece ahora en el panel de administración.`,
    });
  }

  function crearCurso(datos: DatosCursoNuevo) {
    const semanas = Math.max(1, Math.ceil(datos.horas / 8));
    const nuevo: Curso = {
      id: `curso-${Date.now()}`,
      etiqueta: datos.etiqueta,
      nombre: datos.nombre,
      descripcion:
        "Capacitación práctica diseñada para aplicar lo aprendido desde la primera sesión.",
      categoria: datos.etiqueta === "Taller" ? "Talleres" : "Tecnología",
      nivel: "Inicial",
      modalidad: datos.modalidad,
      duracion: `${datos.horas} horas`,
      duracionDetalle: `${datos.horas} horas (${semanas} ${
        semanas === 1 ? "semana" : "semanas"
      })`,
      horario: datos.horario,
      horarioCorto: datos.horario,
      precio: datos.precio,
      instructor: datos.instructor,
      inicio: datos.inicio,
      vacantes: datos.vacantes,
      calificacion: 0,
      estudiantes: 0,
      destacado: false,
      tema: "esmeralda",
      requisitos: ["No se requieren conocimientos previos"],
      temario: [
        "Fundamentos y conceptos esenciales",
        "Práctica guiada",
        "Aplicación en un caso real",
        "Proyecto o evaluación final",
      ],
      resultado: "Una evidencia práctica del aprendizaje alcanzado.",
    };
    setCursos((previo) => [...previo, nuevo]);
  }

  function emitirCertificado(inscripcion: Inscripcion) {
    const certificado: Certificado = {
      id: `cert-${Date.now()}`,
      codigo: generarCodigoCertificado(),
      inscripcionId: inscripcion.id,
      estudiante: inscripcion.estudiante,
      curso: inscripcion.curso,
      fechaEmision: fechaHoy(),
    };
    setCertificados((previo) => [...previo, certificado]);
  }

  function cerrarSesion() {
    guardarRuta("#/inicio");
    setPantalla("sitio");
    setSeccionPublica("inicio");
  }

  if (pantalla === "login") {
    return (
      <LoginView
        vista={vistaAcceso}
        onCambiarVista={navegarAcceso}
        onAcceder={() => {
          navegarPanel("panel");
        }}
        onVolver={() => navegarSitio("inicio")}
      />
    );
  }

  if (pantalla === "panel") {
    return (
      <div className="flex min-h-screen bg-[#EEF1F4]">
        {/* Menú lateral del panel (escritorio) */}
        <aside className="hidden w-60 shrink-0 flex-col bg-[#1F3A54] lg:flex">
          <div className="border-b border-white/10 px-5 py-4">
            <span className="inline-block rounded bg-white px-2.5 py-1 text-sm font-bold tracking-wide text-[#1F3A54]">
              PEDSAR
            </span>
            <p className="mt-2 text-xs text-white/70">
              Panel de administración
            </p>
          </div>
          <nav
            className="flex-1 space-y-1 px-3 py-4"
            aria-label="Secciones del panel"
          >
            {SECCIONES_PANEL.map((item) => (
              <button
                key={item.seccion}
                type="button"
                onClick={() => navegarPanel(item.seccion)}
                aria-current={
                  seccionPanel === item.seccion ? "page" : undefined
                }
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                  seccionPanel === item.seccion
                    ? "bg-white/15 font-medium text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icono className="h-4 w-4" aria-hidden="true" />
                {item.etiqueta}
              </button>
            ))}
          </nav>
          <div className="space-y-1 border-t border-white/10 px-3 py-4">
            <button
              type="button"
              onClick={() => navegarSitio("inicio")}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Ver sitio público
            </button>
            <button
              type="button"
              onClick={cerrarSesion}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Barra superior del panel */}
          <header className="border-b border-[#D5DBE1] bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p className="text-sm font-bold text-[#1F3A54]">
                PEDSAR · Administración
              </p>
              <div className="flex items-center gap-2">
                <span className="hidden rounded-full border border-[#D5DBE1] bg-[#F8FAFB] px-3 py-1 text-xs text-[#44525F] sm:inline-flex">
                  admin
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={cerrarSesion}
                  className="border-[#C6D0D9] text-[#44525F] hover:bg-[#F1F3F5]"
                >
                  <LogOut className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
            {/* Navegación del panel (móvil) */}
            <nav
              className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden"
              aria-label="Secciones del panel"
            >
              {SECCIONES_PANEL.map((item) => (
                <button
                  key={item.seccion}
                  type="button"
                  onClick={() => navegarPanel(item.seccion)}
                  aria-current={
                    seccionPanel === item.seccion ? "page" : undefined
                  }
                  className={cn(
                    "whitespace-nowrap rounded-md px-3 py-1.5 text-xs transition-colors",
                    seccionPanel === item.seccion
                      ? "bg-[#2E5F8A] font-medium text-white"
                      : "bg-[#F1F3F5] text-[#44525F] hover:bg-[#E2E7EC]"
                  )}
                >
                  {item.etiqueta}
                </button>
              ))}
            </nav>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
            {seccionPanel === "panel" && (
              <PanelView
                cursos={cursos}
                inscripciones={inscripciones}
                onVerReportes={() => navegarPanel("reportes")}
                onIrCertificados={() => navegarPanel("certificados")}
              />
            )}
            {seccionPanel === "estudiantes" && (
              <EstudiantesView inscripciones={inscripciones} />
            )}
            {seccionPanel === "inscripciones" && (
              <InscripcionesView inscripciones={inscripciones} />
            )}
            {seccionPanel === "cursos" && (
              <CursosAdmin cursos={cursos} onCrearCurso={crearCurso} />
            )}
            {seccionPanel === "certificados" && (
              <CertificadosView
                inscripciones={inscripciones}
                certificados={certificados}
                onEmitir={emitirCertificado}
              />
            )}
            {seccionPanel === "reportes" && (
              <ReportesView inscripciones={inscripciones} />
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <SitioPublico
      seccion={seccionPublica}
      cursos={cursos}
      cursoFicha={cursoActual}
      certificados={certificados}
      onNavegar={navegarSitio}
      onInscribirse={inscribirse}
      onIngresar={() => navegarAcceso("ingresar")}
      onCrearCuenta={() => navegarAcceso("registro")}
      onRegistrar={registrarInscripcion}
    />
  );
}
