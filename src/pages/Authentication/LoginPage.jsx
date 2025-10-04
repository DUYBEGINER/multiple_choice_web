import React, { useState, useCallback } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../hook/useAuth";

import {PATHS} from '../../data/routePaths'

import { message } from 'antd';
import {openMessage} from '../../utils/messageUtils'


function LoginPage(props) {
  // Define navigate
  const navigate = useNavigate();
  const location = useLocation();

  const { login, clearError, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [showPassword, setShowPassword] = useState(false);

  // Config Antd message
  const [messageApi, contextHolder] = message.useMessage();
  const key = "login-message"; // key để update cùng 1 message



  //Cái này có thể viết hàm tái sử dụng
  //  const handleChange = useCallback((e) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //     // Clear global auth errors
  //   }, [clearError]);
 const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear global auth errors
      clearError();
  }, [clearError]);

  // Define fields for the form
  const fields = [
    { id: "email", type: "email", label: "Email", autoComplete: "email" },
    { id: "password", type: showPassword ? "text" : "password", label: "Password", toggle: true, },
  ];

  console.log("login render")


  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!formData.email || !formData.password) {
      openMessage('warning', 'Vui lòng nhập đủ Email và Mật khẩu', null, message, messageApi, key);
      return;
    }

    
    openMessage('loading', 'Đang xác thực...', null, message, messageApi, key);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      openMessage('success', 'Đăng nhập thành công!', null, message, messageApi, key);
      // const redirectTo = location.state?.from?.pathname || '/quiz-creator';
      // navigate(redirectTo, { replace: true });
    } else {
      openMessage('error', result.error, null, message, messageApi, key);
    }
  }

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <>
      {contextHolder}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl text-center font-bold">
            Đăng nhập vào QuizMaker
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.id} className="space-y-1">
                <label
                  htmlFor={field.label}
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  {field.label}
                </label>
                <div className="mt-1 relative">
                  <input
                    type={field.type}
                    name={field.id}
                    disabled={loading}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg outline-gray-300"
                    placeholder={field.label}
                  />
                  {field.toggle && (
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-800 text-sm"
                    >
                      {field.id === "password" ? showPassword ? "Ẩn" : "Hiện" : ""}
                    </span>
                  )}
                </div>
                {field.id === "password" && (
                  <Link to={PATHS.AUTH.FORGOTPASSWORD} className="mt-2 mb-3 inline-block text-right text-xs font-semibold text-indigo-600 hover:text-indigo-500 float-right">
                    Quên mật khẩu?
                  </Link>
                )}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="w-full px-3 py-1.5 border border-blue-600 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Facebook Login
              </button>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
            <div className="mt-6">
                <p className="text-center text-sm ">
                Chưa có tài khoản?{" "}
                <Link
                    to={PATHS.AUTH.SIGNUP}
                    className="font-semibold text-indigo-500 hover:text-indigo-400"
                >
                    Đăng ký
                </Link>
                </p>
            </div>
          </form>
        </div>
    </>
  );
}

export default LoginPage;
