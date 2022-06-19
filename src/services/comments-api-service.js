import { METHOD, URL_LINK } from '../const';
import ApiService from '../framework/api-service';

export default class CommentsApiService extends ApiService {
  getComments = (filmId) => this._load({ url: `${URL_LINK.COMMENTS}/${filmId}` }).then(ApiService.parseResponse);

  deleteComment = async (id) => {
    const response = await this._load({
      url: `${URL_LINK.COMMENTS}/${id}`,
      method: METHOD.DELETE,
    });

    return response;
  };

  addComment = async (film) => {
    const response = this._load({
      url: `${URL_LINK.COMMENTS}/${film.id}`,
      method: METHOD.POST,
      body: JSON.stringify(film.comment),
      headers: new Headers({'Content-type': 'application/json'}),
    });

    return response;
  };
}
