// react 
import { Outlet } from "react-router"

// hooks
import { useCurrentUser } from "../hooks/hooks"

// components
import { NavBar } from "../components/NavBar"
import { MessageContainer } from "../components/MessageContainer"

// utils
import { scrollToPos } from "../utils/utils"


export const MainLayout = () => {

    const { data : currentUser } = useCurrentUser() 

    return(
        <div className="mainLayout">
        
            <div className="title">
                Crow Shop
            </div>
            
            <NavBar/>

            <Outlet/>

            {currentUser?.isLogged ? <MessageContainer currentUserID={currentUser.id} /> : ""}

            <button onClick={()=>{ scrollToPos(0) }} className="btnScrollToTop">
                <i className="bi bi-arrow-up icon"/>
            </button>

        </div>
    )
}