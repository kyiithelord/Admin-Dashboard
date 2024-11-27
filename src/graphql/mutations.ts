import { gql } from '@apollo/client';

// Mutation to update user information
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      firstName
      lastName
      updatedAt
    }
  }
`;
