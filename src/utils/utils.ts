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

export const generateArrayOfGrade = (grade : string) => {
    const maxGrade = 5
    const starsAmount = grade.split(".")

    let stars = []
    for (let i = 0 ; i < parseInt(starsAmount[0]) ; i++){
        stars.push("full")
    }

    if (starsAmount[1] == "5") { 
        stars.push("half")
    }

    for (let i = (parseInt(starsAmount[0]) + 1) ; i < maxGrade ; i++){
        stars.push("empty")
    }

    return stars
}

