import { gql } from '@apollo/client'

export const ADD_STUDENT = gql`
mutation AddStudent($studentNumber: String!, $firstName: String!, $lastName: String!,
  $address: String!, $city: String, $phone: String!, $program: String!, $email: String!, $password: String!) {
  addStudent(studentNumber: $studentNumber,  firstName: $firstName, lastName: $lastName,
    address: $address, city: $city, phone: $phone, program: $program, email: $email, password: $password) {
    id
    studentNumber
    firstName
    lastName
    address
    city
    program
    email
    phone   
    password
  }
}
`;

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
