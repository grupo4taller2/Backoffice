import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import '../config/firebase'


export async function login(mail, password){
    /*
        Should call to firebase to login. 
        Then it should call the context
    */
   const auth = getAuth();
   const credentials = await signInWithEmailAndPassword(auth, mail, password).catch(reason => console.log(reason));
   
   const username = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/admins/" + mail)).data
   
   //const result = await axios.post('https://g4-fiuber.herokuapp.com/api/v1/admins', undefined, 
   //{headers: {"access-control-allow-origin": "*", Authorization: `bearer ${await credentials.user.getIdToken()}`}, data: {username: "Juancitoperez"}});
   
   return credentials;
}