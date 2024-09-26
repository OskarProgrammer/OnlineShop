
// react
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useQueryClient } from "react-query"

// components
import { PageTitle } from "../components/PageTitle"

// api
import { getUserByName } from "../api/api"

// utils
import { redirectToPage } from "../utils/utils"
import { MessageType } from "../types/types"
import { useCreateMessageMutation, useLogInMutation } from "../hooks/hooks"



export const SignInPage = () => {

    const [error, setError] = useState<null | string>()
    let loginRef = useRef<HTMLInputElement>(null)
    let passwordRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()

    const { mutate : logInMutation } = useLogInMutation(()=>{queryClient.invalidateQueries(["currentUser"])})
    const { mutate : createMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages"])})

    
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

        // logInMutation
        // @ts-ignore
        logInMutation({ newCurrent : { id : userInfo?.id, isLogged : true}})

        const newMessage : MessageType = {
            id : crypto.randomUUID(),
            // @ts-ignore
            ownerID : userInfo?.id,
            message : "You have been successfully logged in",
            createdAt : new Date()
        }

        // createMessageMutation
        createMessageMutation({newMessage : newMessage })


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