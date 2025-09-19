import React from 'react';
import {Link} from "react-router-dom";

function ForgotPassWord() {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-2xl text-center font-bold mb-4">Đặt lại mật khẩu</h2>
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nhập Email của bạn</label>
                    <input type="email" placeholder="Nhập email của bạn" className="border w-full border-gray-300 outline-gray-300 rounded-md p-2" />
                    <button type="submit" className="mt-4 w-full bg-blue-500 text-white rounded-md p-2">Gửi liên kết đặt lại</button>
                </form>
            </div>
            <div className="mt-4 text-center">
                <Link to="/auth/login" className="text-blue-500 hover:underline">Quay lại đăng nhập</Link>
            </div>
        </div>
    );
}

export default ForgotPassWord;