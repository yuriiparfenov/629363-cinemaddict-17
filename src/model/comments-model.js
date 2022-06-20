import { UPDATE_TYPE } from '../const';
import ApiService from '../framework/api-service';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #filmId = null;
  #comments = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (film) => {
    this.#filmId = film.id;

    try {
      this.#comments = await this.#commentsApiService.getComments(this.#filmId);
    } catch (err) {
      this.#comments = [];
    }
    this._notify(UPDATE_TYPE.INIT, this.#filmId);
  };

  addComment = async (updateType, update, comment) => {
    try {
      const response = await this.#commentsApiService.addComment(update, comment);
      const parsedResponse = await ApiService.parseResponse(response);

      this.#comments = [...parsedResponse.comments];
      this._notify(updateType, update);

    } catch (err) {
      throw new Error('Cant\'t add this comment');
    }
  };

  deleteComment = async (updateType, commentToDelete, indexOfComment) => {
    if (indexOfComment === -1) {
      throw new Error('Can\'t delete comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentToDelete.id);
      this.#comments = [
        ...this.#comments.slice(0, indexOfComment),
        ...this.#comments.slice(indexOfComment + 1),
      ];

      this._notify(updateType, commentToDelete);

    } catch (err) {
      throw new Error('Can\t delete this comment');
    }
  };
}

