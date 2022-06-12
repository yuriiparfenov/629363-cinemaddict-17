import { FILTER_TYPE, FILTER_NAME, UPDATE_TYPE } from '../const';
import { filter } from '../utils';
import { remove, render, replace } from '../framework/render';
import NavigationView from '../view/navigation';

export default class FilterPresentor {
  #filterModel = null;
  #filmsModel = null;
  #filterContainer = null;
  #filterElement = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;
    this.#filterContainer = filterContainer;

    this.#filterModel.addObserver(this.#handleEventModel);
    this.#filmsModel.addObserver(this.#handleEventModel);
  }

  #handleEventModel = () => {
    this.init();
  };

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FILTER_TYPE.ALL,
        name: FILTER_NAME.all,
        filmsCount: filter[FILTER_TYPE.ALL](films).length,
      },
      {
        type: FILTER_TYPE.FAVORITE,
        name: FILTER_NAME.favorite,
        filmsCount: filter[FILTER_TYPE.FAVORITE](films).length,
      },
      {
        type: FILTER_TYPE.HISTORY,
        name: FILTER_NAME.history,
        filmsCount: filter[FILTER_TYPE.HISTORY](films).length,
      },
      {
        type: FILTER_TYPE.WATCH_LIST,
        name: FILTER_NAME.watchlist,
        filmsCount: filter[FILTER_TYPE.WATCH_LIST](films).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterElement = this.#filterElement;

    this.#filterElement = new NavigationView(filters, this.#filterModel);
    this.#filterElement.setFilterChangeHandler(this.#handleFilterChange);

    if (prevFilterElement === null) {
      render(this.#filterElement, this.#filterContainer);
      return;
    }

    replace(this.#filterElement, prevFilterElement);
    remove(prevFilterElement);
  };

  #handleFilterChange = (filterType) => {
    if (this.#filmsModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
