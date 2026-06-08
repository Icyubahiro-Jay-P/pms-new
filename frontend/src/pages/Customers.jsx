import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Status: "Active",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await api.get(`/customers?search=${search}`);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, form);
      } else {
        await api.post("/customers", form);
      }
      fetchCustomers();
      setForm({
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        Status: "Active",
      });
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      alert("Failed to save customer");
    }
  };

  const handleEdit = (customer) => {
    setForm({
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      Email: customer.Email,
      PhoneNumber: customer.PhoneNumber,
      Status: customer.Status,
    });
    setEditingId(customer._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const openCreateModal = () => {
    setForm({
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Status: "Active",
    });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">Manage Customers</h2>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Customer
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Customer" : "Add New Customer"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded"
                value={form.FirstName}
                onChange={(e) =>
                  setForm({ ...form, FirstName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded"
                value={form.LastName}
                onChange={(e) => setForm({ ...form, LastName: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                className="border p-2 rounded"
                value={form.PhoneNumber}
                onChange={(e) =>
                  setForm({ ...form, PhoneNumber: e.target.value })
                }
                required
              />
              <select
                className="border p-2 rounded"
                value={form.Status}
                onChange={(e) => setForm({ ...form, Status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
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
          placeholder="Search customers..."
          className="border p-2 w-full mb-4 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-50">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {c.FirstName} {c.LastName}
                  </td>
                  <td className="border p-2">{c.Email}</td>
                  <td className="border p-2">{c.PhoneNumber}</td>
                  <td className="border p-2">{c.Status}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="border p-2 text-center text-gray-500"
                  >
                    No customers found.
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
