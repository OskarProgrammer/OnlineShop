import { useParams } from "react-router"
import { useCurrentUser, useOrderByID } from "../hooks/hooks"
import { OrderItemType } from "../types/types"
import { ItemInOrder } from "../components/ItemInOrder"


export const OrderDetails = () => {

    const { orderID } = useParams()
    const { data : orderInfo , isLoading : orderLoading } = useOrderByID( orderID )
    const { data : currentUserInfo, isLoading : userLoading } = useCurrentUser()

    if (orderLoading || userLoading){
        return(
            <div className="text-secondColor text-[20px] text-center w-6/12 mx-auto">
                Loading order...
            </div>
        )
    }

    if (currentUserInfo?.id != orderInfo.ownerID){
        return(
            <div className="text-secondColor text-[20px] text-center w-6/12 mx-auto">
                You haven't got access to that order
            </div>
        )
    }

    return (
        <div className="orderInfoTab mb-10">
            
            {/* title */}
            <p className="col-span-full">{orderInfo.name}</p>

            {/* price */}
            <p className="xl:md:col-span-1 col-span-full bg-primaryColor text-secondColor rounded-lg p-3 m-3 font-bold">Price : {orderInfo.finalPrice}</p>
            
            {/* method */}
            <p className="xl:md:col-span-1 col-span-full bg-primaryColor text-secondColor rounded-lg p-3 m-3 font-bold">Method : {orderInfo.method}</p>

            {/* status */}
            <p className="col-span-full bg-primaryColor text-secondColor rounded-lg p-3 m-3 font-bold">{orderInfo.status}</p>

            {/* list of items */}
            <div className="col-span-full bg-primaryColor text-secondColor m-3 p-3 rounded-lg flex flex-col gap-5">
                <p>Items in order: </p>

                <div className="grid xl:lg:grid-cols-2 grid-cols-1">
                    {orderInfo.itemsToPay?.map(( item : OrderItemType ) => (
                        <ItemInOrder key={item.id} itemInfo={item} currentUser={currentUserInfo}/>
                    ))}
                </div>

            </div>

        </div>
    )
}