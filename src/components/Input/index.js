import React from "react";
import { Input } from "./styles.js";

function InputJS(props) {
    return (
        <Input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            color={props.color}
        />
    );
}
export default InputJS;