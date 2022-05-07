import { createElement } from '../render.js';

const createFilmsMainContainerTemplate = () => '<section class="films"></section>';

export default class FilmsMainContainerView {
  #element = null;

  get template() {
    return createFilmsMainContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
