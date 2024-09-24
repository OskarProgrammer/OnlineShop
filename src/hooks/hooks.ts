
// react
import { useQuery } from "react-query";

// api
import { getBasketOfUser, getCurrentUser, getMessagesOfUser, getUserById, getUserByName } from "../api/api"
import axios from "axios";

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

export const useMessagesOfUser = (userID : string) => useQuery({
    queryFn : async ({queryKey}) => await getMessagesOfUser(queryKey[1]),
    queryKey : ["messages" , userID]
})

export const useItems = () => useQuery({
    queryFn : async () => await axios.get(`http://localhost:3000/items/`).then(res => res.data),
    queryKey : ["items"]
})

export const useItemByID = ( itemID : string | undefined) => useQuery({
    queryFn : async ({queryKey}) => await axios.get(`http://localhost:3000/items/${queryKey[1]}`).then(res => res.data),
    queryKey : ["items", itemID]
}) 

export const useBasketOfUser = ( userID : string | undefined) => useQuery({
    queryFn : async ({queryKey}) => await getBasketOfUser(queryKey[1]),
    queryKey : ["baskets", userID]
})
