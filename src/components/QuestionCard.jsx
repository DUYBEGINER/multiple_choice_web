import React from 'react';
import { useState } from 'react';
function QuestionCard(props) {
    // const {options, onChangeValue} = props;
     const [question, setQuestion] = useState("");
    const [useImage, setUseImage] = useState(false);
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const handleOptionChange = (index, value) => {
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
    };

    const addOption = () => {
        if (options.length < 6) setOptions([...options, ""]);
    };

    const removeOption = (index) => {
        const updated = options.filter((_, i) => i !== index);
        setOptions(updated);
        if (correctAnswer === index) setCorrectAnswer(null);
    };
    return (
      <div className="max-w-2xl mx-auto my-6 p-6 bg-white rounded-md shadow-md space-y-6">
      {/* Question input */}
      <div>
        <label className="block font-semibold mb-2">Question</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
          placeholder="Let's ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      {/* Toggle */}
      <div className="flex items-center space-x-4">
        <label className="font-medium">Single answer with image</label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={useImage}
            onChange={() => setUseImage(!useImage)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
        </label>
      </div>

      {/* Choices */}
      <div>
        <label className="block font-semibold mb-2">Choice</label>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold">
              {String.fromCharCode(65 + idx)}
            </div>
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded bg-gray-100"
              placeholder="Your answer here"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(idx)}
                className="text-gray-500 hover:text-red-500 text-lg font-bold"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {options.length < 6 && (
          <button
            onClick={addOption}
            className="text-blue-600 hover:underline mt-2"
          >
            Add more
          </button>
        )}
      </div>

      {/* Correct answer */}
      <div>
        <label className="block font-semibold mb-2">Correct Answer</label>
        <div className="flex space-x-2">
          {options.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCorrectAnswer(idx)}
              className={`px-4 py-1 border rounded-full ${
                correctAnswer === idx
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {String.fromCharCode(65 + idx)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );}

export default QuestionCard;