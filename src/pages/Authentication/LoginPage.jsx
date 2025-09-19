import React, { useState, useContext, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { getTokenSignInWithEmailAndPassword } from '../../firebase/auth';
import {authRequest} from '../../api/authAPI'
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthProvider'

//Antd

import { message } from 'antd';

function LoginPage(props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  
  const key = "updatable"; // key để update cùng 1 message

 const openMessage = (status) => {
    message.destroy(key);
    messageApi.open({
      key,
      type: status === 'loading' ? 'loading' : status === 'success' ? 'success' : 'error',
      content: status === 'loading' ? 'Đang xác thực...' : status === 'success' ? 'Đăng nhập thành công!' : 'Lỗi đăng nhập',
      duration: status === 'loading' ? 0 : 2,
    });
  };



  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  //Cái này có thể viết hàm tái sử dụng
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  // Define fields for the form
  const fields = [
    { id: "email", type: "email", label: "Email", autoComplete: "email" },
    {
      id: "password",
      type: showPassword ? "text" : "password",
      label: "Password",
      toggle: true,
    },
  ];
  console.log("login render")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    // if (!email || !password) {
    //   window.alert("Please fill in all fields");
    //   return;
    // }

    setLoading(true);
    openMessage('loading');
    // Get token from Firebase
    try{
      const token = await getTokenSignInWithEmailAndPassword(email, password);
      const user = await authRequest(token);
      console.log("User data from authRequest:", user);
      if (user.data) {
        setUser(user.data);
        setLoading(false);
        openMessage('success');
        navigate('/quiz-creator');
        console.log("User logged in successfully:", user.data);
      } else {
        window.alert("Error logging in user");
        setLoading(false);
      }
    }catch(error){
      console.error("Login error:", error);
      setSuccess(false);
      setLoading(false);
      openMessage('error');
    }finally{
      setLoading(false);
    }
  }

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
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg outline-gray-300"
                    placeholder={field.label}
                  />
                  {field.toggle && (
                    <span
                      onClick={() =>
                        field.id === "password"
                          ? setShowPassword(!showPassword)
                          : null
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-800 text-sm"
                    >
                      {field.id === "password" ? showPassword ? "Ẩn" : "Hiện" : ""}
                    </span>
                  )}
                </div>
                {field.id === "password" && (
                  <Link to="/auth/forgot-password" className="mt-2 mb-3 inline-block text-right text-xs font-semibold text-indigo-600 hover:text-indigo-500 float-right">
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
                className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
            <div className="mt-6">
                <p className="text-center text-sm ">
                Chưa có tài khoản?{" "}
                <Link
                    to="/auth/signup"
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
