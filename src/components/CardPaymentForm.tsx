import { useRef, useState } from "react"

type Props = {
    onGenerateOrder : Function
}

export const CardPaymentForm = ({onGenerateOrder} : Props) => {

    const cityRef = useRef<null | HTMLInputElement >( null )
    const zipCodeRef = useRef<null | HTMLInputElement >( null )
    const streetRef = useRef<null | HTMLInputElement >( null )

    const cardNumberRef = useRef<null | HTMLInputElement >( null )
    const cnCodeRef = useRef<null | HTMLInputElement >( null )

    const [errorMessage, setErrorMessage] = useState<string>()

    const generateOrder = () => {
        if ( cityRef.current?.value == "" || zipCodeRef.current?.value == "" || streetRef.current?.value == "" ) {
            setErrorMessage("All fields must be provided") 
            return
        }

        if ( cardNumberRef.current?.value == "" || cnCodeRef.current?.value == "" ) {
            setErrorMessage("You have to fill card informations")
            return
        }

        const deliveryInfo = {
            city : cityRef.current?.value,
            zipCode : zipCodeRef.current?.value,
            streetRef : streetRef.current?.value
        }

        onGenerateOrder("Card", deliveryInfo)
    }

    return (
        <>  
            <p>Card Info</p>
            <input type="number" className="inputOfForm text-sm" ref={cardNumberRef} placeholder="Card Number"/>
            <input type="number" className="inputOfForm text-sm" ref={cnCodeRef} placeholder="Code"/>

            <p>Delivery Info</p>
            <input type="text" className="inputOfForm text-sm" ref={cityRef} placeholder="City"/>
            <input type="text" className="inputOfForm text-sm" ref={zipCodeRef} placeholder="Zip Code"/>
            <input type="text" className="inputOfForm text-sm" ref={streetRef} placeholder="Street"/>

            {errorMessage != null ? <p className="errorMessageForm text-secondColor font-bold">{errorMessage}</p> : ""}
            
            <button onClick={()=>{generateOrder()}} className="generateButton">Generate order</button>
        </>
    )
}