
// react
import { NavLink } from "react-router-dom"
import { useQueryClient } from "react-query"

// hooks
import { useBasketOfUser, useCurrentUser, useLogOutMutation } from "../hooks/hooks"

// utils
import { redirectToPage } from "../utils/utils"


export const NavBar = () => {
    
    const queryClient = useQueryClient()

    const { data : currentUser } = useCurrentUser()
    const { data : basket } = useBasketOfUser(currentUser?.id)
    
    const { mutate : logOutMutation } = useLogOutMutation(()=>{queryClient.invalidateQueries(["currentUser"])})
    
    const logOut = () => {
        logOutMutation()
        redirectToPage("/")
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

                            <NavLink to="/basket" className="navButton">
                                <i className="bi bi-basket icon"/>
                                { basket?.length != 0 ? <p className="basketCounter">{basket?.length}</p> : ""}
                            </NavLink>

                            <button onClick={()=>{ logOut() }} className="navButton">
                                Log out
                            </button>

                        </> : ""}

            </div>
        </div>
    )
}