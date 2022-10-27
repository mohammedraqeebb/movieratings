import { CustomError } from './custom-error';

export class NotAuthenticatedError extends CustomError {
  statusCode = 400;
  constructor() {
    super('you are not logged in');
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }
  serializeError() {
    return [{ message: 'you are not logged in' }];
  }
}
