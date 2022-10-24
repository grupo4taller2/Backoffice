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
   const result = await axios.get('https://g4-fiuber.herokuapp.com/api/v1/admins/juancitoperez', {headers: {Authorization: `bearer ${await credentials.user.getIdToken()}`}});
   console.log(result)
   return credentials;
}