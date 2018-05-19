const express = require('express')

const router = express.Router()
const indexController = require('../controllers/indexController')
const studentController = require('../controllers/studentController')
const userController = require('../controllers/userController')

router.get('/', indexController.getHome)
router.delete('/students/:studentId', studentController.deleteStudent)
router.get('/students', studentController.showStudent)
router.put('/students', studentController.updateStudent)
router.post('/students', studentController.addStudent)
router.get('/users/:userId', userController.getUserById)

module.exports = router
