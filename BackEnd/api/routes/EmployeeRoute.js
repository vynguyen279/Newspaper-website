const express = require('express')
const router = express.Router()
const { checkRoleManager } = require("../middlewares/Authetication");
const employeeController = require('../controllers/EmployeeController')


router.use('/update', checkRoleManager, employeeController.update)
router.use('/add', checkRoleManager, employeeController.add)
router.use('/list', checkRoleManager, employeeController.list)
router.use('/updateProfile', checkRoleManager, employeeController.updateProfile)
router.use('/', employeeController.index)


module.exports = router;