import React from "react";
import { Button, Card, Modal, ModalFooter, ModalHeader } from "reactstrap";
import "../style/search.css"

export default function UserBox(props){
    const [register, setRegister] = React.useState(false);

    const toggle = props.admin ? () => {} : () => {setRegister(!register)};

    return (
                    <Card className="FoundUserBox">
                        <Button className="InfoTag" color="primary">Info</Button>
                        <Card  onClick={toggle} color={props.admin ? "success": "warning"} className="UserTypeTag">{props.admin ? "Admin" : "Regular user"}</Card>
                        <Modal isOpen={register} toggle={toggle}>
                            <ModalHeader>{"Register " + props.username + " as admin ?"}</ModalHeader>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle}>
                                    Yes
                                </Button>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                        <p className="UsernameTag">{props.username}</p>
                    </Card>
        
    )
}
