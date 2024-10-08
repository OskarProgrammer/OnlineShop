
// react router
import { Link } from "react-router-dom"

// types
import { ItemType } from "../types/types"


type Props = {
    item : ItemType
}

export const ItemTab = ({item} : Props) => {

    return (
        <Link to={`/itemDetails/${item.id}`} className="col-span-1 text-center p-5 border border-primaryColor rounded-lg bg-primaryColor text-secondColor flex flex-col gap-4">
            <p className="font-bold text-[20px]">{item.name}</p>
            <p className="break-all">{item.desc}</p>
            <p>Amount : {item.amount}</p>
        </Link>
    )
}