"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  formatSolesConDecimales,
  type Curso,
  type DatosCursoNuevo,
  type EtiquetaCurso,
  type Modalidad,
} from "@/lib/pedsar";

type CursosAdminProps = {
  cursos: Curso[];
  onCrearCurso: (datos: DatosCursoNuevo) => void;
};

type FormularioCurso = {
  nombre: string;
  etiqueta: EtiquetaCurso;
  modalidad: Modalidad;
  horas: string;
  horario: string;
  precio: string;
  vacantes: string;
  instructor: string;
  inicio: string;
};

const FORMULARIO_INICIAL: FormularioCurso = {
  nombre: "",
  etiqueta: "Curso",
  modalidad: "Virtual",
  horas: "",
  horario: "",
  precio: "",
  vacantes: "",
  instructor: "",
  inicio: "",
};

type ErroresCurso = Partial<Record<keyof FormularioCurso, string>>;

export function CursosAdmin({ cursos, onCrearCurso }: CursosAdminProps) {
  const { toast } = useToast();
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [datos, setDatos] = useState<FormularioCurso>(FORMULARIO_INICIAL);
  const [errores, setErrores] = useState<ErroresCurso>({});

  function actualizar<Campo extends keyof FormularioCurso>(
    campo: Campo,
    valor: FormularioCurso[Campo]
  ) {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    setErrores((previo) => ({ ...previo, [campo]: undefined }));
  }

  function validar(): ErroresCurso {
    const resultado: ErroresCurso = {};
    if (datos.nombre.trim().length < 5) {
      resultado.nombre = "Ingrese el nombre del curso (mínimo 5 caracteres).";
    }
    if (!/^\d+$/.test(datos.horas) || Number(datos.horas) <= 0) {
      resultado.horas = "Ingrese una duración válida en horas.";
    }
    if (datos.horario.trim().length < 4) {
      resultado.horario = "Indique el horario de las sesiones.";
    }
    if (!/^\d+(\.\d{1,2})?$/.test(datos.precio) || Number(datos.precio) <= 0) {
      resultado.precio = "Ingrese un precio válido.";
    }
    if (!/^\d+$/.test(datos.vacantes) || Number(datos.vacantes) <= 0) {
      resultado.vacantes = "Ingrese el número de vacantes.";
    }
    if (datos.instructor.trim().length < 5) {
      resultado.instructor = "Ingrese el nombre del instructor.";
    }
    if (datos.inicio.trim().length < 4) {
      resultado.inicio = "Indique la fecha de inicio.";
    }
    return resultado;
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const validacion = validar();
    if (Object.keys(validacion).length > 0) {
      setErrores(validacion);
      return;
    }
    onCrearCurso({
      nombre: datos.nombre.trim(),
      etiqueta: datos.etiqueta,
      modalidad: datos.modalidad,
      horas: Number(datos.horas),
      horario: datos.horario.trim(),
      precio: Number(datos.precio),
      vacantes: Number(datos.vacantes),
      instructor: datos.instructor.trim(),
      inicio: datos.inicio.trim(),
    });
    toast({
      title: "Curso publicado",
      description: `${datos.nombre.trim()} ya aparece en el catálogo público del sitio.`,
    });
    setDatos(FORMULARIO_INICIAL);
    setDialogoAbierto(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#1F2A36]">Cursos</h2>
          <p className="mt-1 text-xs text-[#5C6B7A]">
            Gestión del catálogo publicado en el sitio público.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setDialogoAbierto(true)}
          className="bg-[#2E5F8A] text-white hover:bg-[#27527A]"
        >
          <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Nuevo curso
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-[#D5DBE1] bg-white">
        <table className="w-full min-w-[860px] text-sm">
          <caption className="sr-only">Listado de cursos publicados</caption>
          <thead>
            <tr className="border-b border-[#E2E7EC] bg-[#FAFBFC] text-left text-[#5C6B7A]">
              <th className="px-4 py-2.5 font-medium">Curso</th>
              <th className="px-4 py-2.5 font-medium">Tipo</th>
              <th className="px-4 py-2.5 font-medium">Modalidad</th>
              <th className="px-4 py-2.5 font-medium">Duración</th>
              <th className="px-4 py-2.5 font-medium">Horario</th>
              <th className="px-4 py-2.5 font-medium">Precio</th>
              <th className="px-4 py-2.5 font-medium">Vacantes</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr
                key={curso.id}
                className="border-b border-[#EDF0F2] last:border-b-0"
              >
                <td className="px-4 py-3 font-medium text-[#1F2A36]">
                  {curso.nombre}
                </td>
                <td className="px-4 py-3 text-[#44525F]">{curso.etiqueta}</td>
                <td className="px-4 py-3 text-[#44525F]">{curso.modalidad}</td>
                <td className="px-4 py-3 text-[#44525F]">{curso.duracion}</td>
                <td className="px-4 py-3 text-[#44525F]">{curso.horario}</td>
                <td className="px-4 py-3 font-medium text-[#1F2A36]">
                  {formatSolesConDecimales(curso.precio)}
                </td>
                <td className="px-4 py-3 text-[#44525F]">{curso.vacantes}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-[#BFE0CB] bg-[#E3F2E8] px-2.5 py-0.5 text-xs font-medium text-[#2F7D4F]">
                    Publicado
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Publicar nuevo curso</DialogTitle>
            <DialogDescription>
              Los datos se mostrarán de inmediato en el catálogo del sitio
              público.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-2" onSubmit={enviar} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="cu-nombre" className="text-sm text-[#1F2A36]">
                  Nombre del curso
                </Label>
                <Input
                  id="cu-nombre"
                  value={datos.nombre}
                  onChange={(evento) => actualizar("nombre", evento.target.value)}
                  placeholder="Diseño gráfico con herramientas digitales"
                  aria-invalid={Boolean(errores.nombre)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.nombre && (
                  <p className="text-xs text-red-600">{errores.nombre}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-[#1F2A36]">Tipo</Label>
                <Select
                  value={datos.etiqueta}
                  onValueChange={(valor) =>
                    actualizar("etiqueta", valor as EtiquetaCurso)
                  }
                >
                  <SelectTrigger className="border-[#C6D0D9] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Curso">Curso</SelectItem>
                    <SelectItem value="Taller">Taller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-[#1F2A36]">Modalidad</Label>
                <Select
                  value={datos.modalidad}
                  onValueChange={(valor) =>
                    actualizar("modalidad", valor as Modalidad)
                  }
                >
                  <SelectTrigger className="border-[#C6D0D9] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Virtual">Virtual</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Semipresencial">
                      Semipresencial
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cu-horas" className="text-sm text-[#1F2A36]">
                  Duración (horas)
                </Label>
                <Input
                  id="cu-horas"
                  inputMode="numeric"
                  value={datos.horas}
                  onChange={(evento) =>
                    actualizar("horas", evento.target.value.replace(/\D/g, ""))
                  }
                  placeholder="24"
                  aria-invalid={Boolean(errores.horas)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.horas && (
                  <p className="text-xs text-red-600">{errores.horas}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cu-horario" className="text-sm text-[#1F2A36]">
                  Horario
                </Label>
                <Input
                  id="cu-horario"
                  value={datos.horario}
                  onChange={(evento) => actualizar("horario", evento.target.value)}
                  placeholder="Lunes y viernes, 7:00 p. m."
                  aria-invalid={Boolean(errores.horario)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.horario && (
                  <p className="text-xs text-red-600">{errores.horario}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cu-precio" className="text-sm text-[#1F2A36]">
                  Precio (S/)
                </Label>
                <Input
                  id="cu-precio"
                  inputMode="decimal"
                  value={datos.precio}
                  onChange={(evento) =>
                    actualizar(
                      "precio",
                      evento.target.value.replace(/[^\d.]/g, "")
                    )
                  }
                  placeholder="199.00"
                  aria-invalid={Boolean(errores.precio)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.precio && (
                  <p className="text-xs text-red-600">{errores.precio}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cu-vacantes" className="text-sm text-[#1F2A36]">
                  Vacantes
                </Label>
                <Input
                  id="cu-vacantes"
                  inputMode="numeric"
                  value={datos.vacantes}
                  onChange={(evento) =>
                    actualizar(
                      "vacantes",
                      evento.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="20"
                  aria-invalid={Boolean(errores.vacantes)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.vacantes && (
                  <p className="text-xs text-red-600">{errores.vacantes}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cu-instructor" className="text-sm text-[#1F2A36]">
                  Instructor
                </Label>
                <Input
                  id="cu-instructor"
                  value={datos.instructor}
                  onChange={(evento) =>
                    actualizar("instructor", evento.target.value)
                  }
                  placeholder="Ing. Nombre Apellido"
                  aria-invalid={Boolean(errores.instructor)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.instructor && (
                  <p className="text-xs text-red-600">{errores.instructor}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cu-inicio" className="text-sm text-[#1F2A36]">
                  Fecha de inicio
                </Label>
                <Input
                  id="cu-inicio"
                  value={datos.inicio}
                  onChange={(evento) => actualizar("inicio", evento.target.value)}
                  placeholder="20 de octubre de 2026"
                  aria-invalid={Boolean(errores.inicio)}
                  className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                />
                {errores.inicio && (
                  <p className="text-xs text-red-600">{errores.inicio}</p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogoAbierto(false)}
                className="border-[#C6D0D9] text-[#44525F] hover:bg-[#F1F3F5]"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#2E5F8A] text-white hover:bg-[#27527A]"
              >
                Publicar curso
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
