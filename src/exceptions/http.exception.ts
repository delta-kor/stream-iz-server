export enum ErrorCode {
  NOT_FOUND,
  UNAUTHORIZED,
}

export default class HttpException extends Error {
  public status: number;
  public message: string;
  public code: number;

  constructor(status: number, message: string, code: ErrorCode = -1) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;
  }
}
