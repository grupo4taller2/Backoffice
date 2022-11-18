import React from "react";
import { Badge, Button, Card, CardBody, CardHeader, CloseButton, Modal, ModalHeader } from "reactstrap";
import "../style/search.css";
import "../style/userCard.css";
import InfoTable from "./InfoTable";

export default function InfoUserBox(props){

    const [show, setShow] = React.useState(false);

    const toggle = () => {
        setShow(!show);
    }
    
    const userType = props.data.driver_information.car.color ? "Driver" : "Rider";
    
    const userInfo = userType === "Rider" ? props.data.rider_information : props.data.driver_information;

    let headers = Object.keys(userInfo).filter(value => value !== "car");
    const info = headers.map(value => userInfo[value]);
    headers.push("Name");
    headers.push("Email");
    info.push(props.data.first_name + " " + props.data.last_name);
    info.push(props.data.email);

    const driverHeaders = userType === "Driver" && Object.keys(userInfo.car);
    const carInfo = driverHeaders && driverHeaders.map(value => userInfo.car[value]);

    const mainInfoHeaders = ["User type", "Username", "Name", "email"];
    const mainInfo = [userType, props.data.username, props.data.first_name + " " + props.data.last_name, props.data.email];

    return (<>
                <Button onClick={toggle}  className="InfoTag" color="primary">Info</Button>
                <Modal className="UserCardSurface" isOpen={show} toggle={toggle}>
                    <div className="CloseButtonDiv">
                        <CloseButton onClick={toggle}/>
                    </div>
                    <ModalHeader className="ModHead">{userType}: {props.data.username}</ModalHeader>
                        <div className="UserInfoDiv">
                    <Card className="CardShadow">
                        <CardHeader>
                            User information    
                        </CardHeader>
                        <CardBody>
                            <InfoTable headers={pretifyHeaders(headers)} info={info}></InfoTable>
                        </CardBody>
                    </Card>
                    {driverHeaders &&
                            <Card className="CardShadow">
                            <CardHeader>
                                Car information
                            </CardHeader>
                            <CardBody>
                                <InfoTable headers={pretifyHeaders(driverHeaders)} info={carInfo} />
                            </CardBody>
                            </Card>
                        }
                        </div>
                    
                </Modal>
            </>)

};


function pretifyHeaders(headers){

    return (
        headers.map(value => {
            switch (value){
                case "phone_number": return "Phone Number"; 
                case "wallet": return "Wallet";
                case "preferred_location_name": return "Prefered Location";
                case "plate": return "Plate";
                case "year_of_production": return "Car Year";
                case "model": return "Car Model";
                case "manufacturer": return "Car Manufacturer";
                case "color": return "Car Color";
                default: return value
            }
        })
    )
}