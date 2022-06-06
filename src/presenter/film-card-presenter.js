import { POPUP_MODE } from '../const';
import { render, remove, replace } from '../framework/render';
import FilmsCardView from '../view/film-card';
import PopupContainerView from '../view/popup-container';

export default class FilmCardPresenter {
  #film = null;
  #filmListContainerElement = null;
  #filmElement = null;
  #popUpElement = null;
  #changeFilm = null;
  #changeMode = null;
  #popupMode = POPUP_MODE.CLOSED;
  #filmComments = null;

  constructor(filmListContainerElement, changeFilm, changeMode, comments) {
    this.#filmListContainerElement = filmListContainerElement;
    this.#changeFilm = changeFilm;
    this.#changeMode = changeMode;
    this.#filmComments = comments;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmElement = this.#filmElement;
    const prevPopUpElement = this.#popUpElement;

    this.#filmElement = new FilmsCardView(film, this.#filmComments);
    this.#popUpElement = new PopupContainerView(film, this.#filmComments);

    this.#filmElement.setClickHandler(this.#clickOpenPopUpHandler);
    this.#filmElement.setFavoriteClickHandler(this.#favoriteFilmHandle);
    this.#filmElement.setHistoryClickHandler(this.#whatchedFilmHandle);
    this.#filmElement.setWhatchlistClickHandler(this.#addWatchListHandle);

    this.#popUpElement.setCloseClickHandler(this.#clickClosePopupHandler);
    this.#popUpElement.setFavoriteClickHandler(this.#favoriteFilmHandle);
    this.#popUpElement.setHistoryClickHandler(this.#whatchedFilmHandle);
    this.#popUpElement.setWhatchlistClickHandler(this.#addWatchListHandle);

    if (prevFilmElement === null || prevPopUpElement === null) {
      render(this.#filmElement, this.#filmListContainerElement);
      return;
    }

    if (this.#popupMode === POPUP_MODE.CLOSED) {
      replace(this.#filmElement, prevFilmElement);
    }

    if (this.#popupMode === POPUP_MODE.OPEN) {
      replace(this.#filmElement, prevFilmElement);
      replace(this.#popUpElement, prevPopUpElement);
    }

    remove(prevFilmElement);
    remove(prevPopUpElement);
  };

  destroy = () => {
    remove(this.#filmElement);
    remove(this.#popUpElement);
  };

  resetView = () => {
    if (this.#popupMode !== POPUP_MODE.CLOSED) {
      this.#clickClosePopupHandler();
    }
  };

  #clickOpenPopUpHandler = () => {
    this.#changeMode();
    this.#showPopupHandle();
    this.#popupMode = POPUP_MODE.OPEN;
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscCloseHandle);

    this.#popUpElement.setCloseClickHandler(this.#clickClosePopupHandler);
    this.#popUpElement.setFavoriteClickHandler(this.#favoriteFilmHandle);
    this.#popUpElement.setHistoryClickHandler(this.#whatchedFilmHandle);
    this.#popUpElement.setWhatchlistClickHandler(this.#addWatchListHandle);
  };

  #clickClosePopupHandler = () => {
    this.#closePopupHandle();
    this.#popupMode = POPUP_MODE.CLOSED;
    document.removeEventListener('keydown', this.#onEscCloseHandle);
    document.body.classList.remove('hide-overflow');
  };

  #closePopupHandle = () => {
    remove(this.#popUpElement);
  };

  #onEscCloseHandle = (evt) => {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      evt.preventDefault();
      this.#closePopupHandle();
    }
  };

  #showPopupHandle = () => {
    render(this.#popUpElement, document.body);
  };

  #favoriteFilmHandle = () => {
    this.#changeFilm({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      }
    });
  };

  #whatchedFilmHandle = () => {
    this.#changeFilm({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      }
    });
  };

  #addWatchListHandle = () => {
    this.#changeFilm({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchList: !this.#film.userDetails.watchList,
      }
    });
  };
}
