const express = require('express')

const router = express.Router()

//controller functions
const { registerUser, loginUser, getUser, getUserById, getRoleByEmail, getUsersByRoleMahasiswa } = require('../controllers/user')

//login route
router.post('/login', loginUser)

//signup route
router.post('/register', registerUser)

//get all user
router.get('/', getUser)

//get user by id
router.get('/:id', getUserById)

//get role by email
router.get('/email', getRoleByEmail)

//get user role mahasiswa
router.get("/mahasiswa", getUsersByRoleMahasiswa);

module.exports = router