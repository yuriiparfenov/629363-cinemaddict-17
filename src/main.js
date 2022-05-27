import MainPresenter from './presenter/main-presenter';
import { render } from './framework/render';
import ProfileRatingView from './view/profile-rating';
import FooterStatisticsView from './view/footer-statistics';
import FilmsModel from './model/films-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const mainPresenter = new MainPresenter(siteMainElement);
const filmsModel = new FilmsModel();
const comments = filmsModel.comments;
const films = filmsModel.films;

render(new ProfileRatingView(), siteHeaderElement);
mainPresenter.init(films, comments);
render(new FooterStatisticsView, siteFooterElement);

