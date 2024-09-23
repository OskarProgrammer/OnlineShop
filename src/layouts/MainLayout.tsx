import { Outlet } from "react-router"
import { NavBar } from "../components/NavBar"


export const MainLayout = () => {


    return(
        <div className="mainLayout">
            <NavBar/>
            <Outlet/>
        </div>
    )
}