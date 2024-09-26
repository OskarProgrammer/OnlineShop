
// icons
import { IoIosAdd } from "react-icons/io"
import { CgDetailsMore } from "react-icons/cg"

// types
import { BasketItemType, ItemType, MessageType } from "../types/types"

// react
import { useRef } from "react"
import { useQueryClient } from "react-query"
import { NavLink } from "react-router-dom"

// hooks
import { useAddItemToBasketMutation, useCreateMessageMutation, useCurrentUser, useUpdateItemInfoMutation } from "../hooks/hooks"


export const Item = ( { item , index } : { item : ItemType , index : number}) => {

    const { data : currentUser } = useCurrentUser()
    const queryClient = useQueryClient()

    const { mutate : addItemToBasketMutation } = useAddItemToBasketMutation(()=>{queryClient.invalidateQueries(["baskets", currentUser?.id])})
    const { mutate : newMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages", currentUser?.id])})
    const { mutate : updateItemInfoMutation } = useUpdateItemInfoMutation(()=>{queryClient.invalidateQueries(["items"])})

    const amountRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)

    const addItemToBasket = async () => {

        const newItemObject : BasketItemType = {
            id : crypto.randomUUID(),
            ownerID : currentUser?.id,
            itemID : idRef.current?.value,
            // @ts-ignore
            amount : parseInt(amountRef.current?.value)
        }

        const newMessage : MessageType = {
            id : crypto.randomUUID(),
            // @ts-ignore
            ownerID : currentUser?.id,
            message : `You have added ${amountRef.current?.value} amount of item ${item.name} for ${item.price}`,
            createdAt : new Date()
        }

        // addItemMutation
        addItemToBasketMutation({newItem : newItemObject})

        // newMessageMutation
        newMessageMutation({ newMessage : newMessage})

        // @ts-ignore
        item.amount -= parseInt(amountRef.current?.value)

        // updateItemMutation
        updateItemInfoMutation({ newItemValue : item})
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
                    <NavLink to={`/itemDetails/${item.id}`} className="itemAddButton hover:bg-primaryColor"><CgDetailsMore/></NavLink>
                </div> : ""}

                {!currentUser?.isLogged ? <NavLink to={`/itemDetails/${item.id}`} className="itemAddButton hover:bg-primaryColor"><CgDetailsMore/></NavLink> : ""}

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