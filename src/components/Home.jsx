import SongList from "./SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus } from "@fortawesome/free-solid-svg-icons";
import AddSong from "./AddSong";
import { useState } from "react";

const Home = () => {
  const PrimaryColor = "#9a90e2"; 

  const [showAdd, setShowAdd] = useState(false);
  const handelToggleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="container mt-5">
      <h1
        className="text-center d-flex align-items-center justify-content-between"
        style={{
          color: PrimaryColor,
          fontWeight: "bold",
          borderBottom: `2px solid ${PrimaryColor}`,
          paddingBottom: "10px",
        }}
      >
        <div>
          Music App
        </div>
        <button
          onClick={handelToggleAdd}
          style={{
            backgroundColor: PrimaryColor,
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
          Add Song
        </button>
      </h1>
      {showAdd && (
        <AddSong PrimaryColor={PrimaryColor} setShowAdd={setShowAdd} />
      )}
      <SongList PrimaryColor={PrimaryColor} />
    </div>
  );
};

export default Home;