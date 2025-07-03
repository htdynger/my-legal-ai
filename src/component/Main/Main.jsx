import './Main.css'
import './chat-opened.css'

import './1440.css'
import './750.css'
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

import bookURL from './items/mobile/book.svg'
import mobileLogoURL from './items/mobile/mobileLogo.svg'
import mobileAddFileURL from './items/mobile/mobileAddFile.svg'
import mobileExplainURL from './items/mobile/mobileExplain.svg'
import mobileNewChatURL from './items/mobile/mobileNewChat.svg'
import mobileSendMessageURL from './items/mobile/mobileSendMessage.svg'

import Messenger from '../Messenger/Messenger'
import MobileInputFooter from '../mobile/MobileInputFooter/MobileInputFooter.jsx'


import { useVisualStore } from '../../store/useVisualStore';
import { useChatStore } from '../../store/useChatStore'

import { useState, useEffect, useRef } from 'react'

import { v4 as uuidv4 } from 'uuid';
import MobileInfo from '../mobile/MobileInfo/MobileInfo.jsx'

import MobileSidebar from '../mobile/MobileSidebar/MobileSidebar.jsx'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import MobilePro from '../mobile/MobilePro/MobilePro.jsx'
import { useCountdown } from '../../hooks/countdown'
import './Predeploy.css'

const Main = () => {


    const textareaRef = useRef(null);
    const inputSectionRef = useRef(null)






    const { isChatOpened, toggleChat, chatInstantEnabled, setChatInstantEnabled, closeChat, isSidebarHidden, windowLayout, isMobileSidebarHidden, setIsMobileSidebarHidden } = useVisualStore();
    const { selectedChat, handleSelectChat, data, setData, unSelectChat, setIsExplainEnabled, isExplainEnabled, sendButtonEnabled, hardSetSelectedChat } = useChatStore()

    const [messageText, setMessageText] = useState('')
    
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
                            "message": " sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sit",
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


        if (windowLayout.width <= 750) return

        mainRef.current.classList.remove('main-sidebar-opened-instant')
        mainRef.current.classList.remove('main-sidebar-closed-instant')

        if (isSidebarHidden) {
            mainRef.current.classList.add('main-sidebar-closed-animation')
            mainRef.current.classList.remove('main-sidebar-opened-animation')
        } else {
            mainRef.current.classList.add('main-sidebar-opened-animation')
            mainRef.current.classList.remove('main-sidebar-closed-animation')
        }
    }, [isSidebarHidden])


    const navigate = useNavigate()

    useEffect(() => {



        if (isSidebarHidden) {
            mainRef.current.classList.add('main-sidebar-closed-instant')
            mainRef.current.classList.remove('main-sidebar-opened-instant')
            

        } else if (!isSidebarHidden) {

            if (windowLayout.width <= 750) return

            mainRef.current.classList.add('main-sidebar-opened-instant')
            mainRef.current.classList.remove('main-sidebar-closed-instant')
            
        }

        mainRef.current.classList.remove('main-sidebar-opened-animation')
        mainRef.current.classList.remove('main-sidebar-closed-animation')

        setFirstRender(false)
    }, [])

    
    const [newChatImgSrc, setNewChatImgSrc] = useState(newChatButtonURL);
    const [addFileImgSrc, setAddFileImgSrc] = useState(addFileButtonURL)



    const [translateY, setTranslateY] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [isSwiping, setIsSwiping] = useState(false);
const startYRef = useRef(0);
const startHeightRef = useRef(134); // сохраняем стартовую высоту футера'

const [footerRevealer, setFooterRevealer] = useState(true)

useEffect(() => {   
    setFooterRevealer(false)

    setTimeout(() => {
        setFooterRevealer(true)
    }, 500)

}, [isOpen])



const handleTouchStart = (e) => {
    
    if (!footerRevealer) return

    if (isOpen) {
        setTimeout(() => {
            setIsOpen(false);
            setTranslateY(0);
        }, 300)
        return
    }
    startYRef.current = e.touches[0].clientY;
    startHeightRef.current = 134 + translateY; // фиксируем текущее значение
    setIsSwiping(true);
};

