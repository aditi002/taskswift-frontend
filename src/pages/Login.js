import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isGuest, setIsGuest] = useState(false); // New state for guest login

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



    const user = {
      username,
      password,
      isGuest, // Include the guest flag in the request
    };

    try {
      const res = await axios.post("http://localhost:3000/users/login", user);
      localStorage.setItem("token", res.data.token);
      window.location.replace("/");
    } catch (e) {
      toast.error(`Login Failed! ${e.response.data.msg}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-form">
          <div className="login-title">Login</div>
          <div className="login-input-parts">
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
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required="required"
              value={password}
              onChange={handlePasswordChange}
            />

            {/* Checkbox for guest login */}
            <div className="guest-checkbox">
              <label>
                <input type="checkbox" checked={isGuest} onChange={handleGuestCheckboxChange} />
                Log in as Guest
              </label>
            </div>

            <button className="login-input button" onClick={onSubmit}>
              Log In
            </button>
          </div>
          <div className="login-signup">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
