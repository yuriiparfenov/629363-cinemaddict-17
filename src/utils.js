import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FilterType, UserRating, RatingNumber } from './const';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomNumber = (max, min = 0) => Math.floor((Math.random() * (max - min) + min));
const getRandomItem = (array, min) => array[getRandomNumber(array.length, min)];

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
const transformReleaseDate = (date) => dayjs(date).fromNow();

const compareRatings = (prevElem, nextElem) => nextElem.filmInfo.totalRating - prevElem.filmInfo.totalRating;
const compareDates = (prevElem, nextElem) => dayjs(nextElem.filmInfo.release.date) - dayjs(prevElem.filmInfo.release.date);

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.userDetails.favorite),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.WATCH_LIST]: (films) => films.filter((film) => film.userDetails.watchlist),
};

const getUserRating = (filmsCount) => {
  let userRating = '';

  if (filmsCount >= RatingNumber.ONE && filmsCount <= RatingNumber.TEN) {
    userRating = UserRating.NOVICE;
  }

  if (filmsCount >= RatingNumber.ELEVEN && filmsCount <= RatingNumber.TWENTY) {
    userRating = UserRating.FAN;
  }

  if (filmsCount >= RatingNumber.TWENTY_ONE) {
    userRating = UserRating.MOVIE_BUFF;
  }

  return userRating;
};

export {
  updateFilm, compareRatings, compareDates, transformReleaseYear,
  transformDuration, transformReleaseDate, filter, getUserRating,
  getRandomItem
};
