import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the import path as necessary
import React , {useState} from "react";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login clicked", email, password);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            toast.success("Login successful", {
                position: "top-center",
                autoClose: 2000,
            });
        } catch (error) {
            console.log(error)
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        // Add your login logic here
    }

    return (
    <form onSubmit={handleSubmit}>
        <h3>Login</h3>

<div className="mb-3">
    <label>Email address</label>
    <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
</div>
<div className="mb-3">
    <label>Password</label>
    <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
</div>
<div className="d-grid">
    <button type="submit" className="btn btn-primary">
        Submit
    </button>
</div>
<p className="">
    new user <a href="/register">Register Here</a>
</p>
    </form>
    );
}

export default Login;