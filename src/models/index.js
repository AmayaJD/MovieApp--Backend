
const Movie = require('./Movies')
const Genre = require('./Genres');
const Director = require('./Directors');
const Actor = require('./Actors');


Movie.belongsToMany(Genre, { through: 'MoviesGenres'});
Genre.belongsToMany(Movie, { through: 'MoviesGenres'});

Movie.belongsToMany(Director, { through: 'MoviesDirectors'});
Director.belongsToMany(Movie, { through: 'MoviesDirectors'});

Movie.belongsToMany(Actor, { through: 'MoviesActors'});
Actor.belongsToMany(Movie, { through: 'MoviesActors'});