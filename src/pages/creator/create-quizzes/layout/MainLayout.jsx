import React from 'react';
import { Outlet } from 'react-router-dom';
function MainLayout(props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Outlet />
        </div>
    );
}

export default MainLayout;