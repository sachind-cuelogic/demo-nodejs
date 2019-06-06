import Joi from "joi";
import responseFormat from "lib/responseFormat";
import {
    JOI_USER,
    PROPERTY_TAX_ANALYSIS,
    TITLE_ESCOW_SERVICES
} from "config/constants";

class NotificationValidation {

    constructor() {
        this.user = JOI_USER;
    }


    validateUserSignup = (req, res, next) => {

        logger.info("==== UserValidation : validateUserSignup  ====");

        let validateData = Joi.object().keys({
            user: JOI_USER,
            firstname: Joi.string().required().max(45),
            lastname: Joi.string().required().max(45),
            email: Joi.string().email().required().max(200),
            // contact_no: Joi.string().allow("(", null),
            password:Joi.string().password().required(),
            contact_no: Joi.string().required().regex(/^[- +()]*[0-9][- +()0-9]*$/), // /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

            // preference: Joi.array().items(Joi.object().keys({
            //     id: Joi.number().required(),
            //     rating: Joi.number().required()
            // })).required()
        });
        console.log("validateData==>>>", validateData)
        Joi.validate(req.body, validateData, { abortEarly: false }, async (err) => {
            if (err) {
                logger.error(`UserValidation : validateUserSignup :: ${err.details}`);
                res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.details, ""));

            } else {
                // check whether referral code is valid

                next();

            }
        });
    }

}

export default NotificationValidation;