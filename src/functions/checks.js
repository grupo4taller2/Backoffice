const NAMECHECK = /[A-Za-z | ' ']{1,15}/
const USERNAMECHECK = /\w{1,15}/
const EMAILCHECK = /\w{1,15}@\w{1,10}.com/

export function checkValidUsername(username){

    return checkMatches(username, USERNAMECHECK);
}

export function checkValidMail(mail){
    return checkMatches(mail, EMAILCHECK);
}

export function checkValidPassword(password){

    return checkMatches(password, USERNAMECHECK);
}


export function checkValidName(name){
    return checkMatches(name, NAMECHECK);
}

function checkMatches(toMatch, pattern){
    const matched = toMatch.match(pattern)

    if (!matched){
        return false;
    }
    
    return matched[0] === toMatch;
}

