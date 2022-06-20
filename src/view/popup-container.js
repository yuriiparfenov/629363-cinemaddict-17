import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import he from 'he';
import { transformDuration, transformReleaseDate } from '../utils';

const renderFilmComment = (commentsArray) => (commentsArray.map((elem) => `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${elem.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${elem.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${elem.author}</span>
        <span class="film-details__comment-day">${transformReleaseDate(elem.date)}</span>
        <button class="film-details__comment-delete ${elem.id}" data-id=${elem.id}>Delete</button>
      </p>
    </div>
  </li>
`).join(' '));

const createPopupContainerTemplate = ({ filmInfo, userDetails, filmCommentEmotion, textComment, isDisabled }, filmComments) => {
  const { title, totalRating, writers, actors, release, runtime, poster, description, ageRating, alternativeTitle, director } = filmInfo;
  const commentsArray = filmComments;

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./${poster}" alt="${title}">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${transformReleaseDate(release.date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${transformDuration(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${release.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              <span class="film-details__genre">Drama</span>
              <span class="film-details__genre">Film-Noir</span>
              <span class="film-details__genre">Mystery</span></td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${userDetails.watchlist && 'film-details__control-button--active'}" ${isDisabled ? 'disabled' : ''} id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched && 'film-details__control-button--active'}" ${isDisabled ? 'disabled' : ''} id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite && 'film-details__control-button--active'}" ${isDisabled ? 'disabled' : ''} id="favorite" name="favorite">Add to favorites</button>
    </section>
    </div>

    <div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsArray.length}</span></h3>

    <ul class="film-details__comments-list">
      ${renderFilmComment(commentsArray)}
    </ul>

    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${filmCommentEmotion ? `<img src="images/emoji/${filmCommentEmotion}.png" width="55" height="55" alt="emoji-smile">` : ''}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(textComment)}</textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${filmCommentEmotion === 'smile' && 'checked'}>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${filmCommentEmotion === 'sleeping' && 'checked'}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${filmCommentEmotion === 'puke' && 'checked'}>
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${filmCommentEmotion === 'angry' && 'checked'}>
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>
</div>

    </form>
  </section>`);
};

export default class PopupContainerView extends AbstractStatefulView {
  #filmComments = null;
  #commentsModel = null;

  constructor(film, comments, commentsModel) {
    super();
    this.#filmComments = comments;
    this._state = PopupContainerView.parseFilmEmotionToState(film, comments);
    this.setCommentHandler();
    this.#commentsModel = commentsModel;
  }

  get template() {
    return createPopupContainerTemplate(this._state, this.#filmComments);
  }

  setCloseClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setHistoryClickHandler = (callback) => {
    this._callback.whatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#whatchedClickHandler);
  };

  setWhatchlistClickHandler = (callback) => {
    this._callback.addToWatchClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchClickHandler);
  };

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    const deleteButton = this.element.querySelectorAll('.film-details__comment-delete');
    deleteButton.forEach((button) => button.addEventListener('click', this.#deleteCommentClickHandler));
  };

  setAddCommentCLickHandler = (callback) => {
    this._callback.addCommentClick = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#addCommentHandler);
  };

  setCommentHandler = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#filmCommentEmotionHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#filmInputCommentHandler);
  };

  _restoreHandlers = () => {
    this.setCommentHandler();
    this.setCloseClickHandler(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setHistoryClickHandler(this._callback.whatchedClick);
    this.setWhatchlistClickHandler(this._callback.addToWatchClick);
    this.setDeleteCommentClickHandler(this._callback.deleteCommentClick);
    this.setAddCommentCLickHandler(this._callback.addCommentClick);
  };

  static parseFilmEmotionToState = (film, comments) => ({
    ...film,
    filmCommentEmotion: '',
    textComment: '',
    allComments: comments,
    isDeletingComment: false,
    isAddingComment: false,
    isDisabled: false,
  });

  static parseStateToFilm = (state) => {
    const film = { ...state };
    this.#filmComments = this._state.allComments;

    return film;
  };

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    const commentId = Number(evt.target.dataset.id);
    const commentIndex = this._state.comments.findIndex((id) => Number(id) === commentId);
    this._callback.deleteCommentClick(commentIndex);
    this.updateElement({
      isDeletingComment: true,
    });
    this.element.querySelector(`button[data-id='${commentId}']`).textContent = 'Deleting...';
  };

  #filmCommentEmotionHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      filmCommentEmotion: evt.target.value,
    });
  };

  #filmInputCommentHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      textComment: evt.target.value,
    });
  };

  #addCommentHandler = (evt) => {
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 13 && this._state.filmCommentEmotion) {
      this._callback.addCommentClick({
        comment: this._state.textComment,
        emotion: this._state.filmCommentEmotion,
      });
      this.updateElement({
        isAddingComment: true,
      });
    }
  };

  reset = (film) => {
    this.updateElement(PopupContainerView.parseFilmEmotionToState(film));
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
}
