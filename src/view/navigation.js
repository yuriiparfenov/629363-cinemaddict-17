import { FilterName } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, filmsCount } = filter;
  return (
    `<a href="#${type}" 
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-type=${type}>
    ${name === FilterName.all ? name : `${name} <span class="main-navigation__item-count" data-filter-type=${type}>${filmsCount}</span>`}
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
    this.element.addEventListener('click', this.#filterTypeChange);
  };

  #filterTypeChange = (evt) => {
    if(evt.target.tagName === 'A' || evt.target.tagName === 'SPAN') {
      evt.preventDefault();
      this._callback.filterChange(evt.target.dataset.filterType);
    }
  };
}
