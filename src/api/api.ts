
// api
import axios from "axios"

// types
import { BasketItemType, CurrentUser, ItemType, MessageType, OrderType, ReviewType, User } from "../types/types"

// constants
import { BASE } from "../constants/const"

export const deleteMessageById = async ( messageID : string ) => {
    try {
        await axios.delete(`${BASE}messages/${messageID}`)
    } catch { throw new Error("Error during removing message")}
}

export const getCurrentUser = async () => {

    let currentUser : CurrentUser = await axios.get(`${BASE}currentUser/`).then(res => res.data)

    if (!currentUser.isLogged){
        return currentUser
    }

    let currentUserInfo : User | null = null

    try{
        currentUserInfo = await axios.get(`${BASE}users/${currentUser.id}`).then(res => res.data)
    } catch { throw new Error("Error during fetching data")}

    currentUser = {...currentUser, ...currentUserInfo}

    return currentUser
}

export const getUserById = async (userID : string) => {
    let user : User | null = null

    try {
        user = await axios.get(`${BASE}users/${userID}`).then(res => res.data)
    } catch { throw new Error("Error during fetching data")}

    return user
}

export const getUserByName = async (userName : string | undefined) : Promise<User | null > => {
    let users = null

    if (userName == undefined) { return null }

    try {
        users = await axios.get(`${BASE}users/`).then(res => res.data)
    } catch { throw new Error("Error during fetching data")}

    const user = users?.filter((e : User) => e.login == userName)

    if ( user == undefined) {
        return null
    }

    return user[0]
}

export const getMessagesOfUser = async (userID : string) => {
    const messages = await axios.get(`${BASE}messages/`).then(res => res.data)

    const result = messages.filter( (message : MessageType) => message.ownerID == userID)

    return result
}

export const getBasketOfUser = async (userID : string | undefined) => {

    const basketsItems = await axios.get(`${BASE}basket/`).then(res => res.data)

    const result = basketsItems.filter( (item : BasketItemType) => item.ownerID == userID )

    return result
}

export const getReviewOfItem = async (itemID : string | undefined) => {
    
    const reviews = await axios.get(`${BASE}reviews`).then(res => res.data)

    let result = reviews.filter( (review : ReviewType) => review.itemID == itemID)

    return result
}

export const getOrdersOfUser = async (userID : string | undefined) => {

    // getting all orders
    const orders = await axios.get(`${BASE}orders/`).then( res => res.data)

    // filtring
    const result = orders.filter( (order : OrderType) => order.ownerID == userID )

    return result
}

export const getItemsOfUser = async (userID : string | undefined) => {

    // getting userInfo
    const userInfo = await axios.get(`${BASE}users/${userID}`).then(res=>res.data)

    // getting allItems
    const items = await axios.get(`${BASE}items/`).then(res=>res.data)

    // filtring
    const result = items.filter( (item : ItemType) => userInfo.items.includes(item.id))

    console.log(result)

    return result
}

export const postNewItem = async (newItemObject : ItemType) => {

    try {
        await axios.post(`${BASE}items/`, newItemObject)
    } catch {
        throw new Error("Something went wrong during creating item")
    }

}

export const putItemToUser = async (userID : string, itemID : string) => {

    let user = await axios.get(`${BASE}users/${userID}`).then(res => res.data)

    user.items.push(itemID)

    try { 
        await axios.put(`${BASE}users/${userID}`,user)
    } catch {
        throw new Error("Error during updating user data")
    }

}