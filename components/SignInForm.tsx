'use client'
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const SignInForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Signing in...");

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.error) {
        setMessage("Invalid credentials");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setMessage("Sign in failed");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/protected/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col gap-4 bg-gray-400 p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="text"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit">Sign in</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default SignInForm;
