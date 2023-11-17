const request = require('supertest');
const app = require('../app');

let id;

test('Get /actors debe traer todos los actores que estan en la base datos.', async () => {
    const res = await request(app).get('/actors');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test('Post /actors debe crear un nuevo actor en la base de datos ', async () => {
    const actor = {
        firstName: "Leonardo",
        lastName: "Dicaprio",
        nationality: "American",
        image: "https://cdn.britannica.com/65/227665-050-D74A477E/American-actor-Leonardo-DiCaprio-2016.jpg",
        birthday: "1977-11-11"
    };
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});

test('Put /actors/:id debe actualizar los datos de un actor con el id indicado', async () => {
    const actor = {
        firstName: 'Johnny'
    };
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});

test('delete /actors/:id debe eleminar un actor de la base de datos con el id indicado', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});