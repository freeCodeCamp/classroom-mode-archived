const express = require('express')

const router = express.Router()
const indexController = require('../controllers/indexController')
const studentController = require('../controllers/studentController')

router.get('/', indexController.getHome)
router.delete('/students/:studentId', studentController.deleteStudent)
router.get('/students', studentController.showStudent)
router.put('/students', studentController.updateStudent)
router.post('/students', studentController.addStudent)

module.exports = router
