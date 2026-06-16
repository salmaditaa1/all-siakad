"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useParams,
} from "next/navigation";

import "../../form.css";

export default function EditProdi() {

  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState("");

  useEffect(() => {

    if (id) {
      loadData();
    }

  }, [id]);

  const loadData = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/prodi"
    );

    const data = await response.json();

    const item = data.find(
      (p) => p.id === id
    );

    if (item) {

      setNama(item.nama);
      setFakultas(item.fakultas);

    }
  };

  const updateData = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8000/prodi/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          fakultas,
        }),
      }
    );

    if (response.ok) {

      alert("Data berhasil diperbarui");

      router.push("/prodi");
    }
  };

  return (
    <div className="formCard">

      <h1 className="formTitle">
        Edit Program Studi
      </h1>

      <form onSubmit={updateData}>

        <div className="formGroup">
          <label>
            ID Prodi (Tidak dapat diubah)
          </label>

          <input
            value={id}
            disabled
          />
        </div>

        <div className="formGroup">
          <label>Nama Prodi</label>

          <input
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
          />
        </div>

        <div className="formGroup">
          <label>Fakultas</label>

          <input
            value={fakultas}
            onChange={(e) =>
              setFakultas(e.target.value)
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
            router.push("/prodi")
          }
        >
          Batal
        </button>

      </form>

    </div>
  );
}