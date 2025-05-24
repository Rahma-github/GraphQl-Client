import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_SONG } from "../graphql/mutations";
import { GET_SONGS } from "../graphql/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const UpdateSong = ({ song, onClose }) => {
  const PrimaryColor = "#9a90e2"; 
  const { refetch } = useQuery(GET_SONGS);
  const [updateSong, { loading, error }] = useMutation(UPDATE_SONG);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (song) {
      reset({
        title: song.title || "",
        genres: song.genres?.join(", ") || "",
      });
    }
  }, [song, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateSong({
        variables: {
          id: song.id,
          edits: {
            title: formData.title,
            genres: formData.genres.split(",").map((g) => g.trim()),
          },
        },
      });
      refetch();
      onClose();
    } catch (err) {
      alert("Error updating ", err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: PrimaryColor,
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: "24px" }} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: PrimaryColor,
              fontWeight: "bold",
            }}
          >
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            style={{
              width: "100%",
              padding: "10px",
              border: `1px solid ${PrimaryColor}`,
              borderRadius: "5px",
              color: "black",
            }}
          />
          {errors.title && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.title.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: PrimaryColor,
              fontWeight: "bold",
            }}
          >
            Genres (comma separated)
          </label>
          <input
            type="text"
            {...register("genres", { required: "Genres are required" })}
            style={{
              width: "100%",
              padding: "10px",
              border: `1px solid ${PrimaryColor}`,
              borderRadius: "5px",
              color: "black",
            }}
          />
          {errors.genres && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.genres.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: PrimaryColor,
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateSong;