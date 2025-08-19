import React from "react";
import CreatorCard from "../components/Card";

const ShowCreators = ({ creators, onDelete }) => {
    return (
    <div style={styles.grid}>
      {creators.length > 0 ? (
        creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            id={creator.id}
            name={creator.name}
            url={creator.url}
            description={creator.description}
            imageURL={creator.imageURL}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No creators found. Add one!</p>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
    padding: "1rem",
  },
};

export default ShowCreators;