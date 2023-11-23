import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      data {
        screen
        token
        id
        student {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation LogOut {
    logOut
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse($courseCode: String!, $courseName: String!, $section: String!, $semester: String!) {
    addCourse(courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $courseCode: String!, $courseName: String!, $section: String!, $semester: String!) {
    updateCourse(id: $id, courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const ENROLL_COURSE = gql`
  mutation EnrollCourse($studentId: ID!, $courseId: ID!) {
    enrollCourse(studentId: $studentId, courseId: $courseId) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const DROP_COURSE = gql`
  mutation DropCourse($studentId: ID!, $courseId: ID!) {
    dropCourse(studentId: $studentId, courseId: $courseId) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation AddStudent($studentNumber: String!, $firstName: String!, $lastName: String!, $phone: String!, $program: String!, $email: String!, $password: String!, $favoriteTopic: String!, $strongestTechnicalSkill: String!) {
    addStudent(studentNumber: $studentNumber, firstName: $firstName, lastName: $lastName, phone: $phone, program: $program, email: $email, password: $password, favoriteTopic: $favoriteTopic, strongestTechnicalSkill: $strongestTechnicalSkill) {
      id
      studentNumber
      firstName
      lastName
      phone
      program
      email
      password
      favoriteTopic
      strongestTechnicalSkill
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $studentNumber: String!, $firstName: String!, $lastName: String!, $email: String!, $phone: String!, $program: String!, $password: String!, $favoriteTopic: String!, $strongestTechnicalSkill: String!) {
    updateStudent(id: $id, studentNumber: $studentNumber, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, program: $program, password: $password, favoriteTopic: $favoriteTopic, strongestTechnicalSkill: $strongestTechnicalSkill) {
      id
      studentNumber
      firstName
      lastName
      phone
      program
      email
      password
      favoriteTopic
      strongestTechnicalSkill
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) {
      id
    }
  }
`;