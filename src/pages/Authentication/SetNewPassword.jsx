import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { sendEmailResetPassword } from '../../firebase/auth';

function SetNewPassword.jsx() {
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
        </div>
    );
}

export default SetNewPassword.jsx;