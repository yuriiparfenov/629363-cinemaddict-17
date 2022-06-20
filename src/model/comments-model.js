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

  deleteComment = async (updateType, update) => {
    console.log('update', update);
    console.log('comments', this.#comments);
    const commentIndex = this.#comments.findIndex((comment) => Number(comment.id) === Number(update.id));
    console.log(commentIndex);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update.comments);
      this.#comments = [
        ...this.#comments.slice(0, commentIndex),
        ...this.#comments.slice(commentIndex + 1),
      ];

      this._notify(updateType);

    } catch (err) {
      throw new Error('Can\t delete this comment');
    }
  };
}

