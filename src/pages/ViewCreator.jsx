import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CreatorCard from "../components/Card";

const ViewCreator = ({ creators, onDelete }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const creator = creators.find((c) => c.id.toString() === id);
    console.log(id);
    if (!creator) return (
        <div style={ {textAlign: "center"} }>
            <h2>This creator does not exist</h2>
            <Link to="/">Back to All Creators</Link>
        </div>
    );

    const handleDeleteAndRedirect = (id) => {
        onDelete(id);
        navigate("/");
    };

    return (
        <div style={ {textAlign: "center"} }>
            <h1>View Creator</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CreatorCard id={creator.id} name={creator.name} url={creator.url} description={creator.description} imageURL={creator.imageURL} onDelete={handleDeleteAndRedirect} />
            </div> 
            <Link to="/">Back to All Creators</Link>
        </div>
    )
}

export default ViewCreator;