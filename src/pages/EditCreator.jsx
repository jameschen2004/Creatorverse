import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../client";

const EditCreator = ({ }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: "",
    });

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
            .from("creators")
            .select("*")
            .eq("id", id)
            .single();
       
            if (error) {
                console.error("Error fetching creator:", error);
            } else {
                setFormData(data);
            }
        };

        fetchCreator();
    }, [id])
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from("creators")
            .update({
                name: formData.name,
                url: formData.url,
                description: formData.description,
                imageURL: formData.imageURL,
            })
            .eq("id", id);

            if (error) {
                console.log("Error updating creator:", error);
            } else {
                onAdd((prev) => [...prev, ...data]);
                navigate(`/view/${id}`);
            }
    }

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <h1>Edit Creator</h1>
            <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" />
            <input name="url" value={formData.url || ""} onChange={handleChange} placeholder="Website URL" />
            <textarea name="description" value={formData.description || ""} onChange={handleChange} placeholder="Description" />
            <input name="imageURL" value={formData.imageURL || ""} onChange={handleChange} placeholder="Image URL" />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditCreator;