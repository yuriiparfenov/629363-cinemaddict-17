import AbstractView from '../framework/view/abstract-view';

const createFilmsEmptyTemplate = () => ('<h2 class="films-list__title">There are no movies in our database</h2>');

export default class FilmsEmptyView extends AbstractView {

  get template() {
    return createFilmsEmptyTemplate();
  }
}

