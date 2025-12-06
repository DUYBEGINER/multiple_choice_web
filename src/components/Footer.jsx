import React from 'react';

export default function Footer() {
  return (
    <footer  className="bg-slate-800 text-white py-8 px-0 mt-0">
      <div className="container mx-auto px-6">
        {/* Social Icons */}
        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">f</span>
          </div>
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">t</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 text-gray-300 text-sm mb-4">
          <a href="#" className="hover:text-white">Giới thiệu</a>
          <span>|</span>
          <a href="#" className="hover:text-white">Liên hệ</a>
          <span>|</span>
          <a href="#" className="hover:text-white">Chính sách bảo mật</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm mb-6">
          Bản Quyền © 2025 QUIZ. Trang làm bài trắc nghiệm online!
        </p>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">📞</span>
            <span>0877736289</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">✉️</span>
            <span>Support@waka.vn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}