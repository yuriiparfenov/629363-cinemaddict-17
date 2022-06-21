import { remove, render, RenderPosition } from '../framework/render';
import SortingView from '../view/sorting';
import FilmsMainContainerView from '../view/films-main-container';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';
import TopRatedFilmsView from '../view/top-rated-films';
import MostCommentedFilmsView from '../view/most-commented-films';
import FilmsEmptyView from '../view/films-empty';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { START_NUMBER_ARRAY, N_REPEAT, SORT_TYPE, UPDATE_TYPE, FILTER_TYPE, USER_ACTION, TIME_LIMIT } from '../const';
import FilmCardPresenter from './film-card-presenter';
import LoadingFilmsComponent from '../view/loading-films';
import { compareDates, compareRatings, filter } from '../utils';
//import { nanoid } from 'nanoid';

export default class MainPresenter {
  filmsListMainContainer = new FilmsMainContainerView();
  filmsList = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();
  filmsListExtraRated = new TopRatedFilmsView();
  filmsListRatedContainer = new FilmsListContainerView();
  filmsListExtraCommented = new MostCommentedFilmsView();
  filmsListCommentedContainer = new FilmsListContainerView();
  loadingFilmsComponent = new LoadingFilmsComponent();
  #sortFilms = null;
  #showButton = null;
  #element = null;
  #filmPresenter = new Map();
  #renderedFilmCount = N_REPEAT;
  #currentSortType = SORT_TYPE.DEFAULT;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #filterType = FILTER_TYPE.ALL;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TIME_LIMIT.LOWER_LIMIT, TIME_LIMIT.UPPER_LIMIT);

  constructor(element, filmsModel, commentsModel, filterModel) {
    this.#element = element;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = [...this.#filmsModel.films];
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return filteredFilms.sort(compareDates);
      case SORT_TYPE.RATING:
        return filteredFilms.sort(compareRatings);
    }

    return filteredFilms;
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearFilmsList();
        this.#renderFilmsList();
        //this.#renderSortFilmsByRating();
        //this.#renderSortFilmsByComments();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearFilmsList({ resetFilmsCount: true, resetSortType: true });
        this.#renderFilmsList();
        //this.#renderSortFilmsByRating();
        //this.#renderSortFilmsByComments();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.loadingFilmsComponent);
        this.#renderFilmsList();
        //this.#renderSortFilmsByRating();
        //this.#renderSortFilmsByComments();
        break;
    }
  };

  #renderFilm = (container, film) => {
    const filmPresenter = new FilmCardPresenter(container, this.#handleViewChangeByAction, this.#handleModeChange, this.#commentsModel);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderAllFilmsContainers = () => {
    render(this.filmsListMainContainer, this.#element);
    render(this.filmsList, this.filmsListMainContainer.element);
    render(this.filmsListContainer, this.filmsList.element);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilmsList({ resetFilmsCount: true });
    this.#renderFilmsList(); //рендер фильмов по сортировке
    //this.#renderSortFilmsByRating(); //рендер 2 самых рейтинговых фильмов
    //this.#renderSortFilmsByComments(); // рендер 2 самых комментированных фильмов
  };

  #renderSortMenu = () => {
    this.#sortFilms = new SortingView(this.#currentSortType);
    render(this.#sortFilms, this.filmsList.element, RenderPosition.AFTERBEGIN);
    this.#sortFilms.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilmsList = () => {
    const films = this.films;
    const filmsCount = films.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.films.length) {
      render(new FilmsEmptyView(), this.filmsList.element);
      return;
    }

    this.#renderSortMenu();
    this.#renderFilmListArray(films.slice(START_NUMBER_ARRAY, Math.min(filmsCount, this.#renderedFilmCount)));

    if (filmsCount > N_REPEAT) {
      this.#renderShowButton();
    }
  };

  #renderShowButton = () => {
    this.#showButton = new ShowMoreButtonView();
    render(this.#showButton, this.filmsList.element);
    this.#showButton.setClickHandler(this.#handleShowButtonClick);
  };

  #handleShowButtonClick = () => {
    const prevFilmsCount = this.films.length;
    const nextFilmsCount = Math.min(prevFilmsCount, this.#renderedFilmCount + N_REPEAT);
    const films = this.films.slice(this.#renderedFilmCount, nextFilmsCount);
    this.#renderFilmListArray(films);
    this.#renderedFilmCount = nextFilmsCount;

    if (this.#renderedFilmCount >= prevFilmsCount) {
      remove(this.#showButton);
    }
  };

  #renderFilmListArray = (films) => {
    films.forEach((film) => this.#renderFilm(this.filmsListContainer.element, film));
  };

  /*
  #renderSortFilmsByRating = () => {
    render(this.filmsListExtraRated, this.filmsListMainContainer.element);
    render(this.filmsListRatedContainer, this.filmsListExtraRated.element);

    const sortFilmsByRating = this.#filmsModel.films.sort(compareRatings);

    sortFilmsByRating.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => this.#renderFilm(this.filmsListRatedContainer.element, film));
  };

  #renderSortFilmsByComments = () => {
    render(this.filmsListExtraCommented, this.filmsListMainContainer.element);
    render(this.filmsListCommentedContainer, this.filmsListExtraCommented.element);

    const sortFilmsByComments = this.#filmsModel.films.sort((prevElem, nextElem) => nextElem.comments.length - prevElem.comments.length);

    sortFilmsByComments.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => this.#renderFilm(this.filmsListCommentedContainer.element, film));
  }; */

  #renderLoading = () => {
    render(this.loadingFilmsComponent, this.filmsList.element);
  };

  #clearFilmsList = ({ resetFilmsCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#sortFilms);
    remove(this.#showButton);
    remove(this.loadingFilmsComponent);

    if (resetFilmsCount) {
      this.#renderedFilmCount = N_REPEAT;
    } else {
      this.#renderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
  };

  #handleViewChangeByAction = (actionType, updateType, update, comment, commentIndex) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case USER_ACTION.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case USER_ACTION.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update, comment);
        break;
      case USER_ACTION.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update, comment, commentIndex);
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  init = () => {
    this.#renderAllFilmsContainers();//render всех контейнеров для списка фильмов
    this.#renderFilmsList(); //render самого списка фильмов
    //this.#renderSortFilmsByRating(); //render 2-х самых рейтинговых фильмов
    //this.#renderSortFilmsByComments(); //render 2-х самых комментируемых фильмво
  };
}
