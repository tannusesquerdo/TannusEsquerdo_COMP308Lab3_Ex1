//student.server.resolvers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtKey = config.secretKey; // generate this elsewhere
const jwtExpirySeconds = 3000;

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

const authenticate = async (root, args, context) => {
  const { req, res } = context;
  // Get credentials from request
  const email = args.email;
  const password = args.password;

  try {
    // find the user with the given email
    const student = await Student.findOne({ email });

    if (!student) {
      // User not found
      return {
        status: "error",
        message: "User not found!",
        data: null,
      };
    }

    // compare passwords
    const passwordMatch = bcrypt.compareSync(password, student.password);

    if (passwordMatch) {
      // Create a new token with the user id in the payload
      // and which expires 300 seconds after issue
      const token = jwt.sign(
        { id: student._id, email: student.email },
        jwtKey,
        { algorithm: "HS256", expiresIn: jwtExpirySeconds }
      );

      // set the cookie as the token string, with a similar max age as the token
      // here, the max age is in milliseconds
      res.cookie("token", token, {
        maxAge: jwtExpirySeconds * 1000,
        httpOnly: true,
      });

      req.student = student;

      // Return the user data and token
      return {
        status: "success",
        message: "User found!",
        data: {
          screen: student.email,
          student,
          id: student._id,
          token,
        },
      };
    } else {
      // Invalid password
      return {
        status: "error",
        message: "Invalid email/password!",
        data: null,
      };
    }
  } catch (error) {
    // Handle any other errors
    console.error("Authentication error:", error);
    return {
      status: "error",
      message: "Internal server error",
      data: null,
    };
  }
};

const isSignedIn = async (root, args, context) => {
  const { req, res } = context;

  try {
    // Obtain the session token from the requests cookies
    const token = req.cookies.token;

    // If the cookie is not set, return 'auth'
    if (!token) {
      return {
        status: "error",
        message: "No token provided!",
        data: null,
      };
    }

    // Verify the JWT token
    const payload = await jwt.verify(token, jwtKey);

    // Token is valid, return the user information
    return {
      status: "success",
      message: "Token valid!",
      data: {
        screen: payload.email,
        student: payload,
        id: payload.id,
        token,
      },
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // The JWT is unauthorized, return a 401 error
      return {
        status: "error",
        message: "Unauthorized",
        data: null,
      };
    }

    // Otherwise, return a bad request error
    console.error("Error in isSignedIn:", error);
    return {
      status: "error",
      message: "Bad Request",
      data: null,
    };
  }
};

// Make resolvers available to other modules
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  isSignedIn,
  authenticate,
};
