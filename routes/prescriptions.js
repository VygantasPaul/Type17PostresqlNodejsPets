const express = require("express");
const router = express.Router();
const { GET_PRESCRIPTION_BY_ID, ADD_PRESCRIPTION, ALL_RESCRIPTIONS } = require("../controller/prescriptions");


router.get('/v1/prescription/:id', GET_PRESCRIPTION_BY_ID)

router.get('/v1/prescriptions/', ALL_RESCRIPTIONS)

router.post('/v1/add-prescription/', ADD_PRESCRIPTION)

module.exports = router;