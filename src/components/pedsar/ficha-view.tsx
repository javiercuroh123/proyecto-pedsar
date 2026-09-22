"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  formatSolesConDecimales,
  fechaHoy,
  generarCodigoInscripcion,
  type Curso,
  type Inscripcion,
  type MetodoPago,
} from "@/lib/pedsar";

const METODOS_PAGO: MetodoPago[] = ["Tarjeta", "Yape", "Plin", "Transferencia"];

type FormularioDatos = {
  nombre: string;
  dni: string;
  correo: string;
  telefono: string;
  metodoPago: MetodoPago;
};

type ErroresFormulario = Partial<Record<keyof FormularioDatos, string>>;

type FichaViewProps = {
  curso: Curso;
  onRegistrar: (inscripcion: Inscripcion) => void;
  onVolverACursos: () => void;
  onIrAlPanel: () => void;
};

export function FichaView({
  curso,
  onRegistrar,
  onVolverACursos,
  onIrAlPanel,
}: FichaViewProps) {
  const [datos, setDatos] = useState<FormularioDatos>({
    nombre: "",
    dni: "",
    correo: "",
    telefono: "",
    metodoPago: "Tarjeta",
  });
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [exito, setExito] = useState<Inscripcion | null>(null);

  function actualizar<Campo extends keyof FormularioDatos>(
    campo: Campo,
    valor: FormularioDatos[Campo]
  ) {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    setErrores((previo) => ({ ...previo, [campo]: undefined }));
  }

  function validar(): ErroresFormulario {
    const resultado: ErroresFormulario = {};
    if (datos.nombre.trim().length < 5) {
      resultado.nombre = "Ingrese el nombre completo del estudiante.";
    }
    if (!/^\d{8}$/.test(datos.dni.trim())) {
      resultado.dni = "El DNI debe tener exactamente 8 dígitos.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
      resultado.correo = "Ingrese un correo electrónico válido.";
    }
    if (!/^9\d{8}$/.test(datos.telefono.trim())) {
      resultado.telefono = "Ingrese un número celular de 9 dígitos.";
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
    const estado = datos.metodoPago === "Transferencia" ? "Pendiente" : "Confirmada";
    const inscripcion: Inscripcion = {
      id: `ins-${Date.now()}`,
      codigo: generarCodigoInscripcion(),
      estudiante: datos.nombre.trim(),
      correo: datos.correo.trim(),
      curso: curso.nombre,
      fecha: fechaHoy(),
      estado,
      metodo: datos.metodoPago,
      monto: curso.precio,
    };
    onRegistrar(inscripcion);
    setExito(inscripcion);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-[#143f3c] text-white shadow-[0_28px_70px_rgba(20,63,60,0.18)]">
        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_330px] lg:p-12">
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-[#c8ed69] px-3 py-1 text-[#173132]">
                {curso.categoria}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                {curso.nivel}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                {curso.modalidad}
              </span>
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
              {curso.nombre}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
              {curso.descripcion}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#c8ed69]" aria-hidden="true" />
                {curso.duracionDetalle}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#c8ed69]" aria-hidden="true" />
                Inicio: {curso.inicio}
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-[#c8ed69] text-[#c8ed69]" aria-hidden="true" />
                {curso.calificacion.toFixed(1)} · {curso.estudiantes} estudiantes
              </span>
            </div>
          </div>
          <aside className="rounded-2xl border border-white/12 bg-white/[0.08] p-6 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
              Inversión total
            </span>
            <strong className="mt-2 block text-4xl font-black">
              {formatSolesConDecimales(curso.precio)}
            </strong>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#c8ed69]" />
                {curso.vacantes} vacantes disponibles
              </p>
              <p className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#c8ed69]" />
                Instructor: {curso.instructor}
              </p>
            </div>
            <span className="mt-6 block rounded-xl bg-[#c8ed69] px-4 py-3 text-center text-sm font-bold text-[#173132]">
              Inscripciones abiertas
            </span>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-[#dce5e1] bg-white p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf5f0] text-[#167565]">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold text-[#173132]">Lo que aprenderás</h2>
          </div>
          <ol className="mt-5 space-y-3">
            {curso.temario.map((modulo, indice) => (
              <li key={modulo} className="flex gap-3 text-sm leading-6 text-[#5f706d]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f0f6df] text-xs font-bold text-[#315b45]">
                  {indice + 1}
                </span>
                {modulo}
              </li>
            ))}
          </ol>
        </div>
        <div className="border-t border-[#e7ecea] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-xl font-bold text-[#173132]">Antes de empezar</h2>
          <ul className="mt-5 space-y-3">
            {curso.requisitos.map((requisito) => (
              <li key={requisito} className="flex gap-3 text-sm leading-6 text-[#5f706d]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#167565]" aria-hidden="true" />
                {requisito}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-[#f4f7f6] p-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#167565]">Resultado del curso</span>
            <p className="mt-2 text-sm font-medium leading-6 text-[#334947]">{curso.resultado}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 rounded-3xl bg-[#eef3f1] p-4 sm:p-6 lg:grid-cols-[340px_1fr]">
      {/* Ficha del curso */}
      <aside className="h-fit rounded-2xl border border-[#d5dfdb] bg-white p-5">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#167565]">Resumen de inscripción</span>
        <h2 className="mt-3 text-lg font-bold text-[#173132]">{curso.nombre}</h2>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div>
            <dt className="inline font-semibold text-[#1F2A36]">Instructor: </dt>
            <dd className="inline text-[#44525F]">{curso.instructor}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1F2A36]">Duración: </dt>
            <dd className="inline text-[#44525F]">{curso.duracionDetalle}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1F2A36]">Horario: </dt>
            <dd className="inline text-[#44525F]">{curso.horarioCorto}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1F2A36]">Inicio: </dt>
            <dd className="inline text-[#44525F]">{curso.inicio}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1F2A36]">Vacantes: </dt>
            <dd className="inline text-[#44525F]">
              {curso.vacantes} disponibles
            </dd>
          </div>
        </dl>
        <p className="mt-6 border-t border-[#EDF0F2] pt-4 text-2xl font-bold text-[#173132]">
          {formatSolesConDecimales(curso.precio)}
        </p>
      </aside>

      {/* Formulario o confirmación */}
      <section className="rounded-2xl border border-[#d5dfdb] bg-white p-5 sm:p-7">
        {exito ? (
          <div className="flex h-full flex-col items-start justify-center">
            <span className="rounded-full border border-[#BFE0CB] bg-[#E3F2E8] px-3 py-1 text-xs font-medium text-[#2F7D4F]">
              {exito.estado === "Confirmada"
                ? "Pago verificado"
                : "Pago por confirmar"}
            </span>
            <h3 className="mt-4 text-xl font-bold text-[#1F3A54]">
              Inscripción registrada
            </h3>
            <p className="mt-2 text-sm text-[#44525F]">
              Código de matrícula:{" "}
              <span className="font-semibold text-[#1F2A36]">
                {exito.codigo}
              </span>
            </p>
            <p className="mt-1 max-w-md text-sm text-[#44525F]">
              El sistema envió la confirmación de la matrícula y las
              credenciales de acceso al correo{" "}
              <span className="font-medium text-[#1F2A36]">
                {datos.correo.trim()}
              </span>
              . Estado del registro:{" "}
              <span className="font-medium text-[#1F2A36]">
                {exito.estado.toLowerCase()}
              </span>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={onVolverACursos}
                variant="outline"
                className="border-[#C6D0D9] text-[#44525F] hover:bg-[#F1F3F5]"
              >
                Volver a los cursos
              </Button>
              <Button
                type="button"
                onClick={onIrAlPanel}
                className="bg-[#2E5F8A] text-white hover:bg-[#27527A]"
              >
                Ir al panel de administración
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-[#1F2A36]">
              Formulario de inscripción
            </h3>
            <form className="mt-5" onSubmit={enviar} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="nombre" className="text-sm text-[#1F2A36]">
                    Nombre completo
                  </Label>
                  <Input
                    id="nombre"
                    value={datos.nombre}
                    onChange={(evento) => actualizar("nombre", evento.target.value)}
                    placeholder="Juan Carlos Quispe Ramos"
                    aria-invalid={Boolean(errores.nombre)}
                    className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                  />
                  {errores.nombre && (
                    <p className="text-xs text-red-600">{errores.nombre}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dni" className="text-sm text-[#1F2A36]">
                    DNI
                  </Label>
                  <Input
                    id="dni"
                    inputMode="numeric"
                    maxLength={8}
                    value={datos.dni}
                    onChange={(evento) =>
                      actualizar("dni", evento.target.value.replace(/\D/g, ""))
                    }
                    placeholder="71234567"
                    aria-invalid={Boolean(errores.dni)}
                    className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                  />
                  {errores.dni && (
                    <p className="text-xs text-red-600">{errores.dni}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="correo" className="text-sm text-[#1F2A36]">
                    Correo electrónico
                  </Label>
                  <Input
                    id="correo"
                    type="email"
                    value={datos.correo}
                    onChange={(evento) => actualizar("correo", evento.target.value)}
                    placeholder="jquispe@gmail.com"
                    aria-invalid={Boolean(errores.correo)}
                    className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                  />
                  {errores.correo && (
                    <p className="text-xs text-red-600">{errores.correo}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="telefono" className="text-sm text-[#1F2A36]">
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    inputMode="numeric"
                    maxLength={9}
                    value={datos.telefono}
                    onChange={(evento) =>
                      actualizar(
                        "telefono",
                        evento.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="956874123"
                    aria-invalid={Boolean(errores.telefono)}
                    className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                  />
                  {errores.telefono && (
                    <p className="text-xs text-red-600">{errores.telefono}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modalidad" className="text-sm text-[#1F2A36]">
                    Modalidad
                  </Label>
                  <Input
                    id="modalidad"
                    value={curso.modalidad}
                    readOnly
                    className="h-9 cursor-default border-[#C6D0D9] bg-[#F5F6F7] text-sm text-[#44525F]"
                  />
                </div>
                <fieldset className="space-y-1.5">
                  <legend className="text-sm text-[#1F2A36]">
                    Método de pago
                  </legend>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1.5">
                    {METODOS_PAGO.map((metodo) => (
                      <label
                        key={metodo}
                        className="flex cursor-pointer items-center gap-1.5 text-sm text-[#44525F]"
                      >
                        <input
                          type="radio"
                          name="metodoPago"
                          value={metodo}
                          checked={datos.metodoPago === metodo}
                          onChange={() => actualizar("metodoPago", metodo)}
                          className="h-3.5 w-3.5 accent-[#2E5F8A]"
                        />
                        {metodo}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <Button
                type="submit"
                disabled={curso.vacantes === 0}
                className="mt-6 rounded-xl bg-[#167565] px-5 text-white hover:bg-[#105f53]"
              >
                {curso.vacantes > 0 ? "Continuar con la inscripción" : "Curso sin vacantes"}
              </Button>
              <p className="mt-3 text-xs italic text-[#7A8794]">
                El sistema enviará la confirmación de la matrícula y las
                credenciales de acceso al correo indicado.
              </p>
            </form>
          </>
        )}
      </section>
      </div>
    </div>
  );
}
