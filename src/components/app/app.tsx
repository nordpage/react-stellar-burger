import styles from "./app.module.css";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import MainPage from "../../pages/main";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ProfilePage from "../../pages/profile";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import IngredientsPage from "../../pages/ingredients";
import UserDataPage from "../../pages/user-data";
import OrdersPage from "../../pages/orders";
import React, {useEffect} from "react";
import ProtectedRoute from "../../pages/protected-route/protectedRoute";
import NotFound from "../../pages/not-found";
import {closeModal, openModal} from "../../services/reducers/modalSlice";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {modalTypes} from "../../utils/modal-types";
import OrderDetails from "../modal/order-details/order-details";
import {addOrderNumber} from "../../services/reducers/orderSlice";
import {clearCart} from "../../services/reducers/burgerSlice";
import AppHeader from "../header/appHeader";
import {CURRENT, DETAILS, FEED} from "../../utils/constants";
import FeedPage from "../../pages/feed/feed";
import ProfileFeedPage from "../../pages/feed/profileFeed/profile-feed";
import OrderFeedPage from "../../pages/feed/orderFeed/order-feed";
import {TStore} from "../../services/reducers/store";

const App = function() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const {modal} = useSelector((store: TStore) => store.modal)
    const dispatch = useDispatch();
    const {order} = useSelector((store: TStore) => store.order)
    const currentId = localStorage.getItem(CURRENT)
    const feedId = localStorage.getItem(FEED)

    useEffect(() => {
        if (currentId !== null) {
            dispatch(openModal(modalTypes.Ingredient))
        } else if (feedId !== null) {
            dispatch(openModal(modalTypes.Feed))
        }
    }, [currentId, feedId])

    const handleModalClose = () => {
        if (currentId !== null) localStorage.removeItem(CURRENT)
        if (feedId !== null) localStorage.removeItem(FEED)
        navigate(-1);
    };

  return (
    <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/profile" element={<ProtectedRoute authRequired={true} children={<ProfilePage/>}/> }>
                    <Route path="/profile/" element={<UserDataPage/>}/>
                    <Route path="/profile/orders" element={<OrdersPage/>}/>
                </Route>

                <Route path="/profile/orders/:id" element={<ProtectedRoute authRequired={true} children={<ProfileFeedPage/>}/> }/>

                <Route path="/feed" element={<FeedPage/>}/>
                <Route path="/feed/:id" element={<OrderFeedPage/>}/>

                <Route path="/login" element={<ProtectedRoute authRequired={false} children={<LoginPage/>}/> } />

                <Route path="/forgot-password" element={<ProtectedRoute authRequired={false} children={<ForgotPasswordPage/>}/> }/>
                <Route path="/reset-password" element={<ProtectedRoute authRequired={false} children={<ResetPasswordPage/>}/> }/>
                <Route path="/ingredients/:ingredientId" element={<IngredientsPage/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            {background && <Routes>
                <Route
                    path='/ingredients/:ingredientId'
                    element={
                        modal.type === modalTypes.Ingredient && <Modal title={DETAILS} children={<IngredientDetails/>} onModalClose={handleModalClose}/>
                    }
                />
                <Route
                    path='/feed/:id'
                    element={
                        modal.type === modalTypes.Feed && <Modal children={<OrderFeedPage/>} onModalClose={handleModalClose}/>
                    }
                />
                <Route
                    path='/profile/orders/:id'
                    element={
                        modal.type === modalTypes.Feed && <Modal children={<ProfileFeedPage/>} onModalClose={handleModalClose}/>
                    }
                />
            </Routes>}
        {
            modal.type === modalTypes.Order &&  <Modal onModalClose={() => {
                dispatch(addOrderNumber(0))
                dispatch(clearCart())
                dispatch(closeModal())
            }}>
                <OrderDetails order= {order.orderNumber} />
            </Modal>
        }
    </div>
  );
}

export default App;
