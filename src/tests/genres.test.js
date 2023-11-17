const request = require('supertest');
const app = require('../app');

let id;

test('Get /genres debe traer todos los generos que estan en la base datos.', async () => {
    const res = await request(app).get('/genres');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test('Post /genres debe crear un nuevo genero en la base de datos ', async () => {
    const genre = {
        name: "Action",
    };
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

test('Put /genres/:id debe actualizar un genero con el id indicado', async () => {
    const genre = {
        name: 'Aventure',
    };
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test('delete /genres/:id debe eleminar un genero de la base de datos', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});