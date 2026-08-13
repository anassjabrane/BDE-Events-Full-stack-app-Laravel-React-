import { useState } from "react";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setMessage("Login successful ✅");

            console.log("Login data:", data);
        } catch (error) {
            console.error(error);

            if (error.response) {
                setMessage(
                    error.response.data.message || "Login failed ❌"
                );
            } else {
                setMessage("Server error ❌");
            }
        }
    };

    return (
        <div>
            <h1>BDE Events</h1>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Login;