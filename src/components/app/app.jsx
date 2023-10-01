import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "../../pages/main";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ProfilePage from "../../pages/profile";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import IngredientsPage from "../../pages/ingredients";
import UserDataPage from "../../pages/user-data";
import OrdersPage from "../../pages/orders";
import React from "react";
import ProtectedRoute from "../../pages/protectedRoute";

const App = function() {

  return (
    <div className={styles.app}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>
                }/>
                <Route path="/login" element={<LoginPage/>} />

                <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/ingredients/:id" element={<IngredientsPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
