
// react
import { useQuery } from "react-query";

// api
import { getCurrentUser, getMessagesOfUser, getUserById, getUserByName } from "../api/api"

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
