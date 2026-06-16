"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../prodi/form.css";

export default function TambahFakultas() {

  const router = useRouter();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");

  const simpanData = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/fakultas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nama,
        }),
      }
    );

    if (response.ok) {

      alert("Data berhasil ditambahkan");

      router.push("/fakultas");
    }
  };

  return (
    <div className="formCard">

      <h1 className="formTitle">
        Tambah Fakultas
      </h1>

      <form onSubmit={simpanData}>

        <div className="formGroup">
          <label>ID Fakultas</label>

          <input
            value={id}
            onChange={(e) =>
              setId(e.target.value)
            }
          />
        </div>

        <div className="formGroup">
          <label>Nama Fakultas</label>

          <input
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="btnPrimary"
        >
          Simpan
        </button>

      </form>

    </div>
  );
}