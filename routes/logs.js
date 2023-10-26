const express = require("express");
const router = express.Router();

const { ALL_LOGS, ADD_LOG, LOGS_BY_ID, DELETE_BY_ID } = require("../controller/logs");

router.get('/v1/logs/', ALL_LOGS)
router.get('/v1/log/:id', LOGS_BY_ID)
router.delete('/v1/log/:id', DELETE_BY_ID)
router.post('/v1/add-log/', ADD_LOG)
module.exports = router;