import { UPDATE_TYPE } from '../const';
import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.films = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  };

  get films() {
    return this.#films;
  }

  updateFilm = async (updateType, update) => {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);

    if (filmIndex === -1) {
      throw new Error('Can\'t update film');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);

      this.#films = [
        ...this.#films.slice(0, filmIndex),
        updatedFilm,
        ...this.#films.slice(filmIndex + 1),
      ];
      this._notify(updateType, updatedFilm);

    } catch(err) {
      throw new Error('Can\t update this film');
    }
  };

  #adaptToClient = (film) => {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        title: film['film_info']['title'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        poster: film['film_info']['poster'],
        ageRating: film['film_info']['age_rating'],
        director: film['film_info']['director'],
        writers: film['film_info']['writers'],
        actors: film['film_info']['actors'],
        release: {
          date: film['film_info']['release']['date'],
          releaseCountry: film['film_info']['release']['release_country']
        },
        runtime: film['film_info']['runtime'],
        genre: film['film_info']['genre'],
        description: film['film_info']['description']
      },
      userDetails: {
        watchlist: film['user_details']['watchlist'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date'],
        favorite: film['user_details']['favorite']
      }
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  };
}

