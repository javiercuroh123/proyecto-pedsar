"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { CREDENCIALES_DEMO } from "@/lib/pedsar";

type LoginViewProps = {
  vista: VistaAcceso;
  onCambiarVista: (vista: VistaAcceso) => void;
  onAcceder: () => void;
  onVolver: () => void;
};

export type VistaAcceso =
  | "ingresar"
  | "registro"
  | "verificar"
  | "registrado"
  | "recuperar"
  | "enviado";

function Marca() {
  return (
    <span className="inline-flex items-center gap-3 text-left">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#c8ed69] text-xl font-black text-[#142c2d] shadow-[inset_0_-2px_0_rgba(20,44,45,0.12)]">
        P
      </span>
      <span>
        <strong className="block text-[1.2rem] font-black leading-none tracking-[0.08em] text-[#142c2d]">
          PEDSAR
        </strong>
        <small className="mt-1 block text-[0.58rem] font-semibold tracking-[0.2em] text-[#81908d]">
          APRENDE. AVANZA. TRANSFORMA.
        </small>
      </span>
    </span>
  );
}

export function LoginView({
  vista,
  onCambiarVista,
  onAcceder,
  onVolver,
}: LoginViewProps) {
  const [identificador, setIdentificador] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [recordarme, setRecordarme] = useState(false);
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correoRegistro, setCorreoRegistro] = useState("");
  const [contrasenaRegistro, setContrasenaRegistro] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarContrasenaRegistro, setMostrarContrasenaRegistro] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState<string | null>(null);

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const acceso = identificador.trim().toLowerCase();

    if (!acceso || !contrasena) {
      setError("Completa tu correo o usuario y la contraseña.");
      return;
    }

    const identidadValida =
      acceso === CREDENCIALES_DEMO.usuario ||
      acceso === CREDENCIALES_DEMO.correo;

    if (identidadValida && contrasena === CREDENCIALES_DEMO.contrasena) {
      setError(null);
      onAcceder();
      return;
    }

    setError(
      "No pudimos validar esos datos. Revisa las credenciales e inténtalo nuevamente."
    );
  }

  function recuperar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correoRecuperacion.trim())) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    setError(null);
    onCambiarVista("enviado");
  }

  function usarDemo() {
    setIdentificador(CREDENCIALES_DEMO.correo);
    setContrasena(CREDENCIALES_DEMO.contrasena);
    setError(null);
  }

  function registrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correoRegistro.trim());
    const contrasenaValida =
      contrasenaRegistro.length >= 8 &&
      /[A-Za-z]/.test(contrasenaRegistro) &&
      /\d/.test(contrasenaRegistro);

    if (!nombres.trim() || !apellidos.trim()) {
      setError("Ingresa tus nombres y apellidos.");
      return;
    }
    if (!correoValido) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    if (!contrasenaValida) {
      setError("La contraseña debe tener al menos 8 caracteres, una letra y un número.");
      return;
    }
    if (contrasenaRegistro !== confirmacion) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!aceptaTerminos) {
      setError("Debes aceptar los términos y la política de privacidad.");
      return;
    }

    setCodigo("");
    setError(null);
    onCambiarVista("verificar");
  }

  function verificarRegistro(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (codigo !== "123456") {
      setError("El código no es correcto. Para esta demostración usa 123456.");
      return;
    }
    setError(null);
    onCambiarVista("registrado");
  }

  function abrirRegistro() {
    onCambiarVista("registro");
    setError(null);
  }

  function volverAIngresar() {
    onCambiarVista("ingresar");
    setError(null);
  }

  return (
    <div className="min-h-screen bg-[#f3f7f5] text-[#173132]">
      <header className="border-b border-[#dfe8e4] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onVolver}
            aria-label="Volver al inicio de PEDSAR"
            className="rounded-xl outline-none ring-[#167565]/30 focus-visible:ring-4"
          >
            <Marca />
          </button>
          <button
            type="button"
            onClick={onVolver}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#425452] transition hover:bg-[#f0f5f3] hover:text-[#167565]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Volver al sitio</span>
            <span className="sm:hidden">Volver</span>
          </button>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#143f3c] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -right-28 h-[30rem] w-[30rem] rounded-full border border-[#c8ed69]/15" />
          <div className="absolute right-14 top-24 h-3 w-3 rounded-full bg-[#c8ed69] shadow-[0_0_30px_8px_rgba(200,237,105,0.25)]" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#c8ed69]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Campus virtual PEDSAR
            </span>
            <h1 className="mt-8 max-w-lg text-5xl font-black leading-[1.02] tracking-[-0.05em]">
              Sigue construyendo tu próximo logro.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">
              Accede a tus cursos, revisa tu avance y mantén tus certificados
              disponibles desde un solo lugar.
            </p>
          </div>

          <div className="relative grid gap-3">
            {[
              [BookOpenCheck, "Aprendizaje organizado", "Cursos, materiales y sesiones en una sola ruta."],
              [Award, "Progreso acreditado", "Certificados digitales con validación pública."],
              [ShieldCheck, "Acceso protegido", "Tu información y actividad asociadas a tu cuenta."],
            ].map(([Icono, titulo, texto]) => {
              const Icon = Icono as typeof BookOpenCheck;
              return (
                <div
                  key={String(titulo)}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c8ed69] text-[#173132]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold">{String(titulo)}</h2>
                    <p className="mt-1 text-xs leading-5 text-white/55">{String(texto)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[31rem]">
            {vista === "ingresar" && (
              <div className="rounded-3xl border border-[#dce5e1] bg-white p-6 shadow-[0_24px_70px_rgba(20,44,45,0.09)] sm:p-9">
                <div className="lg:hidden">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7d8] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#315b45]">
                    Campus virtual
                  </span>
                </div>
                <p className="hidden text-xs font-bold uppercase tracking-[0.17em] text-[#167565] lg:block">
                  Acceso a tu cuenta
                </p>
                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#173132] sm:text-4xl">
                  Bienvenido de nuevo
                </h1>
                <p className="mt-3 text-base leading-7 text-[#647471]">
                  Tu próximo aprendizaje te espera.
                </p>

                <form className="mt-8 space-y-5" onSubmit={enviar} noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="identificador" className="text-sm font-semibold text-[#243b3b]">
                      Correo electrónico o usuario
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#778683]" aria-hidden="true" />
                      <Input
                        id="identificador"
                        value={identificador}
                        onChange={(evento) => {
                          setIdentificador(evento.target.value);
                          setError(null);
                        }}
                        placeholder="nombre@correo.com"
                        autoComplete="username"
                        aria-invalid={Boolean(error)}
                        className="h-12 rounded-xl border-[#cbd8d3] pl-12 text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contrasena" className="text-sm font-semibold text-[#243b3b]">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#778683]" aria-hidden="true" />
                      <Input
                        id="contrasena"
                        type={mostrarContrasena ? "text" : "password"}
                        value={contrasena}
                        onChange={(evento) => {
                          setContrasena(evento.target.value);
                          setError(null);
                        }}
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        aria-invalid={Boolean(error)}
                        className="h-12 rounded-xl border-[#cbd8d3] px-12 text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarContrasena((mostrar) => !mostrar)}
                        className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#677774] hover:bg-[#edf4f1] hover:text-[#167565]"
                        aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {mostrarContrasena ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="recordarme"
                        checked={recordarme}
                        onCheckedChange={(estado) => setRecordarme(estado === true)}
                        className="border-[#aebeb8] data-[state=checked]:border-[#167565] data-[state=checked]:bg-[#167565]"
                      />
                      <Label htmlFor="recordarme" className="text-sm font-normal text-[#526360]">
                        Recordar sesión
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onCambiarVista("recuperar");
                        setError(null);
                      }}
                      className="text-sm font-semibold text-[#167565] hover:underline"
                    >
                      Olvidé mi contraseña
                    </button>
                  </div>

                  {error && (
                    <p role="alert" className="rounded-xl border border-[#efcaca] bg-[#fff3f3] px-4 py-3 text-sm leading-5 text-[#9e3535]">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-[#167565] text-base font-bold text-white shadow-[0_10px_25px_rgba(22,117,101,0.18)] hover:bg-[#105f53]"
                  >
                    Ingresar al campus
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>

                <div className="mt-6 rounded-2xl border border-[#d9e5e0] bg-[#f5f9f7] p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e7f3c9] text-[#315b45]">
                      <KeyRound className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#243b3b]">Acceso de demostración</p>
                      <p className="mt-1 break-all text-xs leading-5 text-[#687875]">
                        {CREDENCIALES_DEMO.correo} · {CREDENCIALES_DEMO.contrasena}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={usarDemo}
                      className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#167565] hover:bg-[#e7f1ed]"
                    >
                      Usar datos
                    </button>
                  </div>
                </div>

                <p className="mt-7 text-center text-sm text-[#687875]">
                  ¿Aún no tienes una cuenta?{" "}
                  <button type="button" onClick={abrirRegistro} className="font-bold text-[#167565] hover:underline">
                    Regístrate
                  </button>
                </p>
              </div>
            )}

            {vista === "registro" && (
              <div className="rounded-3xl border border-[#dce5e1] bg-white p-6 shadow-[0_24px_70px_rgba(20,44,45,0.09)] sm:p-9">
                <button
                  type="button"
                  onClick={volverAIngresar}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#167565] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a ingresar
                </button>

                <div className="mt-6 flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e9f5cf] text-[#315b45]">
                    <UserPlus className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#167565]">
                      Nueva cuenta
                    </p>
                    <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#173132]">
                      Empieza a aprender
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-[#647471]">
                      Crea tu perfil para inscribirte y seguir tu progreso.
                    </p>
                  </div>
                </div>

                <form className="mt-7 space-y-5" onSubmit={registrar} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombres" className="text-sm font-semibold text-[#243b3b]">
                        Nombres
                      </Label>
                      <Input
                        id="nombres"
                        value={nombres}
                        onChange={(evento) => {
                          setNombres(evento.target.value);
                          setError(null);
                        }}
                        placeholder="Javier"
                        autoComplete="given-name"
                        className="h-12 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellidos" className="text-sm font-semibold text-[#243b3b]">
                        Apellidos
                      </Label>
                      <Input
                        id="apellidos"
                        value={apellidos}
                        onChange={(evento) => {
                          setApellidos(evento.target.value);
                          setError(null);
                        }}
                        placeholder="Pérez"
                        autoComplete="family-name"
                        className="h-12 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correo-registro" className="text-sm font-semibold text-[#243b3b]">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#778683]" aria-hidden="true" />
                      <Input
                        id="correo-registro"
                        type="email"
                        value={correoRegistro}
                        onChange={(evento) => {
                          setCorreoRegistro(evento.target.value);
                          setError(null);
                        }}
                        placeholder="nombre@correo.com"
                        autoComplete="email"
                        className="h-12 rounded-xl border-[#cbd8d3] pl-12 text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contrasena-registro" className="text-sm font-semibold text-[#243b3b]">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#778683]" aria-hidden="true" />
                      <Input
                        id="contrasena-registro"
                        type={mostrarContrasenaRegistro ? "text" : "password"}
                        value={contrasenaRegistro}
                        onChange={(evento) => {
                          setContrasenaRegistro(evento.target.value);
                          setError(null);
                        }}
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="new-password"
                        className="h-12 rounded-xl border-[#cbd8d3] px-12 text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarContrasenaRegistro((mostrar) => !mostrar)}
                        className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#677774] hover:bg-[#edf4f1] hover:text-[#167565]"
                        aria-label={mostrarContrasenaRegistro ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {mostrarContrasenaRegistro ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs leading-5 text-[#778683]">Usa al menos 8 caracteres, una letra y un número.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmacion" className="text-sm font-semibold text-[#243b3b]">
                      Confirmar contraseña
                    </Label>
                    <Input
                      id="confirmacion"
                      type={mostrarContrasenaRegistro ? "text" : "password"}
                      value={confirmacion}
                      onChange={(evento) => {
                        setConfirmacion(evento.target.value);
                        setError(null);
                      }}
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                      className="h-12 rounded-xl border-[#cbd8d3] text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                    />
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-[#f5f9f7] p-4">
                    <Checkbox
                      id="acepta-terminos"
                      checked={aceptaTerminos}
                      onCheckedChange={(estado) => {
                        setAceptaTerminos(estado === true);
                        setError(null);
                      }}
                      className="mt-0.5 border-[#aebeb8] data-[state=checked]:border-[#167565] data-[state=checked]:bg-[#167565]"
                    />
                    <Label htmlFor="acepta-terminos" className="text-sm font-normal leading-5 text-[#526360]">
                      Acepto los términos de uso y la política de privacidad de PEDSAR.
                    </Label>
                  </div>

                  {error && (
                    <p role="alert" className="rounded-xl border border-[#efcaca] bg-[#fff3f3] px-4 py-3 text-sm leading-5 text-[#9e3535]">
                      {error}
                    </p>
                  )}

                  <Button type="submit" className="h-12 w-full rounded-xl bg-[#167565] text-base font-bold text-white hover:bg-[#105f53]">
                    Crear mi cuenta
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-[#687875]">
                  ¿Ya tienes una cuenta?{" "}
                  <button type="button" onClick={volverAIngresar} className="font-bold text-[#167565] hover:underline">
                    Ingresa aquí
                  </button>
                </p>
              </div>
            )}

            {vista === "verificar" && (
              <div className="rounded-3xl border border-[#dce5e1] bg-white p-7 text-center shadow-[0_24px_70px_rgba(20,44,45,0.09)] sm:p-10">
                <button
                  type="button"
                  onClick={() => {
                    onCambiarVista("registro");
                    setError(null);
                  }}
                  className="flex items-center gap-2 text-sm font-semibold text-[#167565] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Editar datos
                </button>
                <span className="mx-auto mt-7 grid h-16 w-16 place-items-center rounded-full bg-[#e9f5cf] text-[#315b45]">
                  <Mail className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#173132]">
                  Verifica tu correo
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#647471]">
                  Ingresa el código enviado a <strong className="text-[#334947]">{correoRegistro}</strong>.
                </p>

                <form onSubmit={verificarRegistro} className="mt-7" noValidate>
                  <Label htmlFor="codigo-registro" className="sr-only">Código de verificación</Label>
                  <InputOTP
                    id="codigo-registro"
                    maxLength={6}
                    inputMode="numeric"
                    value={codigo}
                    onChange={(valor) => {
                      setCodigo(valor.replace(/\D/g, ""));
                      setError(null);
                    }}
                    containerClassName="justify-center"
                  >
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((indice) => (
                        <InputOTPSlot
                          key={indice}
                          index={indice}
                          className="h-12 w-11 border-[#cbd8d3] text-lg font-bold first:rounded-l-xl last:rounded-r-xl data-[active=true]:border-[#167565] data-[active=true]:ring-[#167565]/20 sm:w-12"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>

                  <div className="mt-5 rounded-xl border border-[#d9e5e0] bg-[#f5f9f7] px-4 py-3 text-sm text-[#526360]">
                    Código de demostración: <strong className="text-[#167565]">123456</strong>
                  </div>

                  {error && (
                    <p role="alert" className="mt-4 rounded-xl border border-[#efcaca] bg-[#fff3f3] px-4 py-3 text-sm leading-5 text-[#9e3535]">
                      {error}
                    </p>
                  )}

                  <Button type="submit" className="mt-5 h-12 w-full rounded-xl bg-[#167565] text-base font-bold text-white hover:bg-[#105f53]">
                    Verificar y crear cuenta
                  </Button>
                </form>

                <button
                  type="button"
                  onClick={() => {
                    setCodigo("");
                    setError(null);
                  }}
                  className="mt-5 text-sm font-semibold text-[#167565] hover:underline"
                >
                  Reenviar código
                </button>
              </div>
            )}

            {vista === "registrado" && (
              <div className="rounded-3xl border border-[#dce5e1] bg-white p-7 text-center shadow-[0_24px_70px_rgba(20,44,45,0.09)] sm:p-10">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e9f5cf] text-[#315b45]">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.17em] text-[#167565]">Registro completado</p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#173132]">
                  ¡Bienvenido, {nombres.trim()}!
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#647471]">
                  Tu cuenta de demostración fue validada. Ya puedes conocer cómo se verá tu campus PEDSAR.
                </p>
                <Button type="button" onClick={onAcceder} className="mt-7 h-12 w-full rounded-xl bg-[#167565] text-base font-bold text-white hover:bg-[#105f53]">
                  Ir al campus de demostración
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <button type="button" onClick={volverAIngresar} className="mt-5 text-sm font-semibold text-[#167565] hover:underline">
                  Volver a iniciar sesión
                </button>
              </div>
            )}

            {vista === "recuperar" && (
              <div className="rounded-3xl border border-[#dce5e1] bg-white p-6 shadow-[0_24px_70px_rgba(20,44,45,0.09)] sm:p-9">
                <button type="button" onClick={volverAIngresar} className="inline-flex items-center gap-2 text-sm font-semibold text-[#167565] hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Volver a ingresar
                </button>
                <span className="mt-8 grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf5f0] text-[#167565]">
                  <KeyRound className="h-6 w-6" aria-hidden="true" />
                </span>
                <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#173132]">
                  Recupera tu acceso
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#647471]">
                  Ingresa el correo asociado a tu cuenta. En el sistema real recibirás un enlace con vigencia limitada.
                </p>
                <form onSubmit={recuperar} className="mt-7 space-y-5" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="correo-recuperacion" className="text-sm font-semibold text-[#243b3b]">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#778683]" />
                      <Input
                        id="correo-recuperacion"
                        type="email"
                        value={correoRecuperacion}
                        onChange={(evento) => {
                          setCorreoRecuperacion(evento.target.value);
                          setError(null);
                        }}
                        placeholder="nombre@correo.com"
                        autoComplete="email"
                        className="h-12 rounded-xl border-[#cbd8d3] pl-12 text-base focus-visible:border-[#167565] focus-visible:ring-[#167565]/20"
                      />
                    </div>
                  </div>
                  {error && <p role="alert" className="rounded-xl border border-[#efcaca] bg-[#fff3f3] px-4 py-3 text-sm text-[#9e3535]">{error}</p>}
                  <Button type="submit" className="h-12 w-full rounded-xl bg-[#167565] text-base font-bold text-white hover:bg-[#105f53]">
                    Enviar enlace de recuperación
                  </Button>
                </form>
              </div>
            )}

            {vista === "enviado" && (
              <div className="rounded-3xl border border-[#dce5e1] bg-white p-7 text-center shadow-[0_24px_70px_rgba(20,44,45,0.09)] sm:p-10">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e9f5cf] text-[#315b45]">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#173132]">Revisa tu correo</h1>
                <p className="mt-3 text-sm leading-6 text-[#647471]">
                  Simulamos el envío de las instrucciones a <strong className="text-[#334947]">{correoRecuperacion}</strong>. No se ha enviado un correo real en esta versión.
                </p>
                <Button type="button" onClick={volverAIngresar} className="mt-7 h-11 rounded-xl bg-[#167565] px-6 text-white hover:bg-[#105f53]">
                  Volver a iniciar sesión
                </Button>
              </div>
            )}

            <p className="mt-6 text-center text-xs leading-5 text-[#7b8986]">
              Al ingresar aceptas los términos de uso y la política de privacidad de PEDSAR.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
