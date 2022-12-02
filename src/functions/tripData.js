import axios from "axios";

export async function getTripData(){

    const minutes = 90000;

    const data = await (await axios.get(`https://g4-fiuber.herokuapp.com/api/v1/metrics/trips/${minutes}`)).data

    const frequencys = {};

    data.map(value => {
        const km = parseInt((parseInt(value.distance) / 1000).toString().split('.').at(0))
        if (!frequencys[km]){
            frequencys[km] = 0;
        }
        frequencys[km]++;

    }).sort();
    
    const count = Object.keys(frequencys).length;
    const processed = Object.keys(frequencys).map((value, index) => {
        return {
            length: value,

            value: (frequencys[value] / (count)) * 100
        };
    })
    
    return {
        byDistance: processed,
        driverTripsFreq: driverByTrips(data)
    }
}

function driverByTrips(data){

    const processed = {};

    data.map((value) => {

        if (!processed[value.driver_username]){
            processed[value.driver_username] = 0;
        }

        processed[value.driver_username]++;
    });

    const trips = Object.values(processed);

    const frequency = {};

    trips.map((value) => {
        if (!frequency[value]){
            frequency[value] = 0;
        }

        frequency[value]++;
    })

    return frequency
}