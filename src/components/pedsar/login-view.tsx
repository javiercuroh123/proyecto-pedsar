"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREDENCIALES_DEMO } from "@/lib/pedsar";

type LoginViewProps = {
  onAcceder: () => void;
  onVolver: () => void;
};

export function LoginView({ onAcceder, onVolver }: LoginViewProps) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (
      usuario.trim() === CREDENCIALES_DEMO.usuario &&
      contrasena === CREDENCIALES_DEMO.contrasena
    ) {
      setError(null);
      onAcceder();
      return;
    }
    setError("Usuario o contraseña incorrectos.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DCE6EF] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-[#D5DBE1] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            <span className="rounded bg-[#2E5F8A] px-3 py-1 text-sm font-bold tracking-wide text-white">
              PEDSAR
            </span>
            <h1 className="mt-4 text-xl font-bold text-[#1F3A54]">
              Panel de administración
            </h1>
            <p className="mt-1 text-sm text-[#5C6B7A]">
              Ingresa con las credenciales del personal autorizado.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={enviar} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="usuario" className="text-sm text-[#1F2A36]">
                Usuario
              </Label>
              <Input
                id="usuario"
                value={usuario}
                onChange={(evento) => {
                  setUsuario(evento.target.value);
                  setError(null);
                }}
                placeholder="admin"
                autoComplete="username"
                className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contrasena" className="text-sm text-[#1F2A36]">
                Contraseña
              </Label>
              <Input
                id="contrasena"
                type="password"
                value={contrasena}
                onChange={(evento) => {
                  setContrasena(evento.target.value);
                  setError(null);
                }}
                placeholder="********"
                autoComplete="current-password"
                className="border-[#C6D0D9] text-sm focus-visible:ring-[#2E5F8A]/30"
              />
            </div>
            {error && (
              <p className="rounded-md border border-[#E7C4C4] bg-[#FBECEC] px-3 py-2 text-xs text-[#A33A3A]">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#2E5F8A] text-white hover:bg-[#27527A]"
            >
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-5 rounded-md border border-[#D5DBE1] bg-[#F8FAFB] px-3 py-2 text-center text-xs text-[#5C6B7A]">
            Acceso de demostración: usuario{" "}
            <span className="font-semibold text-[#1F2A36]">
              {CREDENCIALES_DEMO.usuario}
            </span>{" "}
            · contraseña{" "}
            <span className="font-semibold text-[#1F2A36]">
              {CREDENCIALES_DEMO.contrasena}
            </span>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onVolver}
            className="text-sm text-[#2E5F8A] hover:underline"
          >
            Volver al sitio público
          </button>
        </div>
      </div>
    </div>
  );
}
