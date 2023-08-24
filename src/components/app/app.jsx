import styles from "./app.module.css";
import AppHeader from "../header/appHeader";
import Main from "../main/main";
import {useEffect, useState} from "react";
import {fetchIngredients} from "../../utils/api";

const App = function() {

    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    const fetchData = () => {
        setState({...state, hasError: false, isLoading: true})
        fetchIngredients()
            .then(data => {
                setState({...state, data: data.data, isLoading: false})
            })
            .catch(() => setState({...state, hasError: true, isLoading: false}))
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
        {state.data.length > 0 &&  <Main mainData={state.data}/>}
    </div>
  );
}

export default App;
