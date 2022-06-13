import { FILTER_NAME } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, filmsCount } = filter;

  return (
    `<a href="#${type}" 
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-type=${type}>
    ${name === FILTER_NAME.all ? name : `${name} <span class="main-navigation__item-count">${filmsCount}</span>`}
    </a>`
  );
};

const createNavigationTemplate = (filters, currentFilterType) => (
  `<nav class="main-navigation">
    ${filters.map((item) => createFilterItemTemplate(item, currentFilterType)).join('')}
    </nav>`);

export default class NavigationView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createNavigationTemplate(this.#filters, this.#currentFilter);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    const filtersLinks = this.element.querySelectorAll('.main-navigation__item');
    filtersLinks.forEach((filterLink) => filterLink.addEventListener('click', this.#filterTypeChange));
  };

  #filterTypeChange = (evt) => {
    evt.preventDefault();
    this._callback.filterChange(evt.target.dataset.filter);
  };
}
