const express = require('express');
const { getUsers, createUser, authUser, getProfile, updateProfile, deleteUser } = require('../controller/users');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
// const router = express.Router({mergeParams:true});

// router.use(protect);
// router.use(authorize('admin'))

router.route('/')
    .get(protect,authorize('admin'),getUsers)
    .post(createUser)

router.route('/login').post(authUser)

router.route('/:id').delete(protect,authorize('admin'),deleteUser)

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile)

module.exports = router;