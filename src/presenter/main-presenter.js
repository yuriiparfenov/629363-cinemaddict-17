import { remove, render, replace } from '../framework/render';
import NavigationView from '../view/navigation';
import SortingView from '../view/sorting';
import FilmsMainContainerView from '../view/films-main-container';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';
import TopRatedFilmsView from '../view/top-rated-films';
import MostCommentedFilmsView from '../view/most-commented-films';
import FilmsEmptyView from '../view/films-empty';
import { START_NUMBER_ARRAY, DOUBLE_REPEAT, N_REPEAT, SORT_TYPE } from '../const';
import FilmCardPresenter from './film-card-presenter';
import { compareDates, compareRatings, updateFilm } from '../utils';
import { nanoid } from 'nanoid';

export default class MainPresenter {
  filmsListMainContainer = new FilmsMainContainerView();
  filmsList = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();
  filmsListExtraRated = new TopRatedFilmsView();
  filmsListRatedContainer = new FilmsListContainerView();
  filmsListExtraCommented = new MostCommentedFilmsView();
  filmsListCommentedContainer = new FilmsListContainerView();
  #sortFilms = null;
  #showButton = new ShowMoreButtonView();
  #element = null;
  #films = null;
  #filmPresenter = new Map();
  #renderedFilmCount = N_REPEAT;
  #filmListArray = [];
  #sortedFilmsBy = [];
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedFilmsArray = [];

  constructor(element) {
    this.#element = element;
  }

  #renderFilm = (container, film) => {
    const filmPresenter = new FilmCardPresenter(container, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    const filmId = nanoid();
    this.#filmPresenter.set(filmId, filmPresenter);
  };

  #renderAllFilmsContainers = () => {
    render(new NavigationView(this.#filmListArray), this.#element);
    this.#renderSortMenu();
    render(this.filmsListMainContainer, this.#element);
    render(this.filmsList, this.filmsListMainContainer.element);
    render(this.filmsListContainer, this.filmsList.element);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortedFilms(sortType); //сортировка по типу
    this.#clearFilmsList(); //очистка отображения списка фильмов
    this.#renderFilmsList(); //рендер фильмов по сортировке

    this.#renderSortMenu(); // рендер меню сортировки
    this.#renderSortFilmsByRating(); //рендер 2 самых рейтинговых фильмов
    this.#renderSortFilmsByComments(); // рендер 2 самых комментированных фильмов
  };

  //рендер меню сортировки

  #renderSortMenu = () => {
    const prevSortElem = this.#sortFilms;
    this.#sortFilms = new SortingView();

    if (prevSortElem === null) {
      render(this.#sortFilms, this.#element);
      this.#sortFilms.setSortTypeChangeHandler(this.#handleSortTypeChange);
      return;
    }

    if (this.#element.contains(prevSortElem.element)) {
      replace(this.#sortFilms, prevSortElem);
      this.#sortFilms.setSortTypeChangeHandler(this.#handleSortTypeChange);
    }

    remove(prevSortElem);
  };

  //сортировка по типу

  #sortedFilms = (sortType) => {
    switch (sortType) {
      case 'RATING':
        this.#filmListArray.sort(compareRatings);
        break;
      case 'DATE':
        this.#filmListArray.sort(compareDates);
        break;
      default:
        this.#filmListArray = [...this.#sourcedFilmsArray];
    }
    this.#currentSortType = sortType;
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
    render(this.filmsListExtraRated, this.filmsListMainContainer.element);
    render(this.filmsListRatedContainer, this.filmsListExtraRated.element);

    const sortFilmsByRating = this.#sortedFilmsBy.sort(compareRatings);

    sortFilmsByRating.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => this.#renderFilm(this.filmsListRatedContainer.element, film));
  };

  #renderSortFilmsByComments = () => {
    render(this.filmsListExtraCommented, this.filmsListMainContainer.element);
    render(this.filmsListCommentedContainer, this.filmsListExtraCommented.element);

    const sortFilmsByComments = this.#sortedFilmsBy.sort((prevElem, nextElem) => nextElem.comments.length - prevElem.comments.length);

    sortFilmsByComments.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => this.#renderFilm(this.filmsListCommentedContainer.element, film));
  };

  //очистка списка фильмов

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = N_REPEAT;
    remove(this.#showButton);
  };

  #handleFilmChange = (updatedFilmItem) => {
    this.#filmListArray = updateFilm(this.#filmListArray, updatedFilmItem);
    this.#sourcedFilmsArray = updateFilm(this.#sourcedFilmsArray, updatedFilmItem);
    this.#filmPresenter.get(updatedFilmItem.filmId).init(updatedFilmItem);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  init = (films) => {
    this.#filmListArray = [...films];
    this.#sourcedFilmsArray = [...films];
    this.#sortedFilmsBy = [...films];

    this.#renderAllFilmsContainers(); //render всех контейнеров для списка фильмов
    this.#renderFilmsList(); //render самого списка фильмов
    this.#renderSortFilmsByRating(); //render 2-х самых рейтинговых фильмов
    this.#renderSortFilmsByComments(); //render 2-х самых комментируемых фильмво
  };
}
