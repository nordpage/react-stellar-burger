import { Provider } from "react-redux";
import App from "./components/app/app";
import "./index.css";
import {store} from "./services/reducers/store";
import ReactDOM from "react-dom/client";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector("#root")!!);
root.render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DndProvider>
    </Provider>
);