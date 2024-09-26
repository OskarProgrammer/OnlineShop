
// react
import { useState } from "react"

// hooks
import { useBasketOfUser, useCurrentUser } from "../hooks/hooks"

// components
import { BasketItem } from "../components/BasketItem"
import { PaymentTitle } from "../components/PaymentTitle"
import { PageTitle } from "../components/PageTitle"
import { PriceTag } from "../components/PriceTag"
import { PaymentForm } from "../components/PaymentForm"

// types
import { BasketItemType } from "../types/types"


export const BasketPage = () => {

    const { data : currentUser } = useCurrentUser() 
    const { data : basket , isLoading : loadingBasket } = useBasketOfUser(currentUser?.id)
    
    let [sumPrice, setSumPrice] = useState(0)
    let [itemsToPay, setItemsToPay] = useState<any []>([])
    const [activeMethod , setActiveMethod] = useState(null)

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

        calculateSumPrice()
    }


    return (
        <div className="basket">
            <PageTitle title="Basket"/>

            <div className="itemsBasket">

                { loadingBasket ? "Loading basket..." : ""}

                { basket?.length == 0 ? "Add items to basket..." : ""}

                { basket?.map( ( item : BasketItemType ) => (
                    <BasketItem key={item.id} itemInfo={item} paymentList={itemsToPay} onAddToPaymentList={addToPaymentList}/>
                ))}

            </div>

            <div className="paymentBasket">
                
                <PaymentTitle />
                <PriceTag sumPrice={sumPrice}/>
                { sumPrice != 0 ? <PaymentForm itemsToPay={itemsToPay}
                                               sumPrice={sumPrice}
                                               activeMethod={activeMethod}
                                               onSetMethod={setActiveMethod}
                                               onAddToPaymentList={addToPaymentList}/>  : ""}

            </div>

        </div>
    )
}