import styles from "./app.module.css";
import {BrowserRouter, Routes, Route, useLocation, useNavigate, Router} from 'react-router-dom';
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
import ProtectedRoute from "../../pages/protected-route/protectedRoute";
import NotFound from "../../pages/not-found";
import {addCurrentIngredient} from "../../services/reducers/currentIngredientSlice";
import {closeModal} from "../../services/reducers/modalSlice";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const App = function() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

  return (
    <div className={styles.app}>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/profile" element={<ProtectedRoute authRequired={true} children={<ProfilePage/>}/> }>
                    <Route path="/profile/" element={<UserDataPage/>}/>
                    <Route path="/profile/orders" element={<OrdersPage/>}/>
                </Route>


                <Route path="/login" element={<ProtectedRoute authRequired={false} children={<LoginPage/>}/> } />

                <Route path="/forgot-password" element={<ProtectedRoute authRequired={false} children={<ForgotPasswordPage/>}/> }/>
                <Route path="/reset-password" element={<ProtectedRoute authRequired={false} children={<ResetPasswordPage/>}/> }/>
                <Route path="/ingredients/:id" element={<IngredientsPage/>}/>
                <Route path="/404" element={<NotFound />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal onModalClose={handleModalClose} title="Детали ингредиента">
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
    </div>
  );
}

export default App;
