import HttpException from '../../../exceptions/http.exception';

export default class NoMusicException extends HttpException {
  constructor() {
    super(400, 'no music');
  }
}
