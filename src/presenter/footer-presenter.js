import FooterStatisticsView from '../view/footer-statistics';
import { render, replace, remove } from '../framework/render';

export default class FooterPresenter {
  #filmsModel = null;
  #footerContainer = null;
  #footerElement = null;

  constructor(footerContainer, filmsModel) {
    this.#filmsModel = filmsModel;
    this.#footerContainer = footerContainer;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get filmsCount() {
    const films = this.#filmsModel.films;
    return films.length;
  }

  init = () => {
    const filmsCount = this.filmsCount;
    const prevFooterElement = this.#footerElement;

    this.#footerElement = new FooterStatisticsView(filmsCount);

    if (prevFooterElement === null) {
      render(this.#footerElement, this.#footerContainer);
      return;
    }

    replace(this.#footerElement, prevFooterElement);
    remove(prevFooterElement);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
