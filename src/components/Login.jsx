import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utls/userslice";
import { BASE_URL } from "../utls/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!emailId || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      // Use backend-friendly keys (Emailid, Password)
      const payload = { Emailid: emailId, Password: password };
      console.log("Login payload:", payload);

      const res = await axios.post(BASE_URL + "/login", payload, {
        withCredentials: true,
      });

      const user = res?.data?.data ?? res?.data;
      console.log("Login success:", res?.data);
      if (user) dispatch(addUser(user));
      navigate("/");
    } catch (err) {
      console.error("Login full error:", err);
      console.error("Login response data:", err?.response?.data);
      const serverMsg =
        (err?.response?.data && (err.response.data.message ?? err.response.data)) ||
        err?.message ||
        "Something went wrong";
      setError(String(serverMsg));
    }
  };

  const handleSignUp = async () => {
    setError("");
    if (!firstName || !lastName || !emailId || !password) {
      setError("All signup fields are required.");
      return;
    }

    try {
      // Use backend-friendly keys (Name, LastName, Emailid, Password)
      const payload = {
        Name: firstName,
        LastName: lastName,
        Emailid: emailId,
        Password: password,
      };
      console.log("Signup payload:", payload);

      const res = await axios.post(BASE_URL + "/signup", payload, {
        withCredentials: true,
      });

      const user = res?.data?.data ?? res?.data;
      console.log("Signup success:", res?.data);
      if (user) dispatch(addUser(user));
      navigate("/profile");
    } catch (err) {
      console.error("Signup full error:", err);
      console.error("Signup response data:", err?.response?.data);
      const serverMsg =
        (err?.response?.data && (err.response.data.message ?? err.response.data)) ||
        err?.message ||
        "Something went wrong";
      setError(String(serverMsg));
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
              />
            </label>
          </div>

          <p className="text-red-500 break-words">{error}</p>

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((v) => !v)}
          >
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;