
// icons
// @ts-ignore
import { IoRemoveOutline } from "react-icons/io5";

// hooks
import { useItemByID } from "../hooks/hooks"

// types
import { BasketItemType, MessageType } from "../types/types"

// components
import { Title } from "./Title"

// react
import { useMutation, useQueryClient } from "react-query"

// api
import axios from "axios"
import { recoverAmount } from "../utils/utils";


type Props = {
    itemInfo : BasketItemType,
    paymentList : any[],
    onAddToPaymentList : Function
}

export const BasketItem = ( { itemInfo, paymentList, onAddToPaymentList } : Props) => {

    const queryClient = useQueryClient()

    const { data : itemDetails, isLoading } = useItemByID(itemInfo.itemID)

    const active = paymentList.some((e:any) => e.id == itemInfo.id)

    const removeItemMutation = useMutation({
        mutationFn : async () => await axios.delete(`http://localhost:3000/basket/${itemInfo.id}`),
        onSuccess : () => {
            queryClient.invalidateQueries(["baskets", itemInfo.ownerID])
        }
    })

    const recoverAmountMutation = useMutation({
        mutationFn : recoverAmount,
        onSuccess : () => {
            queryClient.invalidateQueries(["items"])
        }
    })

    const createMessageMutation = useMutation({
        mutationFn : async ({newMessage} : { newMessage : MessageType}) => await axios.post(`http://localhost:3000/messages/`, newMessage),
        onSuccess : () => {
            queryClient.invalidateQueries(["messages" , itemInfo.ownerID])
        }
    })

    const removeItem = async () => {
        // @ts-ignore
        onAddToPaymentList(itemInfo, parseInt(itemInfo?.amount) * parseInt(itemDetails.price), false)
        removeItemMutation.mutate()

        // @ts-ignore
        recoverAmountMutation.mutate({ itemID : itemInfo.itemID, amount : parseInt(itemInfo.amount)})

        const messageObject : MessageType= {
            id : crypto.randomUUID(),
            // @ts-ignore
            ownerID : itemInfo.ownerID,
            message : "Successfully removed item from basket",
            createdAt : new Date()
          }

        createMessageMutation.mutate({newMessage : messageObject})
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