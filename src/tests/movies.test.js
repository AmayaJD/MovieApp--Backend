const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actors');
const Director = require('../models/Directors');
const Genre = require('../models/Genres');
require('../models')

let id;

test('Get /movies debe traer todos las peliculas que estan en la base datos.', async () => {
    const res = await request(app).get('/movies');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test('Post /movies debe crear una pelicula en la base de datos ', async () => {
    const movie = {
        name: "The Wolf Of The Wall Street",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRdr0LmNzcemZet29M9KHI353av2D6E8m_ECbhGB124QauUM-jK",
        synopsis: "is a 2013 American biographical crime black comedy film directed by Martin Scorsese and written by Terence Winter, based on Jordan Belfort's 2007 memoir of the same name. It chronicles Belfort's career as a stockbroker in New York City and how his firm, Stratton Oakmont, He became rampant in corruption and fraud on Wall Street, leading to his downfall. Leonardo DiCaprio, who also produced the film, stars as Belfort, with Jonah Hill as his partner and friend Donnie Azoff, Margot Robbie as his second wife Naomi Lapaglia, and Kyle Chandler as FBI agent Patrick Denham.",
        releaseYear: 2013,
    };
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('Put /movies/:id debe actualizar los datos de una pelicula con el id indicado', async () => {
    const movie = {
        name: "Harry Potther and the Deathly Hallows - Part 1",
    };
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors este enpoints debe setear los actores de la pelicula', async () => {
    const actor = await Actor.create({
        firstName: "Keanu",
        lastName: "Reeves",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Keanu_Reeves_2019.jpg/800px-Keanu_Reeves_2019.jpg",
        birthday: "1964-09-02",
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    // console.log(res.body);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors este enpoints debe setear los directores de la pelicula', async () => {
    const director = await Director.create({
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Martin_Scorsese_MFF_2023.jpg/800px-Martin_Scorsese_MFF_2023.jpg",
        birthday: "1942-11-17",
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    // console.log(res.body);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres este enpoints debe setear los generos de la pelicula', async () => {
    const genre = await Genre.create({
        name: 'fiction'
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    console.log(res.body);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('Delete /movies/:id debe eleminar una pelicula de la base de datos con el id indicado', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});