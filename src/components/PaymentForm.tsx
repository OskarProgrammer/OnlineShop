
// components
import { Title } from "./Title"

// icons
import { MdOutlinePayment } from "react-icons/md"
import { PiContactlessPayment } from "react-icons/pi"
import { BsCash } from "react-icons/bs"

// react 
import { useMutation, useQueryClient } from "react-query"

// api
import axios from "axios"

// hooks
import { useCurrentUser } from "../hooks/hooks"

// types
import { MessageType } from "../types/types"


export const PaymentForm = ( { sumPrice , itemsToPay , onSetMethod , onAddToPaymentList , activeMethod } : { sumPrice : number , itemsToPay : any[] , onSetMethod : Function , onAddToPaymentList : Function , activeMethod : String | null } ) => {

    const queryClient = useQueryClient()
    const { data : currentUser } = useCurrentUser()

    const removeItemFromBasket = useMutation({
        mutationFn : async ({itemID} : {itemID : string}) => await axios.delete(`http://localhost:3000/basket/${itemID}`),
        onSuccess : () => {
            queryClient.invalidateQueries(["baskets", currentUser?.id])
        }
    })

    const createOrder = useMutation({
        mutationFn : async ({newOrder} : {newOrder : any}) => await axios.post(`http://localhost:3000/orders/`, newOrder),
        onSuccess : () => {
            queryClient.invalidateQueries(["orders"])
        }
    })

    const createMessage = useMutation({
        mutationFn : async ({newMessage} : {newMessage : MessageType}) => await axios.post(`http://localhost:3000/messages/`,newMessage),
        onSuccess : () => {
            queryClient.invalidateQueries(["messages" , currentUser?.id])
        }
    })

    const generateOrder = async (method : string) => {

        const orderID = crypto.randomUUID()

        const newOrderObject = {
            id : orderID,
            name : `Order ${orderID}`,
            itemsToPay : itemsToPay,
            finalPrice : sumPrice,
            method : method
        }

        itemsToPay.map( (item) => {
            removeItemFromBasket.mutate({ itemID : item.id})
            onAddToPaymentList(item, item.sumPrice, false)
        })

        createOrder.mutate({ newOrder : newOrderObject })

        const newMessageObject : MessageType = {
            id: crypto.randomUUID(),
            // @ts-ignore
            ownerID: currentUser?.id,
            message: `You have created order ${orderID}`,
            createdAt: new Date()
        }

        createMessage.mutate({ newMessage : newMessageObject })
        
    }

    return (
        <div className="paymentForm">

            <Title text="Payment Form" fontSize="text-[25px]" fontColor="text-secondColor" />

            <div className="paymentMethods">

                <button onClick={()=> onSetMethod("transfer")} className="methodIcon methodButton">
                    <MdOutlinePayment/>
                </button>

                <button onClick={()=> onSetMethod("blik")} className="methodIcon methodButton">
                    <PiContactlessPayment/>
                </button>

                <button onClick={()=> onSetMethod("cash")} className="methodIcon methodButton">
                    <BsCash />
                </button>

            </div>

            { activeMethod == "transfer" ? <p>Transfer</p> : ""}
            { activeMethod == "blik" ? <p>Blik</p> : ""}
            { activeMethod == "cash" ? <button onClick={()=>{generateOrder("Cash")}} className="generateButton">Generate order</button> : ""}

        </div>
    )
}