import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
      genres
      artist {
        id
        name
      }
      album {
        id
        title
      }
    }
  }
`;

export const GET_ARTISTS = gql`
  query GetArtists {
    artists {
      id
      name
      country
      songs {
        id
        title
      }
    }
  }
`;

export const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      id
      title
      release_year
      artist {
        id
        name
      }
      songs {
        id
        title
      }
    }
  }
`;