const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { createCourse, getCourses, getCourse, updateCourse, deleteCourse } = require('../controller/courses');
const router = express.Router();

router.route('/').post(protect,authorize('admin'),createCourse)
router.route('/list').get(protect,authorize('admin'),getCourses)
router.route('/:id').get(protect,authorize('admin'),getCourse)
router.route('/:id').put(protect,authorize('admin'),updateCourse)
router.route('/:id').delete(protect,authorize('admin'),deleteCourse)


module.exports = router;