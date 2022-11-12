import * as Firestore from "firebase/firestore";
import { db } from "../config/firebase";

const hours = new Date(60 * 60 * 1000);

export async function getLast24HoursFrom(collectionName, base){
    let collection = Firestore.collection(db, "/" + collectionName);
    const paths = getDocuments();

    const references = paths.map(path => {
        return Firestore.doc(collection, path);
    });

    const data = await references.map(async reference => {
        const document = await Firestore.getDoc(reference);
        if (document.exists()){
            return await document.data();
        }

        return base;
    });
    
    return await Promise.all(data.map(async (value, index) => {
        const data_values = await value;
        data_values.time = paths[index].split("-").pop();
        return data_values;
    }))
}

function getDocuments(){
    let now = new Date();

    let docs = []

    for (let i = 0; i < 24; i++){
        docs.push(new Date(now));
        now -= hours;
    }
    
    return docs.map(value => {
        return getPath(value.toUTCString().split(' '))
    });
}

function getPath(array){
    const hour = getHour(array[4]);
    const id = getTime(array.slice(0, 4));

    return id + '-' + hour + 'hr';
}

function getTime(time){
    const [day, number, month, year] = time;

    return getId(day, number, month, year);
}

function getHour(time){
    return time.split(':')[0];
}

function getId(day, number, month, year){
    return day.slice(0, 3) + '-' + number + '-' + month + '-' + year
}