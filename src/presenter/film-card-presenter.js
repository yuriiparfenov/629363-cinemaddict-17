import { PopupMode, UpdateType, UserAction, SHAKE_CLASS_NAME, SHAKE_ANIMATION_TIMEOUT } from '../const';
import { render, remove, replace } from '../framework/render';
import { getRandomItem } from '../utils';
import FilmsCardView from '../view/film-card';
import PopupContainerView from '../view/popup-container';

export default class FilmCardPresenter {
  #film = null;
  #filmListContainerElement = null;
  #filmElement = null;
  #popUpElement = null;
  #changeFilm = null;
  #changeMode = null;
  #popupMode = PopupMode.CLOSED;
  #filmComments = null;
  #commentsModel = null;
  #randomGenre = null;

  constructor(filmListContainerElement, changeFilm, changeMode, commentsModel) {
    this.#filmListContainerElement = filmListContainerElement;
    this.#changeFilm = changeFilm;
    this.#changeMode = changeMode;
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    this.#film = film;
    this.#randomGenre = getRandomItem(this.#film.filmInfo.genre);
    const prevPopupComments = this.#commentsModel.comments || [];

    const prevFilmElement = this.#filmElement;
    const prevPopUpElement = this.#popUpElement;

    this.#filmElement = new FilmsCardView(this.#film, this.#randomGenre);
    this.#popUpElement = new PopupContainerView(this.#film, prevPopupComments, this.#randomGenre);

    this.#filmElement.setClickHandler(this.#clickOpenPopUpHandler);
    this.#filmElement.setFavoriteClickHandler(this.#favoriteFilmHandle);
    this.#filmElement.setHistoryClickHandler(this.#whatchedFilmHandle);
    this.#filmElement.setWhatchlistClickHandler(this.#addWatchListHandle);

    if (prevFilmElement === null || prevPopUpElement === null) {
      render(this.#filmElement, this.#filmListContainerElement);
      return;
    }

    if (this.#popupMode === PopupMode.CLOSED) {
      replace(this.#filmElement, prevFilmElement);
    }

    if (this.#popupMode === PopupMode.OPEN) {
      replace(this.#popUpElement, prevPopUpElement);
      replace(this.#filmElement, prevFilmElement);
      this.#popUpElement.setCloseClickHandler(this.#clickClosePopupHandler);
      this.#popUpElement.setFavoriteClickHandler(this.#favoriteFilmHandle);
      this.#popUpElement.setHistoryClickHandler(this.#whatchedFilmHandle);
      this.#popUpElement.setWhatchlistClickHandler(this.#addWatchListHandle);
      this.#popUpElement.setDeleteCommentClickHandler(this.#deleteFilmCommentHandle);
      this.#popUpElement.setAddCommentCLickHandler(this.#addFilmCommentHandle);
    }

    remove(prevFilmElement);
    remove(prevPopUpElement);
  };

  destroy = () => {
    remove(this.#filmElement);
    remove(this.#popUpElement);
  };

  resetView = () => {
    if (this.#popupMode !== PopupMode.CLOSED && document.body.contains(this.#popUpElement.element)) {
      this.#clickClosePopupHandler();
      this.#popUpElement.reset(this.#film);
    }
  };

  setSaving = () => {
    this.#popUpElement.updateElement({
      isDisabled: true,
    });
    this.#filmElement.updateElement({
      isDisabled: true,
    });
  };

  setDeleting = () => {
    this.#popUpElement.updateElement({
      isDisabled: true,
    });

    render(this.#popUpElement, document.body);
  };

  setAborting = () => {
    const resetFilmState = () => {
      this.#filmElement.updateElement({
        isDisabled: false,
      });
    };

    if (document.body.contains(this.#popUpElement.element)) {
      this.#popUpElement.updateElement({
        isDisabled: false,
      });
      document.querySelector('.film-details__inner').classList.add(SHAKE_CLASS_NAME);
      setTimeout(() => {
        document.querySelector('.film-details__inner').classList.remove(SHAKE_CLASS_NAME);
      }, SHAKE_ANIMATION_TIMEOUT);
    } else {
      this.#filmElement.shake(resetFilmState);
    }

    render(this.#popUpElement, document.body);
  };

  #clickOpenPopUpHandler = async () => {
    if (this.#popupMode === PopupMode.OPEN) {
      return;
    }

    this.#changeMode();
    await this.#commentsModel.init(this.#film);
    this.#filmComments = this.#commentsModel.comments;
    this.#popupMode = PopupMode.OPEN;
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscCloseHandle);

    this.#popUpElement = new PopupContainerView(this.#film, this.#filmComments, this.#randomGenre);
    this.#showPopupHandle();
    this.#popUpElement.setCloseClickHandler(this.#clickClosePopupHandler);
    this.#popUpElement.setFavoriteClickHandler(this.#favoriteFilmHandle);
    this.#popUpElement.setHistoryClickHandler(this.#whatchedFilmHandle);
    this.#popUpElement.setWhatchlistClickHandler(this.#addWatchListHandle);
    this.#popUpElement.setDeleteCommentClickHandler(this.#deleteFilmCommentHandle);
    this.#popUpElement.setAddCommentCLickHandler(this.#addFilmCommentHandle);

    this.#popUpElement.updateElement({
      isDisabled: false,
    });
  };

  #clickClosePopupHandler = () => {
    this.#closePopupHandle();
    this.#popupMode = PopupMode.CLOSED;
    document.removeEventListener('keydown', this.#onEscCloseHandle);
    this.#filmElement.updateElement({
      isDisabled: false,
    });
  };

  #closePopupHandle = () => {
    remove(this.#popUpElement);
    document.body.classList.remove('hide-overflow');
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
    this.#changeFilm(
      UserAction.UPDATE_FILM,
      this.#popupMode === PopupMode.OPEN ? UpdateType.PATCH : UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite,
        }
      });
  };

  #whatchedFilmHandle = () => {
    this.#changeFilm(
      UserAction.UPDATE_FILM,
      this.#popupMode === PopupMode.OPEN ? UpdateType.PATCH : UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched,
        }
      });
  };

  #addWatchListHandle = () => {
    this.#changeFilm(
      UserAction.UPDATE_FILM,
      this.#popupMode === PopupMode.OPEN ? UpdateType.PATCH : UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist,
        }
      });
  };

  #deleteFilmCommentHandle = async (index, commentId) => {
    await this.#commentsModel.deleteComment(UpdateType.PATCH, this.#film, commentId, index);
    this.#changeFilm(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#film,
        comments: [
          ...this.#film.comments.slice(0, index),
          ...this.#film.comments.slice(index + 1),
        ]
      },
    );
  };

  #addFilmCommentHandle = async (addComment) => {
    await this.#commentsModel.addComment(UpdateType.PATCH, this.#film, addComment);
    const commentedFilm = this.#commentsModel.comments;
    const newFilmsComment = [];
    commentedFilm.forEach((item) => newFilmsComment.push(item.id));
    this.#changeFilm(
      UserAction.ADD_COMMENT,
      this.#popupMode === PopupMode.OPEN ? UpdateType.PATCH : UpdateType.MINOR,
      {
        ...this.#film,
        comments: [
          ...newFilmsComment,
        ]
      },
    );
  };
}
