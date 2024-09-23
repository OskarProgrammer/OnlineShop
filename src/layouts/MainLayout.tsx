// react 
import { Outlet } from "react-router"

// hooks
import { useCurrentUser } from "../hooks/hooks"

// components
import { NavBar } from "../components/NavBar"
import { MessageContainer } from "../components/MessageContainer"


export const MainLayout = () => {

    const { data : currentUser } = useCurrentUser() 

    return(
        <div className="mainLayout">
            <NavBar/>

            <Outlet/>

            {currentUser?.isLogged ? <MessageContainer currentUserID={currentUser.id} /> : ""}

        </div>
    )
}