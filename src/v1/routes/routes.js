const express = require('express');

const router = express.Router();


router.get('/home', (req, res) => {
    res.status(200).send({
        status: "Success",
        message: "Api success"
    })
})

export default router;
