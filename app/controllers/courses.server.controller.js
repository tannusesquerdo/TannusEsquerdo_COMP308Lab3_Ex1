const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const { courseCode, courseName, section, semester } = req.body;
    // Create a new course instance
    const newCourse = new Course({
      courseCode,
      courseName,
      section,
      semester
    });
    
    Student.findOne({ email: req.body.email }, (err, student) => {
        if (err) { return getErrorMessage(err); }
        req.id = student._id;
        console.log('student._id', req.id);

    }).then( function () {
        newCourse.students = req.id
        console.log('req.student._id',req.id);

        newCourse.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(500).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(newCourse);
            }
        });
    });
};
//
exports.list = function (req, res) {
    Course.find()
        .sort('-created')
        .populate('students', 'firstName lastName studentNumber')
        .exec((err, courses) => {
            if (err) {
                return res.status(500).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(courses);
            }
        });
};
//
exports.courseByID = function (req, res, next, id) {
    Course.findById(id).populate('students', 'firstName lastName studentNumber')
    .exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load article '+ id));
        req.course = course;
        console.log('in courseById:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    const course = req.course;
    const { courseCode, courseName, section, semester } = req.body;
    
    course.courseCode = courseCode,
    course.courseName = courseName,
    course.section = section,
    course.semester = semester

    course.save((err) => {
        if (err) {
            return res.status(500).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const article = req.article;
    article.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.course.students)
    console.log('in hasAuthorization - user: ',req.id)

    if (req.couse.students.includes(req.id)) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
