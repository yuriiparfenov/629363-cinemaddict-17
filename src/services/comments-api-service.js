import { Method, UrlLink } from '../const';
import ApiService from '../framework/api-service';

export default class CommentsApiService extends ApiService {
  getComments = (filmId) => this._load({ url: `${UrlLink.COMMENTS}/${filmId}` }).then(ApiService.parseResponse);

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `${UrlLink.COMMENTS}/${commentId}`,
      method: Method.DELETE,
    });
    return response;
  };

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `${UrlLink.COMMENTS}/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-type': 'application/json'}),
    });
    return response;
  };
}
