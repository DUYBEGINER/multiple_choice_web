import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { sendEmailResetPassword } from '../../firebase/auth';

function SetNewPassword() {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendEmailResetPassword(email);
    }

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-2xl text-center font-bold mb-4">Đặt lại mật khẩu</h2>
            <form>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nhập mật khẩu mới</label>
                <input name="password" type="password" placeholder="Nhập mật khẩu mới" className="border w-full border-gray-300 outline-gray-300 rounded-md p-2" value={email} onChange={handleChange} />
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mt-4">Mật khẩu mới</label>
                <input name="confirm-password" type="password" placeholder="Nhập lại mật khẩu" className="border w-full border-gray-300 outline-gray-300 rounded-md p-2" />
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white rounded-md p-2" onClick={handleSubmit}>Xác nhận</button>
            </form>
        </div>
    );
}

export default SetNewPassword;