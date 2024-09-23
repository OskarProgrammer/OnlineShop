
// react
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"

// components
import { PageTitle } from "../components/PageTitle"

// api
import axios from "axios"
import { getUserByName } from "../api/api"

// types
import { CreateAccountParams, CurrentUserParams } from "../types/types"

// utils
import { redirectToPage } from "../utils/utils"


export const SignUpPage = () => {


    const [error, setError] = useState<null | string>()
    let loginRef = useRef<HTMLInputElement>(null)
    let passwordRef = useRef<HTMLInputElement>(null)
    let confirmPasswordRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()
    
    const createAccountMutation = useMutation({
        mutationFn : async ({newUser} : CreateAccountParams) => await axios.post(`http://localhost:3000/users/`,newUser),
        onSuccess : () => {
            queryClient.invalidateQueries(["users"])
        }
    })

    const currentUserMutation = useMutation({
        mutationFn : async ({newCurrent} : CurrentUserParams) => await axios.put(`http://localhost:3000/currentUser/`,newCurrent),
        onSuccess : () => {
            queryClient.invalidateQueries(["currentUser"])
        }
    })

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
            password : password
        }

        createAccountMutation.mutate({ newUser : newUserObject} )
        currentUserMutation.mutate({ newCurrent : { id : newUserObject.id, isLogged : true}})

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