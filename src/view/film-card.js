import AbstractView from '../framework/view/abstract-view';
import { transformReleaseYear, transformDuration } from '../utils';

const createFilmsCardTemplate = (film, filmComments) => {
  const { title, totalRating, release, runtime, genre, poster, description } = film.filmInfo;
  const { watchList, alreadyWatched, favorite } = film.userDetails;
  const commentsArray = filmComments;
  return (
    `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${transformReleaseYear(release.date)}</span>
            <span class="film-card__duration">${transformDuration(runtime)}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? `${description.substr(0, 139)}...` : description}</p>
          <span class="film-card__comments">${commentsArray.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchList && 'film-card__controls-item--active'}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched && 'film-card__controls-item--active'}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favorite && 'film-card__controls-item--active'}" type="button">Mark as favorite</button>
        </div>
      </article>`);
};

export default class FilmsCardView extends AbstractView {
  #film = null;
  #filmComments = null;

  constructor(film, filmComments) {
    super();
    this.#film = film;
    this.#filmComments = filmComments;
  }

  get template() {
    return createFilmsCardTemplate(this.#film, this.#filmComments);
  }

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
  };

  #whatchedClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.whatchedClick();
  };

  #addToWatchClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.addToWatchClick();
  };
}
