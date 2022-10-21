import React from "react";
import { Input, Label } from "reactstrap";

export default function LabeledInput(props){
    
    return (<React.Fragment>
                <Label className={props.labelClass} for={props.id}>
                Username
                </Label>
                <Input className={props.inputClass} id={props.id} name={props.name} 
                placeholder={props.name} type={props.type} value={props.value} onChange={(e) => props.onChange(e.target.value)}/>
                </React.Fragment>);
}