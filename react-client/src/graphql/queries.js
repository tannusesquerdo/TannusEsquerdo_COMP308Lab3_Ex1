import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn {
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

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
      students {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
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
      courses {
        id
        courseCode
        courseName
        section
        semester
      }
    }
  }
`;

export const GET_STUDENT_COURSES = gql`
  query GetStudentCourses($id: ID!) {
    studentCourses(id: $id) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      studentNumber
      firstName
      lastName
    }
  }
`;
