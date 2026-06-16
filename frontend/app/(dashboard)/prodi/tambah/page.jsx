"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../form.css";

export default function TambahProdi() {

  const router = useRouter();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState("");

  const simpanData = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/prodi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nama,
          fakultas,
        }),
      }
    );

    if (response.ok) {
      alert("Data berhasil ditambahkan");
      router.push("/prodi");
    }
  };

  return (
    <div className="formCard">

      <h1 className="formTitle">
        Tambah Program Studi
      </h1>

      <form onSubmit={simpanData}>

        <div className="formGroup">
          <label>ID Prodi (cth: TIF)</label>

          <input
            type="text"
            value={id}
            onChange={(e) =>
              setId(e.target.value)
            }
          />
        </div>

        <div className="formGroup">
          <label>Nama Prodi</label>

          <input
            type="text"
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
          />
        </div>

        <div className="formGroup">
          <label>Fakultas</label>

          <input
            type="text"
            value={fakultas}
            onChange={(e) =>
              setFakultas(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="btnPrimary"
        >
          Simpan
        </button>

        <button
          type="button"
          className="btnSecondary"
          onClick={() =>
            router.push("/prodi")
          }
        >
          Batal
        </button>

      </form>

    </div>
  );
}