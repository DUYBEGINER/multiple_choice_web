import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import HeaderCreator from '../../components/HeaderCreator';

function MainLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex flex-col flex-1">
                {/* Header */}
                <HeaderCreator />
                {/* Main Content Area */}
                <main className="overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;