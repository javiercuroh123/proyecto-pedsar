"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Award, BarChart3, BookOpen, CheckCircle2, ClipboardList, Clock3, Plus, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { resumenPanel } from "@/lib/panel-metrics";
import { formatSolesConDecimales, type Curso, type Inscripcion } from "@/lib/pedsar";

type PanelViewProps = {
  cursos: Curso[];
  inscripciones: Inscripcion[];
  certificadosEmitidos: number;
  onVerReportes: () => void;
  onIrCertificados: () => void;
  onGestionarCursos: () => void;
  onVerInscripciones: () => void;
  onVerEstudiantes: () => void;
};

const tarjeta = "rounded-2xl border border-[#dce7e2] bg-white shadow-[0_4px_20px_rgba(20,63,60,0.025)]";

export function PanelView({ cursos, inscripciones, certificadosEmitidos, onVerReportes, onIrCertificados, onGestionarCursos, onVerInscripciones, onVerEstudiantes }: PanelViewProps) {
  const [meses, setMeses] = useState("6");
  const resumen = resumenPanel(cursos, inscripciones, Number(meses));
  const maximo = Math.max(1, ...resumen.serie.map((mes) => mes.cantidad));
  const totalSerie = resumen.serie.reduce((total, mes) => total + mes.cantidad, 0);
  const indicadores = [
    { valor: String(resumen.estudiantes), etiqueta: "Estudiantes registrados", nota: "Con al menos una inscripción", icono: Users, accion: onVerEstudiantes },
    { valor: String(cursos.length), etiqueta: "Cursos publicados", nota: "Oferta formativa disponible", icono: BookOpen, accion: onGestionarCursos },
    { valor: String(inscripciones.length), etiqueta: "Inscripciones", nota: `${resumen.confirmadas} confirmadas · ${resumen.pendientes} pendientes`, icono: ClipboardList, accion: onVerInscripciones },
    { valor: formatSolesConDecimales(resumen.ingresos), etiqueta: "Importe confirmado", nota: "Asociado a inscripciones confirmadas", icono: Wallet, accion: onVerReportes },
  ];

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#167565]">Resumen de la operación</p>
          <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-[-0.045em] xl:text-4xl">Una mirada a todo lo que avanza.</h1>
          <p className="mt-3 text-base leading-6 text-[#647471]">Tu oferta, tus estudiantes y cada nueva inscripción.</p>
        </div>
        <Button onClick={onGestionarCursos} className="h-12 rounded-xl bg-[#167565] px-5 font-bold text-white hover:bg-[#105f53]"><Plus className="size-4" aria-hidden="true" />Gestionar cursos</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {indicadores.map((item) => (
          <button key={item.etiqueta} onClick={item.accion} className={`${tarjeta} group p-5 text-left transition hover:border-[#8db9a8] hover:shadow-md focus-visible:ring-4 focus-visible:ring-[#167565]/20`}>
            <span className="flex items-start justify-between gap-2"><span className="text-sm font-medium text-[#526b63]">{item.etiqueta}</span><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf5f1] text-[#167565] group-hover:bg-[#e9f5cf]"><item.icono className="size-5" aria-hidden="true" /></span></span>
            <strong className="mt-5 block text-3xl font-black tracking-[-0.04em] tabular-nums">{item.valor}</strong>
            <span className="mt-2 block text-xs leading-5 text-[#647471]">{item.nota}</span>
          </button>
        ))}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-6">
          <section className={`${tarjeta} p-5 sm:p-6`} aria-labelledby="titulo-evolucion">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 id="titulo-evolucion" className="text-lg font-bold tracking-tight">Evolución de inscripciones</h2><p className="mt-1 text-sm text-[#647471]">{resumen.serie.length ? `Hasta ${resumen.serie.at(-1)?.periodo}` : "Aún no hay fechas registradas"}</p></div>
              <Select value={meses} onValueChange={setMeses}><SelectTrigger aria-label="Periodo del gráfico" className="w-40 rounded-xl border-[#dce7e2] text-[#526b63]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="3">Últimos 3 meses</SelectItem><SelectItem value="6">Últimos 6 meses</SelectItem><SelectItem value="12">Últimos 12 meses</SelectItem></SelectContent></Select>
            </div>
            {resumen.serie.length > 0 ? (
              <>
                <div className="mt-5 flex items-baseline gap-2"><strong className="text-3xl font-black tabular-nums">{totalSerie}</strong><span className="text-sm text-[#647471]">en el periodo mostrado</span></div>
                <div className="mt-4 overflow-x-auto pb-1">
                  <figure className="relative min-w-[300px] pt-6" aria-label="Cantidad de inscripciones por mes">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-8 top-6 flex flex-col justify-between"><div className="border-t border-dashed border-[#e4ece8]" /><div className="border-t border-dashed border-[#e4ece8]" /><div className="border-t border-dashed border-[#e4ece8]" /></div>
                    <div className="relative flex h-48 items-end gap-2 sm:gap-4">
                      {resumen.serie.map((mes, indice) => (
                        <div key={mes.clave} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center" title={`${mes.periodo}: ${mes.cantidad} inscripciones`}>
                          <span className="mb-2 text-xs font-bold tabular-nums text-[#315b45]">{mes.cantidad}</span>
                          <div aria-hidden="true" className={`mx-auto w-full max-w-16 rounded-t-lg ${indice === resumen.serie.length - 1 ? "bg-[#167565]" : "bg-[#afcfbe]"}`} style={{ height: mes.cantidad ? `${(mes.cantidad / maximo) * 135}px` : "2px" }} />
                          <span className="mt-3 text-xs capitalize text-[#647471]">{mes.etiqueta}</span>
                          <span className="sr-only">{mes.periodo}: {mes.cantidad} inscripciones</span>
                        </div>
                      ))}
                    </div>
                  </figure>
                </div>
                <p className="mt-5 border-t border-[#edf2ef] pt-4 text-xs leading-5 text-[#647471]">Incluye inscripciones confirmadas y pendientes. Un valor de cero indica que no hay registros en ese mes.</p>
              </>
            ) : <p className="py-16 text-center text-sm text-[#647471]">Las nuevas inscripciones aparecerán aquí.</p>}
          </section>

          <section className={`${tarjeta} overflow-hidden`} aria-labelledby="titulo-demanda">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6"><h2 id="titulo-demanda" className="text-lg font-bold tracking-tight">Cursos con más inscripciones</h2><button onClick={onVerReportes} className="inline-flex items-center gap-1 text-sm font-semibold text-[#167565] hover:underline">Ver reportes<ArrowUpRight className="size-4" aria-hidden="true" /></button></div>
            <Table className="min-w-[460px]">
              <TableHeader className="bg-[#f8fbf9]"><TableRow className="border-[#dce7e2]"><TableHead className="pl-6 text-[#647471]">Curso</TableHead><TableHead className="text-center text-[#647471]">Inscripciones</TableHead><TableHead className="pr-6 text-right text-[#647471]">Vacantes</TableHead></TableRow></TableHeader>
              <TableBody>
                {resumen.demanda.map(({ curso, cantidad }) => <TableRow key={curso.id} className="border-[#edf2ef] hover:bg-[#f8fbf9]"><TableCell className="max-w-[330px] whitespace-normal py-4 pl-6"><p className="font-semibold">{curso.nombre}</p><p className="mt-1 text-xs text-[#647471]">{curso.instructor}</p></TableCell><TableCell className="text-center font-bold tabular-nums text-[#167565]">{cantidad}</TableCell><TableCell className="pr-6 text-right tabular-nums">{curso.vacantes}</TableCell></TableRow>)}
                {!cursos.length && <TableRow><TableCell colSpan={3} className="py-12 text-center text-[#647471]">No hay cursos publicados.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </section>
        </div>

        <aside className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <section className={`${tarjeta} p-6`}>
            <h2 className="text-lg font-bold tracking-tight">Por modalidad</h2><p className="mt-1 text-sm text-[#647471]">Distribución de la oferta</p>
            <div className="mt-6 space-y-5">{resumen.modalidades.map((item) => <div key={item.nombre}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="text-[#526b63]">{item.nombre}</span><strong className="tabular-nums">{item.cantidad}</strong></div><Progress value={cursos.length ? item.cantidad / cursos.length * 100 : 0} aria-label={`${item.nombre}: ${item.cantidad} de ${cursos.length} cursos`} className="h-1.5 bg-[#edf2ef] [&>div]:bg-[#167565]" /></div>)}</div>
          </section>
          <section className="rounded-2xl border border-[#e2e9c7] bg-[#f1f6e4] p-6">
            <span className="mb-4 grid size-10 place-items-center rounded-xl bg-[#e0edbc] text-[#46602c]"><Clock3 className="size-5" aria-hidden="true" /></span>
            <h2 className="text-lg font-bold">{resumen.pendientes ? "Por atender" : "Todo al día"}</h2>
            <p className="mt-2 text-sm leading-6 text-[#526344]">{resumen.pendientes ? `${resumen.pendientes} inscripción${resumen.pendientes === 1 ? "" : "es"} pendiente${resumen.pendientes === 1 ? "" : "s"} de confirmación, por ${formatSolesConDecimales(resumen.montoPendiente)}.` : "No tienes inscripciones pendientes de confirmación."}</p>
            <button onClick={onVerInscripciones} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#315b45] hover:underline">Revisar inscripciones<ArrowRight className="size-4" aria-hidden="true" /></button>
          </section>
          <section className={`${tarjeta} p-6`}>
            <h2 className="text-lg font-bold tracking-tight">Accesos rápidos</h2>
            <div className="mt-4 grid gap-2">{[{ icono: BarChart3, texto: "Reportes de gestión", accion: onVerReportes }, { icono: Award, texto: "Gestionar certificados", accion: onIrCertificados }, { icono: Users, texto: "Ver estudiantes", accion: onVerEstudiantes }].map((item) => <Button key={item.texto} variant="outline" onClick={item.accion} className="h-11 justify-start rounded-xl border-[#dce7e2] text-[#315b45] hover:bg-[#edf5f1]"><item.icono className="size-4" aria-hidden="true" />{item.texto}</Button>)}</div>
            <p className="mt-5 flex items-center gap-2 text-xs text-[#647471]"><CheckCircle2 className="size-4 text-[#167565]" aria-hidden="true" />{certificadosEmitidos} certificados emitidos</p>
          </section>
        </aside>
      </div>

      <section className={`${tarjeta} overflow-hidden`} aria-labelledby="titulo-recientes">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5"><div><h2 id="titulo-recientes" className="text-lg font-bold tracking-tight">Últimas inscripciones</h2><p className="mt-1 text-sm text-[#647471]">Los cinco registros más recientes</p></div><Button onClick={onVerInscripciones} variant="outline" className="rounded-xl border-[#dce7e2] text-[#167565]">Ver todas<ArrowRight className="size-4" aria-hidden="true" /></Button></div>
        <Table className="min-w-[640px]">
          <TableHeader className="bg-[#f8fbf9]"><TableRow className="border-[#dce7e2]">{["Estudiante", "Curso", "Fecha", "Estado"].map((titulo) => <TableHead key={titulo} className="px-6 text-[#647471]">{titulo}</TableHead>)}</TableRow></TableHeader>
          <TableBody>
            {resumen.recientes.map((item) => <TableRow key={item.id} className="border-[#edf2ef] hover:bg-[#f8fbf9]"><TableCell className="px-6 py-4"><p className="font-semibold">{item.estudiante}</p><p className="mt-1 text-xs text-[#647471]">{item.codigo}</p></TableCell><TableCell className="max-w-xs whitespace-normal px-6 text-[#526b63]">{item.curso}</TableCell><TableCell className="px-6 text-[#526b63]">{item.fecha}</TableCell><TableCell className="px-6"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${item.estado === "Confirmada" ? "bg-[#eaf4ef] text-[#1c6853]" : "bg-[#fff3d9] text-[#875b19]"}`}><span className="size-1.5 rounded-full bg-current" aria-hidden="true" />{item.estado}</span></TableCell></TableRow>)}
            {!inscripciones.length && <TableRow><TableCell colSpan={4} className="py-12 text-center text-[#647471]">Aún no hay inscripciones registradas.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
