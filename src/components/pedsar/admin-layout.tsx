"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Award, BarChart3, Bell, BookOpen, ClipboardList, ExternalLink, LayoutDashboard, LogOut, Menu, ShieldCheck, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar } from "@/components/ui/sidebar";

export type SeccionPanel = "panel" | "estudiantes" | "inscripciones" | "cursos" | "certificados" | "reportes";
const SECCIONES = [
  { seccion: "panel", etiqueta: "Panel general", icono: LayoutDashboard },
  { seccion: "cursos", etiqueta: "Cursos", icono: BookOpen },
  { seccion: "estudiantes", etiqueta: "Estudiantes", icono: Users },
  { seccion: "inscripciones", etiqueta: "Inscripciones", icono: ClipboardList },
  { seccion: "certificados", etiqueta: "Certificados", icono: Award },
  { seccion: "reportes", etiqueta: "Reportes", icono: BarChart3 },
] as const;

type Props = {
  seccion: SeccionPanel;
  pendientes: number;
  onNavegar: (seccion: SeccionPanel) => void;
  onSitioPublico: () => void;
  onCerrarSesion: () => void;
  children: ReactNode;
};

const temaSidebar = { "--sidebar": "#143f3c", "--sidebar-foreground": "#d7e7e0", "--sidebar-accent": "#c8ed69", "--sidebar-accent-foreground": "#143f3c", "--sidebar-ring": "#c8ed69", "--sidebar-border": "#315951" } as CSSProperties;

