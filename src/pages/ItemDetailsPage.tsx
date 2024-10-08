// react
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useRef } from "react"

// hooks
import { useAddItemToBasketMutation, useCreateMessageMutation, useCurrentUser, useItemByID, useReviewsOfItem, useUpdateItemInfoMutation } from "../hooks/hooks"


// components
import { Title } from "../components/Title"
import { ReviewTab } from "../components/ReviewTab"

// icons
import { IoMdAdd } from "react-icons/io"

// types
import { BasketItemType, MessageType, ReviewType } from "../types/types"


export const ItemDetailsPage = () => {

    const {itemID} = useParams()
    const queryClient = useQueryClient()

    const { data : itemData, isLoading} = useItemByID( itemID ) 
    const { data : currentUser} = useCurrentUser()
    const { data : reviewsData, isLoading : reviewsLoading} = useReviewsOfItem(itemID)

    const { mutate : addItemToBasketMutation } = useAddItemToBasketMutation(()=>{queryClient.invalidateQueries(["baskets", currentUser?.id])})
    const { mutate : newMessageMutation } = useCreateMessageMutation(()=>{queryClient.invalidateQueries(["messages", currentUser?.id])})
    const { mutate : updateItemInfoMutation } = useUpdateItemInfoMutation(()=>{queryClient.invalidateQueries(["items"])})

    const amountRef = useRef<HTMLInputElement | null>(null)

    const addItemToBasket = async () => {

        const newItemObject : BasketItemType = {
            id : crypto.randomUUID(),
            ownerID : currentUser?.id,
            itemID : itemID,
            // @ts-ignore
            amount : parseInt(amountRef.current?.value)
        }

        const newMessage : MessageType = {
            id : crypto.randomUUID(),
            // @ts-ignore
            ownerID : currentUser?.id,
            message : `You have added ${amountRef.current?.value} amount of item ${itemData.name} for ${itemData.price}`,
            createdAt : new Date()
        }

        // addItemMutation
        addItemToBasketMutation({newItem : newItemObject})

        // newMessageMutation
        newMessageMutation({ newMessage : newMessage})

        // @ts-ignore
        itemData.amount -= parseInt(amountRef.current?.value)

        // updateItemMutation
        updateItemInfoMutation({ newItemValue : itemData})
    }

    return(
        <div className="itemPageDiv">

            {isLoading ? "Loading" : ""}
            <Title text={`${itemData?.name}`} fontSize="text-[50px]" fontColor="text-primaryColor"/>

            <div className="itemDetailsContainer">

                <div className="leftSideOfItemDetailsContainer">
                    <p>{itemData?.desc}</p>
                </div>

                <div className="rightSideOfItemDetailsContainer">

                    <div className="itemImage">
                        Image
                    </div>

                    <p className="amountTagItemDetails">Amount : {itemData?.amount}</p>
                    {currentUser?.isLogged ? <input type="number" className="amountInput mx-auto text-[20px]" ref={amountRef} defaultValue={1} min={1} max={itemData?.amount}/> : ""}
                    
                    {currentUser?.isLogged ?
                        <div className="subImageButtonsBar">
                            <button onClick={() => {addItemToBasket()} } className="icon itemAddButton"><IoMdAdd/></button>
                        </div> 
                    : ""}

                </div>

            </div>

            <div className="reviewsContainer">
                
                <Title text={`Reviews of item`} fontSize="text-[30px]" fontColor="text-primaryColor"/>

                <div className="reviews">

                    {reviewsLoading ? "Loading reviews" : "" }
                    {reviewsData?.length == 0 ? "No reviews to display" : ""}

                    {/* displaying reviews */}
                    {reviewsData?.map( ( review : ReviewType ) => (
                        <ReviewTab key={review.id} reviewInfo={review} />
                    ))}

                </div>

            </div>

        </div>
    )

}