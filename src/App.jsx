import {React, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import CreateQuizPage from '@/pages/quizCreator/CreateQuizPage';
import LoginPage from '@/pages/Authentication/LoginPage';
import SignUpPage from '@/pages/Authentication/SignUpPage';
import SetNewPassword from '@/pages/Authentication/SetNewPassword';
import ForgotPassWord from './pages/Authentication/ForgotPassWord';
import AuthLayout from './pages/Authentication/AuthLayout';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthProvider';
import EmailConfirmation from './pages/Authentication/EmailConfirmation';



function App() {

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
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassWord />} /> */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPassWord />} />
            <Route path="/auth/reset-password" element={<SetNewPassword />} />
            <Route path="/auth/email-confirmation" element={<EmailConfirmation />} />
          </Route>
        </Routes>
  )
}

export default App
