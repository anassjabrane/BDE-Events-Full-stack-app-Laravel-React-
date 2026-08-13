```jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import EditEvent from "./EditEvent";

function AdminDashboard() {
    const [stats, setStats] = useState({
        total_events: 0,
        total_capacity: 0,
    });

    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const getDashboardData = async () => {
        try {
            const statsResponse = await api.get("/admin/events/stats");
            const eventsResponse = await api.get("/events");

            setStats(statsResponse.data);
            setEvents(eventsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    const handleUpdated = (updatedEvent) => {
        setEvents((currentEvents) =>
            currentEvents.map((event) =>
                event.id === updatedEvent.id
                    ? updatedEvent
                    : event
            )
        );

        setEditingEvent(null);

        getDashboardData();
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h2>Statistics</h2>

            <p>
                Total Events: {stats.total_events}
            </p>

            <p>
                Total Capacity: {stats.total_capacity}
            </p>

            <hr />

            {editingEvent && (
                <div>
                    <EditEvent
                        event={editingEvent}
                        onUpdated={handleUpdated}
                    />

                    <button onClick={() => setEditingEvent(null)}>
                        Cancel
                    </button>

                    <hr />
                </div>
            )}

            <h2>Events</h2>

            {events.map((event) => (
                <div key={event.id}>
                    <h3>{event.title}</h3>

                    <p>{event.description}</p>

                    <p>Date: {event.date}</p>

                    <p>Time: {event.time}</p>

                    <p>Location: {event.location}</p>

                    <p>Price: {event.price} DH</p>

                    <p>Capacity: {event.max_capacity}</p>

                    <button onClick={() => setEditingEvent(event)}>
                        Edit
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;
```
