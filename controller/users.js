const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require('../utils/errorResponse');

//@desc     create user
//@route    POST    /api/users
//@access   private
exports.createUser = asyncHandler(async (req, res, next) => {

    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
        return next(new ErrorResponse('User Already Exist', 400))
    }
    const user = await User.create(req.body);
    if (user) {
        return res.status(201).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });
    }
    else {
        return next(new ErrorResponse('Invalid Data', 400));
    }
});


//@desc     get profile
//@route    GET     /api/users/profile
//@access   private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }
    return res.status(200).json({
        success: true,
        data: user
    });
});


//@desc     update profile
//@route    PUT    /api/users/profile
//@access   private
exports.updateProfile = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }
    if (!req.body.password) {
        return next(new ErrorResponse('Please provide your password ', 404));
    }
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.password = req.body.password
    const updatedUser = await user.save();
    return res.status(200).json({
        success: true,
        data: updatedUser
    });
});

//@desc     get auth user
//@route    POST     /api/users/login
//@access   public
exports.authUser = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (user && (await user.matchPassword(req.body.password))) {
        return res.status(200).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });
    }
    else {

        return next(new ErrorResponse(`Invalid email or password`, 401));
    }
});


//@desc     get all users
//@route    GET     /api/users
//@access   private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({ role: 'user' });
    return res.status(200).json({
        success: true,
        data: users
    });
});

//@desc     delete a user
//@route    DELETE     /api/users/:id
//@access   private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({
        success: true,
        data:user.name + ' is removed!'
    });
});
