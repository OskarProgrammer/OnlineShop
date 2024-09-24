
// react
import { useState } from "react"

// hooks
import { useBasketOfUser, useCurrentUser } from "../hooks/hooks"

// components
import { BasketItem } from "../components/BasketItem"

// types
import { BasketItemType } from "../types/types"


export const BasketPage = () => {

    const { data : currentUser } = useCurrentUser() 
    const { data : basket , isLoading : loadingBasket } = useBasketOfUser(currentUser?.id)
    
    let [sumPrice, setSumPrice] = useState(0)

    let [itemsToPay, setItemsToPay] = useState<any[]>([])

    const calculateSumPrice = () => {
        sumPrice = 0

        itemsToPay.map( item => {
            sumPrice += parseInt(item.sumPrice)
        })

        setSumPrice(sumPrice)
    }

    const addToPaymentList = ( itemInfo : any , sumPrice : number, status : boolean) => {
          
        if (status) {
            itemInfo.sumPrice = sumPrice
            itemsToPay.push(itemInfo)
        }else{
            itemsToPay = itemsToPay.filter(e => e.id != itemInfo.id)
        }

        setItemsToPay(itemsToPay)

        console.log(itemsToPay)

        calculateSumPrice()
    }

    return (
        <div className="basket">
            
            <div className="itemsBasket">
                { loadingBasket ? "Loading basket..." : ""}
                { basket?.length == 0 ? "Add items to basket..." : ""}
                { basket?.map( ( item : BasketItemType ) => (
                    <BasketItem key={item.id} itemInfo={item} onAddToPaymentList={addToPaymentList}/>
                ))}
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