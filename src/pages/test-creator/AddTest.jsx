import React from "react";
import { useState, useEffect } from "react";
import QuestionCard from "../../components/QuestionCard";
import Title from "../../components/Title";
import useTheme from "../../hook/useTheme";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AddTest(props) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { id: 1, title: "What isasdasdasdadsasdaasd React?" },
     { id: 1, title: "What isasdasdasdadsasdaasd React?" },
      { id: 1, title: "What isasdasdasdadsasdaasd React?" },
       { id: 1, title: "What isasdasdasdadsasdaasd React?" },
        { id: 1, title: "What isasdasdasdadsasdaasd React?" },
     { id: 1, title: "What isasdasdasdadsasdaasd React?" },
      { id: 1, title: "What isasdasdasdadsasdaasd React?" },
       { id: 1, title: "What isasdasdasdadsasdaasd React?" },
         { id: 1, title: "What isasdasdasdadsasdaasd React?" },
      { id: 1, title: "What isasdasdasdadsasdaasd React?" },
       { id: 1, title: "What isasdasdasdadsasdaasd React?" },
         { id: 1, title: "What isasdasdasdadsasdaasd React?" },
      { id: 1, title: "What isasdasdasdadsasdaasd React?" },
       { id: 1, title: "What isasdasdasdadsasdaasd React?" },
  ]);

  const [title, setTitle] = useState("");

  return (
    <main className="h-screen flex flex-col w-full bg-gray-50 text-gray-900 ">
      <nav className="top-0 z-10 bg-white shadow-sm flex items-center justify-between h-[70px] max-h-[70px]">
        <div className=" px-3 lg:px-5 lg:pl-3 flex items-center gap-5">
          <button className="text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <p className="text-sm sm:text-xl font-OppenSans">Edit test</p>
        </div>

        {/*Title*/}
        <div className="">
          <h1>Tiêu đề nằm ở đây</h1>
        </div>
        <div className="flex items-center gap-4 pr-2">
          <button className=" btn bg-wild-sand-50 hover:bg-wild-sand-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            <span>Preview</span>
          </button>
          <button className="btn text-white bg-blue-violet-600 hover:bg-blue-violet-800">Publish</button>
        </div>
      </nav>

      <div className="flex-1 px-4 py-3 grid grid-cols-[250px_1fr] gap-2 overflow-hidden max-h-[calc(100vh-70px)]">
        <div className="bg-wild-sand-50 px-3 py-2 hidden sm:flex flex-col h-full">
          <h2 className="font-OppenSans mb-3 w-full bg-amber-50">Questions (1)</h2>
          <ul className="flex-1 overflow-y-auto pr-1 max-h-screen">
            {questions.map((question, index) => (
              <li key={index}>
                <div className="flex flex-col gap-3 bg-gray-100 p-2 border border-gray-400 rounded mb-2 hover:bg-gray-100 transition-colors">
                    <a className="block p-2 items-center truncate overflow-hidden">
                        <span className="inline-block text-md w-5 h-5 text-center mr-2 leading-5 bg-gray-300 rounded-full ">{index + 1}</span>
                        <span className="font-OppenSans text-sm font-bold">{question.title}</span>
                    </a>
                    <div className='flex items-center justify-between px-2 py-'>
                        <p className='flex gap-2 p-1 text-xs rounded-md bg-wild-sand-100 font-medium'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>

                            Multiple choice</p>
                        <button>...</button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className=" bg-amber-100 ">right</div>
      </div>
    </main>
  );
}

export default AddTest;
