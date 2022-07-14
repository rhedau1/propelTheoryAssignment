const express  = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const cardController = require("../controllers/cardController")

router.post('/createUser',userController.createUser)
router.post('/loginUser',userController.loginUser)

router.post('/createCard',cardController.createCard)
router.get('/getCard/:id',cardController.getCards)

module.exports = router