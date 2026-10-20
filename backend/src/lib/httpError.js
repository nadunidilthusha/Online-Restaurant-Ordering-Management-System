// throw new HttpError(404, 'Not found') from any controller
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
