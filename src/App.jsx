import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import CreateQuizPage from '@/pages/quizCreator/CreateQuizPage';


function App() {
  // const [count, setCount] = useState(0)
  // const [testList, setTestList] = useState([]);
  
  //   useEffect(()=>{
  //       const unsubscribe = listenQuizs(setTestList);
  //       return () => unsubscribe();
  //   }, [])

  // const addTest = async (title) => {
  //   const newTest = {
  //     title: title
  //   };
  //   await addNewQuiz(newTest);
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz-creator" element={<CreateQuizPage/>} />
      </Routes>
    </Router>
  )
}

export default App
