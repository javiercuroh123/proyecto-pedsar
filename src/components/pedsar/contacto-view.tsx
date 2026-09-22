"use client";

import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageSquareText,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DATOS_CONTACTO = [
  {
    icono: MapPin,
    titulo: "Sede administrativa",
    lineas: ["Jr. Manuel Medina Paredes 524", "Ica, Perú"],
  },
  {
    icono: Building2,
    titulo: "Datos institucionales",
    lineas: ["PEDSAR E.I.R.L.", "RUC 20605615521"],
  },
  {
    icono: Clock3,
    titulo: "Horario de atención",
    lineas: ["Lunes a sábado", "9:00 a. m. - 6:00 p. m."],
  },
  {
    icono: MessageSquareText,
    titulo: "Atención digital",
    lineas: ["Mediante este formulario", "Respuesta estimada: 24 a 48 horas"],
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
      resultado.nombre = "Ingresa tu nombre completo.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
      resultado.correo = "Ingresa un correo electrónico válido.";
    }
    if (datos.asunto.trim().length < 4) {
      resultado.asunto = "Indica el asunto de tu consulta.";
    }
    if (datos.mensaje.trim().length < 10) {
      resultado.mensaje = "Escribe tu mensaje (mínimo 10 caracteres).";
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
      title: "Consulta registrada",
      description:
        "La demostración completó el flujo correctamente. El envío real se habilitará al conectar el backend.",
    });
  }

  return (
    <div className="bg-[#f4f8f6] text-[#173132]">
      <section className="relative overflow-hidden bg-[#143f3c] text-white">
        <div className="absolute -right-24 -top-36 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute right-32 top-10 h-3 w-3 rounded-full bg-[#c8ed69] shadow-[0_0_28px_8px_rgba(200,237,105,0.2)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ed69]">
            Atención PEDSAR
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.045em] sm:text-5xl">
            Conversemos sobre tu próxima capacitación.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
            Resolvemos consultas sobre cursos, inscripciones y certificados.
            Cuéntanos qué necesitas y te orientaremos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[0.82fr_1.18fr]">
          <aside>
            <div className="rounded-3xl border border-[#d8e4df] bg-white p-6 shadow-[0_18px_50px_rgba(20,44,45,0.06)] sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#167565]">
                Información institucional
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em]">
                Estamos en Ica
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#647471]">
                Estos datos corresponden a la información institucional incluida
                en el prototipo del proyecto.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {DATOS_CONTACTO.map((dato) => (
                  <article
                    key={dato.titulo}
                    className="flex gap-4 rounded-2xl border border-[#dce7e2] bg-[#f8fbf9] p-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e9f5cf] text-[#315b45]">
                      <dato.icono className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#243b3b]">
                        {dato.titulo}
                      </h3>
                      {dato.lineas.map((linea) => (
                        <p key={linea} className="mt-1 text-sm leading-5 text-[#647471]">
                          {linea}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>

          <section
            id="formulario-contacto"
            className="scroll-mt-28 rounded-3xl border border-[#d8e4df] bg-white p-6 shadow-[0_18px_50px_rgba(20,44,45,0.07)] sm:p-8"
          >
            {enviado ? (
              <div className="flex min-h-[30rem] flex-col items-center justify-center py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#e9f5cf] text-[#315b45]">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.17em] text-[#167565]">
                  Consulta registrada
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  Gracias por escribirnos
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#647471]">
                  Completaste el flujo de contacto con el correo{" "}
                  <strong className="text-[#334947]">{datos.correo.trim()}</strong>.
                  En esta versión aún no se envía información a un servidor.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDatos(DATOS_INICIALES);
                    setEnviado(false);
                  }}
                  className="mt-7 h-11 rounded-xl border-[#b9cdc5] px-5 text-[#167565] hover:bg-[#f0f6f3]"
                >
                  Enviar otra consulta
                </Button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#167565]">
                  Formulario de contacto
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                  ¿En qué podemos ayudarte?
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#647471]">
                  Completa tus datos y describe brevemente tu consulta.
                </p>

                <form className="mt-7" onSubmit={enviar} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-nombre" className="text-sm font-semibold text-[#243b3b]">
                        Nombre completo
                      </Label>
                      <Input
                        id="c-nombre"
                        value={datos.nombre}
                        onChange={(evento) => actualizar("nombre", evento.target.value)}
                        placeholder="Escribe tu nombre"
                        autoComplete="name"
                        aria-invalid={Boolean(errores.nombre)}
                        className="h-12 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                      {errores.nombre && <p className="text-xs text-[#a33c3c]">{errores.nombre}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-correo" className="text-sm font-semibold text-[#243b3b]">
                        Correo electrónico
                      </Label>
                      <Input
                        id="c-correo"
                        type="email"
                        value={datos.correo}
                        onChange={(evento) => actualizar("correo", evento.target.value)}
                        placeholder="nombre@correo.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errores.correo)}
                        className="h-12 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                      {errores.correo && <p className="text-xs text-[#a33c3c]">{errores.correo}</p>}
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <Label htmlFor="c-asunto" className="text-sm font-semibold text-[#243b3b]">
                      Asunto
                    </Label>
                    <Input
                      id="c-asunto"
                      value={datos.asunto}
                      onChange={(evento) => actualizar("asunto", evento.target.value)}
                      placeholder="Ejemplo: consulta sobre un curso"
                      aria-invalid={Boolean(errores.asunto)}
                      className="h-12 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                    />
                    {errores.asunto && <p className="text-xs text-[#a33c3c]">{errores.asunto}</p>}
                  </div>

                  <div className="mt-5 space-y-2">
                    <Label htmlFor="c-mensaje" className="text-sm font-semibold text-[#243b3b]">
                      Mensaje
                    </Label>
                    <Textarea
                      id="c-mensaje"
                      value={datos.mensaje}
                      onChange={(evento) => actualizar("mensaje", evento.target.value)}
                      placeholder="Cuéntanos qué información necesitas..."
                      rows={6}
                      aria-invalid={Boolean(errores.mensaje)}
                      className="min-h-36 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                    />
                    {errores.mensaje && <p className="text-xs text-[#a33c3c]">{errores.mensaje}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 h-12 rounded-xl bg-[#167565] px-6 text-base font-bold text-white shadow-[0_10px_25px_rgba(22,117,101,0.18)] hover:bg-[#105f53]"
                  >
                    Enviar consulta
                    <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                  <p className="mt-4 text-xs leading-5 text-[#7b8986]">
                    Este formulario demuestra el proceso previsto. El envío real se
                    habilitará al integrar el servicio de mensajería del sistema.
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
