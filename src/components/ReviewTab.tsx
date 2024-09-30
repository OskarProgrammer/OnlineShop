
// types 
import { ReviewType } from "../types/types"

// hooks
import { useUserByID } from "../hooks/hooks"

// components
import { Stars } from "./Stars"


type Props = {
    reviewInfo : ReviewType
}

export const ReviewTab = ({reviewInfo} : Props) => {

    const { data : userData , isLoading : loadingUserData} = useUserByID(reviewInfo.ownerID)

    if ( loadingUserData ) {
        return (
            <div className="reviewTab">
                <p className="text-center" >Loading review data...</p>
            </div>
        )
    }

    return (
        <div className="reviewTab">

            <Stars grade={reviewInfo.grade.toString()}/>

            <p className="authorOfReview">{userData?.login}</p>

            <p className="reviewContent">{reviewInfo.reviewContent}</p>

        </div>
    )
}