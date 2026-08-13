import { useState } from "react";
import api from "../api/axios";

function CreateEvent() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        price: "",
        max_capacity: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/events", form);

            console.log(response.data);

            setMessage("Event created successfully ✅");

            setForm({
                title: "",
                description: "",
                date: "",
                time: "",
                location: "",
                price: "",
                max_capacity: "",
            });
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.log(error.response.data);
                setMessage("Error ❌");
            } else {
                setMessage("Server error ❌");
            }
        }
    };

    return (
        <div>
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                />

                <br />
                <br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="number"
                    name="max_capacity"
                    placeholder="Maximum capacity"
                    min="1"
                    value={form.max_capacity}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">
                    Create Event
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default CreateEvent;