import {useState} from "react";
import {Inputs} from "../utils/types";


export function useForm(inputValues: Inputs) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}
