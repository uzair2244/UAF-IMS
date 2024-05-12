const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { checkUserExistence } = require('../middlewares/checkUserExistence');

router.get('/user/:name', checkUserExistence, reportController.generateUserReport);

module.exports = router;
