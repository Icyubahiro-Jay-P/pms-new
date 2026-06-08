import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    Title: "New Year sale",
    Description: "",
    Discount_Type: "percentage",
    Discount_Value: "",
    Start_Date: "",
    End_Date: "",
  });
  const [linkForm, setLinkForm] = useState({
    Promotion_ID: "",
    Plate_Number: "",
    Performance: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const fetchPromotions = async () => {
    try {
      const res = await api.get("/promotions");
      setPromotions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);
  useEffect(() => {
    if (showLinkModal) fetchVehicles();
  }, [showLinkModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/promotions/${editingId}`, form);
      } else {
        await api.post("/promotions", form);
      }
      fetchPromotions();
      setForm({
        Title: "New Year sale",
        Description: "",
        Discount_Type: "percentage",
        Discount_Value: "",
        Start_Date: "",
        End_Date: "",
      });
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      alert("Failed to save promotion");
    }
  };

  const handleEdit = (promotion) => {
    setForm({
      Title: promotion.Title,
      Description: promotion.Description,
      Discount_Type: promotion.Discount_Type,
      Discount_Value: promotion.Discount_Value,
      Start_Date: promotion.Start_Date
        ? promotion.Start_Date.split("T")[0]
        : "",
      End_Date: promotion.End_Date ? promotion.End_Date.split("T")[0] : "",
    });
    setEditingId(promotion._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/promotions/${id}`);
      fetchPromotions();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleLinkVehicle = async (e) => {
    e.preventDefault();
    try {
      await api.post("/promotions/link-vehicle", linkForm);
      alert("Vehicle linked to promotion successfully.");
      setLinkForm({ Promotion_ID: "", Plate_Number: "", Performance: "" });
      setShowLinkModal(false);
    } catch (err) {
      alert("Failed to link vehicle");
    }
  };

  const openCreateModal = () => {
    setForm({
      Title: "New Year sale",
      Description: "",
      Discount_Type: "percentage",
      Discount_Value: "",
      Start_Date: "",
      End_Date: "",
    });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">Manage Promotions</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowLinkModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Link Vehicle
          </button>
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Promotion
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Promotion" : "Add New Promotion"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <select
                className="border p-2 rounded"
                value={form.Title}
                onChange={(e) => setForm({ ...form, Title: e.target.value })}
              >
                <option>New Year sale</option>
                <option>Holiday Price Slash</option>
                <option>Weekend Flash Sale</option>
                <option>Clearance Discount Offer</option>
                <option>Seasonal Price Drop</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                className="border p-2 rounded"
                value={form.Description}
                onChange={(e) =>
                  setForm({ ...form, Description: e.target.value })
                }
                required
              />
              <select
                className="border p-2 rounded"
                value={form.Discount_Type}
                onChange={(e) =>
                  setForm({ ...form, Discount_Type: e.target.value })
                }
              >
                <option>free</option>
                <option>percentage</option>
                <option>FLAT_RATE</option>
                <option>CASHBACK</option>
                <option>BUY_ONE_GET_ONE</option>
                <option>Bundle</option>
                <option>amount</option>
              </select>
              <input
                type="number"
                placeholder="Value"
                className="border p-2 rounded"
                value={form.Discount_Value}
                onChange={(e) =>
                  setForm({ ...form, Discount_Value: e.target.value })
                }
                required
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={form.Start_Date}
                onChange={(e) =>
                  setForm({ ...form, Start_Date: e.target.value })
                }
                required
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={form.End_Date}
                onChange={(e) => setForm({ ...form, End_Date: e.target.value })}
                required
              />
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

      {showLinkModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Link Vehicle to Promotion
            </h3>
            <form
              onSubmit={handleLinkVehicle}
              className="grid grid-cols-1 gap-4"
            >
              <select
                className="border p-2 rounded"
                value={linkForm.Promotion_ID}
                onChange={(e) =>
                  setLinkForm({ ...linkForm, Promotion_ID: e.target.value })
                }
                required
              >
                <option value="">Select Promotion</option>
                {promotions.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.Title}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded"
                value={linkForm.Plate_Number}
                onChange={(e) =>
                  setLinkForm({ ...linkForm, Plate_Number: e.target.value })
                }
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v.Plate_Number}>
                    {v.Plate_Number} - {v.Brand} {v.Model}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Performance (e.g. Good, Average, Poor)"
                className="border p-2 rounded"
                value={linkForm.Performance}
                onChange={(e) =>
                  setLinkForm({ ...linkForm, Performance: e.target.value })
                }
                required
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-50">
                <th className="border p-2">Title</th>
                <th className="border p-2">Discount</th>
                <th className="border p-2">Dates</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border p-2">{p.Title}</td>
                  <td className="border p-2">
                    {p.Discount_Value} ({p.Discount_Type})
                  </td>
                  <td className="border p-2">
                    {new Date(p.Start_Date).toLocaleDateString()} -{" "}
                    {new Date(p.End_Date).toLocaleDateString()}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {promotions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="border p-2 text-center text-gray-500"
                  >
                    No promotions found.
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
