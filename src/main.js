import MainPresenter from './presenter/main-presenter';
import { render } from './render';
import ProfileRatingView from './view/profile-rating';
import FooterStatisticsView from './view/footer-statistics';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const mainPresenter = new MainPresenter();

render(new ProfileRatingView(), siteHeaderElement);
mainPresenter.init(siteMainElement);
render(new FooterStatisticsView, siteFooterElement);

