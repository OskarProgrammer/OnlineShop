
export const PriceTag = ({sumPrice} : {sumPrice : number}) => {

    return (
        <p className="pricePaymentBasket">
            {sumPrice == 0 ? "Check items that you want to pay for" : `To pay : ${sumPrice}`}    
        </p>
    )
}