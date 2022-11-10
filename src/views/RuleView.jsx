import React from "react";
import { Button, Card, Modal } from "reactstrap";
import { ActivableInput } from "../components/ActiveableInput";
import Menu from "../components/Menu";
import "../style/rules.css";

export default function Rules(props){
    const [kmPrice, setkmPrice] = React.useState(''); //Change to rules
    const [kmTest, setkmTest] = React.useState(''); 
    const [ratingFactor, setRatingFactor] = React.useState(''); //Change to rules
    const [ratingTry, setTryRating] = React.useState(''); 
    const [thirtyMinFactor, setTimeFactor] = React.useState(''); //Change to rules
    const [totalTripsTry, setTotalTrips] = React.useState(''); 
    const [minPrice, setminPrice] = React.useState(''); //Change to rules
    const [minPriceTry, setMinPriceTry] = React.useState(''); 


    return (<Modal isOpen={true}>
        <Menu rules={true}/>
        <Card className="RuleSurface">
            <div className="InputRow">
            <ActivableInput value={kmPrice} onChange={setkmPrice} name="Price per Km" inputClass="Km"
                            tryValue={kmTest} tryOnChange={setkmTest} tryName="Try km"/>
            <ActivableInput value={ratingFactor} onChange={setRatingFactor} name="Rating factor" inputClass="Km"
                            tryValue={ratingTry} tryOnChange={setTryRating} tryName="Try rating"/>
            </div>
            <div className="InputRow">
            <ActivableInput value={thirtyMinFactor} onChange={setTimeFactor} name="30min trip factor" inputClass="Km"
                            tryValue={totalTripsTry} tryOnChange={setTotalTrips} tryName="Try total trips"/>
            <ActivableInput value={minPrice} onChange={setminPrice} name="Min price" inputClass="Km"
                            tryValue={minPriceTry} tryOnChange={setMinPriceTry} tryName="Try"/>
            </div>
            <div className="LastRow">
                <Button className="SaveButton" outline color="primary">Save Rules</Button>
                <Button className="TryButton" outline color="primary">Try trip with rules</Button> 
            </div>
        </Card>
    </Modal>)
}