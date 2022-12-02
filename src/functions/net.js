import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import '../config/firebase';

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


export async function search(searchString, context, offset = 0, limit = 10){

    const token = getHeader(context);
    
    const users = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/users/", 
    {headers: token.headers, 
        params: {username_like: searchString,
                offset: offset,
                limit: limit}})).data

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

export async function loadTransactions(context, offset, limit=10) {

    const token = getHeader(context);

    const transactions = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/payments/transactions", {headers: token.headers, params: {offset: offset,limit: limit}})).data

    return transactions;
}

export async function get_rules(context){
    const token = getHeader(context);

    const rules = await (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/pricing/rules", token)).data

    return rules[0];
}

export async function patch_rules(new_rules, context){
    const token = getHeader(context);
    
    const rules_patched = await (await axios.patch("https://g4-fiuber.herokuapp.com/api/v1/pricing/rules/DEFAULT_RULE", new_rules, token)).data;

    return rules_patched;
}

export async function try_rules(rules, context){
    const token = getHeader(context);

    const price = await (await axios.post("https://g4-fiuber.herokuapp.com/api/v1/pricing/rules/trial", rules, token)).data;

    return price;
}

export async function get_balance(context, username){
    const token = getHeader(context);

    const wallet = await (await axios.get(`https://g4-fiuber.herokuapp.com/api/v1/payments/${username}/wallet`, token)).data

    return wallet;
}

export async function get_contract_balance(context){
    const token = getHeader(context);

    const balance = (await axios.get("https://g4-fiuber.herokuapp.com/api/v1/payments/contract/balance", token)).data

    return balance.balance
}

export async function deposit(context, userWallet, amount){
    const token = getHeader(context);

    const data = {
        admin_username: context.userState.userInfo.username,
        amount: parseFloat(amount),
        walletAddress: userWallet
    }

    await axios.post("https://g4-fiuber.herokuapp.com/api/v1/payments/create/deposit", data, token)

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