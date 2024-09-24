
// react
import { useState } from "react"

// hooks
import { useBasketOfUser, useCurrentUser } from "../hooks/hooks"


export const BasketPage = () => {

    const { data : currentUser } = useCurrentUser() 
    const { data : basket , isLoading : loadingBasket } = useBasketOfUser(currentUser?.id)
    
    let [sumPrice, setSumPrice] = useState(0)


    return (
        <div className="basket">
            
            <div className="itemsBasket">
                { loadingBasket ? "Loading basket..." : ""}
                { basket?.length == 0 ? "Add items to basket..." : ""}
                
            </div>

            <div className="paymentBasket">
                <p className="titlePaymentBasket">Payment Tab</p>
                <p className="pricePaymentBasket">
                    {sumPrice == 0 ? "Check items that you want to pay for" : `To pay : ${sumPrice}`}    
                </p>

            </div>

        </div>
    )
}