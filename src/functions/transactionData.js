import axios from "axios";

export async function getTransactionData(){

    const data = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/payments/transactions/24")).data;

    return {
        totalByHours: getSumByHour(data),

    }

}


function getSumByHour(data){

    const sums = {};

    data.map(value => {
        const hours = new Date(value.createdAt).getHours();
        if(!sums[hours]){
            sums[hours] = 0;
        }
        sums[hours] += value.amount;
    })

    return Object.keys(sums).map(value => {
        return {
            hour: value + "Hr",
            totalPayments: sums[value] * 1000
        }
    })
}