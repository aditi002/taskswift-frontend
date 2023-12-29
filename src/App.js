import "react-toastify/dist/ReactToastify.css";
import './form.css';
import './index.css';

import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import SplashScreen from "./components/SplashScreen";
import Completed from "./pages/Completed";
import Dashboard from "./pages/Dashboard";
import Important from "./pages/Important";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Upcoming from "./pages/Upcoming";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [profile, setProfile] = useState();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:3000/users/profile`, config);
        setUser(res["data"]["id"]);
        setProfile(res["data"])
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const getTasks = async () => {
        const res = await axios.get(`http://localhost:3000/tasks/user/${user}`, config);
        setTasks(res["data"]);
      };
      getTasks();
    }
  }, [token, user]);

  return (
    <>
      <Router>
        <div className="main-container">
          {token ? <Sidebar profile={profile} /> : <div className="sidebar" />}
          <div className="content">
            <Routes>
            <Route path="/" element={<SplashScreen />} />
              <Route path="/dashboard" element={token ? <Dashboard tasks={tasks} /> : <Login />} />
              <Route path="/login" element={token ? <Dashboard /> : <Login />} />
              <Route path="/register" element={token ? <Dashboard /> : <Register />} />
              <Route path="/upcoming" element={token ? <Upcoming tasks={tasks} /> : <Login />} />
              <Route path="/important" element={token ? <Important tasks={tasks} /> : <Login />} />
              <Route path="/completed" element={token ? <Completed tasks={tasks} /> : <Login />} />
            </Routes>
          </div>
          {token ? <Rightbar token={token} user={user} tasks={tasks} /> : <div className="rightbar" />}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
