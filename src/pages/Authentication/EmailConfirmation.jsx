import React from 'react';
import { useLocation } from 'react-router-dom';

function EmailConfirmation(props) {
    const location = useLocation();
    const email = location.state?.email || 'your email';

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">"Nếu địa chỉ email ${email}được liên kết với một tài khoản, bạn sẽ nhận được email hướng dẫn đặt lại mật khẩu trong vài phút nữa."</h1>
            <p>Hãy nhấp vào liên kết trong email để đặt lại mật khẩu của bạn.</p>
        </div>
    );
}

export default EmailConfirmation;