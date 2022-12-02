import React from "react";
import { Button, Card, CardTitle, Input, Modal } from "reactstrap";
import LabeledInput from "../components/LabeledInput";
import Menu from "../components/Menu";
import StatusButton from "../components/StatusButton";
import UserBox from "../components/UserBox";
import { useUserContext } from "../config/ctx";
import { search } from "../functions/net";
import "../style/search.css";
import "../style/screenTitle.css";
import LoadingScreen from "../components/LoadingSpinner";

export default function Search(props){
    const [searchString, setSearch] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [pagLoading, setPagLoading] = React.useState(false);

    const [users, setUsers] = React.useState([]);

    const context = useUserContext();

    const [offset, setOffset] = React.useState(0);

    const doSearch = async () => {
        try{
            const result = await search(searchString, context, offset);
            setUsers(result);    
        }catch{
            setUsers([]);
        }
    }

    const searchAndShow = async () => {
        setLoading(true);
        setOffset(0);
        try{
            setUsers([]);
            await doSearch();
            setLoading(false);
        }catch{
            setLoading(false);
        }
        
        
    }

    const moveOffset = async (by) => {
        setPagLoading(true);
        setUsers([]);
        await doSearch();
        setPagLoading(false);
    }

    const advance = () => {
        setOffset(offset + 10);
    }

    const goBack = () => {
        setOffset(offset - 10);
    }

    React.useEffect(() => {
        const func = async () => {
            setPagLoading(true);
            await doSearch();
            setPagLoading(false);
        }
        func()
    }, [offset])

    return (
            <>
            <Menu search={true}/>
            <div className="SearchBox">
                    <LabeledInput onChange={setSearch} inputClass="SearchInput" name="username" notNamed/>
                    <StatusButton loading={loading} loadingText="" onPress={searchAndShow} className="SearchButton" color="primary" text="search"/>
            </div>
                {pagLoading ? <LoadingScreen /> 
                :
                
                <Card className="SearchResultBox">
                    <div className="PagRow">

                    <StatusButton outline loading={pagLoading} loadingText="" onPress={offset > 0 | pagLoading ? goBack: () => {}} color={offset > 0 | pagLoading ? "primary": null} className="PagBtn" text={offset > 0 | pagLoading ? "<<": ""}/>
                    
                    <StatusButton outline loading={pagLoading} loadingText="" onPress={users.length > 9 ? advance : () => {}} className="PagBtn" color={users.length > 9 ? "primary" : "light"} text={users.length > 9 ? ">>" : ""} />            
                    </div>
                    {users.map(user => {
                        
                        return <UserBox data={user} update={doSearch} admin={user.admin} username={user.username} isBlocked={user.isBlocked}/>
                    })}
                </Card>
                
            }
            </>);
}