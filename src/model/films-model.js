import { generateComments } from '../mock/comments';
import { generateQuantityFilms } from '../mock/films';
import { COMMENTS_COUNT, FILMS_COUNT } from '../const';

export default class FilmsModel {
  getComments() {
    if (!this.comments) {
      this.comments = generateComments(COMMENTS_COUNT);
    }

    return this.comments;
  }

  getFilms() {
    if (!this.films) {
      this.films = generateQuantityFilms(FILMS_COUNT, this.comments);
    }

    return this.films;
  }
}

