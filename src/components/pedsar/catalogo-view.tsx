"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  Code2,
  GraduationCap,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatSolesConDecimales, type Curso, type TemaCurso } from "@/lib/pedsar";

type CatalogoViewProps = {
  cursos: Curso[];
  variante: "inicio" | "cursos";
  onInscribirse: (curso: Curso) => void;
  onVerCursos?: () => void;
};

const TEMA: Record<TemaCurso, { fondo: string; trama: string; icono: typeof Code2 }> = {
  esmeralda: {
    fondo: "bg-[#173f3b]",
    trama: "from-[#c8ed69]/25 via-transparent to-[#56bda6]/20",
    icono: Code2,
  },
  azul: {
    fondo: "bg-[#173a5e]",
    trama: "from-[#72b4ff]/25 via-transparent to-[#b6d7ff]/15",
    icono: Layers3,
  },
  violeta: {
    fondo: "bg-[#352d63]",
    trama: "from-[#b6a8ff]/30 via-transparent to-[#7a6bd6]/15",
    icono: Wifi,
  },
  ambar: {
    fondo: "bg-[#604619]",
    trama: "from-[#ffdd77]/30 via-transparent to-[#f4aa41]/15",
    icono: BarChart3,
  },
  coral: {
    fondo: "bg-[#65362f]",
    trama: "from-[#ffad9e]/25 via-transparent to-[#f27664]/15",
    icono: Sparkles,
  },
  cian: {
    fondo: "bg-[#164454]",
    trama: "from-[#73d7e3]/25 via-transparent to-[#4ba7ba]/15",
    icono: BriefcaseBusiness,
  },
};

const CATEGORIAS = [
  { nombre: "Programación", texto: "Crea productos digitales", icono: Code2 },
  { nombre: "Datos", texto: "Convierte datos en decisiones", icono: BarChart3 },
  { nombre: "Ofimática", texto: "Trabaja con más eficiencia", icono: Layers3 },
  { nombre: "Gestión", texto: "Lidera proyectos y equipos", icono: BriefcaseBusiness },
];

