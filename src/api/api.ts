
// api
import axios from "axios"

// types
import { BasketItem, CurrentUser, MessageType, User } from "../types/types"



export const deleteMessageById = async ({messageID} : { messageID : string }) => {
    try {
        await axios.delete(`http://localhost:3000/messages/${messageID}`)
    } catch { throw new Error("Error during removing message")}
}

export const getCurrentUser = async () => {

    let currentUser : CurrentUser = await axios.get(`http://localhost:3000/currentUser/`).then(res => res.data)

    if (!currentUser.isLogged){
        return currentUser
    }

    let currentUserInfo : User | null = null

    try{
        currentUserInfo = await axios.get(`http://localhost:3000/users/${currentUser.id}`).then(res => res.data)
    } catch { throw new Error("Error during fetching data")}

    currentUser = {...currentUser, ...currentUserInfo}

    return currentUser
}

export const getUserById = async (userID : string) => {
    let user : User | null = null

    try {
        user = await axios.get(`http://localhost:3000/users/${userID}`).then(res => res.data)
    } catch { throw new Error("Error during fetching data")}

    return user
}

export const getUserByName = async (userName : string | undefined) : Promise<User | null > => {
    let users = null

    if (userName == undefined) { return null }

    try {
        users = await axios.get(`http://localhost:3000/users/`).then(res => res.data)
    } catch { throw new Error("Error during fetching data")}

    const user = users?.filter((e : User) => e.login == userName)

    if ( user == undefined) {
        return null
    }

    return user[0]
}

export const getMessagesOfUser = async (userID : string) => {
    const messages = await axios.get(`http://localhost:3000/messages/`).then(res => res.data)

    const result = messages.filter( (message : MessageType) => message.ownerID == userID)

    return result
}

export const getBasketOfUser = async (userID : string | undefined) => {

    const basketsItems = await axios.get(`http://localhost:3000/basket/`).then(res => res.data)

    const result = basketsItems.filter( (item : BasketItem) => item.ownerID == userID )

    return result
}
