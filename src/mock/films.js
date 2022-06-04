import { getRandomArrayItem, getRandomNumber, months } from '../utils';

const titles = ['Made for each other', 'Popeye meets Sindbad', 'Sagebrush trail', 'Santa Claus conquers the martians', 'The dance of life', 'The great flamation', 'The man with the golden arm'];
const pictures = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];
const genres = ['Musical', 'Western', 'Drama', 'Comedy', 'Cartoon'];
const directors = ['Antony Mann', 'Antony Breeze', 'Mark Besplov', 'Klint Istvood', 'Peter John'];
const writers = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Big Ben', 'Pur Pur', 'China Man'];
const actors = ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea', 'Will Smith', 'Alen Delon', '2pac Shakur'];
const countries = ['USA', 'Russia', 'China'];
const descriptions = ['The film opens following a murder', 'at a cabaret in Mexico City in 1936', 'and then presents the events leading up to it in flashback.', 'The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant', 'Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion\'s other assistant. Flamarion falls in love with Connie, the movie\'s femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts'];

const generateFilm = (id, comments) => ({
  id: id,
  comments: Array.from({ length: getRandomNumber(0, comments.length) }, () => getRandomNumber(0, 20)),
  filmInfo: {
    title: getRandomArrayItem(titles),
    alternativeTitle: getRandomArrayItem(titles),
    totalRating: getRandomNumber(10, 1).toFixed(1),
    poster: pictures[Math.round(Math.random() * (pictures.length - 1))],
    ageRating: getRandomNumber(18, 0),
    director: getRandomArrayItem(directors, 1),
    writers: writers.slice(0, getRandomNumber(writers.length, 1)),
    actors: actors.slice(0, getRandomNumber(actors.length, 1)),
    release: {
      date: `${getRandomNumber(30, 1)} ${getRandomArrayItem(months)} ${getRandomNumber(2000, 1920)}`,
      releaseCountry: getRandomArrayItem(countries, 1),
    },
    runtime: getRandomNumber(200, 50),
    genre: getRandomArrayItem(genres),
    year: getRandomNumber(2000, 1900),
    duration: '1h 55m',
    description: descriptions.slice(0, getRandomNumber(descriptions.length, 1)).join(' '),
  },
  userDetails: {
    watchList: Boolean(getRandomNumber(2, -1)),
    alreadyWatched: Boolean(getRandomNumber(2, -1)),
    watchingDate: `${getRandomNumber(30, 1)} ${getRandomArrayItem(months)} ${getRandomNumber(2022, 2020)}`,
    favorite: Boolean(getRandomNumber(2, -1)),
  },
});

export const generateQuantityFilms = (count, comments = []) => Array.from({ length: count }).map((item, id) => generateFilm(id, comments));
