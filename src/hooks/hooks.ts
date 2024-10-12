
// react
import { useMutation, useQuery } from "react-query";

// api
import { deleteMessageById, getBasketOfUser, getCurrentUser, getItemsOfUser, getMessagesOfUser, getOrdersOfUser, getReviewOfItem, getUserById, getUserByName, postNewItem, putItemToUser } from "../api/api"
import axios from "axios";

// types
import { BasketItemType, CreateAccountParams, CurrentUserParams, ItemType, MessageType } from "../types/types";

// utils
import { recoverAmount } from "../utils/utils";

// queries

// users
export const useCurrentUser = () => useQuery({
    queryFn : () => getCurrentUser(),
    queryKey : ["currentUser"]
}) 

export const useUserByID = ( userID : string) => useQuery({
    queryFn : ({queryKey}) => getUserById(queryKey[1]),
    queryKey : ["user", userID]
})

export const useUserByName = ( userName : string | undefined) => useQuery({
    queryFn : ({queryKey}) => getUserByName(queryKey[1]),
    queryKey : ["user", userName]
})

// messages

export const useMessagesOfUser = (userID : string) => useQuery({
    queryFn : async ({queryKey}) => await getMessagesOfUser(queryKey[1]),
    queryKey : ["messages" , userID]
})


// items
export const useItems = () => useQuery({
    queryFn : async () => await axios.get(`http://localhost:3000/items/`).then(res => res.data),
    queryKey : ["items"]
})

export const useItemByID = ( itemID : string | undefined) => useQuery({
    queryFn : async ({queryKey}) => await axios.get(`http://localhost:3000/items/${queryKey[1]}`).then(res => res.data),
    queryKey : ["items", itemID]
}) 

export const useItemsOfUser = ( userID : string | undefined ) => useQuery({
    queryFn : async ({queryKey}) => await getItemsOfUser(queryKey[1]),
    queryKey : ["items", userID]
})


// basket 
export const useBasketOfUser = ( userID : string | undefined) => useQuery({
    queryFn : async ({queryKey}) => await getBasketOfUser(queryKey[1]),
    queryKey : ["baskets", userID]
})

// reviews
export const useReviewsOfItem = ( itemID : string | undefined) => useQuery({
    queryFn : async ({queryKey}) => await getReviewOfItem(queryKey[1]),
    queryKey : ["reviews", itemID]
})


// orders
export const useOrdersOfUser = ( userID : string | undefined) => useQuery({
    queryFn : async ({queryKey}) => await getOrdersOfUser(queryKey[1]),
    queryKey : ["orders", userID] 
})

export const useOrderByID = ( orderID : string | undefined ) => useQuery({
    queryFn : async ({queryKey}) => await axios.get(`http://localhost:3000/orders/${queryKey[1]}`).then(res => res.data),
    queryKey : ["order", orderID]
})

// mutations 

// messages
export const useCreateMessageMutation = ( onSuccess : Function) => useMutation({
    mutationFn : async ({newMessage} : {newMessage : MessageType}) => await axios.post(`http://localhost:3000/messages/`,newMessage),
    onSuccess : () => { onSuccess() }
})

export const useRemoveMessageMutation = ( onSuccess : Function) => useMutation({
    mutationFn : ( { messageID : messageID } : { messageID : string }) => deleteMessageById(messageID) ,
    onSuccess : () => { onSuccess() }
})

// orders

export const useCreateOrderMutation = ( onSuccess : Function) => useMutation({
    mutationFn : async ({newOrder} : {newOrder : any}) => await axios.post(`http://localhost:3000/orders/`, newOrder),
    onSuccess : () => { onSuccess() }
})

// basket

export const useRemoveItemFromBasketMutation = ( onSuccess : Function ) =>useMutation({
    mutationFn : async ({itemID} : {itemID : string}) => await axios.delete(`http://localhost:3000/basket/${itemID}`),
    onSuccess : () => { onSuccess() }
})

export const useAddItemToBasketMutation = ( onSuccess : Function ) => useMutation({
    mutationFn : async ({newItem} : {newItem : BasketItemType}) => await axios.post(`http://localhost:3000/basket/`, newItem),
    onSuccess : () => { onSuccess() }
})

// items

export const useRecoverAmountMutation = ( onSuccess : Function ) =>useMutation({
    mutationFn : async ({itemID, amount} : {itemID : string | undefined , amount : number}) => recoverAmount(itemID , amount),
    onSuccess : () => { onSuccess() }
})

export const useUpdateItemInfoMutation = ( onSuccess : Function ) => useMutation({
    mutationFn : async ({newItemValue} : {newItemValue : ItemType}) => await axios.put(`http://localhost:3000/items/${newItemValue.id}`, newItemValue),
    onSuccess : () => { onSuccess() }
})

export const useCreateNewItemMutation = ( onSuccess : Function ) => useMutation({
    mutationFn : async ({newItem} : {newItem : ItemType}) => await postNewItem(newItem),
    onSuccess : () => { onSuccess() }
})

// user

export const useLogOutMutation = ( onSuccess : Function) => useMutation({
    mutationFn : async () => await axios.put(`http://localhost:3000/currentUser/`, {id : "", isLogged : false}),
    onSuccess : () => { onSuccess() }
})

export const useCreateAccountMutation = ( onSuccess : Function ) =>useMutation({
    mutationFn : async ({newUser} : CreateAccountParams) => await axios.post(`http://localhost:3000/users/`,newUser),
    onSuccess : () => { onSuccess() }
})

export const useLogInMutation = ( onSuccess : Function ) => useMutation({
    mutationFn : async ({newCurrent} : CurrentUserParams) => await axios.put(`http://localhost:3000/currentUser/`,newCurrent),
    onSuccess : () => { onSuccess() }
})

export const useAddItemToUserMutation = ( onSuccess : Function) => useMutation({
    mutationFn : async ({ userID , itemID } : { userID : string , itemID : string }) => await putItemToUser( userID , itemID ),
    onSuccess : ()=>{
        onSuccess()
    }
})




