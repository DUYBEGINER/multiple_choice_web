import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

function SetNewPassword() {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');
    const continueUrl = searchParams.get('continueUrl');

    console.log("Mode:", mode);
    console.log("oobCode:", oobCode);
    console.log("continueUrl:", continueUrl);

    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.password !== form.confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }
        verifyPasswordResetCode(auth, oobCode).then(() => {
            confirmPasswordReset(auth, oobCode, form.password).then(() => {
                // Password reset successful
                alert("Đặt lại mật khẩu thành công");
            }).catch((error) => {
                // Handle error
                console.error("Error resetting password:", error);
            });
        }).catch((error) => {
            // Handle error
            console.error("Error verifying password reset code:", error);
        });
    }

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-2xl text-center font-bold mb-4">Đặt lại mật khẩu</h2>
            <form>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nhập mật khẩu mới</label>
                <input name="password" type="password" placeholder="Nhập mật khẩu mới" className="border w-full border-gray-300 outline-gray-300 rounded-md p-2" value={form.password} onChange={handleChange} />
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mt-4">Mật khẩu mới</label>
                <input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" className="border w-full border-gray-300 outline-gray-300 rounded-md p-2" value={form.confirmPassword} onChange={handleChange} />
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white rounded-md p-2" onClick={handleSubmit}>Xác nhận</button>
            </form>
        </div>
    );
}

export default SetNewPassword;