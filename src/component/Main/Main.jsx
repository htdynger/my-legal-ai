import './Main.css'
import './chat-opened.css'
//  tested

// super testedsesd

// triple test
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

import MobilePro from '../mobile/MobilePro/MobilePro.jsx'
import MobileSettings from '../mobile/MobileSettings/MobileSettings.jsx'

import axios from 'axios'

import { connectAndSendMessage, disconnectSocket } from '../../utils/hooks/socketHelper.js';
const VITE_API_LEGAI = import.meta.env.VITE_API_LEGAI

const Main = () => {

    const navigate = useNavigate()
    const textareaRef = useRef(null);
    const inputSectionRef = useRef(null)


    const { isChatOpened, toggleChat, chatInstantEnabled, setChatInstantEnabled, closeChat, isSidebarHidden, windowLayout, isMobileSidebarHidden, setIsMobileSidebarHidden } = useVisualStore();
    const { selectedChat, handleSelectChat, data, setData, unSelectChat, setIsExplainEnabled, isExplainEnabled, sendButtonEnabled, hardSetSelectedChat, apiChatsData ,setApiChatsData } = useChatStore()

    const [messages, setMessages] = useState([]);

    // useEffect(() => {

    //     
    // }, [selectedChat])

    // useEffect(() => {

    //     console.log(messages)

    //     if (messages && messages.length > 0 ) {
    //         localStorage.setItem(selectedChat, JSON.stringify(messages))
    //     }

    // }, [messages])

    useEffect(() => {
        localStorage.setItem('chat_id', selectedChat)

    }, [selectedChat])


    const handleIncomingMessage = (data) => {
        console.log("🎯 Получено сообщение:", data);

        setMessages((prev) => [...prev, data]);

        // localStorage.setItem(selectedChat, messages)
    };

    const send = async (content) => {
        await connectAndSendMessage(content, handleIncomingMessage);

        


        // if (!messages || messages == []) {

        //     setMessages([payload]);
        // } else if (messages) {
        // }



    };


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
            closeChat()
            setMessages([])

        }, 500)

        disconnectSocket()

    }



    const token = localStorage.getItem('access_token')
    const client_id = localStorage.getItem('client_id')


    const checkAuthenticated = async () => {

        if (!token) {
            navigate('/sign-in');
            return;
        }

        try {
            const res = await axios.get(`api/accounts/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })

            console.log(`user: ${JSON.stringify(res.data)}`)

            localStorage.setItem('client_id', res.data.id)

        } catch (err) {
            console.log(err.message)
            navigate('/sign-in')
            
        }
    }

    const getChats = async () => {

        try {
            const res = await axios.get('/api/v1/1/chats', {
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





    
    const createChat = async () => {


        const date = new Date();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedTime = `Чат ${hours}:${minutes}`;

        try {
            const res = await axios.post(
                
                '/api/v1/1/chats', 
                {
                    "name": formattedTime,
                    "agent_id": 1,
                    "organization_id": 1,
                    "mode": "agent_autopilot",
                    "platform": "unknown",
                    "responsible": 0,
                    "client_id": client_id,
                    "created_by_id": 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                

                })


                handleSelectChat(res.data.id)

        } catch (err) {
            console.log(err.message)
        }
    }



    const handleSendMessage = (inputValue) => {

        if (!sendButtonEnabled) return
        if (messageText.trim() === '') return
        setMessageText('')

        
        
        setTimeout(() => {
            toggleChat()

        }, 1000)

        

        

        if (selectedChat === false) {


            setLocalChatOpened(true)

            const payload = {
                content: inputValue,
                chat_id: selectedChat,
                message_type: "customer_message",
            }
            setMessages((prev) => [...prev, payload]);

            createChat().then(() => getChats()).then(() => send(inputValue))





            
        } else {

            const payload = {
                content: inputValue,
                chat_id: selectedChat,
                message_type: "customer_message",
            }

            setMessages((prev) => [...prev, payload]);

            send(inputValue)



            // hardSetSelectedChat(initialState)
            // console.log(data)
            // console.log(selectedChat)



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



    useEffect(() => {

        checkAuthenticated()

        if (windowLayout.width <= 750) {

        }

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


    startYRef.current = e.touches[0].clientY;
    startHeightRef.current = 134 + translateY; // фиксируем текущее значение
    setIsSwiping(true);
};

const handleTouchMove = (e) => {
    if (!footerRevealer) return




    const deltaY = startYRef.current - e.touches[0].clientY;
    const newHeight = startHeightRef.current + deltaY;
    const clampedHeight = Math.min(Math.max(newHeight, 134), 509);
    setTranslateY(clampedHeight - 134);

};

const handleTouchEnd = () => {
    if (!footerRevealer) return

    
    setIsSwiping(false);

    const threshold = (509 - 134) * 0.05; 

    // if (isOpen) {
    //     threshold = (633 - 134) * 0.99; 
    // }
    // if (!isOpen) {
    //     threshold = (633 - 134) * 0.05; 
    // }
    

    const currentHeight = 134 + translateY;

    // if (currentHeight - 134 > threshold) {
    //     setIsOpen(true);
    //     setTranslateY(509 - 134);
    // } else {
    //     setIsOpen(false);
    //     setTranslateY(0);
    // }


    if (currentHeight - 134 > 10 && isOpen === false) {
        setIsOpen(true);
        setTranslateY(509 - 134);
    } else if (currentHeight - 134 < 499 && isOpen === true) {
        setIsOpen(false);
        setTranslateY(0);
    }
};


const instantToggle = () => {
    if (isOpen === false) {

        setIsOpen(true);
        setTranslateY(509 - 134);

    } else if (isOpen === true) {
        
        setIsOpen(false);
        setTranslateY(0);
    }
}

const handleSubmit = () => {
    if (inputFormRef.current) {
        inputFormRef.current.requestSubmit();
    }
}


    
const inputFormRef = useRef()

    return (

        <>
            {windowLayout.width > 750 && <div ref={mainRef} className='main'> 


                {localChatOpened || isChatOpened ? (

                    <>

                        { isChatOpened && <Messenger messages={messages} setMessages={setMessages} />}

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


            {windowLayout.width <= 750 && <section className='main-750'> 
                


                {location.pathname === '/' && <>

                    <MobileSidebar />

                    <div className='main-750__header-layout'> </div>
                    <header className='main-750__header'> 
                        <div>
                            <button onClick={() => setIsMobileSidebarHidden(false)}><img src={bookURL} alt="idk" /></button>

                        </div>

                        <div>
                            <button>
                                <img src={mobileLogoURL} alt="logo" />
                                <span> Pro </span>
                            </button>
                        </div>

                        <div>

                        </div>
                    </header>
                    



                    <main>
                        {isChatOpened && <Messenger messages={messages} setMessages={setMessages} />}

                        <span className={localChatOpened || isChatOpened ? 'main-750__main__span__fade-out-animation' : 'main-750__main__span__fade-in-animation'}>
                            <h1>Legal <p> AI </p> </h1>
                            <p> приветствует вас. </p>
                            <h2> Задайте мне вопрос </h2>
                        </span>

                    </main>
                </>}


                {location.pathname === '/info' && <>
                
                
                    <MobileInfo />

                
                </>}

                {location.pathname === '/pro' && <>
                
                
                    <MobilePro />

                
                </>}



                {location.pathname === '/settings' && <>
                    
                    <MobileSettings />
                
                </>}
                



                <MobileInputFooter 
                    translateY={translateY} 
                    isSwiping={isSwiping} 
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    messageText={messageText} 
                    setMessageText={setMessageText}
                    mobileNewChatURL={mobileNewChatURL}
                    mobileAddFileURL={mobileAddFileURL}
                    mobileExplainURL={mobileExplainURL}
                    handleSendMessage={handleSendMessage}
                    mobileSendMessageURL={mobileSendMessageURL}
                    setTranslateY={setTranslateY}

                    addNewChat={addNewChat}

                    instantToggle={instantToggle}
                />

                
                    

                
                
                
            </section>}
        </>
        
        
    )
}

export default Main