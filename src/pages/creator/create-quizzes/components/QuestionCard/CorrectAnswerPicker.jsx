import React from "react";

function CorrectAnswerPicker(props) {
  return (
    <div className="mt-3">
      <label className="block font-semibold mb-2">Correct Answer</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <button key={idx} className="px-4 py-1 border rounded-md ">
            {String.fromCharCode(65 + idx)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CorrectAnswerPicker;
