
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { toast } from 'sonner';
import { LogOut, Users, Building2, Eye, EyeOff } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'organizations'>('users');
  
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const [orgForm, setOrgForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    userPassword: false,
    userConfirmPassword: false,
    orgPassword: false,
    orgConfirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 6) return 'Password must be at least 6 characters long';
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) return 'Password must contain both letters and numbers';
    return '';
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userForm.username || !userForm.password || !userForm.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    const passwordError = validatePassword(userForm.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (userForm.password !== userForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      await authAPI.register({
        username: userForm.username,
        password: userForm.password,
        role: 'USER'
      });
      
      toast.success('User registered successfully!');
      setUserForm({ username: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast.error('User registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orgForm.username || !orgForm.password || !orgForm.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    const passwordError = validatePassword(orgForm.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (orgForm.password !== orgForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      await authAPI.register({
        username: orgForm.username,
        password: orgForm.password,
        role: 'ORG'
      });
      
      toast.success('Organization registered successfully!');
      setOrgForm({ username: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Organization registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Med-Care</h1>
              <span className="ml-4 text-sm text-gray-500">Admin Dashboard</span>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage users and organizations in the Med-Care system</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="inline-block w-5 h-5 mr-2" />
                Register Users
              </button>
              <button
                onClick={() => setActiveTab('organizations')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'organizations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building2 className="inline-block w-5 h-5 mr-2" />
                Register Organizations
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'users' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Register New User</h3>
              <form onSubmit={handleUserSubmit} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="user-username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="user-username"
                    type="text"
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="user-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="user-password"
                      type={showPasswords.userPassword ? 'text' : 'password'}
                      value={userForm.password}
                      onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('userPassword')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.userPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="user-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="user-confirm-password"
                      type={showPasswords.userConfirmPassword ? 'text' : 'password'}
                      value={userForm.confirmPassword}
                      onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('userConfirmPassword')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.userConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm text-green-800">
                    <strong>Role:</strong> User (USER)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Registering...' : 'Register User'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'organizations' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Register New Organization</h3>
              <form onSubmit={handleOrgSubmit} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="org-username" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Username
                  </label>
                  <input
                    id="org-username"
                    type="text"
                    value={orgForm.username}
                    onChange={(e) => setOrgForm({ ...orgForm, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter organization username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="org-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="org-password"
                      type={showPasswords.orgPassword ? 'text' : 'password'}
                      value={orgForm.password}
                      onChange={(e) => setOrgForm({ ...orgForm, password: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('orgPassword')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.orgPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="org-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="org-confirm-password"
                      type={showPasswords.orgConfirmPassword ? 'text' : 'password'}
                      value={orgForm.confirmPassword}
                      onChange={(e) => setOrgForm({ ...orgForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('orgConfirmPassword')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.orgConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded-md">
                  <p className="text-sm text-purple-800">
                    <strong>Role:</strong> Organization (ORG)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Registering...' : 'Register Organization'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
