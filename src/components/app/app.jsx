import styles from "./app.module.css";
import {tempData} from "../../utils/data";
import AppHeader from "../header/appHeader";
import Main from "../main/main";
import {useEffect, useState} from "react";
import {API_URL} from "../../utils/constants";

const App = function() {

    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    const fetchData = () => {
        setState({...state, hasError: false, isLoading: true})
        fetch(API_URL)
            .then(res => res.json())
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
        {state.data.length > 0 &&  <Main data={state.data} tempData={tempData}/>}
    </div>
  );
}

export default App;
