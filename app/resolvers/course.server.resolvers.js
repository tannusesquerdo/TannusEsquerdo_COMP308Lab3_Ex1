const Course = require("../models/course.server.model");

const getCourses = async () => {
  const courses = await Course.find()
    .sort("-created")
    .populate("students", "firstName lastName studentNumber")
    .exec();
  if (!courses) {
    throw new Error("Error getting courses");
  }
  return courses;
};

const getCourseById = async (root, args) => {
  const courseInfo = await Course.findById(args.id)
    .populate("students", "firstName lastName studentNumber")
    .exec();
  if (!courseInfo) {
    throw new Error("Error");
  }
  return courseInfo;
};

const addCourse = async (root, params) => {
  const courseModel = new Course(params);
  const newCourse = await courseModel.save();
  if (!newCourse) {
    throw new Error("Error");
  }
  return newCourse;
};

const updateCourse = async (parent, args) => {
  try {
    const { id, ...update } = args;
    const options = { new: true };
    const updatedCourse = await Course.findByIdAndUpdate(id, update, options);

    if (!updatedCourse) {
      throw new Error(`Course with ID ${id} not found`);
    }

    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Failed to update course");
  }
};

const addStudentToCourse = async (root, args, context) => {
  try {
    const { courseId, studentId } = args;

    // Find the course by ID
    const course = await Course.findById(courseId).exec();

    if (!course) {
      throw new Error("Course not found");
    }

    // Check if the student is already in the course's students array
    if (course.students.includes(studentId)) {
      throw new Error("Student is already in this course");
    }

    // Add the student to the students array
    course.students.push(studentId);

    // Save the updated course
    const updatedCourse = await course.save();

    return updatedCourse; // Assuming the resolver is expected to return the updated course
  } catch (error) {
    console.error("Error adding student to course:", error);
    throw new Error(
      "An error occurred while adding the student to the course."
    );
  }
};

const removeStudentFromCourse = async (root, args, context) => {
  try {
    const { courseId, studentId } = args; // Assuming args contain courseId and studentId

    // Find the course by ID
    const course = await Course.findById(courseId).exec();

    if (!course) {
      throw new Error("Course not found");
    }

    // Check if the student is in the course's students array
    const studentIndex = course.students.indexOf(studentId);
    if (studentIndex === -1) {
      throw new Error("Student not found in this course");
    }

    // Remove the student from the students array
    course.students.splice(studentIndex, 1);

    // Save the updated course
    const updatedCourse = await course.save();

    return updatedCourse; // Assuming the resolver is expected to return the updated course
  } catch (error) {
    console.error("Error removing student from course:", error);
    throw new Error(
      "An error occurred while removing the student from the course."
    );
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  updateCourse,
};
