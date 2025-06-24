import './Main.css'
import './chat-opened.css'

import './1440.css'
import animatedFrameURL from './items/animatedFrame.mp4'
import flagUzbURL from './items/flagUzb.png'
import copyButtonURL from './items/copyButton.png'
import newChatButtonURL from './items/newChatButton.png'
import newChatButtonHoverURL from './items/newChatButtonHover.png'
import addFileButtonURL from './items/addFileButton.png'
import addFileButtonHoverURL from './items/addFileButtonHover.png'
import moreInfoButtonURL from './items/moreInfoButton.png'
import moreInfoButtonEnabledURL from './items/moreInfoButtonEnabled.png'
import sendButtonURL from './items/sendButton.png'

import Messenger from '../Messenger/Messenger'

import { useVisualStore } from '../../store/useVisualStore';
import { useChatStore } from '../../store/useChatStore'

import { useState, useEffect, useRef } from 'react'

import { v4 as uuidv4 } from 'uuid';




const Main = () => {


    const textareaRef = useRef(null);
    const inputSectionRef = useRef(null)






    const { isChatOpened, toggleChat, chatInstantEnabled, setChatInstantEnabled, closeChat, isSidebarHidden } = useVisualStore();
    const { selectedChat, handleSelectChat, data, setData, unSelectChat, setIsExplainEnabled, isExplainEnabled, sendButtonEnabled, hardSetSelectedChat } = useChatStore()

    const [messageText, setMessageText] = useState('')

    // useEffect(() => {
    //     const el = textareaRef.current;
    //     const container = inputSectionRef.current;
    //     if (!el || !container) return;
    
    //     // Сброс высоты перед перерасчётом
    //     el.style.height = 'auto';
    
    //     // Получаем scrollHeight и ограничиваем максимальную высоту 500px
    //     const maxTextareaHeight = 500;
    //     let newHeight = el.scrollHeight + 64;
    //     if (newHeight > maxTextareaHeight) {
    //         newHeight = maxTextareaHeight;
    //         // Чтобы не показывать скролл, можно дополнительно добавить стиль overflow
    //         el.style.overflowY = 'auto'; // или 'scroll'
    //     } else {
    //         el.style.overflowY = 'hidden';
    //     }
    
    //     el.style.height = `${newHeight}px`;
    
    //     const baseHeight = 123;
    //     const verticalPadding = 30;
    
    //     // Устанавливаем высоту контейнера с учётом textarea
    //     const containerHeight = Math.max(baseHeight, newHeight + verticalPadding);
    //     container.style.height = `${containerHeight}px`;
    
    //     // Если текст пустой — сбрасываем высоту и трансформацию
    //     if (messageText === '') {
    //         container.style.height = `123px`;
    //         container.style.transform = isChatOpened ? 'translateY(50px)' : 'translateY(0)';
    //         return;
    //     }
    
    //     // Рассчитываем разницу в высоте
    //     const heightDiff = containerHeight - baseHeight;
    
    //     // Коэффициент смещения - регулируй под себя
    //     const translateYValue = -heightDiff * 1;
    
    //     // Устанавливаем transform с ограничением (maxTranslateY оставил большим, т.к. в px)
    //     const maxTranslateY = -8000;
    //     const appliedTranslateY = Math.max(translateYValue, maxTranslateY);
    
    //     container.style.transform = `translateY(${isChatOpened ? 50 + appliedTranslateY : appliedTranslateY}px)`;
    
    //     console.log('Container height:', containerHeight, 'TranslateY:', appliedTranslateY);
    // }, [messageText]);

    // useEffect(()=> {
    //     inputSectionRef.current.style.height = `123px`;
    //     inputSectionRef.current.style.transform = isChatOpened ? 'translateY(50px)' : 'translateY(0)';
    // }, [isChatOpened])
    
    
    
    
    const [localChatOpened, setLocalChatOpened] = useState(false)

   
    useEffect(() => {
        setLocalChatOpened(isChatOpened)
        setLocalChatOpened(chatInstantEnabled)

    }, [isChatOpened, chatInstantEnabled])


    const addNewChat = () => {

        if (!isChatOpened) return
        // disablePointerEvents(1000)
        setChatInstantEnabled(false)
        setTimeout(() => {
        unSelectChat()
        closeChat()}, 500)

    }



    const handleSendMessage = (inputValue) => {

        if (!sendButtonEnabled) return
        if (messageText.trim() === '') return
        setMessageText('')

        
        setTimeout(() => {
            toggleChat()

        }, 1000)

        if (selectedChat === false) {

            // REST : POST /{organization_id}/chats Create Chat

            // websockets связь

            const id = uuidv4(); 
            let initialState = [...data]

            setLocalChatOpened(true)


            initialState.push(
                {
                    title: inputValue,
                    id: id,
                    message: [
                        {
                            "author": "user",
                            "message": inputValue.trim(),
                            "date": "1"
                        },
                        {
                            "author": "ai",
                            "title": "lorem ipsum",
                            "message": "4343234 ipsum 4343234 sit lorem ipsum dolor sitlorem 4343234 dolor sit lorem 4343234 dolor sitlorem ipsum 4343234 sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sit",
                            "date": "1",
                        },
                    ]
                }   
            )

            setData(initialState)
            handleSelectChat(id)
            
        } else {

            let initialState = {...selectedChat}
            let initialData = [...data]

            setTimeout(()=> {document.documentElement.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            })}, 100)
            
            // websockets связь

            
            initialState.message.push(

                {
                    "author": "user",
                    "message": inputValue,
                    "date": "1"
                },
                {
                    "author": "ai",
                    "title": "",
                    "message": "",
                    "date": "1",
                },
            )    
            
            // setData(initialState)
            hardSetSelectedChat(initialState)
            console.log(data)
            console.log(selectedChat)



        }
    }

    const mainRef = useRef()
    const [firstRender, setFirstRender] = useState(true)


    useEffect(() => {


        mainRef.current.classList.remove('main-sidebar-opened-instant')
        mainRef.current.classList.remove('main-sidebar-closed-instant')

        if (isSidebarHidden) {
            mainRef.current.classList.add('main-sidebar-closed-animation')
            mainRef.current.classList.remove('main-sidebar-opened-animation')
        } else {
            mainRef.current.classList.add('main-sidebar-opened-animation')
            mainRef.current.classList.remove('main-sidebar-closed-animation')
        }


        // if (localChatOpened || isChatOpened) {
        //     mainRef.current.classList.remove('main-sidebar-opened-animation')
        //     mainRef.current.classList.remove('main-sidebar-closed-animation')
        //     mainRef.current.classList.remove('main-sidebar-closed-instant')
        //     mainRef.current.classList.remove('main-sidebar-opened-instant')


        // }

    }, [isSidebarHidden])


    useEffect(() => {
        

        if (isSidebarHidden) {
            mainRef.current.classList.add('main-sidebar-closed-instant')
            mainRef.current.classList.remove('main-sidebar-opened-instant')
            

        } else if (!isSidebarHidden) {
            mainRef.current.classList.add('main-sidebar-opened-instant')
            mainRef.current.classList.remove('main-sidebar-closed-instant')
            
        }

        mainRef.current.classList.remove('main-sidebar-opened-animation')
        mainRef.current.classList.remove('main-sidebar-closed-animation')

        setFirstRender(false)
    }, [])

    
    const [newChatImgSrc, setNewChatImgSrc] = useState(newChatButtonURL);
    const [addFileImgSrc, setAddFileImgSrc] = useState(addFileButtonURL)


    return (
        <div ref={mainRef} className='main'> 


        {localChatOpened || isChatOpened ? (

            <>

                { isChatOpened && <Messenger />}

                <div className='main__text chat-opened__opacity-fade-out'>
                    <h1 className='hello-text-n1 hello-text-n1-chatOpened '> 
                        Legal <strong>{' AI '}</strong> приветствует вас.
                    </h1> 

                    <h2 className='hello-text-n2 hello-text-n2-chatOpened'> 
                        Задайте мне вопрос
                    </h2>
                </div>
                

            



            </>
        )
        
        
        : (

            <>
                <div className='main__text chat-opened__opacity-fade-in'>
                    <h1> 
                        Legal <strong>{' AI '}</strong> приветствует вас.
                    </h1> 

                    <h2> 
                        Задайте мне вопрос
                    </h2>
                </div>



            </>
        )}

            
                <div className={localChatOpened || isChatOpened ? 'animated-frame-parent fade-out__animated-frame' : 'animated-frame-parent fade-in__animated-frame'}>
                    <div className='fade-top'> </div>
                    <video
                        className="animated-frame"
                        src={animatedFrameURL}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>

            <div ref={inputSectionRef} className={localChatOpened || isChatOpened ? 'input-section input-section-chatOpened' : 'input-section'}>



                <textarea ref={textareaRef} value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder='Начните писать'   />

                <div className='input-section__input-footer'> 

                    <div className='input-section__input-footer__container-n1'>

                        {/* <div className='input-section__input-footer__container-n1__button-container-n1'>

                            <button> <img src={flagUzbURL} alt="flag-uzbekistan" /> </button>
                            <button> <img src={copyButtonURL} alt="copy-button" /></button> 
                            
                        </div> */}

                        <div onMouseEnter={() => setNewChatImgSrc(newChatButtonHoverURL)} onMouseLeave={() => setNewChatImgSrc(newChatButtonURL)} onClick={() => addNewChat()} className='input-section__input-footer__container-n1__button-container-n2'> <button> <img src={newChatImgSrc} alt="new-chat-button" /> </button></div>
                        <div onMouseEnter={() => setAddFileImgSrc(addFileButtonHoverURL)} onMouseLeave={() => setAddFileImgSrc(addFileButtonURL)} className='input-section__input-footer__container-n1__button-container-n3'> <button> <img src={addFileImgSrc} alt="add-file-button" /> </button> </div>

                    </div>


                    <div className='input-section__input-footer__container-n2'>

                        <div onClick={() => setIsExplainEnabled(!isExplainEnabled)} className={isExplainEnabled ? 'input-section__input-footer__container-n2__button-container-n1 enabled' : 'input-section__input-footer__container-n2__button-container-n1'}> <button className='input-section__input-footer__container-n2__button-container-n1__button'> <img src={isExplainEnabled ? moreInfoButtonEnabledURL : moreInfoButtonURL} alt="more-info-button" /> </button> </div>

                        <div onClick={() => handleSendMessage(messageText)} className={sendButtonEnabled ? 'input-section__input-footer__container-n2__button-container-n2' : 'input-section__input-footer__container-n2__button-container-n2 disabled'}> <button className='input-section__input-footer__container-n2__button-container-n2__button'> <img src={sendButtonURL} alt="send-button" /> </button> </div>
                        
                    </div>


                </div>
            </div>

        

        </div>
        
    )
}

export default Main