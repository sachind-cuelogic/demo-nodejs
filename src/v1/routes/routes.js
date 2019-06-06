const express = require('express');

const router = express.Router();

import SgnupValidation from "../components/signUp/controller/signupValidation"
import signupController from "../components/signUp/controller/signupController"

router.get('/home', (req, res) => {
    res.status(200).send({
        status: "Success",
        message: "Api success"
    })
})

router.put('/signup', SgnupValidation.validateUserSignup, signupController.userSignup)

export default router;
