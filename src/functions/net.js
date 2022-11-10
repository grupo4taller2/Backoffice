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
   
   const token = getHeaderFromCredential(credentials);
   
   const username = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/admins/" + mail, token)).data
   
   return {credential: credentials, userInfo: username};
}

export async function registerAdmin(newAdmin, context){
    
    const token = getHeader(context);

    try{
        await axios.post("https://g4-fiuber.herokuapp.com/api/v1/admins", {username: newAdmin}, token);
        
    }catch (error){
        console.log(error)
    }


}


export async function search(searchString, context){

    const token = getHeader(context);
    
    const users = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/users/search", {headers: token.headers, params: {like: searchString}})).data

    const result = users.map(async value => {
        try{
            await axios.get("https://g4-fiuber.herokuapp.com/api/v1/admins/" + value.username, token)
            value.admin = true;
        }catch (error){
            console.log(error);
            value.admin = false;
        }

        return value;
    });

    return await Promise.all(result)

}

function getHeader(context){
    return context.userState.user ? getToken(context.userState.user.stsTokenManager.accessToken) : null;
}

function getHeaderFromCredential(credential){
    return credential ? getToken(credential.user.stsTokenManager.accessToken) : null;
}

function getToken(accessToken){
    return {headers: {'Authorization': `bearer ${accessToken}`}}
    
}