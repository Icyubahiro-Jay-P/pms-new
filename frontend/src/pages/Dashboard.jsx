import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Vehicles from "./Vehicles";
import Customers from "./Customers";
import Promotions from "./Promotions";
import Report from "./Report";
import api from "../api/axios";

function Home() {
  const [stats, setStats] = useState({ vehicles: 0, customers: 0, promotions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Vehicles", value: stats.vehicles },
    { label: "Customers", value: stats.customers },
    { label: "Promotions", value: stats.promotions },
  ];

  const quickActions = [
    { label: "Manage Vehicles", path: "/dashboard/vehicles" },
    { label: "Manage Customers", path: "/dashboard/customers" },
    { label: "Manage Promotions", path: "/dashboard/promotions" },
    { label: "View Reports", path: "/dashboard/report" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your parking management system.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg border border-gray-200 p-5"
          >
            <p className="text-sm text-gray-500 uppercase tracking-wide">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {loading ? (
                <span className="text-gray-300">...</span>
              ) : (
                card.value
              )}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-sm transition-all"
          >
            <span className="font-medium text-gray-800">{action.label}</span>
            <span className="text-gray-400 text-lg">&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </main>
    </div>
  );
}
