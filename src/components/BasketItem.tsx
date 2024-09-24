import { useItemByID } from "../hooks/hooks"
import { BasketItemType } from "../types/types"

type Props = {
    itemInfo : BasketItemType,
    paymentList : any[],
    onAddToPaymentList : Function
}

export const BasketItem = ( { itemInfo, paymentList, onAddToPaymentList } : Props) => {

    const { data : itemDetails, isLoading } = useItemByID(itemInfo.itemID)

    const active = paymentList.some((e:any) => e.id == itemInfo.id)

    return (
        <div className={`basketItem ${active ? "activeItem" : ""}`}>
            
            <div className="basketItemCheck">
                {/* @ts-ignore */}
                <input type="checkbox" onChange={(e)=> { onAddToPaymentList(itemInfo, parseInt(itemInfo?.amount) * parseInt(itemDetails.price), e.target.checked) }} className="checkBoxBasketItem"/>
            </div>

            <div className="basketItemInfo">

                {isLoading ? "Loading details of item" : ""}

                <div className="basketItemDetailsInfo">
                    <p className="font-bold">Details informations</p>
                    <p>Name : {itemDetails?.name}</p>
                </div>

                <div className="basketItemPriceInfo">
                    <p className="font-bold">Price Informations</p>
                    <p>Price for one piece : {itemDetails?.price}</p>
                    <p>Amount you added : {itemInfo?.amount} </p>

                    {/* @ts-ignore */}
                    <p>Sum price : {parseInt(itemInfo?.amount) * parseInt(itemDetails?.price)} </p>

                    {/* @ts-ignore */}
                    <input type="checkbox" onChange={(e)=> { onAddToPaymentList(itemInfo, parseInt(itemInfo?.amount) * parseInt(itemDetails.price), e.target.checked) }} className="checkBoxBasketItem xl:sm:hidden block mx-auto"/>
                </div>

            </div>

            <div className="basketItemImage">
                IMAGE 
            </div>

        </div>
    )
}