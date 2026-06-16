"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useParams,
} from "next/navigation";

import "../../../prodi/form.css";

export default function EditFakultas() {

  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [nama, setNama] = useState("");

  useEffect(() => {

    if (id) {
      loadData();
    }

  }, [id]);

  const loadData = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/fakultas"
    );

    const data = await response.json();

    const item = data.find(
      (f) => f.id === id
    );

    if (item) {
      setNama(item.nama);
    }
  };

  const updateData = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8000/fakultas/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
        }),
      }
    );

    if (response.ok) {

      alert("Data berhasil diperbarui");

      router.push("/fakultas");
    }
  };

  return (
    <div className="formCard">

      <h1 className="formTitle">
        Edit Fakultas
      </h1>

      <form onSubmit={updateData}>

        <div className="formGroup">
          <label>ID Fakultas</label>

          <input
            value={id}
            disabled
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
          className="btnWarning"
        >
          Update
        </button>

        <button
          type="button"
          className="btnSecondary"
          onClick={() =>
            router.push("/fakultas")
          }
        >
          Batal
        </button>

      </form>

    </div>
  );
}