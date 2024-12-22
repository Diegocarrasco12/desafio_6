const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/', registerUser);         
router.post('/login', loginUser);      
router.get('/', authenticateToken, getUser); 

module.exports = router;
