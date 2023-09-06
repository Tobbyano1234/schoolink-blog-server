import { Joi } from 'celebrate';

export default {
  updateProfile: {
    body: Joi.object(
      {
        avatar: Joi.any(),
        firstName: Joi.string().pattern(/^[a-zA-Z]+$/),
            lastName: Joi.string().pattern(/^[a-zA-Z]+$/),
            phoneNumber:Joi.string()
      }
    ).or('firstName', 'lastName', 'avatar', 'phoneNumber'),
  },
  
  get: {
    params: {
      adminID: Joi.string().min(24).max(24).required(),
    }
  },

} 
