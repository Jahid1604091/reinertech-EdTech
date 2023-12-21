const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const ErrorResponse = require('../utils/errorResponse');

//@desc     create Course
//@route    POST    /api/course
//@access   private
exports.createCourse = asyncHandler(async (req, res, next) => {

    const isExist = await Course.findOne({ name: req.body.name });
    if (isExist) {
        return next(new ErrorResponse('Course Already Exist', 400))
    }
    const course = await Course.create(req.body);
    if (course) {
        return res.status(201).json({
            success: true,
            messgae:"The course has been added successfully",
            data: course,
        });
    }
    else {
        return next(new ErrorResponse('Invalid Data', 400));
    }
});


//@desc     get all Courses
//@route    GET     /api/course/list
//@access   private/Admin
exports.getCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find({});
    return res.status(200).json({
        success: true,
        messgae:"The course List",
        data: courses
    });
});

//@desc     get course by id
//@route    GET     /api/course/:id
//@access   private
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }
    return res.status(200).json({
        success: true,
        data: course
    });
});


//@desc     update Course
//@route    PUT    /api/course/:id
//@access   private
exports.updateCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }

    course.name = req.body.name || course.name
    course.description = req.body.description || course.description
    course.price = req.body.price || course.price
    course.duration = req.body.duration || course.duration
    course.level = req.body.level || course.level

    const updatedCourse = await course.save();
    return res.status(200).json({
        success: true,
        messgae:"The course has been updated successfully",
        data: updatedCourse
    });
});




//@desc     delete a Course
//@route    DELETE     /api/courses/:id
//@access   private/Admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    return res.status(200).json({
        success: true,
        messgae: `The course : ${ course.name } has been Deleted successfully`,
    });
});
