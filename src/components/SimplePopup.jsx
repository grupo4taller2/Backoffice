import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function SimplePopup(props){

    const toggle = () => {
        props.toggle(!props.isOpen);
    }

    return (<Modal isOpen={props.isOpen} toggle={toggle}>
                <ModalBody>
                    <p className={props.errorClass}>{props.text}</p>
                </ModalBody>
                <ModalFooter className="ErrorFooter">
                    <Button color="secondary" onClick={toggle}>Ok</Button>
                </ModalFooter>
            </Modal>)

}