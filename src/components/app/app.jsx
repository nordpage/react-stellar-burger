import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "../../pages/main";
import LoginPage from "../../pages/login";

const App = function() {

  return (
    <div className={styles.app}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
