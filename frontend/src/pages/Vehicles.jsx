import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    Plate_Number: "",
    Brand: "",
    Model: "",
    Year: "",
    Vehicle_Type: "",
    Purchase_Price: "",
    Status: "Available",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchVehicles = async () => {
    try {
      const res = await api.get(`/vehicles?search=${search}`);
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/vehicles/${editingId}`, form);
      } else {
        await api.post("/vehicles", form);
      }
      fetchVehicles();
      setForm({
        Plate_Number: "",
        Brand: "",
        Model: "",
        Year: "",
        Vehicle_Type: "",
        Purchase_Price: "",
        Status: "Available",
      });
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      alert("Failed to save vehicle");
    }
  };

  const handleEdit = (vehicle) => {
    setForm({
      Plate_Number: vehicle.Plate_Number,
      Brand: vehicle.Brand,
      Model: vehicle.Model,
      Year: vehicle.Year,
      Vehicle_Type: vehicle.Vehicle_Type,
      Purchase_Price: vehicle.Purchase_Price,
      Status: vehicle.Status,
    });
    setEditingId(vehicle._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const openCreateModal = () => {
    setForm({
      Plate_Number: "",
      Brand: "",
      Model: "",
      Year: "",
      Vehicle_Type: "",
      Purchase_Price: "",
      Status: "Available",
    });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">Manage Vehicles</h2>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Vehicle
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Vehicle" : "Add New Vehicle"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Plate Number"
                className="border p-2 rounded"
                value={form.Plate_Number}
                onChange={(e) =>
                  setForm({ ...form, Plate_Number: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Brand"
                className="border p-2 rounded"
                value={form.Brand}
                onChange={(e) => setForm({ ...form, Brand: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Model"
                className="border p-2 rounded"
                value={form.Model}
                onChange={(e) => setForm({ ...form, Model: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Year"
                className="border p-2 rounded"
                value={form.Year}
                onChange={(e) => setForm({ ...form, Year: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Vehicle Type"
                className="border p-2 rounded"
                value={form.Vehicle_Type}
                onChange={(e) =>
                  setForm({ ...form, Vehicle_Type: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Purchase Price"
                className="border p-2 rounded"
                value={form.Purchase_Price}
                onChange={(e) =>
                  setForm({ ...form, Purchase_Price: e.target.value })
                }
                required
              />
              <select
                className="border p-2 rounded"
                value={form.Status}
                onChange={(e) => setForm({ ...form, Status: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <div className="col-span-2 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search vehicles..."
          className="border p-2 w-full mb-4 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-50">
                <th className="border p-2">Plate</th>
                <th className="border p-2">Brand/Model</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50">
                  <td className="border p-2">{v.Plate_Number}</td>
                  <td className="border p-2">
                    {v.Brand} {v.Model} ({v.Year})
                  </td>
                  <td className="border p-2">{v.Vehicle_Type}</td>
                  <td className="border p-2">{v.Status}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(v)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="border p-2 text-center text-gray-500"
                  >
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
