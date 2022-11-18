import React from "react";
import { Button, Card, Modal } from "reactstrap";
import { ActivableInput } from "../components/ActiveableInput";
import LoadingScreen from "../components/LoadingSpinner";
import Menu from "../components/Menu";
import SimplePopup from "../components/SimplePopup";
import { useUserContext } from "../config/ctx";
import { get_rules, patch_rules, try_rules } from "../functions/net";
import "../style/rules.css";

export default function Rules(props){

    const context = useUserContext();

    const [message, setMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [popUpMessage, setPopUp] = React.useState(false);

    const togglePopup = () => {
        errorMessage ? setErrorMessage(!errorMessage) : setPopUp(!popUpMessage)
    }

    const [globalLoading, setGlobalLoading] = React.useState(false);

    const [kmPrice, setkmPrice] = React.useState(''); //Change to rules
    const [kmTest, setkmTest] = React.useState(''); 
    const [ratingFactor, setRatingFactor] = React.useState(''); //Change to rules
    const [ratingTry, setTryRating] = React.useState(''); 
    const [thirtyMinFactor, setTimeFactor] = React.useState(''); //Change to rules
    const [totalTripsTry, setTotalTrips] = React.useState(''); 
    const [minPrice, setminPrice] = React.useState(''); //Change to rules
    const [minPriceTry, setMinPriceTry] = React.useState(''); 

    const set_values = (rules) => {
        setkmPrice(rules.c_km);
        setRatingFactor(rules.c_rating);
        setminPrice(rules.c_min_price);
        setTimeFactor(rules.c_trips_last_30m);
    };

    const load_rules = async () => {
        setGlobalLoading(true);
        setErrorMessage(false);
        try{
            const rules = await get_rules(context);
            setMessage('');
            set_values(rules);
        }catch{ 
            setErrorMessage(true);
            setMessage("Could not load pricing rules.");
        }
        setGlobalLoading(false);
    };

    const bundle_rules = () => {

        const rules = {};

        rules.c_km = kmPrice;
        rules.c_rating = ratingFactor;
        rules.c_min_price = minPrice;
        rules.c_trips_last_30m = thirtyMinFactor;

        return rules;

    };

    const update_rules = async () => {
        setGlobalLoading(true)
        setErrorMessage(false);
        try{
            const new_rules = await patch_rules(bundle_rules(), context);
            setMessage("Pricing rules updated");
            setPopUp(true);
            set_values(new_rules);
        } catch (error){
            console.log(error);
            setErrorMessage(true);
            setMessage("Failed update pricing rules.");
        }
        setGlobalLoading(false);
    };

    const bundle_trial = () => {
        const rules = bundle_rules();

        rules.n_km = kmTest;
        rules.n_rating = ratingTry;
        rules.n_trips_last_30m = totalTripsTry;

        return rules;
    }

    const rules_trial = async () => {
        setGlobalLoading(true);
        setErrorMessage(false);
        try{
            const trial = bundle_trial();

            const pricing = await try_rules(trial, context);

            setMessage("Total pricing: " + pricing.price);
            setPopUp(true);

        }catch{
            setErrorMessage(true);
            setMessage("Failed to get pricing")
        }
        setGlobalLoading(false);
    }

    React.useEffect( () => {load_rules()}, []);
    
    
    return (    <>
                <Menu rules={true}/>
                    <Card className="RuleSurface">
            {globalLoading ? <LoadingScreen /> : 
                <>
                <SimplePopup isOpen={errorMessage || popUpMessage} toggle={togglePopup} text={message} errorClass={errorMessage ? "ErrorMessage": "Message"}/>
                <div className="InputRow">
                <ActivableInput value={kmPrice} onChange={setkmPrice} name="Price per Km" inputClass="Km"
                            tryValue={kmTest} tryOnChange={setkmTest} tryName="Try km" 
                            tryable={true}/>
                <ActivableInput value={ratingFactor} onChange={setRatingFactor} name="Rating factor" inputClass="Km"
                            tryValue={ratingTry} tryOnChange={setTryRating} tryName="Try rating"
                            tryable={true}/>
                </div>
                <div className="InputRow">
                <ActivableInput value={thirtyMinFactor} onChange={setTimeFactor} name="30min trip factor" inputClass="Km"
                            tryValue={totalTripsTry} tryOnChange={setTotalTrips} tryName="Try total trips"
                            tryable={true}/>
                <ActivableInput value={minPrice} onChange={setminPrice} name="Min price" inputClass="Km"
                            tryValue={minPriceTry} tryOnChange={setMinPriceTry} tryName="Try"/>
                </div>
                <div className="LastRow">
                    <Button className="SaveButton" onClick={update_rules} outline color="primary">Save Rules</Button>
                    <Button className="TryButton" onClick={rules_trial} outline color="primary">Try trip with rules</Button> 
                </div>
                </>
    }
        </Card>
        </>
    )
}