import HttpException from '../../../exceptions/http.exception';

export default class NoAlbumException extends HttpException {
  constructor() {
    super(400, 'no album');
  }
}
