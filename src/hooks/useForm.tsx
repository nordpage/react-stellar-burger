import {ChangeEventHandler, useState} from "react";
import {Inputs} from "../utils/types";


export function useForm(inputValues: Inputs) {
    const [values, setValues] = useState(inputValues);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}
