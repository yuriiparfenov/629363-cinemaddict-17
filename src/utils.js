import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FILTER_TYPE, USER_RATING, RATING_NUMBER } from './const';

dayjs.extend(duration);

const getRandomNumber = (max, min = 0) => Math.floor((Math.random() * (max - min) + min));
const getRandomArrayItem = (array, min) => array[getRandomNumber(array.length, min)];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const updateFilm = (films, update) => {
  const index = films.findIndex((film) => film.id === update.id);

  if (index === -1) {
    return films;
  }

  return [
    ...films.slice(0, index),
    update,
    ...films.slice(index + 1),
  ];
};

const transformReleaseYear = (year) => dayjs(year).format('YYYY');
const transformDuration = (min) => dayjs.duration(min, 'minutes').format('H[h] mm[m]');
const transformReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

const compareRatings = (prevElem, nextElem) => nextElem.filmInfo.totalRating - prevElem.filmInfo.totalRating;
const compareDates = (prevElem, nextElem) => dayjs(nextElem.filmInfo.release.date) - dayjs(prevElem.filmInfo.release.date);

const filter = {
  [FILTER_TYPE.ALL]: (films) => films,
  [FILTER_TYPE.FAVORITE]: (films) => films.filter((film) => film.userDetails.favorite),
  [FILTER_TYPE.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FILTER_TYPE.WATCH_LIST]: (films) => films.filter((film) => film.userDetails.watchlist),
};

const getUserRating = (filmsCount) => {
  let userRating = '';

  if (filmsCount >= RATING_NUMBER.ONE && filmsCount <= RATING_NUMBER.TEN) {
    userRating = USER_RATING.NOVICE;
  }

  if (filmsCount >= RATING_NUMBER.ELEVEN && filmsCount <= RATING_NUMBER.TWENTY) {
    userRating = USER_RATING.FAN;
  }

  if (filmsCount >= RATING_NUMBER.TWENTY_ONE) {
    userRating = USER_RATING.MOVIE_BUFF;
  }

  return userRating;
};

export {
  getRandomNumber, getRandomArrayItem, months, updateFilm, compareRatings, compareDates, transformReleaseYear,
  transformDuration, transformReleaseDate, filter, getUserRating
};
