
// react
import { useRef, useState } from "react"
import { useQueryClient } from "react-query"

// types
import { ItemType, MessageType } from "../types/types"

// hooks
import { useAddItemToUserMutation, useCreateMessageMutation, useCreateNewItemMutation, useCurrentUser } from "../hooks/hooks"

type Props = {
    onSetIsShown : Function
}

export const NewItemForm = ({onSetIsShown} : Props) => {

    const queryClient = useQueryClient()

    const nameRef = useRef<HTMLInputElement | null>(null)
    const priceRef = useRef<HTMLInputElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const descRef = useRef<HTMLTextAreaElement | null>(null)

    const [errorMessage , setErrorMessage] = useState<string | null>(null)
    
    const { data : currentUser } = useCurrentUser()

    const { mutate : createItemMutation } = useCreateNewItemMutation(()=>{queryClient.invalidateQueries(["items", currentUser?.id])})
    const { mutate : addItemToUserMutation } = useAddItemToUserMutation(()=>{queryClient.invalidateQueries(["currentUser"])})
    const { mutate : sendNewMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages", currentUser?.id])})

    const createItem = () => {

        if ( nameRef.current?.value == "" || priceRef.current?.value == "" || amountRef.current?.value == "" ){
            setErrorMessage("You have to provide name, price and amount")
            return
        }

        const newItem : ItemType = {
            id : crypto.randomUUID(),
            // @ts-ignore
            name : nameRef.current?.value,
            // @ts-ignore
            desc : descRef.current?.value,
            // @ts-ignore
            price : parseInt(priceRef.current?.value),
            // @ts-ignore
            amount : parseInt(amountRef.current?.value)
        }

        createItemMutation({ newItem : newItem })
        // @ts-ignore
        addItemToUserMutation({ userID : currentUser?.id , itemID : newItem.id })

        onSetIsShown(false)

        const newMessageObject : MessageType = {
            id: crypto.randomUUID(),
            // @ts-ignore
            ownerID: currentUser?.id,
            message: `You have created item ${newItem.id}`,
            createdAt: new Date()
        }

        sendNewMessageMutation({newMessage : newMessageObject})

    }

    return (
        <div className="newItemForm">
            
            <button onClick={()=>{onSetIsShown(false)}} className="closeFormButton">Close</button>

            <p className="text-[30px] text-center font-bold">Add your new item</p>

            <input type="text" placeholder="Name for product" ref={nameRef} className="inputOfForm"/>
            <input type="number" placeholder="Price for product" ref={priceRef} className="inputOfForm"/>
            <input type="number" placeholder="Amount of product" ref={amountRef} className="inputOfForm"/>

            <textarea placeholder="Description for product" ref={descRef} className="inputOfForm" />

            {errorMessage != null ? <p className="errorMessageForm text-secondColor font-bold text-center p-5">{errorMessage}</p> : ""}

            <button onClick={()=>{createItem()}} className="itemAddButton w-6/12"> Create </button>

        </div>
    )
}