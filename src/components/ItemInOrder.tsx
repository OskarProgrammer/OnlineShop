
// react 
import { Link } from "react-router-dom"
import { useState } from "react"

// hooks
import { useItemByID } from "../hooks/hooks"

// types
import { CurrentUser, OrderItemType } from "../types/types"

// components
import { NewReviewForm } from "./NewReviewForm"


type Props = {
    itemInfo : OrderItemType,
    currentUser : CurrentUser | undefined
}

export const ItemInOrder = ({itemInfo, currentUser} : Props) => {

    const [isShown, setIsShown] = useState(false)

    const { data : itemData, isLoading : loadingItemData } = useItemByID(itemInfo?.itemID)

    if (loadingItemData){
        return (
            <div className="col-span-1 bg-secondColor text-primaryColor text-center rounded-lg p-5 m-3">
                Loading item info...
            </div>
        )
    }

    return(
        <div className="col-span-1 bg-secondColor text-primaryColor rounded-lg p-5 flex flex-col gap-2 m-3">

            {isShown ? <NewReviewForm onSetIsShown={setIsShown} itemInfo={itemData} currentUser={currentUser}/> : ""}

            <Link to={`/itemDetails/${itemData?.id}`} className="flex flex-col gap-2">
                <p className="font-bold">{itemData?.name}</p>
                
                <p>Price : {itemData.price}</p>
                <p>Amount : {itemInfo.amount}</p>
            </Link>

            <button onClick={()=>{setIsShown(!isShown)}} className="reviewItemBtn">
                Review Item
            </button>

        </div>
    )
}