import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FooterPresenter from './presenter/footer-presenter';

import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './services/films-api-service';
import CommentsApiService from './services/comments-api-service';
import { AUTHORIZATION, END_POINT } from './const';

const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const mainPresenter = new MainPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const footerPresenter = new FooterPresenter(siteFooterElement, filmsModel);

filterPresenter.init();
mainPresenter.init();
footerPresenter.init();
filmsModel.init();

