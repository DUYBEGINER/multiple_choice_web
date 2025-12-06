import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../hook/useAuth";
import NavBar from "../../components/NavBar";

import { Link } from "react-router-dom";
import { getTokenSignInWithEmailAndPassword } from '../../firebase/auth';
import {authRequest} from '../../api/authAPI'
import {PATHS} from '../../data/routePaths'
import { useMessage } from "../../context/MessageProvider";

function LoginPage(props) {
  // Define navigate
  const navigate = useNavigate();
  const location = useLocation();
  const message = useMessage(); // Sử dụng global message

  const { setUser, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Config Antd message
  // const [messageApi, contextHolder] = message.useMessage();
  // const key = "login-message"; // key để update cùng 1 message



  //Cái này có thể viết hàm tái sử dụng
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
    const { email, password } = formData;

    if (!email || !password) {
      message.warning('Vui lòng nhập đủ Email và Mật khẩu');
      return;
    }

    setLoading(true);
    const hideLoading = message.loading('Đang xác thực...', 0);

    try{
      // Get token from Firebase
      const token = await getTokenSignInWithEmailAndPassword(email, password);
      // Authenticate with backend
      const response = await authRequest(token);
      console.log("User data from authRequest:", response);
      // Hide loading message
      hideLoading();
      if (!response?.success || !response?.data) {
        throw new Error('Không lấy được thông tin người dùng');
      }
      message.success('Đăng nhập thành công', 2);

      setUser(response.data);
      // Show success message với thời gian dài hơn
      

      // Navigate sau 1.5 giây
      // setTimeout(() => {
      //   const redirectTo = location.state?.from?.pathname || PATHS.QUIZ;
      //   navigate(redirectTo, { replace: true });
      // }, 1500);
      // Navigate to intended destination
      // const redirectTo = location.state?.from?.pathname || PATHS.QUIZ;
      // navigate(redirectTo, { replace: true });

      console.log("User logged in successfully:", response.data);

    }catch(error){
      console.error("Login error:", error);
      let errorMessage = 'Login failed. Please try again.';
      
      hideLoading();
      // Handle specific error types
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      message.error(errorMessage);
    }finally{
      setLoading(false);
    }
  }

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <>
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
