import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Space } from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {PATHS} from "../data/routePaths";



export default function NavBar(props) {
  const { user } = props;

  return (
    <nav className="bg-[#2b3037] ">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex justify-center items-center">
            <h2 className="text-white text-center text-xl font-bold">
              Test website
            </h2>
          </div>
          
          <ul className="flex gap-2 px-6 py-3 max-w-screen-xl">
            <li>
              <a className="block rounded-lg px-3 py-2 text-gray-100 bg-white/10">
                Home
              </a>      
            </li>
            <li className="relative group">
              <div className="flex  items-center rounded-lg px-3 py-2 gap-3 text-gray-100 group-hover:bg-white/10">
                <a className="">Take a Tour</a>
                <DownOutlined className="text-sm" />
              </div>
              <div className="absolute left-0 z-10 min-w-[200px] pointer-events-none group-hover:pointer-events-auto">
                <ul className="py-1 bg-white mt-0.5 rounded-lg shadow-[0_20px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out -translate-y-2 group-hover:translate-y-2 transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100">
                  <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
                  </li>
                </ul>
              </div>
            </li>

            <li><a className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/10">Pricing</a></li>
            <li><a className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/10">FAQ</a></li>
            <li><a className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/10">Contact us</a></li>
          </ul>

            {/* Nút Đăng nhập & Đăng ký */}
          {user ? (
            <div className="flex items-center gap-3 px-6 py-3">
              <span className="text-gray-200">Hello, {user.email}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-6 py-3">
              <Link
                to={PATHS.AUTH.LOGIN}
                className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#2b3037] transition"
              >
              Đăng nhập
            </Link>
            <Link
              to={PATHS.AUTH.SIGNUP}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
