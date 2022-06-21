import AbstractView from '../framework/view/abstract-view';

const createFilmsMainContainerTemplate = () => '<section class="films"></section>';

export default class FilmsMainContainerView extends AbstractView {
  get template() {
    return createFilmsMainContainerTemplate();
  }
}
