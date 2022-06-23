const START_NUMBER = 0;
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

const PopupMode = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const SortType = {
  DEFAULT: 'DEFAULT',
  DATE: 'DATE',
  RATING: 'RATING',
};

const FilterType = {
  ALL: 'ALL',
  WATCH_LIST: 'WATCH_LIST',
  HISTORY: 'HISTORY',
  FAVORITE: 'FAVORITE',
};

const FilterName = {
  all: 'All movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorite: 'Favorites',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

const UrlLink = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

const UserRating = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const RatingNumber = {
  ZERO: 0,
  ONE: 1,
  TEN: 10,
  ELEVEN: 11,
  TWENTY: 20,
  TWENTY_ONE: 21,
};
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  DOUBLE_REPEAT, START_NUMBER,
  TOP_RATED, MOST_COMMENTED, FILMS_COUNT, COMMENTS_COUNT, N_REPEAT, SHAKE_CLASS_NAME,
  SHAKE_ANIMATION_TIMEOUT, AUTHORIZATION, END_POINT, TimeLimit, RatingNumber, UserRating,
  UrlLink, Method, UserAction, UpdateType, FilterName, FilterType, SortType, PopupMode
};
