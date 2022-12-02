import axios from "axios";

export async function getTransactionData(){

    const data = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/payments/transactions/24")).data;

    return {
        withdrawsVsPayments: paymentsVsWithdraws(data),

    }

}


function paymentsVsWithdraws(data){

    const totals = {
        payments: 0,
        withdraws: 0
    }

    data.payments.map(value => {
        totals.payments += value.amount
    });

    data.withdraws.map(value => {
        totals.withdraws += value.amount
    })
    totals.payments *= 1000;
    totals.withdraws *= 1000;

    return totals

}