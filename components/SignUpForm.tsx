"use client";
import React, { useState } from "react";
import { signUp } from "@/app/actions/users/signUp";

const SignUpForm = () => {
  const [username, setUsername] = useState(""); // New state for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Signing up...");
    // Use username, email, and password when calling signUp
    const responseMessage = await signUp(username, email, password);
    setMessage(responseMessage);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-400 p-4">
      {/* Input field for username */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      {/* Input field for email */}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {/* Input field for password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={handleSubmit}>Sign up</button>

      <p>{message}</p>
    </div>
  );
};

export default SignUpForm;
