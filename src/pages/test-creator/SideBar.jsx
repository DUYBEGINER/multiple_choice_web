import React from 'react';
import { Divider } from 'antd';


function SideBar(props) {

    const [questions, setQuestions] = React.useState([
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
            { id: 1, title: "What isasdasdasdadsasdaasd React?" },
        { id: 1, title: "What isasdasdasdadsasdaasd React?" },
            { id: 1, title: "What isasdasdasdadsasdaasd React?" },
        { id: 1, title: "What isasdasdasdadsasdaasd React?" },
        { id: 1, title: "What isasdasdasdadsasdaasd React?" },
    ]);

    return (
        <div className="bg-wild-sand-50 px-3 py-2 hidden sm:flex flex-col border border-gray-300 rounded max-h-[calc(100vh-90px)]">
          <div className="flex justify-between mb-3 w-full bg-transparent">
            <h2 className="font-OppenSans ">Questions (1)</h2>
            <button className="rounded-full bg-white outline outline-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            {questions.map((question, index) => (
              <li key={index}>
                <div className="flex flex-col gap-3 bg-gray-100 p-2 border border-gray-400 rounded mb-2 hover:bg-gray-200 transition-colors">
                    <a className="block p-2 items-center truncate overflow-hidden">
                        <span className="inline-block w-7 h-7 leading-7 text-md text-center mr-2 bg-gray-300 rounded-full ">{index + 1}</span>
                        <span className="font-OppenSans text-sm font-bold">{question.title}</span>
                    </a>
                    <div className='flex items-center justify-between px-2 py-'>
                        <p className='flex gap-2 p-1 text-xs rounded-md bg-wild-sand-100 font-medium'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>

                            Multiple choice</p>
                        <button className='hover:cursor-pointer '>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                        </button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
          <Divider className="my-2" size="small"/>
          <div className="flex justify-around gap-2 rounded-md p-3  w-full bg-porcelain-100 border border-gray-600 hover:bg-porcelain-200">
                <svg  className=" size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
                <div>
                  <p className='font-bold'>Result screen</p>
                  <p >Set your Password/failed message</p>
                </div>
             
          </div>
           
        </div>
    );
}

export default SideBar;