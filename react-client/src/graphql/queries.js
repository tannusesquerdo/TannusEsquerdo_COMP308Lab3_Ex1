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

export const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      studentNumber
      firstName
      lastName
      email
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
