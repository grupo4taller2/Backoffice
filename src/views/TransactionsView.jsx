import React from "react";
import { Card, Table } from "reactstrap";
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

    const context = useUserContext();

    const getTransactions = async () => {

        try{
            const data = await loadTransactions(context, offset);
            setTransactions(data)
            console.log(data)
        }catch{
            //Nada
        }

        setTransactionsLoad(false);
        setPagLoading(false);
    }

    const advance = () => {
        setTransactionsLoad(true);
        setOffset(offset + 10);
        getTransactions();
    }

    const goBack = () => {
        setTransactionsLoad(true);
        setOffset(offset - 10);
        getTransactions();
    }

    React.useEffect(() => {getTransactions()}, [])

    return <>
            <Menu transactions={true} />
            {transactionsLoad ? 
                <LoadingScreen /> 
                :
                <Card className="ResultsBoxTransactions">
                    <div className="PagRowTransactions">

                    <StatusButton  className="TransactionsPagBtn" loadingText="" onPress={offset > 0 | pagLoading ? goBack: () => {}} color={offset > 0 | pagLoading ? "dark": null} text={offset > 0 | pagLoading ? "<<": ""}/>
                    
                    <StatusButton  className="TransactionsPagBtn"  loadingText="" onPress={transactions.length > 9 ? advance : () => {}}  color={transactions.length > 9 ? "dark" : null} text={transactions.length > 9 ? ">>" : ""} />            
                    </div>
                    <Table className="TableDiv" bordered striped>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Rider</th>
                            <th>Amount (ETH)</th>
                            <th>Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((value, index) => {
                        return  <tr>
                                    <td scope="row">{index + offset + 1}</td>
                                    <td>{value.riderUsername}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.driverUsername}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    </Table>
                    
                </Card>}
        </>
}