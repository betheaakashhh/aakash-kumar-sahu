import React, { useEffect, useState } from "react";
import './update.css';
const UpdateNotification = () => {
  const [updates, setUpdates] = useState([]);
  const [hiddenIds, setHiddenIds] = useState(
    JSON.parse(localStorage.getItem("hiddenUpdates") || "[]")
  );
  const API_BASE_URL = import.meta.env.VITE_BASE_URL ||'http://localhost:5000';
  const fetchUpdates = () => {
    fetch(`${API_BASE_URL}/api/update-info`)
      .then(res => res.json())
      .then(data => setUpdates(data))
      .catch(err => console.log("Update fetch error:", err));
  };

  // Fetch immediately on mount
  useEffect(() => {
    fetchUpdates();

    // Auto refresh every 30s
    const interval = setInterval(() => {
      fetchUpdates();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const hideUpdate = (id) => {
    const newHidden = [...hiddenIds, id];
    setHiddenIds(newHidden);
    localStorage.setItem("hiddenUpdates", JSON.stringify(newHidden));
  };

  const visibleUpdates = updates.filter(u => !hiddenIds.includes(u._id));

  if (visibleUpdates.length === 0) return null;

  return (
    <div className="update-container">
      {visibleUpdates.map((u) => (
        <div key={u._id} className={`update-box ${u.importance}`}>
          <strong>{u.title}</strong>
          <p>{u.message}</p>

          <button className="close-btn" onClick={() => hideUpdate(u._id)}>
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpdateNotification;
