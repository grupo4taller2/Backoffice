import "../style/login.css"
import { Card, Form, FormGroup, Input, Label } from "reactstrap"
import StatusButton from "../components/StatusButton";
import React from "react";
import LabeledInput from "../components/LabeledInput";

const logo = require("../images/logoWithName.png");

export default function LoginView(props){

    const [loading, setLoading] = React.useState(false);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const tryLogin = () => {
        setLoading(!loading); //TODO: cambiarlo para que funcione como debe

        console.log(username);
        console.log(password);

        /*
            Aca hace checkeos sencillos: 

            1. Si no escribio nada, avisale que escriba algo.
            2. Si escribio algo pero esta mal, avisa que son credenciales invalidas
        */
    }

    return (
        <Card className="SurfaceLogin">
            <h3 className="HeadingFontLogin">Admin Login</h3>
            <img className="PhotoSurfaceLogin" src={logo} />
            <Form>
                <FormGroup>
                    <LabeledInput labelClass="UsernameLabelLogin" inputClass="UsernameInputLogin" id="adminNameInput"
                                  name="username" type="text" value={username} onChange={setUsername}/>
                                  
                    <LabeledInput labelClass="PasswordLabelLogin" inputClass="PasswordInputLogin" id="AdminPasswordInput"
                                    name="password" type="password" value={password} onChange={setPassword}/>
                </FormGroup>
            </Form>
            <StatusButton className="LoginBtn" color="primary" text="Login" loading={loading} 
                            loadingText="Login in" onPress={tryLogin}/>
        </Card>
    )
}