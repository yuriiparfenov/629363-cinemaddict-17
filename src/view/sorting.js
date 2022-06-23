import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

let checkedSortType = SortType.DEFAULT;

const createSortingTemplate = (currentSortType) => (
  `<ul class="sort">
  <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : null}" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : null}" data-sort-type=${SortType.DATE}>Sort by date</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : null}" data-sort-type=${SortType.RATING}>Sort by rating</a></li>
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
