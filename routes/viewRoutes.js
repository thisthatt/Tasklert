const express = require('express')
const viewController = require('.././controllers/viewController')


const router = express.Router();


router.route('/').get(viewController.viewAllTasks)
// .post(viewController.createTask)
router.route('/createTask').post(viewController.createTask)
router.route('/deleteTask').delete(viewController.deleteTask)

module.exports = router;



















