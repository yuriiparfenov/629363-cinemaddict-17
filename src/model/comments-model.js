import Observable from '../framework/observable';
import { generateComments } from '../mock/comments';
import { COMMENTS_COUNT } from '../const';

export default class CommentsModel extends Observable {
  #comments = generateComments(COMMENTS_COUNT);

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const commentIndex = this.#comments.findIndex((comment) => comment.id === update.id);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete comment');
    }

    this.#comments = [
      ...this.#comments.slice(0,commentIndex),
      ...this.#comments.slice(commentIndex + 1),
    ];

    this._notify(updateType);
  };
}

