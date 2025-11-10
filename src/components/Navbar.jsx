import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utls/constants";
import { removeUser } from "../utls/userslice";
import { useState } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };

  const [notifications, setNotifications] = useState([]);
const [hasNew, setHasNew] = useState(false);

const handleOpenNotifications = () => setHasNew(false);
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl">
          👩‍💻 DevSwipe
        </Link>
      </div>
      {user && (
  <div className="flex items-center gap-6">
    {/* 🔔 Notification Bell */}
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle relative"
        onClick={handleOpenNotifications}
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.388 8 8.75V14l-1.405 1.405A2.032 2.032 0 016 17h5m4 0v1a2 2 0 11-4 0v-1m4 0H9"
            />
          </svg>
          {hasNew && (
            <span className="badge badge-xs badge-error indicator-item"></span>
          )}
        </div>
      </div>

      {/* Notification Dropdown */}
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-72 shadow-lg"
      >
        <div className="card-body">
          <span className="text-lg font-bold">Notifications</span>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-400 py-2">No new notifications</p>
          ) : (
            <div className="divide-y divide-base-200">
              {notifications.map((note) => (
                <div key={note._id || note.id} className="py-2">
                  <p className="text-sm">
                    💌 New connection request from <b>{note.senderName}</b>
                  </p>
                  <div className="flex gap-2 mt-1">
                    <button
                      className="btn btn-xs btn-success text-white"
                      onClick={() =>
                        console.log("Accept request:", note.senderName)
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-xs btn-error text-white"
                      onClick={() =>
                        console.log("Decline request:", note.senderName)
                      }
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="card-actions mt-2">
            <Link to="/requests" className="btn btn-primary btn-sm btn-block">
              View all
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-none gap-2">
      <div className="form-control">Welcome, {user.firstName}</div>
      <div className="dropdown dropdown-end mx-5 flex">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="user photo" src={user.photoUrl || user.avatarUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Profile <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link to="/connections">Connections</Link>
          </li>
          <li>
            <Link to="/requests">Requests</Link>
          </li>
          {/* <li>
            <Link to="/premium">Premium</Link>
          </li> */}
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)}

    </div>
  );
};
export default NavBar;