import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation($createUserInput: UserInput!) {
        createUser(input: $createUserInput) {
            id
        }
    }
`


