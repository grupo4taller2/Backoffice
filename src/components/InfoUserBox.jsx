import React from "react";
import { Button, Modal } from "reactstrap";
import "../style/search.css";
import "../style/userCard.css";

export default function InfoUserBox(props){

    const [show, setShow] = React.useState(false);

    const toggle = () => {
        setShow(!show);
    }

    const keys = Object.keys(props.data);
    

    const userType = props.data.rider_information.wallet ? "Rider" : "Driver";

    const userInfo = userType === "Rider" ? props.data.rider_information : props.data.driver_information;

    return (<>
                <Button onClick={toggle}  className="InfoTag" color="primary">Info</Button>
                <Modal className="UserCardSurface" isOpen={show} toggle={toggle}>
                    <p>Email: {props.data.email}</p>
                    <p>Name: {props.data.first_name + props.data.last_name}</p>
                    <p>User information: 
                        <p>Wallet address: {userInfo.wallet}</p>
                        <p>Phone number: {userInfo.phone_number}</p>
                        <p>Preferred address: {userInfo.preferred_location_name}</p>
                    </p>
                    {userType === "Driver" && <p>Driver information: 
                        <p>Car plate: {userInfo.car.plate}</p>
                        <p>Car year: {userInfo.car.year_of_production}</p>
                        <p>Car model: {userInfo.car.model}</p>
                        <p>Car manufacturer: {userInfo.car.manufacturer}</p>
                        <p>Car color: {userInfo.car.color}</p>
                        </p>}
                    <Button color="secondary" onClick={toggle}>Close</Button>
                    
                </Modal>
            </>)

};