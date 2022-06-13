import Observable from '../framework/observable';
import { generateQuantityFilms } from '../mock/films';
import { FILMS_COUNT } from '../const';

export default class FilmsModel extends Observable {
  #films = generateQuantityFilms(FILMS_COUNT);

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);

    if (filmIndex === -1) {
      throw new Error('Can\'t update film');
    }

    this.#films = [
      ...this.#films.slice(0, filmIndex),
      update,
      ...this.#films.slice(filmIndex + 1),
    ];

    this._notify(updateType, update);
  };
}

