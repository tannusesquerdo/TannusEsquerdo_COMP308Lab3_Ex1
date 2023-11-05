const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');
const users = require('../../app/controllers/users.server.controller');
//
module.exports = function (app) {
  app.route('/courses')
    .get(courses.list)
    .post(users.requiresLogin, courses.create);

  app.route('/courses/:courseId/students/:studentId')
    .delete(students.requiresLogin, courses.removeStudentFromCourse)
    .post(students.requiresLogin, courses.addStudentToCourse);

  app.route('/courses/:courseId')
    .get(courses.read)
    .put(users.requiresLogin, courses.hasAuthorization, courses.update)
    .delete(users.requiresLogin, courses.hasAuthorization, courses.delete);

  //
  app.param('courseId', courses.courseByID);
  app.param('studentId', students.studentByID);
};
