import MainPresenter from './presenter/main-presenter';
import FilterPresentor from './presenter/filter-presenter';
import { render } from './framework/render';
import ProfileRatingView from './view/profile-rating';
import FooterStatisticsView from './view/footer-statistics';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import FilterModel from './model/filter-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresentor(siteMainElement, filterModel, filmsModel);
const mainPresenter = new MainPresenter(siteMainElement, filmsModel, commentsModel, filterModel);


render(new ProfileRatingView(), siteHeaderElement);
filterPresenter.init();
mainPresenter.init();
render(new FooterStatisticsView, siteFooterElement);

