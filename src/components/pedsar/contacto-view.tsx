"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DATOS_CONTACTO = [
  {
    icono: MapPin,
    titulo: "Dirección",
    lineas: ["Av. Los Próceres 1450, San Isidro", "Lima - Perú"],
  },
  {
    icono: Phone,
    titulo: "Teléfonos",
    lineas: ["(01) 555 0143", "Celular: 987 654 321"],
  },
  {
    icono: Mail,
    titulo: "Correo electrónico",
    lineas: ["informes@pedsar.pe", "admision@pedsar.pe"],
  },
  {
    icono: Clock,
    titulo: "Horario de atención",
    lineas: ["Lunes a sábado", "9:00 a. m. - 6:00 p. m."],
  },
];

type DatosMensaje = {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
};

const DATOS_INICIALES: DatosMensaje = {
  nombre: "",
  correo: "",
  asunto: "",
  mensaje: "",
};

export function ContactoView() {
  const { toast } = useToast();
  const [datos, setDatos] = useState<DatosMensaje>(DATOS_INICIALES);
  const [errores, setErrores] = useState<Partial<DatosMensaje>>({});
  const [enviado, setEnviado] = useState(false);

  function actualizar(campo: keyof DatosMensaje, valor: string) {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    setErrores((previo) => ({ ...previo, [campo]: undefined }));
  }

  function validar(): Partial<DatosMensaje> {
    const resultado: Partial<DatosMensaje> = {};
    if (datos.nombre.trim().length < 5) {
      resultado.nombre = "Ingrese su nombre completo.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
      resultado.correo = "Ingrese un correo electrónico válido.";
    }
    if (datos.asunto.trim().length < 4) {
      resultado.asunto = "Indique el asunto de su consulta.";
    }
    if (datos.mensaje.trim().length < 10) {
      resultado.mensaje = "Escriba su mensaje (mínimo 10 caracteres).";
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
    setEnviado(true);
    toast({
      title: "Mensaje enviado",
      description:
        "Gracias por escribirnos. El equipo de PEDSAR le responderá al correo indicado en un plazo de 24 a 48 horas.",
    });
  }

  return (
    <div className="bg-white">
      <section className="border-b border-[#E2E7EC] bg-[#DCE6EF]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-[#1F3A54] sm:text-3xl">
            Contacto
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#44525F] sm:text-base">
            Escríbenos para resolver tus dudas sobre cursos, inscripciones o
            certificados. Estaremos encantados de atenderte.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="h-fit space-y-4">
            {DATOS_CONTACTO.map((dato) => (
              <article
                key={dato.titulo}
                className="flex gap-3 rounded-lg border border-[#D5DBE1] bg-white p-4"
              >
                <dato.icono
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#2E5F8A]"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-sm font-semibold text-[#1F2A36]">
                    {dato.titulo}
                  </h2>
                  {dato.lineas.map((linea) => (
                    <p key={linea} className="text-sm text-[#5C6B7A]">
                      {linea}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </aside>

          <section className="rounded-lg border border-[#D5DBE1] bg-white p-5 sm:p-6">
            {enviado ? (
              <div className="flex h-full flex-col items-start justify-center py-10">
                <span className="rounded-full border border-[#BFE0CB] bg-[#E3F2E8] px-3 py-1 text-xs font-medium text-[#2F7D4F]">
                  Enviado
                </span>
                <h2 className="mt-4 text-xl font-bold text-[#1F3A54]">
                  Gracias por contactarnos
                </h2>
                <p className="mt-2 max-w-md text-sm text-[#44525F]">
                  Recibimos tu mensaje y lo respondemos al correo{" "}
                  <span className="font-medium text-[#1F2A36]">
                    {datos.correo.trim()}
                  </span>{" "}
                  en un plazo de 24 a 48 horas hábiles.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDatos(DATOS_INICIALES);
                    setEnviado(false);
                  }}
                  className="mt-6 border-[#C6D0D9] text-[#44525F] hover:bg-[#F1F3F5]"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-[#1F2A36]">
                  Formulario de contacto
                </h2>
                <form className="mt-5" onSubmit={enviar} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-nombre" className="text-sm text-[#1F2A36]">
                        Nombre completo
                      </Label>
                      <Input
                        id="c-nombre"
                        value={datos.nombre}
                        onChange={(evento) => actualizar("nombre", evento.target.value)}
                        placeholder="Ana Lucía Mendoza Ríos"
                        aria-invalid={Boolean(errores.nombre)}
                        className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                      />
                      {errores.nombre && (
                        <p className="text-xs text-red-600">{errores.nombre}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-correo" className="text-sm text-[#1F2A36]">
                        Correo electrónico
                      </Label>
                      <Input
                        id="c-correo"
                        type="email"
                        value={datos.correo}
                        onChange={(evento) => actualizar("correo", evento.target.value)}
                        placeholder="amendoza@gmail.com"
                        aria-invalid={Boolean(errores.correo)}
                        className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                      />
                      {errores.correo && (
                        <p className="text-xs text-red-600">{errores.correo}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <Label htmlFor="c-asunto" className="text-sm text-[#1F2A36]">
                      Asunto
                    </Label>
                    <Input
                      id="c-asunto"
                      value={datos.asunto}
                      onChange={(evento) => actualizar("asunto", evento.target.value)}
                      placeholder="Consulta sobre el curso de React"
                      aria-invalid={Boolean(errores.asunto)}
                      className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                    />
                    {errores.asunto && (
                      <p className="text-xs text-red-600">{errores.asunto}</p>
                    )}
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <Label htmlFor="c-mensaje" className="text-sm text-[#1F2A36]">
                      Mensaje
                    </Label>
                    <Textarea
                      id="c-mensaje"
                      value={datos.mensaje}
                      onChange={(evento) => actualizar("mensaje", evento.target.value)}
                      placeholder="Escribe aquí tu consulta..."
                      rows={5}
                      aria-invalid={Boolean(errores.mensaje)}
                      className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
                    />
                    {errores.mensaje && (
                      <p className="text-xs text-red-600">{errores.mensaje}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="mt-6 bg-[#2E5F8A] px-5 text-white hover:bg-[#27527A]"
                  >
                    Enviar mensaje
                  </Button>
                  <p className="mt-3 text-xs italic text-[#7A8794]">
                    Tiempo de respuesta estimado: 24 a 48 horas hábiles.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
