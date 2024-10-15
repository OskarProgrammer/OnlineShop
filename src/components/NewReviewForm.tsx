
// types
import { useRef, useState } from "react"
import { useQueryClient } from "react-query"

// types
import { CurrentUser, ItemType, MessageType, ReviewType } from "../types/types"

// hooks
import { useCreateMessageMutation, useCreateReviewMutation } from "../hooks/hooks"


type Props = {
    onSetIsShown : Function,
    itemInfo : ItemType,
    currentUser : CurrentUser | undefined
}

export const NewReviewForm = ({onSetIsShown , itemInfo, currentUser} : Props ) => {

    const queryClient = useQueryClient()

    const gradeRef = useRef<HTMLInputElement | null>(null)
    const reviewRef = useRef<HTMLTextAreaElement | null>(null)

    const [errorMessage , setErrorMessage] = useState<string | null>(null)

    const { mutate : sendNewMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages", currentUser?.id])})
    const { mutate : createReviewMutation } = useCreateReviewMutation(()=>{queryClient.invalidateQueries(["reviews", itemInfo.id])})

    const createReview = () => {
        if (gradeRef.current?.value == "" || reviewRef.current?.value == ""){
            setErrorMessage("All fields must be provided")
            return
        }

        const newReview : ReviewType = {
            id: crypto.randomUUID(),
            itemID: itemInfo.id,
            // @ts-ignore
            ownerID: currentUser?.id,
            // @ts-ignore
            reviewContent: reviewRef.current?.value,
            // @ts-ignore
            grade: parseInt(gradeRef.current?.value)
          }
        
        createReviewMutation({newReview : newReview })

        onSetIsShown(false)

        const newMessageObject : MessageType = {
            id: crypto.randomUUID(),
            // @ts-ignore
            ownerID: currentUser?.id,
            message: `You have created review ${newReview.id}`,
            createdAt: new Date()
        }

        sendNewMessageMutation({newMessage : newMessageObject})

    }

    return (
        <div className="newReviewForm">

                <button onClick={()=>{onSetIsShown(false)}} className="closeFormButton text-secondColor">Close</button>

                <p className="text-[35px]">New Review for item {itemInfo.name}</p>

                <input type="number" placeholder="Your Grade" ref={gradeRef} max={5} step={0.5} className="inputOfForm"/>
                <textarea placeholder="Description for product" ref={reviewRef} className="inputOfForm" />

                {errorMessage != null ? <p className="errorMessageForm text-primaryColor font-bold text-center p-5">{errorMessage}</p> : ""}

                <button onClick={()=>{createReview()}} className="itemAddButton w-6/12"> Create </button>
        </div>
    )
}