import React from "react";
import { Button, Card, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { useUserContext } from "../config/ctx";
import { registerAdmin } from "../functions/net";
import "../style/search.css"
import InfoUserBox from "./InfoUserBox";
import StatusButton from "./StatusButton";

export default function UserBox(props){
    const [register, setRegister] = React.useState(false);
    const [changeBlockStatus, setChangeBlockStatus] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [blockedStatus, setBlockedStatus] = React.useState(props.isBlocked);

    const toggle = props.admin ? () => {} : () => {setRegister(!register)};

    const toggleBlock = () => {setChangeBlockStatus(!changeBlockStatus)};

    const context = useUserContext();

    const as_admin = props.admin ? () => {} : async () => {
        setLoading(true);
        try{
            await registerAdmin(props.username, context);
            await props.update();
        }catch{
            //Set an error
        }

        setLoading(false);
        toggle();
    };

    const changeBlockedStatus = async () => {
        setLoading(true)
        try{
            //Await the blocking or unblocking of a user
            //Hacer props.update()
        }catch{
            //Mensaje de error
        }
        setLoading(false)
    }

    return (
                    <Card className="FoundUserBox">
                        <InfoUserBox data={props.data}/>
                        {!props.admin && <Button className="AdminBtn" color="primary" outline onClick={toggle}>Make admin</Button>}
                        {!props.admin && (!props.isBlocked ? 
                        <Button className="BlockBtn" color="danger" outline onClick={toggleBlock}>Block User</Button>
                        :
                        <Button className="BlockBtn" color="success" outline onClick={toggleBlock}>UnBlock User</Button>
                        )}
                        <Modal isOpen={register || changeBlockStatus} toggle={register ? toggle : toggleBlock}>
                            <ModalHeader>
                                {  register ? 
                                "Register " + props.username + " as admin ?" 
                                :
                                "Block " + props.username + " ?"}
                            </ModalHeader>
                            <ModalFooter>
                                <StatusButton className="AdminRegBtn" onPress={register ? as_admin : changeBlockedStatus} color="primary" loading={loading} loadingText="" text="yes" />
                                <Button color="secondary" onClick={register ? toggle : toggleBlock}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                        <p className="UsernameTag">{props.username}</p>
                        <p className="UserTypeTag">{props.admin ? "Admin" : "Regular user"}</p>
                    </Card>
        
    )
}

//<Card  outline color="light" className={["UserTypeTag", props.admin ? "AdminBackground" : "RegularBackground"]}>{props.admin ? "Admin" : "Regular user"}</Card>