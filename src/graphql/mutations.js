import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation AddSong($song: SongInput!) {
    addSong(song: $song) {
      id
      title
      genres
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id)
  }
`;

export const UPDATE_SONG = gql`
  mutation UpdateSong($id: ID!, $edits: SongEditInput!) {
    updateSong(id: $id, edits: $edits) {
      id
      title
      genres
    }
  }
`;