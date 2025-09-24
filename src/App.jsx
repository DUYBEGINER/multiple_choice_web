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
import { PATHS } from './data/routePaths';

function App() {

  const { loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Không render Routes khi đang xác thực
  }

  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path={PATHS.QUIZ}
            element={
              <PrivateRoute>
                <CreateQuizPage />
              </PrivateRoute>
            }
          />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassWord />} /> */}
          <Route path={PATHS.AUTH.ROOT} element={<AuthLayout />}>
            <Route path={PATHS.AUTH_CHILD.LOGIN} element={<LoginPage />} />
            <Route path={PATHS.AUTH_CHILD.SIGNUP} element={<SignUpPage />} />
            <Route path={PATHS.AUTH_CHILD.FORGOTPASSWORD} element={<ForgotPassWord />} />
            <Route path={PATHS.AUTH_CHILD.RESET} element={<SetNewPassword />} />
            <Route path={PATHS.AUTH_CHILD.EMAIL_CONFIRM} element={<EmailConfirmation />} />
          </Route>
        </Routes>
  )
}

export default App
