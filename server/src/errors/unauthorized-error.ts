import { CustomError } from './custom-error';

export class UnauthorizedError extends CustomError {
  statusCode = 400;
  constructor() {
    super('not authorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeError() {
    return [{ message: 'you are not authorized' }];
  }
}
