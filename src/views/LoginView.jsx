import "../style/login.css"
import { Button, Card, Col, Form, FormGroup, Input, Label } from "reactstrap"

const logo = require("../images/logoWithName.png");

export default function LoginView(props){


    return (
        <Card className="Surface">
            <h3 className="HeadingFont">Admin Login</h3>
            <img className="PhotoSurface" src={logo} />
            <Form>
                <FormGroup>
                    <Label className="UsernameLabel" for="adminNameInput">
                        Username
                    </Label>
                    <Input className="UsernameInput" id="adminNameInput" name="username" placeholder="username" type="text" />
                    <Label className="PasswordLabel" for="AdminPasswordInput">
                        Password
                    </Label>
                    <Input className="PasswordInput" id="AdminPasswordInput" name="Password" placeholder="Password" type="password" />
                </FormGroup>
            </Form>
            <Button className="LoginBtn" color="primary" outline>Login</Button>
        </Card>
    )
}