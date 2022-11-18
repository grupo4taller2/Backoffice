import React from "react";
import { Button } from "reactstrap";
import "../style/rules.css";
import LabeledInput from "./LabeledInput";

export function ActivableInput(props){
    
    const [activeChange, setActiveChange] = React.useState(false);
    const [activeTry, setActiveTry] = React.useState(false);

    const [partialChange, setPartialChange] = React.useState(props.value);
    const [partialTry, setPartialTry] = React.useState(props.tryValue);

    const toggleChange = () => {
        props.onChange(partialChange)
        setActiveChange(!activeChange)
    };

    const toggleTry = () => {
        props.tryOnChange(partialTry)
        setActiveTry(!activeTry)
    }

    const activeMessage = activeChange ? "Confirm" : "Edit";

    const activeTryMessage = activeTry ? "Save try value" : "Set try value";
    
    return (
    <div className="ActivableDiv">
        <div className="InputDiv">    
            <LabeledInput isDisabled={!activeChange} inputClass="CoefficientInput"  id={props.inputClass + "id"}
            name={props.name} type="text" value={partialChange} onChange={setPartialChange}
            invalid={props.failed}/>
        </div>
        <Button outline color="primary" className="ActiveInputBtn" onClick={toggleChange}>{activeMessage}</Button>
        {
            props.tryable ?
            <>
            <div className="InputDiv">    
                <LabeledInput isDisabled={!activeTry} inputClass="CoefficientInput"  id={props.inputClass + "id"}
                name={props.tryName} type="text" value={partialTry} onChange={setPartialTry}
                invalid={props.failed}/>
            </div>
            <Button outline color="primary" className="ActiveInputBtn" onClick={toggleTry}>{activeTryMessage}</Button>
            </>
            : 
            null
        }</div>);
}