import AbstractView from '../framework/view/abstract-view';

const createNavigationTemplate = (films) => {
  const watchlistSortFilms = films.filter(({ userDetails }) => userDetails.watchList === true);
  const alreadyWatchedSortFilms = films.filter(({ userDetails }) => userDetails.alreadyWatched === true);
  const favoriteSortFilms = films.filter(({ userDetails }) => userDetails.favorite === true);

  return (
    `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistSortFilms.length}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${alreadyWatchedSortFilms.length}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteSortFilms.length}</span></a>
</nav>`);
};

export default class NavigationView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createNavigationTemplate(this.#films);
  }
}
