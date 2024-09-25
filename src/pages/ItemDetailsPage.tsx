import { useParams } from "react-router"
import { useItemByID } from "../hooks/hooks"
import { Title } from "../components/Title"

export const ItemDetailsPage = () => {

    const {itemID} = useParams()
    const { data : itemData, isLoading} = useItemByID( itemID ) 

    return(
        <div className="itemPageDiv">

            {isLoading ? "Loading" : ""}
            <Title text={`${itemData.name}`} fontSize="text-[50px]" fontColor="text-primaryColor"/>

        </div>
    )

}