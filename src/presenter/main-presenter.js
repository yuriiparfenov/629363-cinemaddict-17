import { remove, render } from '../framework/render';
import NavigationView from '../view/navigation';
import SortingView from '../view/sorting';
import FilmsMainContainerView from '../view/films-main-container';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';
import TopRatedFilmsView from '../view/top-rated-films';
import MostCommentedFilmsView from '../view/most-commented-films';
import FilmsEmptyView from '../view/films-empty';
import { START_NUMBER_ARRAY, DOUBLE_REPEAT, N_REPEAT } from '../const';
import FilmCardPresenter from './film-card-presenter';
import { updateFilm } from '../utils';

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
  #filmPresenter = new Map();
  #renderedFilmCount = N_REPEAT;
  #filmListArray = [];

  constructor(element) {
    this.#element = element;
  }

  #renderFilm = (container, film) => {
    const filmPresenter = new FilmCardPresenter(container, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderAllFilmsContainres = () => {
    render(new NavigationView(this.#filmListArray), this.#element);
    render(new SortingView(), this.#element);
    render(this.filmsListMainContainer, this.#element);
    render(this.filmsList, this.filmsListMainContainer.element);
    render(this.filmsListContainer, this.filmsList.element);
  };

  #renderFilmsList = () => {
    let firstFilmsShowCount = this.#renderedFilmCount;

    if (!this.#filmListArray.length) {
      render(new FilmsEmptyView(), this.filmsList.element);
    } else {

      this.#renderFilmListArray(START_NUMBER_ARRAY, firstFilmsShowCount);

      if (this.#filmListArray.length > firstFilmsShowCount) {
        render(this.#showButton, this.filmsList.element);
      }

      this.#showButton.setClickHandler(() => {
        const prevFilmsCount = firstFilmsShowCount;
        firstFilmsShowCount = prevFilmsCount + N_REPEAT;

        this.#filmListArray.slice(prevFilmsCount, firstFilmsShowCount)
          .map((film) => this.#renderFilm(this.filmsListContainer.element, film));
        render(this.#showButton, this.filmsList.element);

        if (firstFilmsShowCount >= this.#filmListArray.length) {
          this.filmsList.element.removeChild(this.#showButton.element);
        }
      });
    }
  };

  #renderFilmListArray = (from, to) => {
    this.#filmListArray
      .slice(from, to)
      .map((film) => this.#renderFilm(this.filmsListContainer.element, film));
  };

  #renderSortFilmsByRating = () => {
    const sortFilmsByRating = this.#filmListArray.sort((prevElem, nextElem) => nextElem.filmInfo.totalRating - prevElem.filmInfo.totalRating);

    render(this.filmsListExtraRated, this.filmsListMainContainer.element);
    render(this.filmsListRatedContainer, this.filmsListExtraRated.element);

    sortFilmsByRating.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => this.#renderFilm(this.filmsListRatedContainer.element, film));
  };

  #renderSortFilmsByComments = () => {
    render(this.filmsListExtraCommented, this.filmsListMainContainer.element);
    render(this.filmsListCommentedContainer, this.filmsListExtraCommented.element);

    const sortFilmsByComments = this.#filmListArray.sort((prevElem, nextElem) => nextElem.comments.length - prevElem.comments.length);

    sortFilmsByComments.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => this.#renderFilm(this.filmsListCommentedContainer.element, film));
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = N_REPEAT;
    remove(this.#showButton);
  };

  #handleFilmChange = (updatedFilmItem) => {
    this.#filmListArray = updateFilm(this.#filmListArray, updatedFilmItem);
    this.#filmPresenter.get(updatedFilmItem.id).init(updatedFilmItem);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  init = (films) => {
    this.#filmListArray = [...films];

    this.#renderAllFilmsContainres(); //render всех контейнеров для списка фильмов
    this.#renderFilmsList(); //render самого списка фильмов
    this.#renderSortFilmsByRating(); //render 2-х самых рейтинговых фильмов
    this.#renderSortFilmsByComments(); //render 2-х самых комментируемых фильмво
  };
}
