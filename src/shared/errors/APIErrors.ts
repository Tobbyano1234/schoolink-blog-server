/**
 * @extends Error
 */

import httpStatus from 'http-status';
import { HttpExceptionInterface } from '../types';

class HttpException extends Error {
  status: number | null;
  errors: object | null;
  isPublic: boolean | undefined = false;
  isOperational: boolean;

  constructor({
    message,
    errors,
    status,
    isPublic,
    stack
  }: HttpExceptionInterface) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  }
}

/**
 * Class representing an API error.
 * @extends HttpException
 */

export class APIError extends HttpException {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  }: HttpExceptionInterface) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack
    });
  }
}
