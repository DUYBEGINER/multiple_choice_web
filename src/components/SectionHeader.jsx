import React from 'react';

function SectionHeader(props) {
    return (
         <div className="w-full ">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-medium text-gray-800 mb-2">SÁCH MỚI CẬP NHẬT</h1>
                    <div className="w-24 h-1 bg-red-500 rounded-t-2xl"></div>
                </div>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                    Xem tất cả
                </a>
            </div>
            <hr className="text-gray-200"/>
        </div>
    );
}

export default SectionHeader;