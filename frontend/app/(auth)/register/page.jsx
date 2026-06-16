"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../(dashboard)/prodi/form.css";

export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Register berhasil");

        router.push("/login");

      } else {

        alert(data.detail);
      }

    } catch (error) {

      console.error(error);

      alert("Gagal terhubung ke server");
    }
  };

  return (
    <div className="formCard">

      <h1 className="formTitle">
        Register SIAKAD
      </h1>

      <form onSubmit={register}>

        <div className="formGroup">
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className="formGroup">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="btnPrimary"
        >
          Register
        </button>

      </form>

    </div>
  );
}