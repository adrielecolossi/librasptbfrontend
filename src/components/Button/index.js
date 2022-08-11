import React from "react";
import {Button} from "./styles";

function ButtonJS(props) {
    if(props.name!== undefined){
    return (
        <Button 
        onClick={props.onClick}
        backgroundColor={props.backgroundColor}
        color={props.color}
        borderRadius={props.borderRadius}
        padding={props.padding}
        width={props.width}
        widthResp={props.widthResp}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}>
        {props.name}
        </Button>
    );
    } else{}
    return (
      <Button
        onClick={props.onClick}
        backgroundColor={props.backgroundColor}
        color={props.color}
        borderRadius={props.borderRadius}
        padding={props.padding}
        width={props.width}
        widthResp={props.widthResp}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
      >
      <img src={props.image} alt=""></img>
      </Button>
    );
}
export default ButtonJS;