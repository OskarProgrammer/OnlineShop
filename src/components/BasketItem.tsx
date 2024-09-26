
// icons
// @ts-ignore
import { IoRemoveOutline } from "react-icons/io5";

// hooks
import { useCreateMessageMutation, useItemByID, useRecoverAmountMutation, useRemoveItemFromBasketMutation } from "../hooks/hooks"

// types
import { BasketItemType, MessageType } from "../types/types"

// components
import { Title } from "./Title"

// react
import { useQueryClient } from "react-query"


type Props = {
    itemInfo : BasketItemType,
    paymentList : any[],
    onAddToPaymentList : Function
}

export const BasketItem = ( { itemInfo, paymentList, onAddToPaymentList } : Props) => {

    const queryClient = useQueryClient()

    const { data : itemDetails, isLoading } = useItemByID(itemInfo.itemID)

    const { mutate : recoverAmountMutation } = useRecoverAmountMutation(()=>{queryClient.invalidateQueries(["items"])})
    const { mutate : createMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages" , itemInfo.ownerID])}) 
    const { mutate : removeItemFromBasketMutation } = useRemoveItemFromBasketMutation(()=>{queryClient.invalidateQueries(["baskets", itemInfo.ownerID])})

    const active = paymentList.some((e:any) => e.id == itemInfo.id)

    const removeItem = async () => {
        // @ts-ignore
        onAddToPaymentList(itemInfo, parseInt(itemInfo?.amount) * parseInt(itemDetails.price), false)

        const messageObject : MessageType= {
            id : crypto.randomUUID(),
            // @ts-ignore
            ownerID : itemInfo.ownerID,
            message : "Successfully removed item from basket",
            createdAt : new Date()
        }

        // removeItemMutation
        removeItemFromBasketMutation({itemID : itemInfo?.id})

        // recoverAmountMutation
        // @ts-ignore
        recoverAmountMutation( { itemID : itemInfo?.itemID , amount : parseInt(itemInfo?.amount)} )

        // createMessageMutation
        createMessageMutation({newMessage : messageObject})
    }


    return (
        <div className={`basketItem ${active ? "activeItem" : ""}`}>
            
            <div className="basketItemCheck">
                {/* @ts-ignore */}
                <input type="checkbox" onChange={(e)=> { onAddToPaymentList(itemInfo, parseInt(itemInfo?.amount) * parseInt(itemDetails.price), e.target.checked) }} className="checkBoxBasketItem"/>
            </div>

            <div className="basketItemInfo">

                {isLoading ? "Loading details of item" : ""}

                <div className="basketItemDetailsInfo">

                    <Title text="Details informations" fontSize="text-[22px]" fontColor="text-primaryColor"/>
                    
                    <p>Name : {itemDetails?.name}</p>

                </div>

                <div className="basketItemPriceInfo">

                    <Title text="Price Informations" fontSize="text-[22px]" fontColor="text-primaryColor"/>
                    
                    <p>Amount : {itemInfo?.amount} </p>

                    {/* @ts-ignore */}
                    <p className="bg-successColor rounded-lg text-secondColor p-4">Sum price : {parseInt(itemInfo?.amount) * parseInt(itemDetails?.price)} </p>


                    {/* @ts-ignore */}
                    <input type="checkbox" onChange={(e)=> { onAddToPaymentList(itemInfo, parseInt(itemInfo?.amount) * parseInt(itemDetails.price), e.target.checked) }} className="checkBoxBasketItem xl:sm:hidden block mx-auto"/>
                
                </div>

                <button className="removeBasketItemButton" onClick={()=>{ removeItem() }} ><IoRemoveOutline /></button>
    
            </div>

            <div className="basketItemImage">
                IMAGE 
            </div>

            <p className="col-span-full">ID : {itemInfo?.id} </p>

        </div>
    )
}