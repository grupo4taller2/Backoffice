import { Button, Card, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "../style/register.css"

export default function Register(props){
    return (
        <Card className="Surface">
            <Form>
                <Row className="Row">
                    <FormGroup>
                    <Label className="FirstName" for="newAdminFirstName">First Name</Label>
                    <Input className="RowInput FirstNameInput" id="newAdminFirstName" name="first name" placeholder="First name" type="text"></Input>
                    <Label className="LastName" for="newAdminLastName">Last Name</Label>
                    <Input className="RowInput LastNameInput" id="newAdminLastName" name="last name" placeholder="Last name" type="text"></Input>
                    </FormGroup>
                </Row>
                <Row className="Row">
                <FormGroup>
                    <Label className="Username" for="newAdminUserName">Username</Label>
                    <Input className="RowInput UsernameInput" id="newAdminUsername" name="username" placeholder="Username" type="text" />
                    <Label className="Email" for="newAdminEmail">Email</Label>
                    <Input className="RowInput EmailInput" id="newAdminEmail" name="email" placeholder="Email" type="text" />
                </FormGroup>
                </Row>
                <Row className="Row">
                    <FormGroup>
                        <Label className="Password" for="newAdminPassword">Password</Label>
                        <Input className="RowInput PasswordInput" id="newAdminPassword" name="password" placeholder="Password" type="password" />
                        <Label className="Confirm" for="newAdminConfirm">Confirm password</Label>
                        <Input className="RowInput ConfirmInput" id="newAdminConfirm" name="confirm" placeholder="Confirm password" type="password" />
                    </FormGroup>
                </Row>
            </Form>
            <Button className="RegisterBtn" color="primary">Register admin</Button>
        </Card>
    );
}