import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { registerUser } from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser(form);

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const response = err.response?.data;

      if (response?.errors?.length) {
        setError(response.errors[0].message);
      } else {
        setError(
          response?.message ||
            "Unable to create your account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">RFQ<span>Market</span></div>

          <h1>Create your account</h1>
          <p>
            Join the marketplace as a buyer or supplier.
          </p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success" role="status">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            required
          />

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Account type
              <span className="required-mark">*</span>
            </label>

            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="BUYER">Buyer</option>
              <option value="SUPPLIER">Supplier</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="full-width"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;