import { JoiErrorInterface } from '../types';

/**
 * Returns a custom error object with descriptive messages.
 * @property {Array} arr - Array of Joi validation errors.
 * @returns {Object}
 */

export const JoiErrorFormatter = (errors: JoiErrorInterface[]): object => {
  return errors.reduce<any>((acc, error) => {
    const key: string = error.path[0];
    acc[key] = error.message.replace(/"/g, '');
    return acc;
  }, {});
}
