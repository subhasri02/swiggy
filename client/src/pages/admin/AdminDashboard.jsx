import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/admin/orders"
          className="p-6 bg-white shadow rounded-xl hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">📦 Manage Orders</h2>
          <p className="text-gray-600 mt-2">
            View and update all customer orders
          </p>
        </Link>

        <Link
          to="/admin/menu"
          className="p-6 bg-white shadow rounded-xl hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">🍔 Manage Menu</h2>
          <p className="text-gray-600 mt-2">
            Add, update and remove menu items
          </p>
        </Link>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">👥 Users</h2>
          <p className="text-gray-600 mt-2">
            (Optional) User management
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
