import { FilterType, FilterName, UpdateType } from '../const';
import { filter } from '../utils';
import { remove, render, replace } from '../framework/render';
import ProfileRatingView from '../view/profile-rating';
import NavigationView from '../view/navigation';

export default class FilterPresenter {
  #filterModel = null;
  #filmsModel = null;
  #filterContainer = null;
  #filterElement = null;
  ratingElement = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;
    this.#filterContainer = filterContainer;

    this.#filterModel.addObserver(this.#handleEventModel);
    this.#filmsModel.addObserver(this.#handleEventModel);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: FilterName.all,
        filmsCount: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.FAVORITE,
        name: FilterName.favorite,
        filmsCount: filter[FilterType.FAVORITE](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: FilterName.history,
        filmsCount: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.WATCH_LIST,
        name: FilterName.watchlist,
        filmsCount: filter[FilterType.WATCH_LIST](films).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterElement = this.#filterElement;
    const prevRatingElement = this.ratingElement;
    const siteHeaderElement = document.querySelector('.header');

    this.#filterElement = new NavigationView(filters, this.#filterModel);
    this.#filterElement.setFilterChangeHandler(this.#handleFilterChange);
    this.ratingElement = new ProfileRatingView(filters);

    if (prevFilterElement === null && prevRatingElement === null) {
      render(this.#filterElement, this.#filterContainer);
      render(this.ratingElement, siteHeaderElement);
      return;
    }

    replace(this.#filterElement, prevFilterElement);
    replace(this.ratingElement, prevRatingElement);
    remove(prevFilterElement);
    remove(prevRatingElement);
  };

  #handleEventModel = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filmsModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
