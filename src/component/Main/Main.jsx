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





    const [localSelectedChat, setLocalSelectedChat] = useState(false)



    const a = localStorage.getItem('chat_id')
    const b = JSON.parse(a)
    const chatMessages = localStorage.getItem(b.id)

    const [messages, setMessages] = useState(chatMessages || []);

    useEffect(() => {
        console.log(messages)
        localStorage.setItem(b.id, JSON.stringify(messages))
    }, [messages])


    useEffect(() => {

        if (localStorage.getItem('chat_id')) {
            setLocalSelectedChat(localStorage.getItem('chat_id'))


            
            if (b.rendered === false) {

                const c = {
                    id: b.id,
                    value: b.value,
                    rendered: true
                }

                localStorage.setItem('chat_id', JSON.stringify(c))
                window.location.reload()

            } else if (b.rendered === true) {



                console.log(localChatOpened)
                const startChatFlow = async () => {
                    await getSessionToken();
                    await sendMessage(b.message);
                }
                startChatFlow()


                setLocalChatOpened(true)

                setTimeout(() => {
                    toggleChat()
        
                }, 1000)

                const c = {
                    id: b.id,
                    value: b.value,
                    rendered: null
                }

                localStorage.setItem('chat_id', JSON.stringify(c))

            } else {
                setLocalChatOpened(true)

                setTimeout(() => {
                    toggleChat()
        
                }, 1000)

                getSessionToken();
            }
        }



    }, [])


    useEffect(() => {

        hardSetSelectedChat(localSelectedChat)
        console.log(localSelectedChat)
    }, [localSelectedChat])


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


    const getSessionToken = async (chatId) => {
        const _chat = localStorage.getItem('chat_id')
        const _idChat = JSON.parse(_chat)

        // console.log(chat_test)

        try {
            const res = await axios.post('/ascender/api/v1/1/alp/initiate', {
                account_id: client_id,
                chats_to_listen: [
                    // chatId
                    _idChat.id
                    // 'f470f2ad-ee24-4786-b988-90966197e81d'
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });


    
            const session_token = res.data.session_token;
            localStorage.setItem('session_token', session_token);
    

            if (socket.connected) {
                socket.disconnect();

                console.log(1)
            }
            socket.auth = { token: session_token };
            socket.connect();
    
            return new Promise((resolve, reject) => {
                socket.once("connect", () => {
                    console.log("✅ Socket подключен:", socket.id);
    
                    // Навешиваем обработчики (один раз)
                    if (!socket.hasListeners("chat-message")) {
                        socket.on("chat-message", (res) => {
                            console.log("📥 chat-message:", res);

                            setMessages((prev) => {
                                const initialState = [...prev]

                                initialState.push(res)

                                return initialState
                            })

                        });
    
                        socket.on("chat-message-response", (res) => {
                            console.log("📥 chat-message-response:", res);

                            setMessages((prev) => {
                                const initialState = [...prev]

                                initialState.push(res)

                                return initialState
                            })

                        });
    
                        socket.on("error", (res) => {
                            console.log("📥 error:", res);

                            setMessages((prev) => {
                                const initialState = [...prev]

                                initialState.push(res)

                                return initialState
                            })

                        });
                    }
    
                    resolve();
                });
    
                socket.once("connect_error", (err) => {
                    console.error("❌ Ошибка подключения сокета:", err.message);
                    reject(err);
                });
            });
    
        } catch (err) {
            console.log("Ошибка getSessionToken:", err.message);
        }
    };
    
    






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

    
    const createChat = async (inputValue) => {

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


                const chatId = res.data.id


                const localStorageChatId = {
                    id: chatId,
                    rendered: false,
                    value: inputValue,
                }

                localStorage.setItem('chat_id', JSON.stringify(localStorageChatId))

                window.location.reload();

                return chatId

                
        } catch (err) {
            console.log(err.message)
        }
    }


    const sendMessage = (message) => {
        const _chat = localStorage.getItem('chat_id')
        const _idChat = JSON.parse(_chat)

        const payload = {
          content: message,
          chat_id: _idChat.id,

        //   
          message_type: "customer_message",
        };
      
        console.log("📤 Отправка:", payload);
        console.log("Сокет подключён?", socket.connected); 
      
        socket.emit("chat-message", payload, (response) => {
            console.log("📩 Ответ от сервера:", response);
          });


        setMessages((prev) => {
            const initialState = [...prev]

            initialState.push(payload)

            return initialState
        })
    };

    const handleSendMessage = (inputValue) => {

        if (!sendButtonEnabled) return
        if (messageText.trim() === '') return
        setMessageText('')



        
        setTimeout(() => {
            toggleChat()

        }, 1000)

        if (localSelectedChat === false) {

            // REST : POST /{organization_id}/chats Create Chat

            // websockets связь


            // createChat().then(() => getChats()).then(() => getSessionToken()).then(() => sendMessage())


            // getSessionToken()
        
            // sendMessage()

            const startChatFlow = async () => {
                const chatId = await createChat(inputValue);
                await getChats();
                await new Promise(res => setTimeout(res, 1)); // 👈 пауза в 1 секунду
                await getSessionToken();
                await sendMessage(inputValue);

            }

            startChatFlow()

            setLocalChatOpened(true)


            
        } else {


            setTimeout(()=> {document.documentElement.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            })}, 100)
            
            // websockets связь

          

            console.log(selectedChat)

            sendMessage(inputValue);

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

                        { isChatOpened && <Messenger messages={messages} />}

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