import { useState } from "react";
import api from "../api/axios";

function EditEvent({ event, onUpdated }) {
    const [form, setForm] = useState({
        title: event.title,
        description: event.description || "",
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        max_capacity: event.max_capacity,
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
            const response = await api.put(`/events/${event.id}`, form);

            console.log(response.data);

            setMessage("Event updated successfully ✅");

            if (onUpdated) {
                onUpdated(response.data.event);
            }
        } catch (error) {
            console.error(error);
            console.log(error.response?.data);

            setMessage("Error updating event ❌");
        }
    };

    return (
        <div>
            <h2>Edit Event</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <br />
                <br />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
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
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <br />
                <br />

                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                />

                <br />
                <br />

                <input
                    type="number"
                    name="max_capacity"
                    value={form.max_capacity}
                    onChange={handleChange}
                    min="1"
                />

                <br />
                <br />

                <button type="submit">
                    Update Event
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default EditEvent;