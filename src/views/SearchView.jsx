import React from "react";
import { Button, Card, CardTitle, Input, Modal, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import LabeledInput from "../components/LabeledInput";
import Menu from "../components/Menu";
import StatusButton from "../components/StatusButton";
import UserBox from "../components/UserBox";
import { useUserContext } from "../config/ctx";
import { search } from "../functions/net";
import "../style/search.css";
import "../style/screenTitle.css";
import LoadingScreen from "../components/LoadingSpinner";
import InfoAlert from "../components/InfoAlert";

export default function Search(props){
    const [searchString, setSearch] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [pagLoading, setPagLoading] = React.useState(false);

    const [users, setUsers] = React.useState([]);

    const context = useUserContext();

    const [offset, setOffset] = React.useState(0);

    const [mainError, setMainError] = React.useState(false);

    const [actualPage, setActualPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);

    const doSearch = async (someOffset) => {
        try{
            const result = await search(searchString, context, someOffset);
            if (result.users.length === 0){
                throw "No users found"
            }
            setUsers(result.users);
            setActualPage(result.actual_page);
            
            setTotalPages(result.total_pages);    
        }catch{
            setMainError(true);
            
            setUsers([]);
        }
    }

    const searchAndShow = async () => {
        setLoading(true);
        setOffset(0);
        try{
            setUsers([]);
            await doSearch(0);
            setLoading(false);
        }catch{
            setLoading(false);
        }
        
        
    }

    const setAndSearch = async (newOffset) => {
        
        setOffset(newOffset)

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
            await doSearch(offset);
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
                    {users.length !== 0 && 
                    <>
                    <div className="PagRow">

                    <StatusButton outline loading={pagLoading} loadingText="" onPress={offset > 0 | pagLoading ? goBack: () => {}} color={offset > 0 | pagLoading ? "primary": null} className="PagBtn" text={offset > 0 | pagLoading ? "<<": ""}/>
                    <Pagination size="lg" color="dark">
                        {(() => {
                            let pages = [];
                            for (let i = 1; i <= totalPages; i++){
                                pages.push(<PaginationItem active={i === actualPage}>
                                    <PaginationLink onClick={() => setAndSearch((i - 1) * 10)} color="dark">{i}</PaginationLink>
                                    </PaginationItem>)
                            }
                            return pages
                        })()}
                    </Pagination> 
                    <StatusButton outline loading={pagLoading} loadingText="" onPress={users.length > 9 ? advance : () => {}} className="PagBtn" color={users.length > 9 ? "primary" : "light"} text={users.length > 9 ? ">>" : ""} />            
                    </div>
                    {users.map(user => {
                        
                        return <UserBox data={user} update={doSearch} admin={user.admin} username={user.username} isBlocked={user.isBlocked}/>
                    })}
                    </>
                }
                    {mainError && <InfoAlert isError={true} text="No users found" onDismiss={() => setMainError(false)} isOpen={mainError}/>}
                </Card>
                
            }
            </>);
}