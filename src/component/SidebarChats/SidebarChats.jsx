
import './SidebarChats.css'

import { useChatStore } from '../../store/useChatStore'
import { useVisualStore } from '../../store/useVisualStore'

const SidebarChats = ({date, chats, id}) => {

    const { handleSelectChat, selectedChat } = useChatStore()
    const { toggleChat, setChatInstantEnabled } = useVisualStore()

    const handleClickOnChat = (chatId) => {
        setTimeout(() => {toggleChat()}, 1000)
        setChatInstantEnabled(true)

        handleSelectChat(chatId)
        console.log(selectedChat)

        setTimeout(() => {document.documentElement.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'instant'
        })}, 100)
    }
    return (
        <>

            {Array.isArray(chats) ? 

                // REST : GET /{organization_id}/chats Get Chats

                
            
                <div className="sidebarChats-container"> 
                    <p className="sidebarChats-container__date-text"> {date} </p>
                    
                    <div className='sidebarChats-container__chats-container'>
                        {chats.map((value, key)=> {
                            return (
                                <span onClick={() => handleClickOnChat(value.id)} key={key} className={value.id === selectedChat.id ? "sidebarChats-container__chats-container__chats-text active-chat" : 'sidebarChats-container__chats-container__chats-text'}> 

                                    <p> {value.title} </p>
                                    
                                </span>
                            )
                            
                        })}


                    </div>

                </div>
            
            :

            <h1> asd </h1>
            
            }
        </>
    )
}

export default SidebarChats