import { gql } from "urql";

export const CREATE_ALBUM = gql`
  mutation createAlbum($title: String!, $userId: ID!) {
    createAlbum(input: {title: $title, userId: $userId }) {
      id
      title
      user {
        id
        name
      }
    }
  }
`;
