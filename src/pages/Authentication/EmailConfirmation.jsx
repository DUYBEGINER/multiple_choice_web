import React from 'react';
import { useLocation } from 'react-router-dom';

function EmailConfirmation(props) {
    const location = useLocation();
    const email = location.state?.email || 'your email';

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Link to reset your password was sent to {email}</h1>
            <p>Please confirm your email address by clicking the link sent to your inbox.</p>
        </div>
    );
}

export default EmailConfirmation;