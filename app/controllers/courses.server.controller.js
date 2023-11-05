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
    if (!course) return next(new Error(`Failed to load course ${id}`));
        req.course = course;
        next();
    });
};

// method to enroll a student into a course
exports.addStudentToCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;

        // Find the course by ID
        const course = await Course.findById(courseId).exec();

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the student is already in the course's students array
        if (course.students.includes(studentId)) {
            return res.status(400).json({ error: 'Student is already in this course' });
        }

        // Add the student to the students array
        course.students.push(studentId);

        // Save the updated course
        const updatedCourse = await course.save();

        res.status(200).json(updatedCourse);
        } catch (error) {
        console.error('Error adding student to course:', error);
        res.status(500).json({ error: 'An error occurred while adding the student to the course.' });
    }   
}

// drop a student from a course
exports.removeStudentFromCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;

        // Find the course by ID
        const course = await Course.findById(courseId).exec();

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the student is in the course's students array
        const studentIndex = course.students.indexOf(studentId);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student not found in this course' });
        }

        // Remove the student from the students array
        course.students.splice(studentIndex, 1);

        // Save the updated course
        const updatedCourse = await course.save();

        res.status(200).json(updatedCourse);
        } catch (error) {
        console.error('Error removing student from course:', error);
        res.status(500).json({ error: 'An error occurred while removing the student from the course.' });
    } 
}

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
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {

    if (req.course.students.includes(req.id)) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
