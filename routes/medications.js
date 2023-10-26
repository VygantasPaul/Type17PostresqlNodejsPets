const express = require("express");
const router = express.Router();

const { ALL_MEDICATIONS, ADD_MEDICATION } = require("../controller/medications");

router.get('/v1/meds/', ALL_MEDICATIONS)
router.post('/v1/add-med/', ADD_MEDICATION)

module.exports = router;