function CursoCard({
  curso,
  onAbrir,
}: {
  curso: Curso;
  onAbrir: (curso: Curso) => void;
}) {
  const tema = TEMA[curso.tema];
  const Icono = tema.icono;

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-[#dce5e1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b8ccc4] hover:shadow-[0_20px_45px_rgba(20,44,45,0.12)]">
      <button
        type="button"
        onClick={() => onAbrir(curso)}
        className={cn(
          "relative h-44 overflow-hidden text-left text-white outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#c8ed69]",
          tema.fondo
        )}
        aria-label={`Ver detalle de ${curso.nombre}`}
      >
        <span className={cn("absolute inset-0 bg-gradient-to-br", tema.trama)} />
        <span className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full border border-white/10" />
        <span className="absolute bottom-5 right-5 grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
          <Icono className="h-8 w-8" aria-hidden="true" />
        </span>
        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          {curso.categoria}
        </span>
        <span className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[0.16em] text-white/65">
          PEDSAR · {curso.etiqueta}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="rounded-full bg-[#eef6f2] px-2.5 py-1 font-semibold text-[#167565]">
            {curso.modalidad}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-[#5e6f6c]">
            <Star className="h-3.5 w-3.5 fill-[#f4bd4a] text-[#f4bd4a]" aria-hidden="true" />
            {curso.calificacion > 0 ? curso.calificacion.toFixed(1) : "Nuevo"}
          </span>
        </div>
        <button type="button" onClick={() => onAbrir(curso)} className="mt-4 text-left">
          <h3 className="text-xl font-bold leading-tight tracking-[-0.025em] text-[#173132] transition-colors group-hover:text-[#167565]">
            {curso.nombre}
          </h3>
        </button>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#647471]">
          {curso.descripcion}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#edf1ef] pt-4 text-xs text-[#60716e]">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {curso.duracion}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            {curso.nivel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {curso.vacantes} vacantes
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#87928f]">
              Inversión
            </span>
            <strong className="mt-1 block text-xl text-[#173132]">
              {formatSolesConDecimales(curso.precio)}
            </strong>
          </div>
          <Button
            type="button"
            onClick={() => onAbrir(curso)}
            variant="outline"
            className="rounded-xl border-[#c9d7d2] text-[#167565] hover:border-[#167565] hover:bg-[#eff7f3] hover:text-[#105f53]"
          >
            Ver curso
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export function CatalogoView({
  cursos,
  variante,
  onInscribirse,
  onVerCursos,
}: CatalogoViewProps) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [nivel, setNivel] = useState("todos");
  const [modalidad, setModalidad] = useState("todas");
  const [precio, setPrecio] = useState("todos");

  const categorias = useMemo(
    () => [...new Set(cursos.map((curso) => curso.categoria))].sort(),
    [cursos]
  );

  const cursosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const maximo = precio === "todos" ? Number.POSITIVE_INFINITY : Number(precio);

    return cursos.filter((curso) => {
      const contenido = `${curso.nombre} ${curso.instructor} ${curso.categoria} ${curso.descripcion}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return (
        (!texto || contenido.includes(texto)) &&
        (categoria === "todas" || curso.categoria === categoria) &&
        (nivel === "todos" || curso.nivel === nivel) &&
        (modalidad === "todas" || curso.modalidad === modalidad) &&
        curso.precio <= maximo
      );
    });
  }, [busqueda, categoria, cursos, modalidad, nivel, precio]);

  const hayFiltros =
    Boolean(busqueda) || categoria !== "todas" || nivel !== "todos" || modalidad !== "todas" || precio !== "todos";

  function limpiarFiltros() {
    setBusqueda("");
    setCategoria("todas");
    setNivel("todos");
    setModalidad("todas");
    setPrecio("todos");
  }

  if (variante === "inicio") {
    const destacados = cursos.filter((curso) => curso.destacado).slice(0, 3);

    return (
      <main>
        <section className="relative overflow-hidden bg-[#f4f7f6]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8ed69] to-transparent" />
          <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#d8e7c0] bg-[#eef7d8] px-3 py-1 text-xs font-bold uppercase tracking-[0.13em] text-[#315b45]">
                Capacitación que te hace avanzar
              </span>
              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#142c2d] sm:text-6xl lg:text-[4.6rem]">
                Tu próximo nivel empieza con <span className="text-[#167565]">una nueva habilidad.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#62726f] sm:text-lg">
                Aprende tecnología, datos y gestión con cursos prácticos,
                acompañamiento docente y una certificación que puedes verificar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={onVerCursos}
                  className="h-12 rounded-xl bg-[#167565] px-6 font-semibold text-white shadow-[0_10px_25px_rgba(22,117,101,0.2)] hover:bg-[#105f53]"
                >
                  Explorar cursos
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onInscribirse(destacados[0] ?? cursos[0])}
                  className="h-12 rounded-xl border-[#c9d7d2] bg-white px-6 text-[#243b3b] hover:bg-[#edf4f1]"
                >
                  Ver curso destacado
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#5f706d]">
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#167565]" /> Formación práctica</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#167565]" /> Horarios flexibles</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#167565]" /> Certificado verificable</span>
              </div>
            </div>

            <div className="relative lg:pl-6">
              <div className="absolute -inset-10 -z-0 rounded-full bg-[#c8ed69]/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-[#143f3c] p-6 text-white shadow-[0_32px_70px_rgba(20,63,60,0.2)] sm:p-9">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8ed69]">Tu ruta de aprendizaje</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">
                  Del primer concepto<br />a tu próximo proyecto.
                </h2>
                <div className="mt-8 divide-y divide-white/10">
                  {[
                    ["01", "Elige qué quieres aprender", "Programación, datos, diseño y gestión."],
                    ["02", "Aprende con acompañamiento", "Sesiones, materiales y práctica aplicada."],
                    ["03", "Haz visible tu progreso", "Una evidencia y un certificado verificable."],
                  ].map(([numero, titulo, texto]) => (
                    <div key={numero} className="grid grid-cols-[44px_1fr] gap-3 py-6 first:pt-0 last:pb-0">
                      <strong className="text-2xl text-[#c8ed69]">{numero}</strong>
                      <div>
                        <h3 className="font-bold">{titulo}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-white/62">{texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-3 hidden rounded-2xl border border-[#dce5e1] bg-white p-4 shadow-xl sm:flex sm:items-center sm:gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef7d8] text-[#167565]"><Award className="h-5 w-5" /></span>
                <div><strong className="block text-sm text-[#173132]">Certificación digital</strong><span className="text-xs text-[#71817e]">Con código de validación</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e4ebe8] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#e4ebe8] px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-8">
            {[
              ["+450", "personas capacitadas"],
              ["6", "rutas de aprendizaje"],
              ["3", "modalidades flexibles"],
              ["4.8/5", "valoración promedio"],
            ].map(([valor, etiqueta]) => (
              <div key={etiqueta} className="px-4 py-7 text-center">
                <strong className="text-2xl font-black text-[#173132]">{valor}</strong>
                <span className="mt-1 block text-xs text-[#71817e]">{etiqueta}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.17em] text-[#167565]">Empieza por aquí</span>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#173132] sm:text-4xl">Cursos destacados</h2>
              <p className="mt-3 max-w-2xl text-[#647471]">Programas prácticos seleccionados por su aplicación directa en el trabajo.</p>
            </div>
            <button type="button" onClick={onVerCursos} className="inline-flex items-center gap-2 text-sm font-bold text-[#167565] hover:underline">
              Ver catálogo completo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {destacados.map((curso) => <CursoCard key={curso.id} curso={curso} onAbrir={onInscribirse} />)}
          </div>
        </section>

        <section className="bg-[#f4f7f6]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.17em] text-[#167565]">Encuentra tu camino</span>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#173132]">Aprende algo que puedas aplicar.</h2>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIAS.map((item) => (
                <button key={item.nombre} type="button" onClick={onVerCursos} className="group rounded-2xl border border-[#dce5e1] bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#abc5ba] hover:shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf5f0] text-[#167565] transition group-hover:bg-[#167565] group-hover:text-white"><item.icono className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-bold text-[#173132]">{item.nombre}</h3>
                  <p className="mt-1 text-sm text-[#71817e]">{item.texto}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid overflow-hidden rounded-[2rem] bg-[#143f3c] lg:grid-cols-[1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8ed69]">Aprendizaje con propósito</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">Formación diseñada para avanzar de verdad.</h2>
              <p className="mt-4 max-w-xl leading-7 text-white/65">Cada curso combina conceptos claros, práctica guiada y una evidencia que puedes mostrar.</p>
              <Button type="button" onClick={onVerCursos} className="mt-7 rounded-xl bg-[#c8ed69] px-6 text-[#142c2d] hover:bg-[#d7f58d]">Encontrar mi curso <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
              {[
                [BookOpen, "Contenido aplicable", "Aprende resolviendo situaciones del entorno laboral."],
                [Users, "Acompañamiento docente", "Consulta, practica y recibe orientación durante tu ruta."],
                [Award, "Logro verificable", "Acredita tu avance con un certificado de código único."],
              ].map(([Icono, titulo, texto]) => {
                const Icon = Icono as typeof BookOpen;
                return <div key={String(titulo)} className="bg-[#1a4a46] p-7"><Icon className="h-6 w-6 text-[#c8ed69]" /><h3 className="mt-4 font-bold text-white">{String(titulo)}</h3><p className="mt-2 text-sm leading-6 text-white/58">{String(texto)}</p></div>;
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f4f7f6]">
      <section className="border-b border-[#dce5e1] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.17em] text-[#167565]">Oferta formativa</span>
          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.045em] text-[#173132] sm:text-5xl">Encuentra tu próximo curso.</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#647471]">Filtra por categoría, nivel, modalidad o inversión y encuentra una ruta que se ajuste a tus objetivos.</p>
            </div>
            <span className="w-fit rounded-full bg-[#eef7d8] px-3 py-1.5 text-sm font-semibold text-[#315b45]">{cursos.length} programas disponibles</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#dce5e1] bg-white p-4 shadow-sm sm:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#71817e]" />
            <Input value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} placeholder="Buscar por curso, instructor o palabra clave" aria-label="Buscar cursos" className="h-12 rounded-xl border-[#cfdad6] pl-12 pr-11 text-base focus-visible:ring-[#167565]/25" />
            {busqueda && <button type="button" onClick={() => setBusqueda("")} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#71817e] hover:bg-[#edf3f0]"><X className="h-4 w-4" /></button>}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select value={categoria} onValueChange={setCategoria}><SelectTrigger className="h-11 w-full rounded-xl border-[#cfdad6]"><SelectValue placeholder="Categoría" /></SelectTrigger><SelectContent><SelectItem value="todas">Todas las categorías</SelectItem>{categorias.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
            <Select value={nivel} onValueChange={setNivel}><SelectTrigger className="h-11 w-full rounded-xl border-[#cfdad6]"><SelectValue placeholder="Nivel" /></SelectTrigger><SelectContent><SelectItem value="todos">Todos los niveles</SelectItem><SelectItem value="Inicial">Inicial</SelectItem><SelectItem value="Intermedio">Intermedio</SelectItem><SelectItem value="Avanzado">Avanzado</SelectItem></SelectContent></Select>
            <Select value={modalidad} onValueChange={setModalidad}><SelectTrigger className="h-11 w-full rounded-xl border-[#cfdad6]"><SelectValue placeholder="Modalidad" /></SelectTrigger><SelectContent><SelectItem value="todas">Todas las modalidades</SelectItem><SelectItem value="Virtual">Virtual</SelectItem><SelectItem value="Presencial">Presencial</SelectItem><SelectItem value="Semipresencial">Semipresencial</SelectItem></SelectContent></Select>
            <Select value={precio} onValueChange={setPrecio}><SelectTrigger className="h-11 w-full rounded-xl border-[#cfdad6]"><SelectValue placeholder="Precio" /></SelectTrigger><SelectContent><SelectItem value="todos">Cualquier precio</SelectItem><SelectItem value="190">Hasta S/ 190</SelectItem><SelectItem value="220">Hasta S/ 220</SelectItem><SelectItem value="250">Hasta S/ 250</SelectItem></SelectContent></Select>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-sm text-[#647471]"><strong className="text-[#173132]">{cursosFiltrados.length}</strong> {cursosFiltrados.length === 1 ? "curso encontrado" : "cursos encontrados"}</p>
          {hayFiltros && <button type="button" onClick={limpiarFiltros} className="inline-flex items-center gap-2 text-sm font-semibold text-[#167565] hover:underline"><SlidersHorizontal className="h-4 w-4" /> Limpiar filtros</button>}
        </div>

        {cursosFiltrados.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => <CursoCard key={curso.id} curso={curso} onAbrir={onInscribirse} />)}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-[#c3d2cd] bg-white px-6 py-16 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#edf4f1] text-[#167565]"><Search className="h-5 w-5" /></span>
            <h2 className="mt-4 font-bold text-[#173132]">No encontramos cursos con esos filtros</h2>
            <p className="mt-2 text-sm text-[#71817e]">Prueba con otra palabra o amplía los criterios de búsqueda.</p>
            <Button type="button" variant="outline" onClick={limpiarFiltros} className="mt-5 rounded-xl border-[#c9d7d2] text-[#167565]">Mostrar todos los cursos</Button>
          </div>
        )}
      </section>
    </main>
  );
}
