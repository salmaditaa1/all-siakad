"use client";

import { useEffect, useState } from "react";
import "./fakultas.css";

export default function FakultasPage() {

  const [fakultas, setFakultas] = useState([]);

  useEffect(() => {
    fetchFakultas();
  }, []);

  const fetchFakultas = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/fakultas"
    );

    const data = await response.json();

    setFakultas(data);
  };

  const hapusFakultas = async (id) => {

    const konfirmasi = confirm(
      "Yakin ingin menghapus data?"
    );

    if (!konfirmasi) return;

    const response = await fetch(
      `http://127.0.0.1:8000/fakultas/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {

      alert("Data berhasil dihapus");

      fetchFakultas();
    }
  };

  return (
    <div className="container">

      <div className="topbar">
        <h1 className="title">
          Data Fakultas
        </h1>
      </div>

      <a
        href="/fakultas/tambah"
        className="btnTambah"
      >
        + Tambah Fakultas
      </a>

      <table className="table">

        <thead>
          <tr>
            <th>ID Fakultas</th>
            <th>Nama Fakultas</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>

          {fakultas.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.nama}</td>

              <td>

                <a
                  href={`/fakultas/edit/${item.id}`}
                  className="btnEdit"
                >
                  Edit
                </a>

                <button
                  className="btnHapus"
                  onClick={() =>
                    hapusFakultas(item.id)
                  }
                >
                  Hapus
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}