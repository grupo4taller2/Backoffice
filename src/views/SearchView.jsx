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
            <Modal isOpen={true}>
            <Menu search={true}/>
            <Card className="SearchSurface">
                <div className="SearchBox">
                    <LabeledInput onChange={setSearch} inputClass="SearchInput" name="username" notNamed/>
                    <StatusButton loading={loading} loadingText="" onPress={searchAndShow} className="SearchButton" color="primary" text="search"/>
                </div>
                <Card className="SearchResultBox">
                    {offset > 0 | pagLoading? 
                    <StatusButton loading={pagLoading} loadingText="" onPress={goBack} color="primary" className="PagBtn" text="<<">
                        
                    </StatusButton> 
                    : 
                    null}
                    {users.length > 0 ? 
                    <StatusButton loading={pagLoading} loadingText="" onPress={advance} className="PagBtn AdvanceBtn" color="primary" text=">>" />
                                      : 
                                      null}
                    {users.map(user => {
                        
                        return <UserBox data={user} update={doSearch} admin={user.admin} username={user.username} />
                    })}
                </Card>
            </Card>
            </Modal>);
}