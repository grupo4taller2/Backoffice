import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import '../config/firebase'


export async function login(username, password){
    /*
        Should call to firebase to login. 
        Then it should call the context
    */
   const auth = getAuth();
   const credentials = await signInWithEmailAndPassword(auth, username, password).catch(reason => console.log(reason));
   console.log(credentials);
   //const result = await axios.get('http://g4-fiuber.herokuapp.com/api/v1/admins/juancitoperez', {headers: {Authorization: `bearer ${await credentials.user.getIdToken()}`}});
   //const result = await axios.post('https://g4-fiuber.herokuapp.com/api/v1/admins', undefined, 
   //{headers: {"access-control-allow-origin": "*", Authorization: `bearer ${await credentials.user.getIdToken()}`}, data: {username: "Juancitoperez"}});
   //console.log(result)
   return credentials;
}