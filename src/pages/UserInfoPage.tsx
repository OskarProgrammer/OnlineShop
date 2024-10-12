

// hooks
import { useCurrentUser, useItemsOfUser, useOrdersOfUser } from "../hooks/hooks"

// animation
// @ts-ignore 
import ScrollAnimation from 'react-animate-on-scroll'

// types
import { ItemType, OrderType } from "../types/types"

// components
import { ItemTab } from "../components/ItemTab"
import { OrderTab } from "../components/OrderTab"
import { NewItemForm } from "../components/NewItemForm"

// icons
import { IoMdCreate } from "react-icons/io"

// react
import { useState } from "react"


export const UserInfoPage = () => {

    const { data : currentUser, isLoading : currentUserLoading } = useCurrentUser()
    const { data : orders, isLoading : ordersLoading } = useOrdersOfUser(currentUser?.id)
    const { data : items , isLoading : itemsLoading } = useItemsOfUser(currentUser?.id)

    const [ isShown , setIsShown ] = useState<null | boolean>(null)

    if (currentUserLoading || ordersLoading || itemsLoading) {
        return (
            <div className="loadingState">
                Loading user informations...
            </div>
        )
    }

    return (
        <div className=" text-secondColor flex flex-col gap-10 items-center mb-10">

            {isShown ? <NewItemForm onSetIsShown={setIsShown}/> : ""}

            <div className="loadingState py-5 flex flex-col gap-2 font-bold">
                <p>Login : {currentUser?.login}</p>
                <p>Password : {currentUser?.password}</p>
                <p className="text-[20px] font-thin">Identifier : {currentUser?.id}</p>
            </div>

            <div className="items">
                {items?.length != 0 ? <p className="text-[30px]">Your Items : {items?.length}</p> : <p className="text-[30px]">No items to display</p>}
                
                <div className="itemsList">
                    { items?.map( (item : ItemType) => (
                        <ItemTab item={item}/>
                    ))}
                </div>

                <button onClick={()=>{ setIsShown(true) }} className="itemAddButton text-center">
                    <IoMdCreate className="mx-auto"/>
                </button>

            </div>

            <div className="orders">
                {orders?.length != 0 ? <p className="text-[30px]">Your Orders : {orders?.length}</p> : <p className="text-[30px]">No orders to display</p>}
                
                <div className="ordersList">
                    { orders?.map( (order : OrderType) => (
                        <OrderTab key={order.id} order={order} />
                    ))}
                </div>

            </div>
            
        </div>
    )
}