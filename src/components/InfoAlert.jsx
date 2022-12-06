import React from "react";
import { Alert } from "reactstrap";
import "../style/alert.css"

export default function InfoAlert(props){


    return <Alert className={props.noClass ? null : "AlertSize"} isOpen={props.isOpen} 
                  toggle={props.onDismiss} color={props.isError ? "danger" : "info"}>{props.text}</Alert>

}