
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
import { useCreateAccountMutation, useCreateMessageMutation, useLogInMutation } from "../hooks/hooks"
import { MessageType } from "../types/types"


export const SignUpPage = () => {


    const [error, setError] = useState<null | string>()
    let loginRef = useRef<HTMLInputElement>(null)
    let passwordRef = useRef<HTMLInputElement>(null)
    let confirmPasswordRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()

    const { mutate : createAccountMutation } = useCreateAccountMutation(() => {queryClient.invalidateQueries(["users"])})
    const { mutate : logInMutation } = useLogInMutation(()=>{queryClient.invalidateQueries(["currentUser"])})
    const { mutate : createMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages"])})
    

    const signUp = async () => {

        const login = loginRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value

        if ( login == "" || password == "" || confirmPassword == "" ) {
            setError("All fields must be provided")
            return
        }

        if ( password != confirmPassword ) {
            setError("Password and confirm password must be the same")
            return
        }

        const user = await getUserByName(login)

        if ( user != null ) { 
            setError("This login is already taken")
            return
        }

        const newUserObject = {
            id : crypto.randomUUID(),
            login : login,
            password : password,
            items : []
        }

        const newMessageObject : MessageType= {
            // @ts-ignore
            id : crypto.randomUUID(),
            ownerID : newUserObject?.id,
            message : "You have created account successfully",
            createdAt : new Date()
        }

        // createAccountMutation
        createAccountMutation({ newUser : newUserObject} )
        // logInMutation
        logInMutation({ newCurrent : { id : newUserObject.id, isLogged : true}})
        // createMessageMutation
        createMessageMutation({newMessage : newMessageObject})


        redirectToPage("/")
    }

    return (
        <>
            <PageTitle title="Sign Up To Crow Shop"/>

            <form onSubmit={(e)=>{
                e.preventDefault()
                signUp()
            }} className="form">
                
                <div className="headerOfForm">
                    Sign Up
                </div>

                <input type="text" placeholder="Login" ref={loginRef} className="inputOfForm" />

                <input type="password" placeholder="Password" ref={passwordRef} className="inputOfForm" />

                <input type="password" placeholder="Confirm Password" ref={confirmPasswordRef} className="inputOfForm" />

                <p className="messageForm">
                    Have got account already? <Link to="/signIn">Click Here</Link>
                </p>

                {error != null ? <p className="errorMessageForm">{error}</p> : ""}

                <button className="formButton">
                    Sign up
                </button>

            </form>

        </>
    )
}