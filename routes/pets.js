const express = require("express");
const router = express.Router();
const { ALL_PETS, GET_PETS_NO_ARCHIVVED, DELETE_PET, ADD_PET, GET_PET_BY_ID } = require("../controller/pets");

router.get('/v1/all_pets/', ALL_PETS)
router.get('/v1/pets/', GET_PETS_NO_ARCHIVVED)
router.put('/v1/pet/:id', DELETE_PET)
router.get('/v1/pet/:id', GET_PET_BY_ID)
router.post('/v1/add-pet/', ADD_PET)
module.exports = router;