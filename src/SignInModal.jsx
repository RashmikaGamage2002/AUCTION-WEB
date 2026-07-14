import React, { useState, useContext } from "react";
import "./SignInModal.css";
import { login as apiLogin, register as apiRegister } from "./api/auth";
import { AuthContext } from "./context/AuthContext";
import toast from "react-hot-toast";

const SignInModal = ({ onClose }) => {
  const { login } = useContext(AuthContext); // ✅ Correct context usage
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiLogin(form.email, form.password);
      toast.success("✅ Signed in successfully!");
      console.log("Login response:", res);

      // ✅ Save user & token to AuthContext
      if (res.token && res.user) {
        login(res.token, res.user);
      }

      onClose();
    } catch (err) {
      toast.error("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (createForm.password !== createForm.confirmPassword) {
     toast.error("❌ Pssword Not Match");
      return;
    }
    setLoading(true);
    try {
      const res = await apiRegister(createForm.name, createForm.email, createForm.password);
      toast.success("✅ Account created successfully!");
      console.log("Register response:", res);
      setShowCreate(false);
      setCreateForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      toast.error("❌ Register failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-modal-overlay" onClick={onClose}>
      <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="signin-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="signin-title">{showCreate ? "Create Account" : "Sign In"}</h2>

        {!showCreate ? (
          <form className="signin-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>
            <label>
              Password
              <div className="signin-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>
            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <div className="signin-footer">
              Don’t have an account?{" "}
              <button
                type="button"
                className="signin-link"
                onClick={() => setShowCreate(true)}
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          <form className="signin-form" onSubmit={handleCreateSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={createForm.name}
                onChange={handleCreateChange}
                placeholder="Enter your name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={createForm.email}
                onChange={handleCreateChange}
                placeholder="Enter your email"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={createForm.password}
                onChange={handleCreateChange}
                placeholder="Create a password"
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={createForm.confirmPassword}
                onChange={handleCreateChange}
                placeholder="Confirm your password"
                required
              />
            </label>
            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
            <div className="signin-footer">
              Already have an account?{" "}
              <button
                type="button"
                className="signin-link"
                onClick={() => setShowCreate(false)}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInModal;