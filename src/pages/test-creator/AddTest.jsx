import React from 'react';
import { useState, useEffect } from 'react';
import QuestionCard from '../../components/QuestionCard';
import Title from '../../components/title';
import useTheme from '../../hook/useTheme';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function AddTest(props) {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([
        // { id: 0, question: "Một năm có bao nhiêu ngày?", options: ["365", "366", "364"] },
        // { id: 1, question: "Thủ đô của Việt Nam là gì?", options: ["Hà Nội", "TP.HCM", "Đà Nẵng"] }
    ]);

    const [title, setTitle] = useState("");
    
   const {addTest} = props;

   const addNewTest = () => {
        addTest(title);
        navigate('/'); // Navigate to home after adding the test
   }
    const [theme, setTheme] = useTheme();

    const handleThemeChange = (theme) => {
        setTheme(theme);
        console.log(`Theme changed to: ${theme}`);
    }

    // Hàm xử lý thay đổi giá trị câu hỏi hoặc option
    const handleChange = (e) => {
        const { name, value } = e.target;
        const [type, id, index] = name.split('-'); // Phân tích name: "question-id" hoặc "option-id-index"

        setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
            if (q.id === parseInt(id)) {
            if (type === 'question') {
                return { ...q, question: value };
            } else if (type === 'option' && index !== undefined) {
                const newOptions = [...q.options];
                newOptions[parseInt(index)] = value;
                return { ...q, options: newOptions };
            }
            }
            return q;
        })
        );
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // Chọn chỉ số ngẫu nhiên từ 0 đến i
            const j = Math.floor(Math.random() * (i + 1));
            // Đổi chỗ phần tử tại i và j
            [array[i], array[j]] = [array[j], array[i]];
            [array[i].id, array[j].id] = [array[j].id, array[i].id]; // Cập nhật id sau khi xáo trộn
        }
        return array;
    }
    
    return (
        <div className="bg-zinc-100 min-h-screen">
            <div className={`container mx-auto navbar-height ${theme === 'dark' ? 'dark' : ''}`}>
                  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                       <div>
                            <button class="bg-blue-500 text-white p-2 rounded" onClick={()=>{
                                setQuestions([
                                    ...questions,
                                    { id: questions.length, question: "", options: ["Option 1", "Option 2", "Option 3"] }
                                ]);
                            }}>Click Me</button>  
                            <button class="bg-red-500 dark:bg-teal-400 text-white p-2 rounded" onClick={()=>{
                                setQuestions(shuffleArray([...questions]));
                            }}>Shuffle Questions</button>
                            <button onClick={() => addNewTest()}>addTest</button>
                            <button className="bg-blue-500 text-white p-2 rounded" name="light" onClick={() => handleThemeChange("light")}>Light</button>
                            <button className="bg-gray-500 dark:bg-teal-200 text-white p-2 rounded" name="dark" onClick={() => handleThemeChange("dark")}>Dark</button>
                        </div>
            </div>
                <div>
                    <Title title={title} setTitle={setTitle} />
                </div>
                <div className="flex justify-end max-w-2xl space-y-6 mx-auto">
                    <button className=" bg-white cursor-pointer text-black p-2 rounded" onClick={() => {
                        setQuestions([{
                            id: questions.length + 1,
                            question: "",
                            options: ["", "", ""]
                        }, ...questions]);
                    }}>+ Add Question</button>
                    
                </div>
                {questions.map((q) => (
                        <QuestionCard key={q.id} id={q.id} question={q.question} options={q.options} onChangeValue={handleChange} />
                ))}
                {/* <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
                    <div>
                        <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
                            <svg class="h-6 w-6 stroke-white">
                            </svg>
                        </span>
                    </div>
                    <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
                    <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
                        The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
                    </p>
                </div> */}
            </div>
        </div>
    );
}

export default AddTest;