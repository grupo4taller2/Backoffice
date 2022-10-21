import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import '../config/firebase'


export async function login(username, password){
    /*
        Should call to firebase to login. 
        Then it should call the context
    */
   const auth = getAuth();
   return await signInWithEmailAndPassword(auth, username, password)
}