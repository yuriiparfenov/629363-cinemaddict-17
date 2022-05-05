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
import { START_NUMBER_ARRAY, FILMS_MAIN_COUNT, DOUBLE_REPEAT } from '../const';

export default class MainPresenter {
  filmsListMainContainer = new FilmsMainContainerView();
  filmsList = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();
  filmsListExtraRated = new TopRatedFilmsView();
  filmsListRatedContainer = new FilmsListContainerView();
  filmsListExtraCommented = new MostCommentedFilmsView();
  filmsListCommentedContainer = new FilmsListContainerView();


  init = (element, films) => {
    this.element = element;
    this.films = films;

    render(new NavigationView(films), this.element);
    render(new SortingView(), this.element);
    render(this.filmsListMainContainer, this.element);
    render(this.filmsList, this.filmsListMainContainer.getElement());
    render(this.filmsListContainer, this.filmsList.getElement());

    films.slice(START_NUMBER_ARRAY, FILMS_MAIN_COUNT)
      .map((film) => render(new FilmsCardView(film), this.filmsListContainer.getElement()));


    render(new ShowMoreButtonView(), this.filmsList.getElement());
    const sortFilmsByRating = films.sort((prevElem, nextElem) => nextElem.filmInfo.totalRating - prevElem.filmInfo.totalRating);

    render(this.filmsListExtraRated, this.filmsListMainContainer.getElement());
    render(this.filmsListRatedContainer, this.filmsListExtraRated.getElement());

    sortFilmsByRating.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => render(new FilmsCardView(film), this.filmsListRatedContainer.getElement()));

    render(this.filmsListExtraCommented, this.filmsListMainContainer.getElement());
    render(this.filmsListCommentedContainer, this.filmsListExtraCommented.getElement());

    const sortFilmsByComments = films.sort((prevElem, nextElem) => nextElem.comments.length - prevElem.comments.length);

    sortFilmsByComments.slice(START_NUMBER_ARRAY, DOUBLE_REPEAT)
      .map((film) => render(new FilmsCardView(film), this.filmsListCommentedContainer.getElement()));

  };
}
