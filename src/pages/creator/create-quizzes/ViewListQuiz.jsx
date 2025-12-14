import React from 'react';
import { useNavigate } from 'react-router-dom';
function ViewListQuiz(props) {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/quiz-creator')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Tạo bài trắc nghiệm mới
            </button>
        </div>
    );
}

export default ViewListQuiz;