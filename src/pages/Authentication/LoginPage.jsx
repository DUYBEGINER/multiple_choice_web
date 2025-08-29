import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { signIn } from '../../firebase/auth';
import {getUser} from '../../api/authAPI'

function LoginPage(props) {

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const token = await signIn(email, password);

    const user = await getUser(token);

    console.log("user after fetch", user);
    if (user) {
      console.log("User logged in successfully:", user);
    } else {
      window.alert("Error logging in user");
    }
  }

  return (
    <div className="flex min-h-full h-screen items-center justify-center lg:px-8 bg-blue-violet-900">
      <div className="w-2xl p-5 rounded-lg shadow-md bg-white">
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
                    <button
                      type="button"
                      onClick={() =>
                        field.id === "password"
                          ? setShowPassword(!showPassword)
                          : null
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-800 text-sm"
                    >
                      {field.id === "password" ? showPassword ? "Ẩn" : "Hiện" : ""}
                    </button>
                  )}
                </div>
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
                    to="/signup"
                    className="font-semibold text-indigo-500 hover:text-indigo-400"
                >
                    Đăng ký
                </Link>
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
