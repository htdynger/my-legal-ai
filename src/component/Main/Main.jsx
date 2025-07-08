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

import MobilePro from '../mobile/MobilePro/MobilePro.jsx'
import MobileSettings from '../mobile/MobileSettings/MobileSettings.jsx'

import axios from 'axios'
// import { Socket } from 'socket.io-client'
import { socket } from '../../utils/hooks/Socket.js'
import { useSocket } from '../../utils/hooks/useSocket.js'

const Main = () => {

    const navigate = useNavigate()
    const textareaRef = useRef(null);
    const inputSectionRef = useRef(null)


    const { isChatOpened, toggleChat, chatInstantEnabled, setChatInstantEnabled, closeChat, isSidebarHidden, windowLayout, isMobileSidebarHidden, setIsMobileSidebarHidden } = useVisualStore();
    const { selectedChat, handleSelectChat, data, setData, unSelectChat, setIsExplainEnabled, isExplainEnabled, sendButtonEnabled, hardSetSelectedChat, apiChatsData ,setApiChatsData } = useChatStore()

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        console.log(messages)
    }, [messages])

    useSocket((msg) => {
        setMessages((prev) => [...prev, msg]);
    });

    const sendMessage = () => {
        const payload = {
          content: 'Hi!',
          chat_id: 'd540a398-ceb4-4e3d-9cc6-c9ce6d07a967',
          message_type: "customer_message",
        };
      
        console.log("📤 Отправка:", payload);
        console.log("Сокет подключён?", socket.connected); 
      
        socket.emit("chat-message", payload, (response) => {
            console.log("📩 Ответ от сервера:", response);
          });
    };


    setTimeout(() => {

        
        socket.emit("ping", () => {
            console.log("ping ответ получен");
          });
          sendMessage()

    }, 2000)




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



    const token = localStorage.getItem('access_token')
    const client_id = localStorage.getItem('client_id')


    const checkAuthenticated = async () => {

        if (!token) {
            navigate('/sign-in');
            return;
        }

        try {
            const res = await axios.get('api/me', {
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
            const res = await axios.get('/ascender/api/v1/1/chats', {
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

        try {
            const res = await axios.post(
                
                '/ascender/api/v1/1/chats', 
                {
                    "name": "newChat",
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

            // REST : POST /{organization_id}/chats Create Chat

            // websockets связь



            createChat().then(() => getChats())



            // const id = uuidv4(); 
            // let initialState = [...data]

            // setLocalChatOpened(true)


            // initialState.push(
            //     {
            //         title: inputValue,
            //         id: id,
            //         message: [
            //             {
            //                 "author": "user",
            //                 "message": inputValue.trim(),
            //                 "date": "1"
            //             },
            //             {
            //                 "author": "ai",
            //                 "title": "lorem ipsum",
            //                 "message": "4343234 ipsum 4343234 sit lorem ipsum dolor sitlorem 4343234 dolor sit lorem 4343234 dolor sitlorem ipsum 4343234 sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sit",
            //                 "date": "1",
            //             },
            //         ]
            //     }   
            // )

            // setData(initialState)
            setLocalChatOpened(true)


            
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

    return (

        <>
            {windowLayout.width > 750 && <div ref={mainRef} className='main'> 


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
                        {isChatOpened && <Messenger />}

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
                />

                
                    

                
                
                
            </section>}
        </>
        
        
    )
}

export default Main