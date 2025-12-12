import React, { useState, useEffect } from "react";
import "./adminupdatepanel.css";

const AdminUpdatePanel = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", message: "", importance: "medium" });
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  // Fetch all updates
  const getUpdates = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/update-info/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUpdates(data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching updates:", err);
    }
  };

  useEffect(() => {
    getUpdates();
  }, []);

  // Handle Create or Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE_URL}/api/update-info/${editingId}` : `${API_BASE_URL}/api/update-info`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    setForm({ title: "", message: "", importance: "medium" });
    setEditingId(null);
    getUpdates();
  };

  // Delete Update
  const deleteUpdate = async (id) => {
    await fetch(`${API_BASE_URL}/api/update-info/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    getUpdates();
  };

  // Toggle Active/Inactive
  const toggleActive = async (id, current) => {
    await fetch(`${API_BASE_URL}/api/update-info/${id}/toggle-active`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ isActive: !current })
    });
    getUpdates();
  };

  // Set form for editing
  const startEdit = (update) => {
    setForm({
      title: update.title,
      message: update.message,
      importance: update.importance
    });
    setEditingId(update._id);
  };

  return (
    <div className="admin-update-panel">
      <h2>Admin: Manage Updates</h2>

      {/* Update Form */}
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Update Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Update Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        ></textarea>

        <select
          value={form.importance}
          onChange={(e) => setForm({ ...form, importance: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">
          {editingId ? "Update" : "Create"} Update
        </button>
      </form>

      <hr />

      {/* Update List */}
      <h3>All Updates</h3>

      {loading ? (
        <p>Loading updates...</p>
      ) : updates.length === 0 ? (
        <p>No updates found.</p>
      ) : (
        <div className="update-list">
          {updates.map((update) => (
            <div key={update._id} className={`update-card ${update.importance}`}>
              <div>
                <h4>{update.title}</h4>
                <p>{update.message}</p>
                <small>Status: {update.isActive ? "Active" : "Inactive"}</small>
              </div>

              <div className="buttons">
                <button onClick={() => startEdit(update)}>Edit</button>
                <button onClick={() => toggleActive(update._id, update.isActive)}>
                  {update.isActive ? "Deactivate" : "Activate"}
                </button>
                <button className="delete" onClick={() => deleteUpdate(update._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUpdatePanel;
