import React from "react"; // contains the content creator's information (name, url, description, and imageURL)
import { Link } from "react-router";
import trashIcon from "../assets/trash.png";
import { supabase } from "../client";

const CreatorCard = ({ id, name, url, description, imageURL, onDelete }) => {
    
  const handleDelete = async () => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error);
    } else {
      if (onDelete) onDelete(id); // let parent remove it from UI
    }
  }

  return (
        <div style={styles.card}>
            <button onClick={handleDelete} style={styles.deleteButton}>
              <img src={trashIcon} alt="Delete" style={styles.deleteIcon} />
            </button>
            {imageURL && (
                <img src={imageURL} style={styles.image} />
            )}
            <h2>{name}</h2>
            <p>{description}</p>
            <Link to={`/view/${id}`} style={{ display: "block", marginTop: "0.5rem" }}>
            View profile
            </Link>
            <Link to={`/edit/${id}`} style={{ display: "block", marginTop: "0.5rem" }}>
            Edit profile
            </Link>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "0.5rem" }}>
            Check out this Creator!
            </a>
        </div>
    )
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    margin: "1rem",
    width: "250px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "relative",
    right: "10px",
    padding: 0,
  },
  deleteIcon: {
    width: "20px",
    height: "20px",
  },
};

export default CreatorCard;