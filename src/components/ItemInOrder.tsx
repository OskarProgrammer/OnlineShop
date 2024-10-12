
// react 
import { Link } from "react-router-dom"

// hooks
import { useItemByID } from "../hooks/hooks"

// types
import { OrderItemType } from "../types/types"


type Props = {
    itemInfo : OrderItemType
}

export const ItemInOrder = ({itemInfo} : Props) => {

    const { data : itemData, isLoading : loadingItemData } = useItemByID(itemInfo?.itemID)

    if (loadingItemData){
        return (
            <div className="col-span-1 bg-secondColor text-primaryColor text-center rounded-lg p-5 m-3">
                Loading item info...
            </div>
        )
    }

    return(
        <Link to={`/itemDetails/${itemData?.id}`} className="col-span-1 bg-secondColor text-primaryColor rounded-lg p-5 flex flex-col gap-2 m-3">
            
            <p className="font-bold">{itemData?.name}</p>
            
            <p>Price : {itemData.price}</p>
            <p>Amount : {itemInfo.amount}</p>

        </Link>
    )
}