import HttpException, { ErrorCode } from './http.exception';

export default class UnauthorizedException extends HttpException {
  constructor() {
    super(404, 'unauthorized', ErrorCode.UNAUTHORIZED);
  }
}
