import { Joi } from "celebrate";
// import joi from "joi";
// import JoiPhoneNumber from "joi-phone-number";
// import { toObjectId } from '../../../glide-shared/validateToObjectID';
// import { joiPasswordExtendCore } from 'joi-password';

// const ExtendedJoi = joi.extend(JoiPhoneNumber);

// const joiPassword = Joi.extend(joiPasswordExtendCore);
// const PasswordValidation = joiPassword
//   .string()
//   .min(8)
//   .minOfSpecialCharacters(1)
//   .minOfLowercase(1)
//   .minOfUppercase(1)
//   .minOfNumeric(1)
//   .noWhiteSpaces()
//   .messages({
//     'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
//     'password.minOfSpecialCharacters':
//           '{#label} should contain at least {#min} special character',
//     'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
//     'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
//     'password.noWhiteSpaces': '{#label} should not contain white spaces',
//   })
//   .required();

export default {
    signUpUser: {
        body: {
            firstName: Joi.string().min(2).max(25).required(),
            lastName: Joi.string().min(2).max(25).required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().max(14).required(),
            avatar: Joi.string(),
            password: Joi.string().min(8).required(),
            confirmPassword: Joi.ref('password'),
        },
    },
    signInUser: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    },
    signInStatusUser: {
        body: {
            userID: Joi.string().min(24).max(24).required(),
            token: Joi.string().required(),
        },
    },
    signUpAdmin: {
        body: {
            firstName: Joi.string().min(2).max(25).required(),
            lastName: Joi.string().min(2).max(25).required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().required(),
            password: Joi.string().min(8).required(),
        },
    },
    signInAdmin: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    },
    signInStatusAdmin: {
        body: {
            adminID: Joi.string().min(24).max(24).required(),
            token: Joi.string().required(),
        },
    },
    sendOtpUser: {
        body: {
            email: Joi.string().email().required(),
            type: Joi.string()
                .allow('reset', 'verify')
                .lowercase(),
        },
    },
    sendOtpAdmin: {
        body: {
            email: Joi.string().email().required(),
            type: Joi.string()
                .allow('reset', 'verify')
                .lowercase(),
        },
    },
    verifyOtpUser: {
        body: {
            email: Joi.string().email().required(),
            newPassword: Joi.string().min(8),
            otp: Joi.required(),
            type: Joi.string()
                .allow('reset', 'verify')
                .lowercase(),
        },
    },
    verifyOtpAdmin: {
        body: {
            email: Joi.string().email().required(),
            newPassword: Joi.string().min(8),
            otp: Joi.required(),
            type: Joi.string()
                .allow('reset', 'verify')
                .lowercase(),
        },
    },
    verifyPasswordUser: {
        body: {
            oldPassword: Joi.string().min(8).required(),
            email: Joi.string().email().required(),
        },
    },
    verifyPasswordAdmin: {
        body: {
            oldPassword: Joi.string().min(8).required(),
            email: Joi.string().email().required(),
        },
    },
    verifyEmailUser: {
        body: {
            userID: Joi.string().min(24).max(24).required(),
            email: Joi.string().email().required(),
        },
    },
    verifyEmailAdmin: {
        body: {
            adminID: Joi.string().min(24).max(24).required(),
            email: Joi.string().email().required(),
        },
    },
    changePasswordUser: {
        body: {
            oldPassword: Joi.string().min(8).required(),
            newPassword: Joi.string().min(8).required(),
            confirmPassword: Joi.string().min(8).required(),
            otp: Joi.string().required(),
        },
    },
    changePasswordAdmin: {
        body: {
            newPassword: Joi.string().min(8).required(),
            confirmPassword: Joi.string().min(8).required(),
        },
    },
    resetPasswordUser: {
        body: {
            email: Joi.string().email().required(),
            newPassword: Joi.string().min(8).required(),
            confirmPassword: Joi.string().min(8).required(),
            otp: Joi.string().required(),
        },
    },
    resetPasswordAdmin: {
        body: {
            email: Joi.string().email().required(),
            newPassword: Joi.string().min(8).required(),
            confirmPassword: Joi.string().min(8).required(),
            otp: Joi.string().required(),
        },
    },
    deactivateAccount: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        }
    }
};
