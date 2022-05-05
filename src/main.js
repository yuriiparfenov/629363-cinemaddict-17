import MainPresenter from './presenter/main-presenter';
import { render } from './render';
import ProfileRatingView from './view/profile-rating';
import FooterStatisticsView from './view/footer-statistics';
import FilmsModel from './model/films-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const mainPresenter = new MainPresenter();
const filmsModel = new FilmsModel();
const comments = filmsModel.getComments();
const films = filmsModel.getFilms();

render(new ProfileRatingView(), siteHeaderElement);
mainPresenter.init(siteMainElement, films);
render(new FooterStatisticsView, siteFooterElement);

