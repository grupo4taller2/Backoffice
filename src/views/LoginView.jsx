import "../style/login.css"
import { Card, Form, FormGroup, Input, Label, Modal } from "reactstrap"
import StatusButton from "../components/StatusButton";
import React from "react";
import LabeledInput from "../components/LabeledInput";
import { checkValidMail, checkValidPassword, checkValidUsername } from "../functions/checks";
import { login } from "../functions/net";
import { useUserContext } from "../config/ctx";
import { useNavigate } from "react-router-dom";

const logo = require("../images/logoWithName.png");
const INVALIDINPUT = "Please provide a valid email and password";
const INVALIDLOGIN = "Invalid login credentials";


export default function LoginView(props){

    const [loading, setLoading] = React.useState(false);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [failedInput, setFailInput] = React.useState(false);
    
    const [error, setError] = React.useState("");

    const {signIn} = useUserContext();

    const navigate = useNavigate();

    const cleanErrors = () => {

        setError('');
        setFailInput(false);

    };

    const tryLogin = async () => {
        setLoading(true); //TODO: cambiarlo para que funcione como debe
        cleanErrors();

        if (!checkValidMail(username) || !checkValidPassword(password)) {
            setError(INVALIDINPUT);
            setFailInput(true);
            setLoading(false);
            return;
        }

        try{
            const response = await login(username, password);
            setLoading(false);
            signIn(response);
            navigate('/search')
        }catch (e){
            console.log(e);
            setError(INVALIDLOGIN)
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={true}>
        <Card className="SurfaceLogin">
            <h3 className="HeadingFontLogin">Admin Login</h3>
            <img className="PhotoSurfaceLogin" src={logo} />
            <Form>
                <FormGroup>
                    <LabeledInput labelClass="UsernameLabelLogin" inputClass="UsernameInputLogin" id="adminNameInput"
                                  name="Username" type="text" value={username} onChange={setUsername}
                                  invalid={failedInput}/>
                                  
                    <LabeledInput labelClass="PasswordLabelLogin" inputClass="PasswordInputLogin" id="AdminPasswordInput"
                                    name="Password" type="password" value={password} onChange={setPassword}
                                    invalid={failedInput}/>
                </FormGroup>
            </Form>
            
            <StatusButton className="LoginBtn" color="primary" text="Login" loading={loading} 
                            loadingText="Login in" onPress={tryLogin}/>

            <p className="ErrorMessageLogin" color="red">{error}</p> 
        </Card>
        </Modal>
    )
}