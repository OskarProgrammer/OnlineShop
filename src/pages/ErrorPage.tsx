import { Link, useRouteError } from "react-router-dom"
import { PageTitle } from "../components/PageTitle"

export const ErrorPage = () => {

    const error : any = useRouteError()

    return (
        <div className="errorPage">
            <PageTitle title={`Error`} />
            
            <p>Ops there was an error!</p>

            <p className="text-[25px]">Message : {error.message}</p>

            <i className="bi bi-bug-fill text-[100px] bug"/>

            <Link to="/" className="linkTag" >Home page</Link>
        </div>
    )
}