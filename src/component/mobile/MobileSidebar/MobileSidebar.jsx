
import './MobileSidebar.css'

import mobileCloseSidebarURL from './item/mobileCloseSidebar.svg'

import { useVisualStore } from '../../../store/useVisualStore'
import { useChatStore } from '../../../store/useChatStore'

import SidebarChats from '../../SidebarChats/SidebarChats'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const VITE_API_LEGAI = import.meta.env.VITE_API_LEGAI


const MobileSidebar = () => {

    const { data, unSelectChat, apiChatsData, setApiChatsData } = useChatStore()


    const token = localStorage.getItem('access_token')

    const getChats = async () => {

        try {
            const res = await axios.get(`api/v1/1/chats`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                }
              })

              console.log(res.data)
              setApiChatsData(res.data)
        } catch (err) {

            console.log(err)
        }

    }

    // const sidebarRef = useRef()

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

    
    useEffect(() => {

        getChats()
    }, [])



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
                                {/* {groupedChats.map((element, key) => {
                                    const date = element[0];
                                    const chats = element.slice(1); 

                                    return (
                                        <SidebarChats
                                            key={key}

                                            date={date}
                                            chats={chats}
                                        />
                                    );
                                })} */}

                    <SidebarChats

                    date={'01.01.2025'}
                    chats={apiChatsData}
                    />
                </section>
            </aside>

            <div onClick={() => setIsMobileSidebarHidden(true)} className='mobile-sidebar-pagefiller'>

            </div>
        </div>
    )
}

export default MobileSidebar