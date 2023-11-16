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
