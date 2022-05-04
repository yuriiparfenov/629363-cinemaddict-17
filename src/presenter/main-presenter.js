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


  init = (element) => {
    this.element = element;

    render(new NavigationView(), this.element);
    render(new SortingView(), this.element);
    render(this.filmsListMainContainer, this.element);
    render(this.filmsList, this.filmsListMainContainer.getElement());
    render(this.filmsListContainer, this.filmsList.getElement());

    for (let i = START_NUMBER_ARRAY; i < FILMS_MAIN_COUNT; i++) {
      render(new FilmsCardView(), this.filmsListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsList.getElement());

    render(this.filmsListExtraRated, this.filmsListMainContainer.getElement());
    render(this.filmsListRatedContainer, this.filmsListExtraRated.getElement());

    for (let i = START_NUMBER_ARRAY; i < DOUBLE_REPEAT; i++) {
      render(new FilmsCardView(), this.filmsListRatedContainer.getElement());
    }

    render(this.filmsListExtraCommented, this.filmsListMainContainer.getElement());
    render(this.filmsListCommentedContainer, this.filmsListExtraCommented.getElement());

    for (let i = START_NUMBER_ARRAY; i < DOUBLE_REPEAT; i++) {
      render(new FilmsCardView(), this.filmsListCommentedContainer.getElement());
    }

  };
}
