import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { transformReleaseYear, transformDuration } from '../utils';

const createFilmsCardTemplate = (state, film, randomGenre) => {
  const { title, totalRating, release, runtime, poster, description } = film.filmInfo;
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const comments = film.comments;
  const { isDisabled } = state;
  return (
    `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${transformReleaseYear(release.date)}</span>
            <span class="film-card__duration">${transformDuration(runtime)}</span>
            <span class="film-card__genre">${randomGenre}</span>
          </p>
          <img src="./${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? `${description.substr(0, 139)}...` : description}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist && 'film-card__controls-item--active'}" type="button" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched && 'film-card__controls-item--active'}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favorite && 'film-card__controls-item--active'}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as favorite</button>
        </div>
      </article>`);
};

export default class FilmsCardView extends AbstractStatefulView {
  #film = null;
  #randomGenre = null;

  constructor(film, randomGenre) {
    super();
    this.#film = film;
    this.#randomGenre = randomGenre;
    this._state = FilmsCardView.parseFilmToState(film);
  }

  get template() {
    return createFilmsCardTemplate(this._state, this.#film, this.#randomGenre);
  }

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setHistoryClickHandler(this._callback.whatchedClick);
    this.setWhatchlistClickHandler(this._callback.addToWatchClick);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setHistoryClickHandler = (callback) => {
    this._callback.whatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#whatchedClickHandler);
  };

  setWhatchlistClickHandler = (callback) => {
    this._callback.addToWatchClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.favoriteClick();
    this.updateElement({
      isDisabled: true,
    });
  };

  #whatchedClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.whatchedClick();
    this.updateElement({
      isDisabled: true,
    });
  };

  #addToWatchClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.addToWatchClick();
    this.updateElement({
      isDisabled: true,
    });
  };

  static parseFilmToState = (film) => ({
    ...film,
    isDisabled: false,
  });
}
