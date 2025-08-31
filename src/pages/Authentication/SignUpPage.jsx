import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { validateSignup } from '../../utils/validator';
import { signUp} from '../../firebase/auth';
import {signUpRequest} from "../../api/authAPI";

function SignUpPage(props) {

    const [formData, setFormData] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
    });

    const [errorInputs, setErrorInputs] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
      // Define fields for the form
      const fields = [
        { id: "email", type: "email", label: "Email", autoComplete: "email" },
        { id: "displayName", type: "text", label: "Username" },
        {
          id: "password",
          type: showPassword ? "text" : "password",
          label: "Password",
          toggle: true,
        },
        {
          id: "confirmPassword",
          type: showConfirmPassword ? "text" : "password",
          label: "Confirm Password",
          toggle: true,
        },
      ];

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorInputs({});
        const result = validateSignup(formData);
        if (result.valid) {
          // Submit form
          console.log("Form data is valid. Submitting...", formData);
          const userToken = await signUp(formData.email, formData.password, formData.displayName);

          const user = await signUpRequest(userToken, formData.displayName);

          if (user) {
            console.log("User signed up successfully:", user);
          } else {
            window.alert("Error signing up user");
          }
        } else {
          // Show errors
          setErrorInputs(result.errors);
        }
      }

    // console.log("formData", formData);

    return (
      <div className="flex min-h-full h-screen items-center justify-center lg:px-8 bg-blue-violet-900">
        <div className="flex flex-col justify-center w-2xl p-5 rounded-lg shadow-md bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-2xl text-center font-bold">
              Đăng kí vào QuizMaker
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.label}
                    className="block text-sm/6 font-medium text-gray-500"
                  >
                    {field.label}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.id}
                      className="w-full block text-base px-2 py-1.5 border border-gray-300 rounded-lg outline-gray-300"
                      placeholder={field.label}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                    />
                  {field.toggle && (
                      <button
                        type="button"
                        onClick={() =>
                          field.id === "password"
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-800 text-sm"
                      >
                        {field.id === "password"
                          ? showPassword
                            ? "Ẩn"
                            : "Hiện"
                          : showConfirmPassword
                          ? "Ẩn"
                          : "Hiện"}
                      </button>
                    )}
                    </div>
                      {errorInputs[field.id] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errorInputs[field.id]}
                        </p>
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
                  Sign up
                </button>
              </div>
              <div className="mt-6">
                  <p className="text-center text-sm ">
                  Đã có tài khoản?{" "}
                  <Link
                      to="/login"
                      className="font-semibold text-indigo-500 hover:text-indigo-400"
                  >
                      Đăng nhập ngay
                  </Link>
                  </p>
              </div>
            </form>
          </div>
        </div>
    </div>
    );
}

export default SignUpPage;