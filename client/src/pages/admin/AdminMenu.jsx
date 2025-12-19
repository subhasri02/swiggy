import { useState } from "react";
import axios from "axios";

const AdminMenu = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  const addMenu = async () => {
    await axios.post(
      "http://localhost:8000/api/admin/menu",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Menu added successfully");
    setForm({ name: "", price: "", image: "" });
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">
        Add Menu Item
      </h1>

      <input
        placeholder="Item Name"
        className="w-full border p-2 mb-3"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Price"
        className="w-full border p-2 mb-3"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        className="w-full border p-2 mb-3"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
      />

      <button
        onClick={addMenu}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Menu
      </button>
    </div>
  );
};

export default AdminMenu;
