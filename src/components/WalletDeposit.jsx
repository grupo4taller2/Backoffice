import React from "react";
import { Badge, Button, CloseButton, Input, Modal, ModalHeader } from "reactstrap";
import { useUserContext } from "../config/ctx";
import { deposit, get_balance, get_contract_balance } from "../functions/net";
import "../style/userCard.css"
import LabeledInput from "./LabeledInput";
import StatusButton from "./StatusButton";


export default function WalletDeposit(props){

    const context = useUserContext();

    const [walletAddress, setAddress] = React.useState('')
    const [balance, setBalance] = React.useState('')
    const [maxDeposit, setMaxDeposit] = React.useState('')
    const [depositAmount, setDepositAmount] = React.useState('0');

    const [toggled, setToggled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [onConfirmation, setConfirmation] = React.useState(false);

    const toggle = () => {
        setToggled(!toggled)
    }

    const changeConfirmation = () => {
        setConfirmation(!onConfirmation)
    }

    const loadTotalBalance = async () => {
        try{    
            const balance = await get_contract_balance(context);

            setMaxDeposit(balance);
        }catch{
            setMaxDeposit("Could not load max deposit amount")
        }
    }

    const loadBalance = async () => {
        try{
            const wallet = await get_balance(context, props.username);

            setAddress(wallet.walletAddres);
            setBalance(wallet.balance);
        }catch{
            setAddress("Not found")
            setBalance("Could not retrieve balance")
        }
    }

    const dismissError = () => {
        setError(false)
    }

    const confirmDeposit = async () => {
        setLoading(true);
        try{
            await deposit(context, walletAddress, depositAmount);
            await loadBalance();
            await loadTotalBalance();
        }catch{
            setError(true);
        }
        setLoading(false);
        setConfirmation(false);
    }

    React.useEffect(() => {
        loadBalance();
        loadTotalBalance()
    }, [])

    return <>
                <Button onClick={toggle} className="WalletTag" color="success">Wallet</Button>
                <Modal className="UserCardSurface" isOpen={toggled} toggle={toggle}>
                    <div className="CloseButtonDiv">
                        <CloseButton onClick={toggle}/>
                    </div>
                    <div className="ModHeadDiv">
                        <ModalHeader>
                            User: {props.username}
                        </ModalHeader>
                        <Badge className="BalanceBadge" color="primary" pill> Balance: {balance} ETH </Badge>
                    </div>
                    <Badge color="dark" className="AddressBadge"> Address: {walletAddress} </Badge>
                    <Badge color="dark" className="AddressBadge">Max deposit amount: {maxDeposit} ETH</Badge>
                    {error ? 
                    <>
                    <p className="ErrorTextMessage">Could not deposit: {depositAmount} to user</p>
                    <Button className="Dismiss" color="danger" onClick={dismissError}>Ok</Button>
                    </>
                    : 
                    null}
                    <div className="DepositDiv">
                        <StatusButton loading={loading} loadingText="" className="DepositButton" onPress={changeConfirmation} color={onConfirmation ? "danger" : "primary"} outline text={onConfirmation ? "Cancel" : "Deposit"} />
                        <LabeledInput onChange={setDepositAmount} inputClass="DepositInput" name="Amount" notNamed/>
                        {onConfirmation ? <StatusButton onPress={confirmDeposit} loadingText="" loading={loading} className="ConfirmationButton" color="success" outline text="Confirm"/> : null}
                    </div>
                </Modal>
            </>;

}