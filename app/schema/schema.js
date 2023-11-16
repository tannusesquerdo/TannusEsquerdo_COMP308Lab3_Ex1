const Course = require("../models/course.server.model");
const Student = require("../models/student.server.model");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const {
  getStudentById,
  getStudents,
  addStudent,
  deleteStudent,
  isSignedIn,
  authenticate,
} = require("../resolvers/student.server.resolvers");
const {
  getCourses,
  getCourseById,
  addStudentToCourse,
  removeStudentFromCourse,
  addCourse,
  updateCourse,
} = require("../resolvers/course.server.resolvers");

// Student type
const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLID },
    studentNumber: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    favoriteTopic: { type: GraphQLString },
    strongestTechnicalSkill: { type: GraphQLString },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find({ students: parent.id });
      },
    },
  }),
});

// Course type
const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    courseCode: { type: GraphQLString },
    courseName: { type: GraphQLString },
    section: { type: GraphQLString },
    semester: { type: GraphQLString },
    students: { type: new GraphQLList(StudentType) },
  }),
});

const AuthenticationResultType = new GraphQLObjectType({
  name: "AuthenticationResult",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    data: { type: UserType },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    screen: { type: GraphQLID },
    student: { type: StudentType },
    id: { type: GraphQLID },
    token: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      resolve: getStudentById,
    },
    course: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve: getCourseById,
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve: getStudents,
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve: getCourses,
    },
    isLoggedIn: {
      type: AuthenticationResultType,
      resolve: isSignedIn,
    },
    studentCourses: {
      type: new GraphQLList(CourseType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Course.find({ students: args.id });
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add Student
    addStudent: {
      type: StudentType,
      args: {
        studentNumber: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString, required: false },
        password: { type: GraphQLString },
        favoriteTopic: { type: GraphQLString, required: false },
        strongestTechnicalSkill: { type: GraphQLString, required: false },
      },
      resolve: addStudent,
    },
    // Delete Student
    deleteStudent: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: deleteStudent,
    },
    // Add Course
    addCourse: {
      type: CourseType,
      args: {
        courseCode: { type: GraphQLString },
        courseName: { type: GraphQLString },
        section: { type: GraphQLString },
        semester: { type: GraphQLString },
      },
      resolve: addCourse,
    },
    // Update Course
    updateCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLID },
        courseCode: { type: GraphQLString },
        courseName: { type: GraphQLString },
        section: { type: GraphQLString },
        semester: { type: GraphQLString },
      },
      resolve: updateCourse,
    },
    // Enroll Student
    enrollCourse: {
      type: CourseType,
      args: {
        studentId: { type: GraphQLID },
        courseId: { type: GraphQLID },
      },
      resolve: addStudentToCourse,
    },
    // Drop Student
    dropCourse: {
      type: CourseType,
      args: {
        studentId: { type: GraphQLID },
        courseId: { type: GraphQLID },
      },
      resolve: removeStudentFromCourse,
    },
    // login
    login: {
      type: AuthenticationResultType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: authenticate,
    },
    logOut: {
      type: GraphQLString,
      resolve: (parent, args, { res }) => {
        res.clearCookie("token");
        return "Logged out successfully!";
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
