

// hooks
import { useCurrentUser, useOrdersOfUser } from "../hooks/hooks"

// animation
// @ts-ignore 
import ScrollAnimation from 'react-animate-on-scroll'


export const UserInfoPage = () => {

    const { data : currentUser, isLoading : currentUserLoading } = useCurrentUser()
    const { data : orders, isLoading : ordersLoading } = useOrdersOfUser(currentUser?.id)

    if (currentUserLoading || ordersLoading) {
        return (
            <div className="loadingState">
                Loading user informations...
            </div>
        )
    }

    return (
        <div className=" text-secondColor flex flex-col gap-10 items-center mb-10">
            <div className="loadingState py-5 flex flex-col gap-2 font-bold">
                <p>Login : {currentUser?.login}</p>
                <p>Password : {currentUser?.password}</p>
                <p className="text-[20px] font-thin">Identifier : {currentUser?.id}</p>
            </div>
            <div className="orders">
                {orders?.length != 0 ? <p className="text-[30px]">Your Orders : {orders?.length}</p> : <p className="text-[30px]">No orders to display</p>}
                
                <div className="ordersList">
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                    <p className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor">s</p>
                </div>

            </div>
        </div>
    )
}