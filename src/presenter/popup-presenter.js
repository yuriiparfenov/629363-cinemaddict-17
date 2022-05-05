import { render } from '../render';
import PopupTopView from '../view/popup-top';
import PopupContainerView from '../view/popup-container';
import PopupBottomView from '../view/popup-bottom';

export default class PopupPresenter {
  popupContainer = new PopupContainerView();

  init = (film) => {
    this.film = film;

    render(this.popupContainer, document.body);
    render(new PopupTopView(film), this.popupContainer.getElement());
    render(new PopupBottomView(film), this.popupContainer.getElement());

  };
}
