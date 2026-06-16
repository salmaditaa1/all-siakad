"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("Login berhasil!");
        router.push("/prodi");
      } else {
        const data = await response.json();
        setError(data.detail || "Login gagal");
      }
    } catch (err) {
      setError("Tidak dapat terhubung ke server");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Login SIAKAD
        </h2>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-black mb-2">
            Username
          </label>

          <input
            type="text"
            className="w-full border p-2 rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">
            Password
          </label>

          <input
            type="password"
            className="w-full border p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
        <p
  style={{
    marginTop: "15px",
    textAlign: "center",
  }}
>
  Belum punya akun?

  <a
    href="/register"
    style={{
      color: "blue",
      marginLeft: "5px",
    }}
  >
    Daftar di sini
  </a>
</p>
      </form>
    </div>
  );
}