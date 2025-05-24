import { useQuery, useMutation } from "@apollo/client";
import { GET_SONGS } from "../graphql/queries";
import { DELETE_SONG } from "../graphql/mutations";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateSong from "./UpdateSong";

const SongList = ({ PrimaryColor = "#9a90e2" }) => {
  const { loading, error, data, refetch } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const handleDeleteSong = async (id) => {
    await deleteSong({ variables: { id } });
    refetch();
  };

  const handleToggleEdit = (songId) => {
    setSelectedSongId((prevId) => (prevId === songId ? null : songId));
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error loading songs!</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        {data.songs.map((song) => (
          <div key={song.id} className="col-6 mb-4">
            <div className="card border shadow-sm">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black" }}>
                  {song.title}
                </h5>
                <p className="card-text" style={{ color: "black", opacity: "0.8" }}>
                  Artist: {song.artist?.name || "Unknown"}
                </p>
                <p className="card-text" style={{ color: "black", opacity: "0.8" }}>
                  Album: {song.album?.title || "Unknown"}
                </p>
                <p className="card-text" style={{ color: "black", opacity: "0.8" }}>
                  Genres: {song.genres.join(", ")}
                </p>
                <button
                  className="btn me-2"
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={() => handleDeleteSong(song.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: PrimaryColor, color: "white" }}
                  onClick={() => handleToggleEdit(song.id)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </button>
              </div>

              {/* Show UpdateSong under the card if selected */}
              {selectedSongId === song.id && (
                <div className="card-footer bg-light">
                  <UpdateSong
                    song={song}
                    onClose={() => setSelectedSongId(null)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
