import React from "react";
import { Button, Card, Input } from "reactstrap";
import LabeledInput from "../components/LabeledInput";
import Menu from "../components/Menu";
import StatusButton from "../components/StatusButton";
import UserBox from "../components/UserBox";
import "../style/search.css"

export default function Search(props){
    return (
            <React.Fragment>
            <Menu />
            <Card className="SearchSurface">
                <div className="SearchBox">
                    <LabeledInput inputClass="SearchInput" name="username" notNamed/>
                    <StatusButton className="SearchButton" color="primary" text="search"/>
                </div>
                <Card className="SearchResultBox">
                    <UserBox admin={true} username={"Admin 1"} />
                    <UserBox username={"Usuario 1"} />
                    <UserBox username={"Usuario 2"} />
                    <UserBox admin={true} username={"Admin 2"} />
                    <UserBox username={"Usuario 3"} />
                </Card>
            </Card>
            </React.Fragment>);
}