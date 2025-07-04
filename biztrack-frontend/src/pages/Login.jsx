// src/pages/Login.jsx
import React, { useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import api from "../services/api";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      loginUser(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
      {error && <Typography color="error" mt={2}>{error}</Typography>}
    </Paper>
  );
};

export default Login;
