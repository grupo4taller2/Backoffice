import React from "react";
import { Button, Card, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { registerAdmin } from "../functions/net";
import "../style/search.css"
import StatusButton from "./StatusButton";

export default function UserBox(props){
    const [register, setRegister] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const toggle = props.admin ? () => {} : () => {setRegister(!register)};

    const as_admin = props.admin ? () => {} : async () => {
        console.log("called");
        setLoading(true);
        try{
            await registerAdmin(props.username);
            await props.update();
        }catch{
            //Set an error
        }

        setLoading(false);
        toggle();
    };

    return (
                    <Card className="FoundUserBox">
                        <Button className="InfoTag" color="primary">Info</Button>
                        <Card  onClick={toggle} color={props.admin ? "success": "warning"} className="UserTypeTag">{props.admin ? "Admin" : "Regular user"}</Card>
                        <Modal isOpen={register} toggle={toggle}>
                            <ModalHeader>{"Register " + props.username + " as admin ?"}</ModalHeader>
                            <ModalFooter>
                                <StatusButton onPress={as_admin} color="primary" loading={loading} loadingText="" text="yes" />
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                        <p className="UsernameTag">{props.username}</p>
                    </Card>
        
    )
}
