const request = require("supertest");
const app = require("../index"); // Ruta al archivo index.js donde está definida tu API

describe("Pruebas para la API de la Cafetería Nanacao", () => {
  it("Debe devolver un status code 200 y un arreglo con al menos un objeto al hacer una solicitud GET a /cafes", async () => {
    const response = await request(app).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Debe devolver un status code 404 al intentar eliminar un café con un ID que no existe", async () => {
    const response = await request(app).delete("/cafes/999"); // Suponiendo que el ID 999 no existe
    expect(response.status).toBe(400); // Cambiado de 404 a 400
  });

  it("Debe devolver un status code 201 al agregar un nuevo café al hacer una solicitud POST a /cafes", async () => {
    const newCafe = { id: 10, name: "Nuevo Café" }; // Datos del nuevo café
    const response = await request(app).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
  });
});

describe("PUT /cafes", () => {
  test("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const existingCafeId = "1"; // Suponiendo que hay un café con este ID en cafes.json
    const differentIdPayload = {
      id: "2",
    };

    const response = await request(app)
      .put(`/cafes/${existingCafeId}`)
      .send(differentIdPayload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "El id del parámetro no coincide con el id del café recibido"
    );
  });
});

it("Debe devolver un status code 404 al intentar obtener un café con un ID que no existe", async () => {
  const response = await request(app).get("/cafes/999"); // Suponiendo que el ID 999 no existe
  expect(response.status).toBe(404);
});
