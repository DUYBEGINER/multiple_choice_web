import React from 'react';

function Title(props) {
    const { title, setTitle } = props;
    return (
        <div className="max-w-2xl mx-auto my-6 p-6 bg-white rounded-md shadow-md space-y-6">
            <h1>Tiêu đề</h1>
            <input
                type="text"
                className=" w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    );  
}

export default Title;