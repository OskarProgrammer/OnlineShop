import { generateArrayOfGrade } from "../utils/utils"

// icons
import { IoIosStar } from "react-icons/io"
import { IoIosStarHalf } from "react-icons/io"
import { IoIosStarOutline } from "react-icons/io"

type Props = {
    grade : string
}

export const Stars = ({grade} : Props) => {

    let starsArray = generateArrayOfGrade(grade)

    return (
        <p className="gradeTab">
            {starsArray.map( star => {
                if ( star == "full") {
                    return <IoIosStar/>
                } else if ( star == "half"){
                    return <IoIosStarHalf/>
                } else {
                    return <IoIosStarOutline/>
                }
            })}
        </p>
    )
}