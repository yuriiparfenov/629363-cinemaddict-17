import AbstractView from '../framework/view/abstract-view';
import { SORT_TYPE } from '../const';

let checkedSortType = SORT_TYPE.DEFAULT;

const createSortingTemplate = (currentSortType) => (
  `<ul class="sort">
  <li><a href="#" class="sort__button ${currentSortType === SORT_TYPE.DEFAULT ? 'sort__button--active' : null}" data-sort-type=${SORT_TYPE.DEFAULT}>Sort by default</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SORT_TYPE.DATE ? 'sort__button--active' : null}" data-sort-type=${SORT_TYPE.DATE}>Sort by date</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SORT_TYPE.RATING ? 'sort__button--active' : null}" data-sort-type=${SORT_TYPE.RATING}>Sort by rating</a></li>
</ul>`
);

export default class SortingView extends AbstractView {

  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    checkedSortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(checkedSortType);
  };
}
