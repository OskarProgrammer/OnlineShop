
// components
import { Message } from "./Message"

// hooks
import { useMessagesOfUser } from "../hooks/hooks"

// types
import { MessageType } from "../types/types"


export const MessageContainer = ({currentUserID} : {currentUserID : string} ) => {

    const { data : messages } = useMessagesOfUser(currentUserID)

    return (
        <div className="messageContainer">
            {messages?.map( ( message : MessageType )=> (
                <Message key={message.id} messageInfo={message}/>
            ))}
        </div>
    )
}