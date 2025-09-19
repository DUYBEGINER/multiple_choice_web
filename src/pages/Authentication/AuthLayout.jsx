import React from 'react';
import { Outlet } from 'react-router-dom';


function AuthLayout() {
    return (
        <div className="flex min-h-full h-screen items-center justify-center lg:px-8 bg-blue-violet-900">
          <div className="flex flex-col justify-center w-2xl p-5 rounded-lg shadow-md bg-white">
            <Outlet />
          </div>
        </div>
    );
}

export default AuthLayout;