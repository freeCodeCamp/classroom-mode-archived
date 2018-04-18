const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const studentController = require('../controllers/studentController');

router.get('/', indexController.getHome);
router.get('/students', studentController.showStudent);

module.exports = router;
