const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const saltRounds = 10;

const StudentSchema = new Schema({
  studentNumber: Number,
  firstName: String,
  lastName: String,
  phone: String,
  program: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
  favoriteTopic: String,
  strongestTechnicalSkill: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

StudentSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

StudentSchema.methods.authenticate = function (password) {
  //compare the hashed password of the database
  //with the hashed version of the password the user enters
  return this.password === bcrypt.hashSync(password, saltRounds);
};

module.exports = mongoose.model("Student", StudentSchema);
