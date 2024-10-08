
// react router
import { Link } from "react-router-dom"

// types
import { OrderType } from "../types/types"


type Props = {
    order : OrderType
}

export const OrderTab = ({order} : Props) => {

    return (
        <Link to={`/orders/${order.id}`} className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor flex flex-col gap-4">
            <p className="font-bold text-[20px]">{order.name}</p>
            <p>Status : {order.status}</p>
            <p>Price : {order.finalPrice}</p>
        </Link>
    )
}