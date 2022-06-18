import AbstractView from '../framework/view/abstract-view';
import { FILTER_TYPE  } from '../const';
import { getUserRating } from '../utils';

const createProfileRatingTemplate = (filters) => {
  const { filmsCount } = filters.find((elem) => elem.type === FILTER_TYPE.HISTORY);
  const userRating = getUserRating(filmsCount);

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};

export default class ProfileRatingView extends AbstractView {
  #filters = null;
  #filmsModel = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createProfileRatingTemplate(this.#filters);
  }
}
