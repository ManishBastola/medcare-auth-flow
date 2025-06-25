
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Med-Care</h1>
              <span className="ml-4 text-sm text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user?.role}!
          </h2>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            user?.role === 'USER' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
          }`}>
            Role: {user?.role}
          </div>
          <p className="text-gray-600 mt-6 max-w-md mx-auto">
            You have successfully logged into the Med-Care system. Your dashboard content would be displayed here based on your role and permissions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
