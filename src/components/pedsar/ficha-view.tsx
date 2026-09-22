"use client";

import { useState } from "react";
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
    <div className="grid gap-4 bg-[#F5F6F7] p-4 sm:p-6 lg:grid-cols-[340px_1fr]">
      {/* Ficha del curso */}
      <aside className="h-fit rounded-lg border border-[#D5DBE1] bg-white p-5">
        <h2 className="text-lg font-bold text-[#2E5F8A]">{curso.nombre}</h2>
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
        <p className="mt-6 border-t border-[#EDF0F2] pt-4 text-2xl font-bold text-[#1F2A36]">
          {formatSolesConDecimales(curso.precio)}
        </p>
      </aside>

      {/* Formulario o confirmación */}
      <section className="rounded-lg border border-[#D5DBE1] bg-white p-5 sm:p-6">
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
                className="mt-6 bg-[#2E5F8A] px-5 text-white hover:bg-[#27527A]"
              >
                Registrar inscripción y pagar
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
  );
}
