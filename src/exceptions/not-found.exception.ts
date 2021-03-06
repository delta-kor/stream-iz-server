import HttpException, { ErrorCode } from './http.exception';

export default class NotFoundException extends HttpException {
  constructor() {
    super(404, 'Not found', ErrorCode.NOT_FOUND);
  }
}
