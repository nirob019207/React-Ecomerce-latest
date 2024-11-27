import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/api/auth/authApiSlice";
import { setUser } from "../../store/api/auth/authSlice";
import { getUser } from "./../../store/api/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(
        setUser({
          accessToken: userData?.token,
          user_id: userData?._id,
          userType: userData?.userType,
        })
      );
      dispatch(getUser({ user_id: userData._id, userType: userData.userType }));
      localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: userData?.token,
          user_id: userData._id,
          userType: userData.userType,
        })
      );

      // Redirect to the appropriate page after login
      navigate("/customerHome"); // Adjust this path as needed
    } catch (error) {
      setError(error?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-[#9dc9e7] min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Login Illustration"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Login</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="current-password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
          <div className="flex justify-between mt-2">
            <div className="text-lg">Don't have an account?</div>
            <div
              onClick={() => navigate("/register")}
              className="font-semibold text-lg cursor-pointer"
            >
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
