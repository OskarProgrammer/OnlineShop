import { useRef, useState } from "react"

type Props = {
    onGenerateOrder : Function
}

export const CashPaymentForm = ({onGenerateOrder} : Props) => {

    const cityRef = useRef<HTMLInputElement | null>(null)
    const zipCodeRef = useRef<HTMLInputElement | null>(null)
    const streetRef = useRef<HTMLInputElement | null>(null)

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const generateOrder = () => {
        if ( cityRef.current?.value == "" || zipCodeRef.current?.value == "" || streetRef.current?.value == "" ) {
            setErrorMessage("All fields must be provided") 
            return
        }

        const deliveryInfo = {
            city : cityRef.current?.value,
            zipCode : zipCodeRef.current?.value,
            streetRef : streetRef.current?.value
        }

        onGenerateOrder("Cash", deliveryInfo)
    }

    return (
        <>
            <p>Delivery Info</p>
            <input type="text" className="inputOfForm text-sm" ref={cityRef} placeholder="City"/>
            <input type="text" className="inputOfForm text-sm" ref={zipCodeRef} placeholder="Zip Code"/>
            <input type="text" className="inputOfForm text-sm" ref={streetRef} placeholder="Street"/>
            
            {errorMessage != null ? <p className="errorMessageForm text-secondColor font-bold">{errorMessage}</p> : ""}
            <button onClick={()=>{generateOrder()}} className="generateButton">Generate order</button>
        </>
    )
}