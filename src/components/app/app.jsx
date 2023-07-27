import styles from "./app.module.css";
import {data, tempData} from "../../utils/data";
import AppHeader from "../header/appHeader";
import Main from "../main/main";
import {useEffect, useState} from "react";
import {API_URL} from "../../utils/constants";

const App = function() {

    const [data, setData] = useState([])
    const fetchData = () => {
        fetch(API_URL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data.data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
        {data.length > 0 &&  <Main data={data} tempData={tempData}/>}
    </div>
  );
}

export default App;
