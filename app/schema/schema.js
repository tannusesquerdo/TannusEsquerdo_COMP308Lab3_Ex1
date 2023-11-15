const Course = require("../models/course.server.model");

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
} = require("../resolvers/student.server.resolvers");

// Student type
const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    _id: { type: GraphQLID },
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
    _id: { type: GraphQLID },
    courseCode: { type: GraphQLString },
    courseName: { type: GraphQLString },
    section: { type: GraphQLString },
    semester: { type: GraphQLString },
    students: { type: new GraphQLList(StudentType) },
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
      resolve(parent, args) {
        return Course.findById(args.id);
      },
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve: getStudents,
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find({});
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
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        favoriteTopic: { type: GraphQLString },
        strongestTechnicalSkill: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
