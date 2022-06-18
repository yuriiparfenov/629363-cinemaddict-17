import MainPresenter from './presenter/main-presenter';
import FilterPresentor from './presenter/filter-presenter';
import { render } from './framework/render';
import FooterStatisticsView from './view/footer-statistics';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './services/films-api-service';
import CommentsApiService from './services/comments-api-service';
import { AUTHORIZATION, END_POINT } from './const';

//const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const filterPresenter = new FilterPresentor(siteMainElement, filterModel, filmsModel);
const mainPresenter = new MainPresenter(siteMainElement, filmsModel, commentsModel, filterModel);

//render(new ProfileRatingView(filterModel), siteHeaderElement);
filterPresenter.init();
mainPresenter.init();
filmsModel.init();
render(new FooterStatisticsView, siteFooterElement);

