import { Button } from "@/components/ui/button";

const VALORES = [
  {
    titulo: "Calidad educativa",
    texto:
      "Programas actualizados y orientados a las competencias que demanda el mercado laboral.",
  },
  {
    titulo: "Accesibilidad",
    texto:
      "Modalidades y horarios pensados para estudiantes que trabajan o estudian durante el día.",
  },
  {
    titulo: "Compromiso",
    texto:
      "Acompañamiento constante al estudiante desde la inscripción hasta la obtención de su certificado.",
  },
  {
    titulo: "Innovación",
    texto:
      "Herramientas digitales para la matrícula en línea, el seguimiento académico y la certificación.",
  },
];

const CIFRAS = [
  { valor: "8", etiqueta: "Programas activos" },
  { valor: "+30", etiqueta: "Inscripciones por ciclo" },
  { valor: "100 %", etiqueta: "Certificación digital" },
];

export function NosotrosView({ onVerCursos }: { onVerCursos: () => void }) {
  return (
    <div className="bg-white">
      <section className="border-b border-[#E2E7EC] bg-[#DCE6EF]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-[#1F3A54] sm:text-3xl">
            Nosotros
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#44525F] sm:text-base">
            Conoce a PEDSAR E.I.R.L., el centro de formación detrás del sistema
            de cursos y capacitaciones.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <article className="rounded-lg border border-[#D5DBE1] bg-white p-6">
              <h2 className="text-lg font-bold text-[#1F3A54]">
                ¿Quiénes somos?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#44525F]">
                PEDSAR E.I.R.L. es una empresa dedicada a la formación práctica
                en tecnología, programación y ofimática, dirigida a estudiantes,
                profesionales y equipos de trabajo que buscan fortalecer sus
                competencias digitales. Nuestra oferta combina cursos de corta
                duración con talleres especializados, todos con certificación
                digital de validez verificable.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#44525F]">
                Para acercar nuestros programas a más personas hemos impulsado
                la transformación digital de nuestros procesos: la inscripción,
                el pago y el seguimiento académico se realizan en línea, sin
                trámites en papel ni traslados innecesarios, con la información
                académica centralizada en una base de datos única.
              </p>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-lg border border-[#D5DBE1] bg-white p-6">
                <h2 className="text-base font-bold text-[#2E5F8A]">Misión</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#44525F]">
                  Formar profesionales competitivos mediante cursos y
                  capacitaciones de calidad, accesibles y orientados a la
                  práctica, aprovechando la tecnología para simplificar el
                  acceso a la educación.
                </p>
              </article>
              <article className="rounded-lg border border-[#D5DBE1] bg-white p-6">
                <h2 className="text-base font-bold text-[#2E5F8A]">Visión</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#44525F]">
                  Consolidarnos como un centro de referencia regional en
                  capacitación tecnológica, con procesos totalmente digitales y
                  una comunidad de egresados en constante crecimiento.
                </p>
              </article>
            </div>

            <article className="rounded-lg border border-[#D5DBE1] bg-white p-6">
              <h2 className="text-lg font-bold text-[#1F3A54]">
                Nuestros valores
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {VALORES.map((valor) => (
                  <div key={valor.titulo}>
                    <h3 className="text-sm font-semibold text-[#1F2A36]">
                      {valor.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-[#5C6B7A]">
                      {valor.texto}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="h-fit space-y-4">
            <div className="rounded-lg border border-[#D5DBE1] bg-[#F8FAFB] p-5">
              <h2 className="text-sm font-bold text-[#1F3A54]">
                PEDSAR en cifras
              </h2>
              <dl className="mt-4 space-y-4">
                {CIFRAS.map((cifra) => (
                  <div key={cifra.etiqueta}>
                    <dt className="text-2xl font-bold text-[#2E5F8A]">
                      {cifra.valor}
                    </dt>
                    <dd className="text-xs text-[#5C6B7A]">{cifra.etiqueta}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-lg border border-[#D5DBE1] bg-white p-5">
              <h2 className="text-sm font-bold text-[#1F3A54]">
                Únete a nuestro próximo ciclo
              </h2>
              <p className="mt-2 text-sm text-[#5C6B7A]">
                Revisa la oferta vigente e inscríbete en línea desde cualquier
                dispositivo.
              </p>
              <Button
                type="button"
                onClick={onVerCursos}
                className="mt-4 w-full bg-[#2E5F8A] text-white hover:bg-[#27527A]"
              >
                Ver cursos disponibles
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
