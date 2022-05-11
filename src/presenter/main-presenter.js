import { render } from '../render';
import NavigationView from '../view/navigation';
import SortingView from '../view/sorting';
import FilmsMainContainerView from '../view/films-main-container';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';
import FilmsCardView from '../view/film-card';
import TopRatedFilmsView from '../view/top-rated-films';
import MostCommentedFilmsView from '../view/most-commented-films';
import PopupContainerView from '../view/popup-container';
import FilmsEmptyView from '../view/films-empty';
import { START_NUMBER_ARRAY, DOUBLE_REPEAT, N_REPEAT } from '../const';

export default class MainPresenter {
  filmsListMainContainer = new FilmsMainContainerView();
  filmsList = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();
  filmsListExtraRated = new TopRatedFilmsView();
  filmsListRatedContainer = new FilmsListContainerView();
  filmsListExtraCommented = new MostCommentedFilmsView();
  filmsListCommentedContainer = new FilmsListContainerView();
  #showButton = new ShowMoreButtonView();
  #element = null;
  #films = null;


  init = (element, films) => {
    this.#element = element;
    this.#films = films;

    render(new NavigationView(films), this.#element);
    render(new SortingView(), this.#element);
    render(this.filmsListMainContainer, this.#element);
    render(this.filmsList, this.filmsListMainContainer.element);
    render(this.filmsListContainer, this.filmsList.element);

    let firstFilmsShowCount = N_REPEAT;

    const renderFilm = (filmListContainerElement, film) => {
      const filmElement = new FilmsCardView(film);
      const popUpElement = new PopupContainerView(film);

      render(filmElement, filmListContainerElement);

      const closePopup = () => {
        document.body.removeChild(popUpElement.element);
      };

      const onEscClose = (evt) => {
        const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

        if (isEscKey) {
          evt.preventDefault();
          closePopup();
          document.body.classList.remove('hide-overflow');
          document.removeEventListener('keydown', onEscClose);
        }
      };

      const showPopup = () => {
        render(popUpElement, document.body);
      };

      filmElement.element.addEventListener('click', () => {
        showPopup();
        document.body.classList.add('hide-overflow');
        document.addEventListener('keydown', onEscClose);
      });

      popUpElement.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        closePopup();
        document.removeEventListener('keydown', onEscClose);
        document.body.classList.remove('hide-overflow');
      });
    };


    if (!this.#films.length) {
      render(new FilmsEmptyView(), this.filmsList.element);
    } else {

      this.#films.slice(START_NUMBER_ARRAY, firstFilmsShowCount)
        .map((film) => renderFilm(this.filmsListContainer.element, film));

      render(this.#showButton, this.filmsList.element);


      this.#showButton.element.addEventListener('click', () => {
        const prevFilmsCount = firstFilmsShowCount;
        firstFilmsShowCount = prevFilmsCount + N_REPEAT;

        this.#films.slice(prevFilmsCount, firstFilmsShowCount)
          .map((film) => renderFilm(this.filmsListContainer.element, film));
        render(this.#showButton, this.filmsList.element);

        if (firstFilmsShowCount >= films.length) {
          this.filmsList.element.removeChild(this.#showButton.element);
        }
      });
    }

    const sortFilmsByRating = this.#films.sort((prevElem, nextElem) => nextElem.filmInfo.totalRating - prevElem.filmInfo.totalRating);

    render(this.filmsListExtraRated, this.filmsListMainContainer.element);
    render(this.filmsListRatedContainer, this.filmsListExtraRated.element);

    sortFilmsByRating.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => renderFilm(this.filmsListRatedContainer.element, film));

    render(this.filmsListExtraCommented, this.filmsListMainContainer.element);
    render(this.filmsListCommentedContainer, this.filmsListExtraCommented.element);

    const sortFilmsByComments = this.#films.sort((prevElem, nextElem) => nextElem.comments.length - prevElem.comments.length);

    sortFilmsByComments.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => renderFilm(this.filmsListCommentedContainer.element, film));

  };
}
