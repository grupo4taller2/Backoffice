import * as Firestore from "firebase/firestore";
import { db } from "../config/firebase";

const hours = 60 * 60 * 1000;

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

    const finalData = await Promise.all(data);
    const values = finalData.map((value, index) => {
        const time = paths[index].split('-').pop();
        
        return {value: value, time: time};
    });
    
    return values; 
    
    
}

function getDocuments(){
    let now = new Date().getTime() - 24 * hours;
    
    let docs = []

    for (let i = 0; i < 24; i++){
        docs.push(new Date(now));
        now += hours;
    }
    
    return docs.map(value => {
        const time = value.toUTCString().split(' ');
        
        return getPath(time)
    });
}

function getPath(array){
    const hour = getHour(array[4]);
    const id = getTime(array.slice(0, 4));
    const path = id + '-' + hour + 'hr'; 
    
    return path;
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