const handleTouchMove = (e) => {
    if (!footerRevealer) return

    const deltaY = startYRef.current - e.touches[0].clientY;
    const newHeight = startHeightRef.current + deltaY;
    const clampedHeight = Math.min(Math.max(newHeight, 134), 633);
    setTranslateY(clampedHeight - 134);

};

const handleTouchEnd = () => {
    if (!footerRevealer) return

    
    setIsSwiping(false);

    const threshold = (633 - 134) * 0.05; 

    // if (isOpen) {
    //     threshold = (633 - 134) * 0.99; 
    // }
    // if (!isOpen) {
    //     threshold = (633 - 134) * 0.05; 
    // }
    

    const currentHeight = 134 + translateY;

    if (currentHeight - 134 > threshold) {
        // Открыть
        setIsOpen(true);
        setTranslateY(633 - 134);
    } else {
        // Закрыть
        setIsOpen(false);
        setTranslateY(0);
    }
};


const handleSubmit = () => {
    if (inputFormRef.current) {
        inputFormRef.current.requestSubmit();
    }
}


    
const inputFormRef = useRef()
const time = useCountdown()

    return (

        <>
            {windowLayout.width > 750 && <div ref={mainRef} className='main'> 


                {localChatOpened || isChatOpened ? (

                    <>

                        { isChatOpened && 
                        <>
                            <Messenger />
                            <div className='predeploy'> 


                                <h1 className='animatedText'> COMING SOON</h1>
                                <h2>                                {time}</h2>
                            </div>
                        </>

                        }

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

                        <form ref={inputFormRef}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(messageText);
                        }}>

                            <textarea
                                ref={textareaRef}
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Начните писать"
                                onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault(); // чтобы не было переноса строки
                                    e.currentTarget.form.requestSubmit(); // инициируем submit формы
                                }
                                }}
                            />

                                <div className='input-section__input-footer'> 

                                    <div className='input-section__input-footer__container-n1'>

                                        {/* <div className='input-section__input-footer__container-n1__button-container-n1'>

                                            <button> <img src={flagUzbURL} alt="flag-uzbekistan" /> </button>
                                            <button> <img src={copyButtonURL} alt="copy-button" /></button> 
                                            
                                        </div> */}

                                        <div onMouseEnter={() => setNewChatImgSrc(newChatButtonHoverURL)} onMouseLeave={() => setNewChatImgSrc(newChatButtonURL)} onClick={() => addNewChat()} className='input-section__input-footer__container-n1__button-container-n2'> <button type='button'> <img src={newChatImgSrc} alt="new-chat-button" /> </button></div>
                                        <label
  onMouseEnter={() => setAddFileImgSrc(addFileButtonHoverURL)}
  onMouseLeave={() => setAddFileImgSrc(addFileButtonURL)}
  className='input-section__input-footer__container-n1__button-container-n3 file-upload-button'
  style={{ cursor: 'pointer' }}
>
  <input
    type="file"
    style={{ display: 'none' }}
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Файл выбран:', file);
        // здесь можешь сразу вызывать setFile или upload функцию
      }
    }}
  />
  <img src={addFileImgSrc} alt="add-file-button" />
</label>

                                    </div>


                                    <div className='input-section__input-footer__container-n2'>

                                        <div onClick={() => setIsExplainEnabled(!isExplainEnabled)} className={isExplainEnabled ? 'input-section__input-footer__container-n2__button-container-n1 enabled' : 'input-section__input-footer__container-n2__button-container-n1'}> <button type='button' className='input-section__input-footer__container-n2__button-container-n1__button'> <img src={isExplainEnabled ? moreInfoButtonEnabledURL : moreInfoButtonURL} alt="more-info-button" /> </button> </div>

                                        <div onClick={() => handleSubmit()} className={sendButtonEnabled ? 'input-section__input-footer__container-n2__button-container-n2' : 'input-section__input-footer__container-n2__button-container-n2 disabled'}> <button type='submit' className='input-section__input-footer__container-n2__button-container-n2__button'> <img src={sendButtonURL} alt="send-button" /> </button> </div>
                                        
                                    </div>


                                </div>
                            </form>
                        </div>
                    {/* </form> */}



                </div>}


            {windowLayout.width <= 750 && <div className='predeploy-mobile'>
                <h1> COMING SOON </h1>
                <h2> {time} </h2>    
            </div> }
        </>
        
        
    )
}

export default Main