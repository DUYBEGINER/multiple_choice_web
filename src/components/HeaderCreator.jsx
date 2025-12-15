import { useState, useEffect, useRef } from "react";
import { Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function HeaderCreator() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-200 shadow-sm">
      <nav className="h-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Search Section */}
        <div className="flex-1 max-w-md">
          <Input.Search
            placeholder="Search quizzes..."
            variant="filled"
            size="middle"
            allowClear
          />
        </div>

        {/* Navigation & User Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Help
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Settings
            </a>
          </nav>

          {/* User Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
              aria-label="User menu"
              aria-expanded={isOpen}
            >
              <Avatar size="default" icon={<UserOutlined />} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <ul className="py-1">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Settings
                    </a>
                  </li>
                  <li className="border-t border-gray-100">
                    <button
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderCreator;
