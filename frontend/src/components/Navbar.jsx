import { Link, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard"},
  { path: "/dashboard/vehicles", label: "Vehicles"},
  { path: "/dashboard/customers", label: "Customers" },
  { path: "/dashboard/promotions", label: "Promotions" },
  { path: "/dashboard/report", label: "Reports" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="text-xl font-bold tracking-wide">
            SwiftWheels PMS
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-900 text-white"
                      : "text-green-100 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
