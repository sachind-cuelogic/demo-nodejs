import Joi from "joi";
import responseFormat from "../../../../lib/responseFormat";



class SgnupValidation {

    constructor() {

    }

    validateUserSignup = (req, res, next) => {

        let validateData = Joi.object().keys({
            firstname: Joi.string().required().max(45),
            lastname: Joi.string().required().max(45),
            email: Joi.string().email().required().max(200),
            // contact_no: Joi.string().allow("(", null),
            contact_no: Joi.string().required().regex(/^[- +()]*[0-9][- +()0-9]*$/), // /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
            password: Joi.string().password().required(),

        });
        console.log("validateData==>>>", validateData)
        Joi.validate(req.body, validateData, { abortEarly: false }, async (err) => {
            if (err) {
                logger.error(`UserValidation : validateUserSignup :: ${err.details}`);
                res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.details, ""));

            } else {
                next();
            }
        });
    }
}

export default new SgnupValidation();