import React from 'react';
import { getMyInfo } from '../functions/net';

export const UserContext = React.createContext();

export function useUserContext(){
    const context = React.useContext(UserContext);

    if(! context){
        throw new Error("Error: hay que estar adentro del proveedor");
    }

    return context;
}

export const initialState = () => {

    const initial = {

        token: null,

        user: null,

    };

    return initial;

};

export const completeSignIn = (response, state, setState) => {

    updateToken(response, state);
    updateUser(response, state);

    setState(state);

}

const updateToken = (response, state) => {

    state.token = response.credential._tokenResponse;
}

const updateUser = (response, state) => {

    //Aca tengo que llamar al back y obtener la info del administrador
    
    state.user = response.credential.user;
    state.userInfo = response.userInfo;

}