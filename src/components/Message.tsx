
// react
import { useMutation, useQueryClient } from "react-query"
import { useEffect, useState } from "react"

// api
import { deleteMessageById } from "../api/api"

// types
import { MessageType } from "../types/types"


type Props = {
    messageInfo : MessageType
}

export const Message = ({messageInfo} : Props) => {

    const queryClient = useQueryClient()

    const maxTime = 5
    let [time , setTime] = useState(0)

    const removeMessageMutation = useMutation({
        mutationFn : deleteMessageById,
        onSuccess : () => {
            queryClient.invalidateQueries(["messages", messageInfo.ownerID])
        }
    })

    const removeMessage = () => {
        removeMessageMutation.mutate({ messageID : messageInfo.id })
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if ( time == maxTime ) {
                removeMessageMutation.mutate({ messageID : messageInfo.id })
            }

            setTime(time++)

        }, 1000)

        return () => { clearInterval(interval) }
    }, [])


    return (
        <div className="message">
            <p>{messageInfo.message}</p>
            <button onClick={()=>{ removeMessage() }} className={`removeMessageButton`}><i className="bi bi-trash"/></button>
        </div>
    )
}