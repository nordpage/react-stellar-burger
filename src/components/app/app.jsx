import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../header/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
        <main className={styles.main}>
            <BurgerIngredients data={data}/>
            <div className="mt-25 mb-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam cupiditate deleniti ea exercitationem id in iure, nesciunt nulla officiis perspiciatis quas qui sapiente suscipit voluptates! Natus nisi numquam repudiandae!
            </div>
        </main>
    </div>
  );
}

export default App;