function ContenidoAdmin({ seccion, pendientes, onNavegar, onSitioPublico, onCerrarSesion, children }: Props) {
  const { setOpenMobile, toggleSidebar } = useSidebar();
  const [avisosAbiertos, setAvisosAbiertos] = useState(false);
  function navegar(destino: SeccionPanel) {
    setOpenMobile(false);
    setAvisosAbiertos(false);
    onNavegar(destino);
  }
  return (
    <>
      <Sidebar className="border-r-0" aria-label="Navegación administrativa">
        <div style={temaSidebar} className="flex h-full min-h-0 flex-col bg-[#143f3c] text-[#d7e7e0]">
        <SidebarHeader className="px-6 pb-7 pt-8">
          <div className="flex items-start justify-between gap-2">
            <button onClick={() => navegar("panel")} className="flex items-center gap-3 rounded-xl text-left focus-visible:ring-2 focus-visible:ring-[#c8ed69]" aria-label="PEDSAR: ir al panel general">
              <span className="grid h-11 w-10 shrink-0 place-items-center rounded-xl rounded-bl-sm bg-[#c8ed69] text-2xl font-black text-[#143f3c]">P</span>
              <span><strong className="block text-xl font-black tracking-wider text-white">PEDSAR</strong><span className="block text-[0.625rem] leading-4 tracking-[0.16em] text-[#c5d9d2]">APRENDE. AVANZA.<br />TRANSFORMA.</span></span>
            </button>
            <button onClick={() => setOpenMobile(false)} className="rounded-lg p-2 text-white md:hidden" aria-label="Cerrar menú"><X className="size-5" /></button>
          </div>
        </SidebarHeader>
        <SidebarContent className="gap-0 px-4">
          <p className="px-3 pb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#b6cec5]">Campus · Administrador</p>
          <SidebarMenu className="gap-2">
            {SECCIONES.map((item) => (
              <SidebarMenuItem key={item.seccion}>
                <SidebarMenuButton onClick={() => navegar(item.seccion)} isActive={seccion === item.seccion} aria-current={seccion === item.seccion ? "page" : undefined} className="h-12 gap-3 rounded-xl px-3 text-sm data-[active=true]:font-bold [&>svg]:size-5">
                  <item.icono aria-hidden="true" /><span>{item.etiqueta}</span>
                  {item.seccion === "inscripciones" && pendientes > 0 && <span className="ml-auto rounded-md bg-white/15 px-2 py-0.5 text-xs tabular-nums" aria-label={`${pendientes} pendientes`}>{pendientes}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="gap-3 p-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><ShieldCheck className="mb-3 size-5 text-[#c8ed69]" aria-hidden="true" /><p className="text-sm font-semibold text-white">Todo en un solo lugar</p><p className="mt-1 text-sm leading-5 text-[#b6cec5]">Organiza tu oferta y acompaña cada inscripción.</p></div>
          <SidebarMenu>
            <SidebarMenuItem><SidebarMenuButton onClick={onSitioPublico} className="h-11 gap-3 rounded-xl"><ExternalLink aria-hidden="true" /><span>Sitio público</span></SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuButton onClick={onCerrarSesion} className="h-11 gap-3 rounded-xl"><LogOut aria-hidden="true" /><span>Cerrar sesión</span></SidebarMenuButton></SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        </div>
      </Sidebar>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[#dce7e2] bg-white/95 backdrop-blur-xl">
          <div className="flex min-h-20 items-center justify-between gap-3 px-4 sm:px-7 lg:px-9">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Abrir o cerrar menú" className="shrink-0 text-[#167565]"><Menu className="size-5" /></Button>
              <p className="truncate text-sm"><span className="hidden text-[#647471] lg:inline">Campus virtual <span className="px-3 text-[#9aada5]">/</span></span><strong>{SECCIONES.find((item) => item.seccion === seccion)?.etiqueta}</strong></p>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <span className="hidden rounded-full border border-[#dce7e2] bg-[#f5f9f7] px-3 py-1 text-xs text-[#526b63] xl:block">Datos de demostración</span>
              <Popover open={avisosAbiertos} onOpenChange={setAvisosAbiertos}>
                <PopoverTrigger asChild><Button variant="ghost" size="icon" aria-label={`Avisos: ${pendientes} inscripciones pendientes`} className="relative rounded-full text-[#526b63]"><Bell className="size-5" />{pendientes > 0 && <span className="absolute right-2 top-1.5 size-2 rounded-full bg-[#167565] ring-2 ring-white" />}</Button></PopoverTrigger>
                <PopoverContent align="end" className="w-[min(21rem,calc(100vw-2rem))] rounded-2xl border-[#dce7e2] p-5">
                  <h2 className="font-bold text-[#173132]">Pendientes de atención</h2>
                  <p className="mt-2 text-sm leading-6 text-[#647471]">{pendientes ? `Tienes ${pendientes} inscripción${pendientes === 1 ? "" : "es"} pendiente${pendientes === 1 ? "" : "s"} de confirmación.` : "No hay inscripciones pendientes de confirmación."}</p>
                  <Button onClick={() => navegar("inscripciones")} variant="outline" className="mt-4 w-full rounded-xl text-[#167565]">Ver inscripciones</Button>
                </PopoverContent>
              </Popover>
              <div className="flex items-center gap-3 border-l border-[#dce7e2] pl-3 sm:pl-5"><span className="grid size-10 place-items-center rounded-full bg-[#e9f5cf] text-sm font-bold text-[#315b45]">AD</span><div className="hidden sm:block"><p className="text-sm font-bold">Administración</p><p className="text-xs text-[#647471]">Administrador</p></div></div>
            </div>
          </div>
        </header>
        <main id="contenido-panel" tabIndex={-1} className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-7 outline-none sm:px-7 lg:px-9 lg:py-9">{children}</main>
        <footer className="mx-4 flex flex-wrap justify-between gap-2 border-t border-[#dce7e2] py-5 text-xs text-[#647471] sm:mx-7 lg:mx-9"><span>PEDSAR · Gestión de cursos y capacitaciones</span><span>Vista de demostración</span></footer>
      </div>
    </>
  );
}

export function AdminLayout(props: Props) {
  return (
    <SidebarProvider className="bg-[#f4f8f6] text-[#173132]" style={temaSidebar}>
      <button onClick={() => document.getElementById("contenido-panel")?.focus()} className="sr-only z-50 rounded bg-white px-4 py-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</button>
      <ContenidoAdmin {...props} />
    </SidebarProvider>
  );
}
