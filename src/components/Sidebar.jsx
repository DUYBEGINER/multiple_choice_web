import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import useAuth from '../hook/useAuth';

function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      path: '/dashboard',
    },
    {
      key: 'create',
      label: 'Create New Quiz',
      icon: <PlusCircleOutlined />,
      path: '/quiz-creator',
    },
    {
      key: 'my-quizzes',
      label: 'My Quizzes',
      icon: <UnorderedListOutlined />,
      path: '/my-quizzes',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      path: '/settings',
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">QuizMaker</h1>
        <p className="text-xs text-gray-500 mt-1">Create & Manage Quizzes</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <UserOutlined className="text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                     text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogoutOutlined className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
