import React from "react";
import { Button, Card, Input } from "reactstrap";
import LabeledInput from "../components/LabeledInput";
import Menu from "../components/Menu";
import StatusButton from "../components/StatusButton";
import UserBox from "../components/UserBox";
import { useUserContext } from "../config/ctx";
import { search } from "../functions/net";
import "../style/search.css"

export default function Search(props){
    const [searchString, setSearch] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [users, setUsers] = React.useState([]);

    const context = useUserContext();

    const doSearch = async () => {
        try{
            const result = await search(searchString, context);
            setUsers(result);    
        }catch{
            setUsers([]);
        }
    }

    const searchAndShow = async () => {
        setLoading(true);
        try{
            setUsers([]);
            await doSearch();
            setLoading(false);
        }catch{
            setLoading(false);
        }
        
        
    }

    return (
            <React.Fragment>
            <Menu />
            <Card className="SearchSurface">
                <div className="SearchBox">
                    <LabeledInput onChange={setSearch} inputClass="SearchInput" name="username" notNamed/>
                    <StatusButton loading={loading} loadingText="" onPress={searchAndShow} className="SearchButton" color="primary" text="search"/>
                </div>
                <Card className="SearchResultBox">
                    {users.map(user => {
                        console.log(user);
                        return <UserBox data={user} update={doSearch} admin={user.admin} username={user.username} />
                    })}
                </Card>
            </Card>
            </React.Fragment>);
}