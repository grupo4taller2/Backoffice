import React from "react";
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useUserContext } from "../config/ctx";
import { registerAdmin } from "../functions/net";
import "../style/search.css"
import InfoAlert from "./InfoAlert";
import InfoUserBox from "./InfoUserBox";
import StatusButton from "./StatusButton";
import WalletDeposit from "./WalletDeposit";

export default function UserBox(props){
    const [register, setRegister] = React.useState(false);
    const [changeBlockStatus, setChangeBlockStatus] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [blockedStatus, setBlockedStatus] = React.useState(props.isBlocked);

    const [alertText, setAlertText] = React.useState('');
    const [alert, setAlert] = React.useState(false);
    const [alertError, setAlertError] = React.useState(false);

    const toggle = props.admin ? () => {} : () => {setRegister(!register)};

    const toggleBlock = () => {setChangeBlockStatus(!changeBlockStatus)};

    const context = useUserContext();

    const toggleAlert = () => {
        setAlert(false);
        setAlertError(false);
        setRegister(false);
        setChangeBlockStatus(false);
    }

    const as_admin = props.admin ? () => {} : async () => {
        setLoading(true);
        try{
            await registerAdmin(props.username, context);
            setAlertText("The user was registered as admin");
            props.update();
        }catch{
            //Set an error
            setAlertError(true);
            setAlertText("Ocurrio un error al tratar de registrar al usuario como administrador")
        }

        setLoading(false);
        setAlert(true);
    };

    const changeBlockedStatus = async () => {
        setLoading(true)
        try{
            //Await the blocking or unblocking of a user
            setAlertText("The user was blocked");
        }catch{
            setAlertText("There was a problem blocking the user");
            setAlertError(true);
        }
        setAlert(true)
        setLoading(false)
    }

    return (
                    <Card className="FoundUserBox">
                        <InfoUserBox data={props.data}/>
                        <WalletDeposit username={props.username}/>
                        {!props.admin && <Button className="AdminBtn" color="primary" outline onClick={toggle}>Make admin</Button>}
                        {/*!props.admin && (!props.isBlocked ? 
                        <Button className="BlockBtn" color="danger" outline onClick={toggleBlock}>Block User</Button>
                        :
                        <Button className="BlockBtn" color="success" outline onClick={toggleBlock}>UnBlock User</Button>
                        )*/}
                        <Modal isOpen={register || changeBlockStatus} toggle={register ? toggle : toggleBlock}>
                            {!alert && <>
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
                            </>}
                            {
                                alert &&
                                <> 
                                <ModalHeader toggle={() => {setRegister(!register)}}>
                                
                                </ModalHeader>
                                <ModalBody>
                                <InfoAlert isOpen={alert} isError={alertError} onDismiss={toggleAlert} 
                                            text={alertText} noClass={true} untoggable={true}/>
                                </ModalBody>
                                
                                </>
                            }
                        </Modal>
                        <p className="UsernameTag">{props.username}</p>
                        <p className="UserTypeTag">{props.admin ? "Admin" : "Regular user"}</p>
                    </Card>
        
    )
}

//<Card  outline color="light" className={["UserTypeTag", props.admin ? "AdminBackground" : "RegularBackground"]}>{props.admin ? "Admin" : "Regular user"}</Card>