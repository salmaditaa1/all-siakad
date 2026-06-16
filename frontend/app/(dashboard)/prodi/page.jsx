"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./prodi.css";

export default function ProdiPage() {

  const [prodi, setProdi] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchProdi();
  }, []);

  const fetchProdi = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/prodi"
    );

    const data = await response.json();

    setProdi(data);
  };

  const hapusProdi = async (id) => {

    const konfirmasi = confirm(
      "Yakin ingin menghapus data?"
    );

    if (!konfirmasi) return;

    const response = await fetch(
      `http://127.0.0.1:8000/prodi/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {

      alert("Data berhasil dihapus");

      fetchProdi();
    }
  };

 const logout = async () => {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {

      localStorage.removeItem("token");

      alert("Logout berhasil");

      router.push("/login");
    }

  } catch (error) {

    console.error(error);

    alert("Logout gagal");
  }
};

  return (
    <div className="container">

      <div className="topbar">

        <h1 className="title">
          Dashboard Admin
        </h1>

        <div className="userbox">

          <span>
            Halo, admin
          </span>

          <button
            className="logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      <a
        href="/prodi/tambah"
        className="btnTambah"
      >
        + Tambah Prodi
      </a>

      <table className="table">

        <thead>
          <tr>
            <th>ID Prodi</th>
            <th>Nama Program Studi</th>
            <th>Fakultas</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>

          {prodi.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.nama}</td>

              <td>{item.fakultas}</td>

              <td>

                <a
                  href={`/prodi/edit/${item.id}`}
                  className="btnEdit"
                >
                  Edit
                </a>

                <button
                  className="btnHapus"
                  onClick={() =>
                    hapusProdi(item.id)
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