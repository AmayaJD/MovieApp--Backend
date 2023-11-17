const request = require('supertest');
const app = require('../app');

let id;

test('Get /directors debe traer todos los directores que estan en la base datos.', async () => {
    const res = await request(app).get('/directors');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test('Post /directors debe crear un nuevo director en la base de datos ', async () => {
    const director = {
        firstName: "David",
        lastName: "Yates",
        nationality: "British",
        image: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQWqIeMI-wdMhtAERmScPYe8bEbGIxyyYAjQKLZv8MDAXrsyx1pFC55H2PPPT5lpzHE",
        birthday: "1963-10-08"
    };
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(director.name);
    expect(res.body.id).toBeDefined();
});

test('Put /directors/:id debe actualizar los datos de un director con el id indicado', async () => {
    const director = {
        "nationality": "American",
    };
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);
});

test('delete /directors/:id debe eleminar un director de la base de datos con el id indicado', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});