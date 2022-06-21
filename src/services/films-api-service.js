import { METHOD, URL_LINK } from '../const';
import ApiService from '../framework/api-service';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: URL_LINK.MOVIES }).then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `${URL_LINK.MOVIES}/${film.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {
      ...film,
      'comments': [...film.comments],
      'film_info': {
        title: film.filmInfo.title,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        poster: film.filmInfo.poster,
        'age_rating': film.filmInfo.ageRating,
        director: film.filmInfo.director,
        writers: film.filmInfo.writers,
        actors: film.filmInfo.actors,
        release: {
          date: film.filmInfo.release.date,
          'release_country': film.filmInfo.release.releaseCountry
        },
        runtime: film.filmInfo.runtime,
        genre: film.filmInfo.genre,
        description: film.filmInfo.description
      },
      'user_details': {
        watchlist: film.userDetails.watchlist,
        'already_watched': film.userDetails.alreadyWatched,
        'watching_date': film.userDetails.watchingDate,
        favorite: film.userDetails.favorite
      }
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  };
}
