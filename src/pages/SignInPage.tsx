
// react
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"

// components
import { PageTitle } from "../components/PageTitle"

// api
import { getUserByName } from "../api/api"
import axios from "axios"

// utils
import { redirectToPage } from "../utils/utils"
import { MessageType } from "../types/types"



export const SignInPage = () => {

    type CurrentUserParams = {
        newCurrent : {
            id : string | undefined,
            isLogged : boolean
        }
    }

    const [error, setError] = useState<null | string>()
    let loginRef = useRef<HTMLInputElement>(null)
    let passwordRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()

    const currentUserMutation = useMutation({
        mutationFn : async ({ newCurrent } : CurrentUserParams) => await axios.put(`http://localhost:3000/currentUser/`, newCurrent),
        onSuccess : () => {
            queryClient.invalidateQueries(["currentUser"])
        }
    })

    const currentUserMessagesMutation = useMutation({
        mutationFn : ({newMessage} : {newMessage : { 
            newMessage : {id: string, 
            ownerID : string | undefined, 
            message : string, 
            createdAt: Date
        }}}) => axios.post(`http://localhost:3000/messages/`, newMessage)
    })

    
    const signIn = async () => {

        const login = loginRef.current?.value
        const password = passwordRef.current?.value

        if (login == "" || password == "") {
            setError("All fields must be provided")
            return
        }

        const userInfo = await getUserByName(login)


        if ( userInfo?.login != login  || userInfo?.password != password ) {
            setError("Invalid login or password")
            return
        }

        const newCurrentUser = {
            id : userInfo?.id,
            isLogged : true
        }

        currentUserMutation.mutate({ newCurrent : newCurrentUser})


        type newMessageType = {
            id : string,
            ownerID : string | undefined,
            message : string,
            createdAt : Date
        }

        const newMessage : {newMessage : newMessageType } = {
            id : crypto.randomUUID(),
            ownerID : newCurrentUser?.id,
            message : "You have been successfully logged in",
            createdAt : new Date()
        }

        currentUserMessagesMutation.mutate({
            newMessage : newMessage }, {
                onSuccess : () => {
                    queryClient.invalidateQueries(["messages", newCurrentUser.id])
                }
            })


        redirectToPage("/")
    }

    return (
        <>
            <PageTitle title="Sign In To Crow Shop"/>

            <form onSubmit={(e)=>{
                e.preventDefault()
                signIn()
            }} className="form">
                
                <div className="headerOfForm">
                    Sign In
                </div>

                <input type="text" placeholder="Login" ref={loginRef} className="inputOfForm" />

                <input type="password" placeholder="Password" ref={passwordRef} className="inputOfForm" />

                <p className="messageForm">
                    Haven't got account yet? <Link to="/signUp">Click Here</Link>
                </p>

                {error != null ? <p className="errorMessageForm">{error}</p> : ""}

                <button className="formButton">
                    Sign in
                </button>

            </form>

        </>
    )
}