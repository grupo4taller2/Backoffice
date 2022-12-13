import axios from "axios";
import { DriverTripMockedData, MOCKING, RiderTripMockedData, TripDistanceMockedData } from "../config/demoData";
import { getHeader } from "./net";

export async function getTripData(context){

    const minutes = 90000;

    const token = getHeader(context);

    const data = await (await axios.get(`https://g4-fiuber.herokuapp.com/api/v1/metrics/trips/${minutes}`, token)).data

    const frequencys = {
        "<5": 0,
        "<10": 0,
        ">10": 0
    };

    data.map(value => {
        const km = parseInt((parseInt(value.distance) / 1000).toString().split('.').at(0))
        if (km < 5){
            frequencys["<5"]++;
        }
        if (km >= 5 && km < 10){
            frequencys["<10"]++;
        }
        else {
            frequencys[">10"]++;
        }

    }).sort();
    
    const count = Object.keys(frequencys).length;
    const processed = Object.keys(frequencys).map((value, index) => {
        return {
            length: value,

            value: frequencys[value]
        };
    })
    
    return {
        byDistance: MOCKING ? TripDistanceMockedData : processed,
        driverTripsFreq: MOCKING ? DriverTripMockedData : driverByTrips(data),
        userTripFreq: MOCKING ? RiderTripMockedData : userFrequency(data)
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

    const frequency = {
        "<3": 0,
        "<9": 0,
        ">9": 0
    };
    
    trips.map((value) => {
        
        if (value < 3){
            
            frequency["<3"]++;
            return
        }
        if (value < 9){
            frequency["<9"]++;
            
        }else{
            frequency[">9"]++;
        }

    })

    return Object.keys(frequency).map(value => {
        return {
            drivers: frequency[value],
            trips: value
        }
    })
}

function priceDistribution(data){

    const prices = data.map(value => {
        return parseFloat(value.estimated_price)
    }).sort()

    const count = prices.length;

    

    return prices.map((value, index) => {
        return {value: parseFloat((value * 1000).toString().slice(0, 4)),

                quantile: (index + 1) / count}
    })
}   

function userFrequency(data){

    const processed = {};

    data.map((value) => {

        if (!processed[value.user_username]){
            processed[value.user_username] = 0;
        }

        processed[value.user_username]++;
    });
    
    const trips = Object.values(processed);

    const frequency = {
        "<3": 0,
        "<9": 0,
        ">9": 0
    };
    
    trips.map((value) => {
        
        if (value < 3){
            
            frequency["<3"]++;
            return
        }
        if (value < 9){
            frequency["<9"]++;
            
        }else{
            frequency[">9"]++;
        }

    })

    return Object.keys(frequency).map(value => {
        return {
            users: frequency[value],
            trips: value
        }
    })
}