"use client";

import { useState } from "react";
import { Headphones, MessageCircle, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PREGUNTAS = [
  {
    pregunta: "¿Cómo me inscribo?",
    respuesta:
      "Elige un curso, revisa sus requisitos y vacantes, y completa el formulario de inscripción disponible en su ficha.",
  },
  {
    pregunta: "¿Cómo puedo pagar?",
    respuesta:
      "Después de solicitar la inscripción, un asesor confirmará el medio de pago disponible antes de realizar cualquier operación.",
  },
  {
    pregunta: "¿Dónde verifico mi certificado?",
    respuesta:
      "Usa la opción Verificar certificado del menú e ingresa el código que figura en el documento emitido por PEDSAR.",
  },
  {
    pregunta: "¿Necesito experiencia previa?",
    respuesta:
      "Depende del curso. En cada ficha encontrarás el nivel y los requisitos antes de iniciar la inscripción.",
  },
];

type AsistentePedsarProps = {
  onContactar: () => void;
};

export function AsistentePedsar({ onContactar }: AsistentePedsarProps) {
  const [abierto, setAbierto] = useState(false);
  const [respuesta, setRespuesta] = useState(
    "Hola. Selecciona una pregunta y te orientaré."
  );

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Abrir asistente PEDSAR"
          title="Asistente PEDSAR"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-2xl bg-[#143f3c] text-[#c8ed69] shadow-[0_14px_35px_rgba(20,63,60,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0f3432] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8ed69]/50"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] gap-0 overflow-y-auto rounded-3xl border-[#d9e5e0] p-0 sm:max-w-xl">
        <div className="rounded-t-3xl bg-[#143f3c] px-6 py-6 pr-14 text-white">
          <DialogHeader className="text-left">
            <span className="mb-2 grid h-11 w-11 place-items-center rounded-2xl bg-[#c8ed69] text-[#173132]">
              <Headphones className="h-5 w-5" aria-hidden="true" />
            </span>
            <DialogTitle className="text-2xl font-black tracking-[-0.03em]">
              Te acompañamos en el proceso
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-white/65">
              Respuestas rápidas sobre inscripciones, pagos y certificados.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-sm font-bold text-[#243b3b]">Asistente PEDSAR</p>
            <p className="mt-1 text-xs text-[#778683]">Orientación informativa</p>
          </div>

          <p
            aria-live="polite"
            className="min-h-20 rounded-2xl bg-[#edf5f1] p-4 text-sm leading-6 text-[#425a55]"
          >
            {respuesta}
          </p>

          <div className="grid gap-3">
            {PREGUNTAS.map((item) => (
              <button
                key={item.pregunta}
                type="button"
                onClick={() => setRespuesta(item.respuesta)}
                className="rounded-xl border border-[#d3e0db] px-4 py-3 text-left text-sm font-semibold text-[#243b3b] transition hover:border-[#8fb6aa] hover:bg-[#f3f8f6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#167565]/20"
              >
                {item.pregunta}
              </button>
            ))}
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              onClick={onContactar}
              className="h-11 w-full rounded-xl bg-[#167565] font-bold text-white hover:bg-[#105f53]"
            >
              <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />
              Hablar con un asesor
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
