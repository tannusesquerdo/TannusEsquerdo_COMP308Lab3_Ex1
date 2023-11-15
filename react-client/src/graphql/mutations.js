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
