import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function MainLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;