
// types
import { useCurrentUser } from "../hooks/hooks"
import { ItemType } from "../types/types"

export const Item = ( { item , index } : { item : ItemType , index : number}) => {

    const { data : currentUser } = useCurrentUser()

    const info = 
            <div className="infoOfItem">
                <p className="titleTag">{item.name}</p>

                <p className="descTag">{item.desc}</p>

                <p className="priceTag">Price : {item.price}</p>

                <p className="amountTag">Amount : {item.amount}</p>

                {currentUser?.isLogged ? <input type="number" className="amountInput" defaultValue={1} min={1} max={item.amount}/> : ""}

                <input  value={item.id} hidden readOnly/>
                
                {currentUser?.isLogged ? <div className="buttonBarItem">
                    <button className="itemAddButton">Add Item</button>
                    <button className="itemAddButton">Item Details</button>
                </div> : ""}
            </div>
    
    const image = 
            <div className="imageOfItem">
                IMAGE
            </div>

    return (
        <div className="item">
            { index%2 == 0 ? image : info }
            { index%2 == 0 ? info : image}
        </div>
    )
}