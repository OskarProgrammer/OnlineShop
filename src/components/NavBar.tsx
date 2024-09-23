
// react
import { NavLink } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"

// hooks
import { useCurrentUser } from "../hooks/hooks"

// api
import axios from "axios"


export const NavBar = () => {

    const { data : currentUser } = useCurrentUser()
    
    const queryClient = useQueryClient()

    const currentUserMutation = useMutation({
        mutationFn : async () => await axios.put(`http://localhost:3000/currentUser/`, {id : "", isLogged : false}),
        onSuccess : () => {
            queryClient.invalidateQueries(["currentUser"])
        }
    })

    const logOut = () => {
        currentUserMutation.mutate()
    }

    return (
        <div className="navBar">
            
            {/* left side of nav bar */}
            <div className="leftSide">
                <NavLink to="/" className="navButton">
                    <i className="bi bi-house-door-fill icon"/>
                </NavLink>

                {currentUser?.isLogged ? 
                        <NavLink to="/" className="navButton">
                            {currentUser.login}
                        </NavLink> : ""}
                
            </div>

            {/* right side of nav bar */}
            <div className="rightSide">

                {!currentUser?.isLogged ? 
                        <>
                        
                            <NavLink to="/signIn" className="navButton">
                                Sign in
                            </NavLink>

                            <NavLink to="/signUp" className="navButton">
                                Sign up
                            </NavLink>

                        </> : ""}
                
                {currentUser?.isLogged ? 
                        <>

                            <NavLink to="/" className="navButton">
                                <i className="bi bi-basket icon"/>
                            </NavLink>

                            <button onClick={()=>{ logOut() }} className="navButton">
                                Log out
                            </button>

                        </> : ""}

            </div>
        </div>
    )
}