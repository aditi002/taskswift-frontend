import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [fullname, setFullName] = useState("")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setFullName(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    
        const user = {
          fullname,
          username,
          email,
          password,
        };
        await axios
            .post("http://localhost:3000/users/register", user)
            .then(() => {
                toast.success("User Registered Successfully");
                setTimeout(() => {
                    window.location.replace("/login");
                }, 500);
            })
            .catch((e) => {
                if (e.response && e.response.data && e.response.data.error) {
                    toast.error(`Registration Failed! ${e.response.data.error}`);
                } else {
                    toast.error('Registration Failed. Please try again.');
                }
            });
            
    };

    return (
        <div className="container">
            <div className="login-form">
                <div className="login-title">Register</div>
                <div className="login-input-parts">
                    <input
                     className="login-input"
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Full Name"
                        required="required"
                        value={fullname}
                        onChange={handleNameChange}
                    />
                    <input
                     className="login-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required="required"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <input
                    className="login-input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required="required"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                    className="login-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required="required"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <button  className="login-input button" onClick={onSubmit}>
                        Register
                    </button>
                </div>
                <div className="login-signup">
                Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Register;