import React, { useState } from "react";
import { supabase } from "../client";

const AddCreator = ({ onAdd }) =>
{
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("creators")
            .insert([formData])
            .select();

        if (error) {
            console.error("Error inserting:", error);
        } else {
            console.log("Inserted new creator:", data[0]);
            // reset form
            setFormData({
                name: "",
                url: "",
                description: "",
                imageURL: "",
            });
            onAdd((prev) => [...prev, ...data]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Creator</h1>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input name="url" value={formData.url} onChange={handleChange} placeholder="Website URL" />
            <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image URL" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddCreator;