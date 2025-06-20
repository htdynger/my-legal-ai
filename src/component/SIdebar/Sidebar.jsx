import './Sidebar.css'
import section1Icon1URL from './items/section-n1__icon-n1.png'
import section1Icon2URL from './items/section-n1__icon-n2.png'
import section2Icon1URL from './items/section-n2__icon-n1.png'
import section2Icon2URL from './items/section-n2__icon-n2.png'



import SidebarChats from '../SidebarChats/SidebarChats.jsx'
import SidebarDocuments from '../SidebarDocuments/SidebarDocuments.jsx'

import { useLocation } from 'react-router-dom'

import { useVisualStore } from '../../store/useVisualStore.js'

import { useChatStore } from '../../store/useChatStore'

import { useState, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'




const Sidebar = () => {

    const { closeChat, setChatInstantEnabled, disablePointerEvents, pointerEvents } = useVisualStore()

    const { data, unSelectChat } = useChatStore()

    const sidebarRef = useRef()



    const { isSidebarHidden, toggleSidebar } = useVisualStore()
    const location = useLocation()
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

    useEffect(() => {
        pointerEvents ? sidebarRef.current.style.pointerEvents = `auto` : sidebarRef.current.style.pointerEvents = `none`
    }, [pointerEvents])

    const addNewChat = () => {
        if (location.pathname !== '/') navigate('/')
        disablePointerEvents(1000)
        setTimeout(() => {unSelectChat()
        closeChat()}, 500)
        setChatInstantEnabled(false)
    }
    

    const groupedChats = groupMessagesByDate(data);


    
    return (

        <>
            <div className={isSidebarHidden ? 'sidebar-relative sidebar-close-animation' : 'sidebar-relative sidebar-open-animation' }> </div>

            <div className='aside-fixed-container'> 

                <aside ref={sidebarRef} className={isSidebarHidden ? "aside aside-sidebar-closed" : 'aside aside-sidebar-opened'}>
                    <div className='aside__navbar-n1'>

                        <div className='aside__navbar-n1__section-n1'>
                            <button onClick={toggleSidebar}> <img src={section1Icon1URL} alt="button-hide-sidebar" /> </button>
                            <button onClick={addNewChat}> <img src={section1Icon2URL} alt="button-new-chat" /> </button>
                        </div>

                        <div className='aside__navbar-n1__section-n2'>
                            <button className='aside__navbar-n1__section-n2__button-n1'> <img src={section2Icon1URL} alt="button-left" /> </button>
                            <button className='aside__navbar-n1__section-n2__button-n2'> <img src={section2Icon2URL} alt="button-right" /> </button>
                        </div>

                    </div>

                    <div className='aside__navbar-n2'>


                        <input placeholder='Поиск в чатах...' type="text" />

                    </div>


                    <div className='aside__navbar-n3'>

                        {location.pathname != '/document-generation/' ?
                        
                            <>



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

                            </>

                            :

                            <>

                                <SidebarDocuments date={"01.01.1999"} title={'Новый альбом'} documents={['документ 1', 'документ 2', 'документ 3', 'документ 1', 'документ 2', 'документ 3', 'документ 1', 'документ 2', 'документ 3']} />
                                <SidebarDocuments date={"01.01.1999"} title={'Новый альбом'} documents={['документ 1']} />
                                <SidebarDocuments date={"01.01.1999"} title={'Новый альбом'} documents={['документ 1', 'документ 2', 'документ 3']} />
                                <SidebarDocuments date={"01.01.1999"} title={'Новый альбом'} documents={['документ 1', 'документ 2', 'документ 3']} />
                                <SidebarDocuments date={"01.01.1999"} title={'Новый альбом'} documents={['документ 1', 'документ 2', 'документ 3']} />
                            
                            
                            </>
                        }
                        

                    </div>

                </aside>

            </div>
            
        </>
        
    )
}

export default Sidebar