import { METHOD, URL_LINK } from '../const';
import ApiService from '../framework/api-service';

export default class CommentsApiService extends ApiService {
  getComments = (filmId) => this._load({ url: `${URL_LINK.COMMENTS}/${filmId}` }).then(ApiService.parseResponse);

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `${URL_LINK.COMMENTS}/${commentId}`,
      method: METHOD.DELETE,
    });

    return response;
  };

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `${URL_LINK.COMMENTS}/${film.id}`,
      method: METHOD.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-type': 'application/json'}),
    });

    return response;
  };
}
