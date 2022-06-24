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
    this._notify(film);
  };

  addComment = async (updateType, update, comment) => {
    try {
      const response = await this.#commentsApiService.addComment(update, comment);
      const parsedResponse = await ApiService.parseResponse(response);

      this.#comments = [...parsedResponse.comments];
      this._notify(updateType, update); //update

    } catch (err) {
      throw new Error('Cant\'t add this comment');
    }
  };

  deleteComment = async (updateType, update, commentId, indexOfComment) => {
    if (indexOfComment === -1) {
      throw new Error('Can\'t delete comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentId);
      this.#comments = [
        ...this.#comments.slice(0, indexOfComment),
        ...this.#comments.slice(indexOfComment + 1),
      ];

      this._notify(updateType, update);

    } catch (err) {
      throw new Error('Can\t delete this comment');
    }
  };
}

