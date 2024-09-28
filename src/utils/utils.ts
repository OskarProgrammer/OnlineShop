import axios from "axios"

export const redirectToPage = ( path : string) => {
    window.location.href = path 
}

export const delay = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const scrollToPos = ( fromTop : number) => {
    window.scrollTo({ top: fromTop, behavior: 'smooth' });
}

export const recoverAmount = async ( itemID : string | undefined , amount : number ) => {

    console.log(itemID, amount)

    let item = await axios.get(`http://localhost:3000/items/${itemID}`).then(res => res.data)

    item.amount += amount

    try {
        await axios.put(`http://localhost:3000/items/${itemID}`, item)
    } catch { throw new Error("Error during recovering amount of items")}

}
