
import './MobileSidebar.css'

import mobileCloseSidebarURL from './item/mobileCloseSidebar.svg'

import { useVisualStore } from '../../../store/useVisualStore'
import { useChatStore } from '../../../store/useChatStore'

import SidebarChats from '../../SidebarChats/SidebarChats'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const MobileSidebar = () => {

    const { data, unSelectChat } = useChatStore()

    // const sidebarRef = useRef()



    const { isSidebarHidden, toggleSidebar } = useVisualStore()
    // const location = useLocation()
    const navigate = useNavigate()

    const groupMessagesByDate = (data) => {
        const grouped = {};
    
        if (Array.isArray(data)) {
            for (const chat of data) {
                const lastMessage = chat.message[chat.message.length - 1];
                const date = lastMessage.date;
    
            if (!grouped[date]) {
                grouped[date] = [date]; // первый элемент — дата
            }
    
            grouped[date].push({
                id: chat.id,
                title: chat.title
            });
        }}
    
        return Object.values(grouped);
    }


    const addNewChat = () => {
        if (location.pathname !== '/') navigate('/')
        disablePointerEvents(1000)
        setTimeout(() => {unSelectChat()
        closeChat()}, 500)
        setChatInstantEnabled(false)
    }
    

    const groupedChats = groupMessagesByDate(data);

    




    const { isMobileSidebarHidden, setIsMobileSidebarHidden } = useVisualStore()
    return (
        <div className={isMobileSidebarHidden ? 'mobile-sidebar-closed-animation mobile-sidebar-wrapper' : 'mobile-sidebar-opened-animation mobile-sidebar-wrapper'}> 
            <aside 
                // className={isMobileSidebarHidden ? 'mobile-sidebar-closed-animation mobile-sidebar-app' : 'mobile-sidebar-opened-animation mobile-sidebar-app'}
                className='mobile-sidebar-app'
            
            >
                <header>
                    <span>
                        <p> История </p>
                        <p> Здесь отображается ваша история переписок с LegAi</p>
                    </span>
                    <div>
                        <img onClick={() => setIsMobileSidebarHidden(true)} src={mobileCloseSidebarURL} alt="close-sidebar" />
                    </div>
                </header>
                <textarea placeholder='Поиск в чатах...' name="" id=""></textarea>

                <section>
                                {groupedChats.map((element, key) => {
                                    const date = element[0];
                                    const chats = element.slice(1); // каждый — { id, title }

                                    return (
                                        <SidebarChats
                                            key={key}

                                            date={date}
                                            chats={chats}
                                        />
                                    );
                                })}
                </section>
            </aside>

            <div onClick={() => setIsMobileSidebarHidden(true)} className='mobile-sidebar-pagefiller'>

            </div>
        </div>
    )
}

export default MobileSidebar