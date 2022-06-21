const START_NUMBER_ARRAY = 0;
const DOUBLE_REPEAT = 2;
const TOP_RATED = 'Top rated';
const MOST_COMMENTED = 'Most commented';
const FILMS_COUNT = 20;
const COMMENTS_COUNT = 20;
const N_REPEAT = 5;
const AUTHORIZATION = 'Basic 5dilinwarcraft34';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

const POPUP_MODE = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const SORT_TYPE = {
  DEFAULT: 'DEFAULT',
  DATE: 'DATE',
  RATING: 'RATING',
};

const FILTER_TYPE = {
  ALL: 'ALL',
  WATCH_LIST: 'WATCH_LIST',
  HISTORY: 'HISTORY',
  FAVORITE: 'FAVORITE',
};

const FILTER_NAME = {
  all: 'All movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorite: 'Favorites',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const USER_ACTION = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

const URL_LINK = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

const USER_RATING = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const RATING_NUMBER = {
  ZERO: 0,
  ONE: 1,
  TEN: 10,
  ELEVEN: 11,
  TWENTY: 20,
  TWENTY_ONE: 21,
};
const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  DOUBLE_REPEAT, START_NUMBER_ARRAY,
  TOP_RATED, MOST_COMMENTED, FILMS_COUNT, COMMENTS_COUNT, N_REPEAT, POPUP_MODE,
  SORT_TYPE, FILTER_TYPE, UPDATE_TYPE, USER_ACTION, FILTER_NAME, METHOD, URL_LINK,
  AUTHORIZATION, END_POINT, USER_RATING, RATING_NUMBER, TIME_LIMIT, SHAKE_CLASS_NAME,
  SHAKE_ANIMATION_TIMEOUT
};
