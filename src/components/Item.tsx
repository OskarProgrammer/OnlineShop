
// icons
import { IoIosAdd } from "react-icons/io"
import { CgDetailsMore } from "react-icons/cg"

// types
import { BasketItemType, ItemType } from "../types/types"

// react
import { useRef } from "react"
import { useMutation, useQueryClient } from "react-query"

// hooks
import { useCurrentUser } from "../hooks/hooks"

// api
import axios from "axios"

export const Item = ( { item , index } : { item : ItemType , index : number}) => {

    const { data : currentUser } = useCurrentUser()
    const queryClient = useQueryClient()

    const amountRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)


    type Message = {
        id : string,
        ownerID : string | undefined,
        message : string,
        createdAt : Date
    }

    const addItemMutation = useMutation({
        mutationFn : async ({newItem} : {newItem : BasketItemType}) => await axios.post(`http://localhost:3000/basket/`, newItem),
        onSuccess : () => {
            queryClient.invalidateQueries(["baskets", currentUser?.id])
        }
    })

    const newMessageMutation = useMutation({
        mutationFn : async ({newMessage} : {newMessage : Message}) => axios.post(`http://localhost:3000/messages/`, newMessage),
        onSuccess : () => {
            queryClient.invalidateQueries(["messages", currentUser?.id])
        }
    })

    const deleteAmountMutation = useMutation({
        mutationFn : async ({newItemValue} : {newItemValue : ItemType}) => await axios.put(`http://localhost:3000/items/${newItemValue.id}`, newItemValue),
        onSuccess : () => {
            queryClient.invalidateQueries(["items"])
        }
    })

    const addItemToBasket = async () => {

        const newItemObject : BasketItemType = {
            id : crypto.randomUUID(),
            ownerID : currentUser?.id,
            itemID : idRef.current?.value,
            // @ts-ignore
            amount : parseInt(amountRef.current?.value)
        }

        addItemMutation.mutate({newItem : newItemObject})

        const newMessage = {
            id : crypto.randomUUID(),
            ownerID : currentUser?.id,
            message : `You have added ${amountRef.current?.value} amount of item ${item.name} for ${item.price}`,
            createdAt : new Date()
        }

        newMessageMutation.mutate({ newMessage : newMessage})

        // @ts-ignore
        item.amount -= parseInt(amountRef.current?.value)

        deleteAmountMutation.mutate({ newItemValue : item})
    }


    const info = 
            <div className="infoOfItem">
                <p className="titleTag">{item.name}</p>

                <p className="descTag">{item.desc}</p>

                <p className="priceTag">Price : {item.price}</p>

                <p className="amountTag">Amount : {item.amount}</p>

                {currentUser?.isLogged ? <input type="number" className="amountInput" ref={amountRef} defaultValue={1} min={1} max={item.amount}/> : ""}

                <input  value={item.id} hidden readOnly ref={idRef}/>
                
                {currentUser?.isLogged ? <div className="buttonBarItem">
                    <button className="itemAddButton" onClick={()=>{addItemToBasket()}}><IoIosAdd/></button>
                    <button className="itemAddButton"><CgDetailsMore/></button>
                </div> : ""}
            </div>
    
    const image = 
            <div className="imageOfItem">
                IMAGE
            </div>

    return (
        <div className="item">
            { index%2 == 0 ? image : info }
            { index%2 == 0 ? info : image}
        </div>
    )
}