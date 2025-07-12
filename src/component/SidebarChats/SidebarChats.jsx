
import './SidebarChats.css'

import { useChatStore } from '../../store/useChatStore'
import { useVisualStore } from '../../store/useVisualStore'
import { useNavigate, useLocation } from 'react-router-dom'

import { connectAndSendMessage, disconnectSocket } from '../../utils/hooks/socketHelper.js';


const SidebarChats = ({date, chats, id}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const { handleSelectChat, selectedChat, unSelectChat } = useChatStore()
    const { toggleChat, setChatInstantEnabled, windowLayout, setIsMobileSidebarHidden } = useVisualStore()

    const handleClickOnChat = (chatId) => {

        if (location.pathname !== '/') {
            setTimeout(() => {
                setTimeout(() => {toggleChat()}, 1000)
                setChatInstantEnabled(true)
                unSelectChat()
                handleSelectChat(chatId)
                console.log(selectedChat)
                navigate('/')
            }, 150)

        } else if (location.pathname === '/') {
            setTimeout(() => {toggleChat()}, 1000)
            setChatInstantEnabled(true)
            unSelectChat()
            handleSelectChat(chatId)
            console.log(chatId)
            console.log(selectedChat)
            navigate('/')
        }

        if (windowLayout.width <= 750) {
            setIsMobileSidebarHidden(true)
        }

        disconnectSocket()

        localStorage.setItem('chat_id', selectedChat)

        

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

                        {/* {chats.map((value, key)=> {
                            return (
                                <span onClick={() => handleClickOnChat(value.id)} key={key} className={value.id === selectedChat.id ? "sidebarChats-container__chats-container__chats-text active-chat" : 'sidebarChats-container__chats-container__chats-text'}> 

                                    <p> {value.title} </p>
                                    
                                </span>
                            )
                            
                        })} */}


                        {chats.map((value, key) => {

                            return (

                                <span onClick={() => handleClickOnChat(value.id)} key={key} className={value.id === selectedChat ? "sidebarChats-container__chats-container__chats-text active-chat" : 'sidebarChats-container__chats-container__chats-text'}> 

                                    <p> {value.name} </p>
                                    
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