import { createElement } from '../render.js';

const createFilmsMainContainerTemplate = () => '<section class="films"></section>';

export default class FilmsMainContainerView {
  getTemplate() {
    return createFilmsMainContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
