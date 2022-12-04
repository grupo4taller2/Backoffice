import React from "react";
import { Badge, Card, Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import InfoAlert from "../components/InfoAlert";
import LoadingScreen from "../components/LoadingSpinner";
import Menu from "../components/Menu";
import StatusButton from "../components/StatusButton";
import { useUserContext } from "../config/ctx";
import { loadTransactions } from "../functions/net";

import "../style/transactions.css"

export default function TransactionsView(props){
    const [pagLoading, setPagLoading] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [transactions, setTransactions] = React.useState([]);
    const [transactionsLoad, setTransactionsLoad] = React.useState(true);

    const [actualPage, setActualPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);

    const [mainError, setMainError] = React.useState(false);

    const [someError, setSomeError] = React.useState(false);

    const context = useUserContext();

    const getTransactions = async (offset) => {

        try{
            console.log(offset);
            const data = await loadTransactions(context, offset);
            
            setActualPage(data.actual_page);
            setTotalPages(data.total_pages);
            setTransactions(data.transactions);
            setSomeError(false);
            
        }catch{
            setMainError(true);
            setSomeError(true);
        }

        setTransactionsLoad(false);
        setPagLoading(false);
    }

    const advance = () => {
        setTransactionsLoad(true);
        setOffset(offset + 10);
        getTransactions(offset + 10);
    }

    const goBack = () => {
        setTransactionsLoad(true);
        setOffset(offset - 10);
        getTransactions(offset - 10);
    }

    const setAndSearch = (newOffset) => {
        setTransactionsLoad(true);
        setOffset(newOffset);
        getTransactions(newOffset);
    }

    React.useEffect(() => {getTransactions(offset)}, [])

    return <>
            <Menu transactions={true} />
            {transactionsLoad ? 
                <LoadingScreen /> 
                :
                <Card className="ResultsBoxTransactions">
                    {!mainError && !someError && 
                    <>
                    <div className="PagRowTransactions">

                    <StatusButton  outline className="TransactionsPagBtn" loadingText="" onPress={offset > 0 | pagLoading ? goBack: () => {}} color={offset > 0 | pagLoading ? "primary": null} text={offset > 0 | pagLoading ? "<<": ""}/>
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
                    <StatusButton  outline className="TransactionsPagBtn"  loadingText="" onPress={transactions.length > 9 ? advance : () => {}}  color={transactions.length > 9 ? "primary" : null} text={transactions.length > 9 ? ">>" : ""} />            
                    </div>
                    <Table className="TableDiv" bordered striped>
                    <thead>
                        <tr>
                            <th>Trip id</th>
                            <th>Rider</th>
                            <th>Amount (ETH)</th>
                            <th>Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((value, index) => {
                        return  <tr>
                                    <td className="IDColumn">{value.tripID}</td>
                                    <td>{value.riderUsername}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.driverUsername}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    </Table>
                    </>}
                    {mainError && <InfoAlert isError={mainError} isOpen={mainError} onDismiss={() => {setMainError(false)}}
                                            text="Could not retrieve transactions" />}
                </Card>}
        </>
}