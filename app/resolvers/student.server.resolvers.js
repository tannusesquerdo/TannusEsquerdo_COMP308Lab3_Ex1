//student.server.resolvers.js
const Student = require("../models/student.server.model");
//
const getStudents = async () => {
  const students = await Student.find().exec();
  if (!students) {
    throw new Error("Error getting students");
  }
  return students;
};
//
const getStudentById = async (root, args) => {
  const studentInfo = await Student.findById(args.id).exec();
  if (!studentInfo) {
    throw new Error("Error");
  }
  return studentInfo;
};
//
const addStudent = async (root, params) => {
  const studentModel = new Student(params);
  const newStudent = await studentModel.save();
  if (!newStudent) {
    throw new Error("Error");
  }
  return newStudent;
};
//
const updateStudent = async (parent, args) => {
  try {
    const { id, ...update } = args;
    const options = { new: true };
    const updatedStudent = await Student.findByIdAndUpdate(id, update, options);

    if (!updatedStudent) {
      throw new Error(`Student with ID ${id} not found`);
    }

    return updatedStudent;
  } catch (error) {
    console.error("Error updating student:", error);
    throw new Error("Failed to update student");
  }
};

const deleteStudent = async (root, params) => {
  try {
    const deletedStudent = await Student.findOneAndRemove({
      email: params.email,
    }).exec();

    if (!deletedStudent) {
      throw new Error(`Student with email ${params.email} not found`);
    }

    return deletedStudent;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw new Error("Failed to delete student");
  }
};
// Make resolvers available to other modules
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
