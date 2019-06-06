import express from "express"

class UserController {
    constructor() {
    }
    userSignup = async (req, res) => {

        try {
            let iss = "cognito"; // ISS.COGNITO;
            logger.info("UserController : userSignup ");
            let userId = req.body.user.id;
            if (req.body.user.iss != undefined && req.body.user.iss != null) {
                iss = req.body.user.iss;
                logger.info("UserController : registerUserSignup-header-iss ", iss);
            }
            let params = {
                user_id: userId,
                email: req.body.email,
                username: "",
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                contact_no: req.body.contact_no || null,// ,
                iss: iss,
                created_by: userId
            };
            let result = await userModel.registerUserInfo(params);
            // check if user is already exist
            if (result[0] && result[0][0].response_error != "") {
                let errror = JSON.parse(result[0][0].response_error);
                logger.info("errror_status : " + errror.status);
                res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], errror.message, null));
            } else {
                try {
                    const where = { email: params.email };
                    const result = await utilityModel.getFields(["id"], "user", where);
                    userId = result[0].id;

                    if (req.body.referral_code) {
                        referralModel.applyRefralcode(userId, req.body.referral_code);
                    }
                    let contact_no = req.body.contact_no ? req.body.contact_no.replace("+1", "") : null;
                    let paramObj = {
                        user_id: userId,
                        contact_no: contact_no,
                        email: req.body.email
                    };
                    // check if this user has entry for temporary prospect
                    userModel.checkForTemporaryProspectAndMigrateDetails(paramObj);

                    userModel.assignListingTouser(userId, params.email);
                    if (iss == "google" || iss == "linkedin") {
                        userModel.updateVerificationStatus(userId, USER_VERIFICATION_STATUS.VERIFIED);
                        NotificationModel.welcomeToBiproxiEmailNotification([params.email], req.body.user_role_ids[0]);
                    }
                    // let jsonPreference = JSON.stringify(req.body.preference);
                    let jsonRoleIDS = JSON.stringify(req.body.user_role_ids);
                    await userModel.saveUserRole(userId, jsonRoleIDS, "user", userId);
                    // await userModel.saveUserRolePreference(userId, jsonRoleIDS, jsonPreference);
                    res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "User registered successfully!", { user: { id: userId } }));
                } catch (err) {
                    throw err;
                }
            }
        } catch (err) {

            logger.error(`UserController : userSignup :: error ${err} `);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err.message[0], null));
        }
    }

}

export default UserController;