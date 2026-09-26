import test from "node:test";
import assert from "node:assert/strict";
import { resumenPanel, fechaInscripcion } from "../src/lib/panel-metrics.ts";

const curso = { id: "react", nombre: "React", modalidad: "Virtual", vacantes: 12 };
const inscripcion = (id, fecha, correo, estado = "Confirmada", monto = 250) => ({ id, fecha, correo, estado, monto, curso: "React" });

test("los importes excluyen pendientes y los estudiantes no se duplican", () => {
  const datos = [inscripcion("1", "12/09/2026", "Alumno@correo.com"), inscripcion("2", "13/09/2026", " alumno@correo.com ", "Pendiente", 180)];
  const resultado = resumenPanel([curso], datos);
  assert.equal(resultado.estudiantes, 1);
  assert.equal(resultado.ingresos, 250);
  assert.equal(resultado.montoPendiente, 180);
  assert.equal(resultado.confirmadas, 1);
  assert.equal(resultado.pendientes, 1);
  assert.equal(resultado.demanda[0].cantidad, 2);
  assert.equal(resultado.modalidades[0].cantidad, 1);
});

test("agrupa por mes al cruzar de año y llena con cero meses sin registros", () => {
  const datos = [inscripcion("1", "31/12/2025", "a@correo.com"), inscripcion("2", "01/02/2026", "b@correo.com")];
  const resultado = resumenPanel([curso], datos, 3);
  assert.deepEqual(resultado.serie.map(({ clave, cantidad }) => [clave, cantidad]), [["2025-12", 1], ["2026-1", 0], ["2026-2", 1]]);
  assert.equal(resultado.recientes[0].id, "2");
  assert.equal(datos[0].id, "1");
});

test("maneja panel vacío sin cifras o meses inventados", () => {
  const resultado = resumenPanel([], []);
  assert.equal(resultado.ingresos, 0);
  assert.equal(resultado.estudiantes, 0);
  assert.deepEqual(resultado.serie, []);
  assert.deepEqual(resultado.demanda, []);
});

test("rechaza fechas inexistentes e incluye correctamente años bisiestos", () => {
  assert.equal(fechaInscripcion("31/02/2026"), null);
  assert.equal(fechaInscripcion("no es una fecha"), null);
  assert.equal(fechaInscripcion("29/02/2024"), Date.UTC(2024, 1, 29));
});

test("actualiza métricas y demanda al agregar una inscripción", () => {
  const datos = [inscripcion("1", "12/09/2026", "a@correo.com")];
  const resultado = resumenPanel([curso], [...datos, inscripcion("2", "13/09/2026", "b@correo.com", "Confirmada", 100)]);
  assert.equal(resultado.estudiantes, 2);
  assert.equal(resultado.ingresos, 350);
  assert.equal(resultado.serie.at(-1).cantidad, 2);
  assert.equal(resultado.demanda[0].cantidad, 2);
});
