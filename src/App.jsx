import {React, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import CreateQuizPage from '@/pages/quizCreator/CreateQuizPage';
import LoginPage from '@/pages/Authentication/LoginPage';
import SignUpPage from '@/pages/Authentication/SignUpPage';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthProvider';

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
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Không render Routes khi đang xác thực
  }


  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/quiz-creator"
            element={
              <PrivateRoute>
                <CreateQuizPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
  )
}

export default App
