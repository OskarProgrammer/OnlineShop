

export type CurrentUser = {
    id : string,
    isLogged : boolean,
    login? : string,
    password? : string,
}

export type User = {
    id : string | undefined,
    login : string | undefined,
    password : string | undefined
}

export type MessageType = {
    id : string,
    ownerID : string,
    message : string,
    createdAt : Date
}

export type CreateAccountParams = {
    newUser : User
}

export type CurrentUserParams = {
    newCurrent : {
        id : string,
        isLogged : boolean
    }
}
