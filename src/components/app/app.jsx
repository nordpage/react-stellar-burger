import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../header/appHeader";
import Main from "../main/main";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
        <Main data={data}/>
    </div>
  );
}

export default App;
