import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SONG } from "../graphql/mutations";
import { GET_SONGS, GET_ARTISTS, GET_ALBUMS } from "../graphql/queries";
import { TextField, Button, MenuItem, Box } from "@mui/material";

const AddSong = ({ PrimaryColor, setShowAdd }) => {
  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [genres, setGenres] = useState("");
  const [addSong, { loading, error }] = useMutation(ADD_SONG);

  const { refetch } = useQuery(GET_SONGS);
  const { data: artistData } = useQuery(GET_ARTISTS);
  const { data: albumData } = useQuery(GET_ALBUMS);


  const reset = () => {
    setTitle("");
    setArtistId("");
    setAlbumId("");
    setGenres("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !artistId || !albumId || !genres) return;

    await addSong({
      variables: {
        song: {
          title,
          artist_id: artistId,
          album_id: albumId,
          genres: genres.split(",").map((g) => g.trim()),
        },
      },
    });

    refetch();
    reset();
    setShowAdd(false);
  };

  return (
    <Box
      sx={{
        color: PrimaryColor,
      }}
    >
      <h2>Add New Song</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            marginBottom: "10px",
            "& label": { color: PrimaryColor },
            "& label.Mui-focused": { color: PrimaryColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: PrimaryColor },
              "&:hover fieldset": { borderColor: PrimaryColor },
              "&.Mui-focused fieldset": { borderColor: PrimaryColor },
            },
            "& input": { color: PrimaryColor },
          }}
        />

        <TextField
          select
          label="Select Artist"
          fullWidth
          variant="outlined"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          sx={{
            marginBottom: "10px",
            "& label": { color: PrimaryColor },
            "& label.Mui-focused": { color: PrimaryColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: PrimaryColor },
              "&:hover fieldset": { borderColor: PrimaryColor },
              "&.Mui-focused fieldset": { borderColor: PrimaryColor },
            },
            "& input": { color: PrimaryColor },
          }}
        >
          {artistData?.artists?.map((artist) => (
            <MenuItem key={artist.id} value={artist.id}>
              {artist.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select Album"
          fullWidth
          variant="outlined"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          sx={{
            marginBottom: "10px",
            "& label": { color: PrimaryColor },
            "& label.Mui-focused": { color: PrimaryColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: PrimaryColor },
              "&:hover fieldset": { borderColor: PrimaryColor },
              "&.Mui-focused fieldset": { borderColor: PrimaryColor },
            },
            "& input": { color: PrimaryColor },
          }}
        >
          {albumData?.albums?.map((album) => (
            <MenuItem key={album.id} value={album.id}>
              {album.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Genres (comma-separated)"
          fullWidth
          variant="outlined"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          sx={{
            marginBottom: "10px",
            "& label": { color: PrimaryColor },
            "& label.Mui-focused": { color: PrimaryColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: PrimaryColor },
              "&:hover fieldset": { borderColor: PrimaryColor },
              "&.Mui-focused fieldset": { borderColor: PrimaryColor },
            },
            "& input": { color: PrimaryColor },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: PrimaryColor,
            color: "white",
            marginTop: "10px",
          }}
          fullWidth
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Song"}
        </Button>

        {error && (
          <p style={{ color: "red", marginTop: 5 }}>Error: {error.message}</p>
        )}
      </form>
    </Box>
  );
};

export default AddSong;
