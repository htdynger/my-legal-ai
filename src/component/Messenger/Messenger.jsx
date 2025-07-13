import './Messenger.css'
import './750.css'

import copyURL from './items/copy.png'
import  likeURL from './items/like.png'
import dislikeURL from './items/dislike.png'
import reSendURL from './items/reSend.png'

import { useState, useRef, useEffect } from 'react'

import { useChatStore } from '../../store/useChatStore'
import { useVisualStore } from '../../store/useVisualStore'
import DotJump from '../../animation/DotJump/DotJump'
import RotateTriangle from '../../animation/RotateTriangle/RotateTriangle'


import ReactMarkdown from 'react-markdown'
import axios from 'axios'



const Messenger = ({ messages, setMessages }) => {
    
    const { selectedChat, data, setSendButtonEnabled } = useChatStore()
    const { chatInstantEnabled } = useVisualStore()

    

    const [apiMessages, setApiMessages] = useState([])

    const getMessages = async () => {
        try {
            const res = await axios.get(`https://dev-api.ascender-ai.com/api/agents/1/messages/${selectedChat}`, {
                params: {
                    page: 1,
                    page_size: 200,
                }
            })
            console.log(res.data)
            let arr = res.data.data

            arr.reverse()

            setMessages(arr)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        setTimeout(() => {

    
            getMessages()     
        }, 10)
        

        
    }, [selectedChat])


    useEffect(() => {

        setTimeout(() => {

    
            getMessages()     
        }, 10)
        

        
    }, [])

    


    // console.log(data)

    const messengerWrapperRef = useRef()
    const messengerAppRef = useRef()

    useEffect(() => {
        void messengerAppRef.current.offsetWidth
        
    }, [chatInstantEnabled])

    // console.log(selectedChat)
    useEffect(() => {

        // setTimeout(() => {


        //     setLocalMessages(JSON.parse(localStorage.getItem(selectedChat)))
        // }, 1)

        

        messengerWrapperRef.current.classList.remove('messenger-wrapper-animation')

        void messengerWrapperRef.current.offsetWidth

        messengerWrapperRef.current.classList.add('messenger-wrapper-animation')

    }, [selectedChat])

    

    useEffect(() => {
        console.log('selectedChat changed')
        if (!messages || messages == [] || messages.length < 0) return
        
        if (messages && messages.length > 0 && messages[messages.length - 1].message_type === 'ai_message') {
            
            setSendButtonEnabled(true)


            setTimeout(()=> {document.documentElement.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            })}, 500)

        }
        if (messages && messages.length > 0 && messages[messages.length - 1].message_type !== 'ai_message') {
            
            setSendButtonEnabled(false)
            setTimeout(()=> {document.documentElement.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            })}, 10)
        
        }

        // if (messages[messages.length - 1].message_type === 'ai_message' && messages[messages.length - 1].message_type === '') alert(1)

            // alert(messages[messages.length - 1].message_type)
        // if (!data.message) return
        // if (data.message[data.message.length -1].message === '') setSendButtonEnabled(false)
        // if (data.message[data.message.length -1].message !== '') setSendButtonEnabled(true)

        



    }, [messages]) 




    // const [localMessages, setLocalMessages] = useState([])

    // useEffect(() => {
    //     setTimeout(() => {


    //         setLocalMessages(JSON.parse(localStorage.getItem(selectedChat)))
    //     }, 1)
    // }, [messages])
    

    return (

        <div ref={messengerWrapperRef} className='messenger-wrapper'>  
            <section ref={messengerAppRef} className={chatInstantEnabled ? "messenger-app" : "messenger-app fade-out-animation"}>

                {Array.isArray(messages) && messages && messages.map((message, index) => {
                    if (message.message_type === 'customer_message') return (
                        <>
                            <div key={index} className='user-message-container'> 
                                <div className='user-message'> {message.content} </div> 
                            </div>


                        </>
                        
                    )
                    if (message.message_type === 'ai_message') return (

                    <div className='ai-message-container'> 

                        



                        <div className='ai-message-app'>

                                {/* <header>
                                    <span> Заголовок </span>
                                </header> */}

                                <section>
                                    {/* <span> {localMessage.content} </span> */}

                                    <ReactMarkdown>
                                        
                                        {/* {localMessage.content} */}
                                        {message.content}
                                    </ReactMarkdown>
                                </section>

                                <footer>
                                    <button><img src={copyURL} alt="copy-message" /></button>
                                    <button><img src={likeURL} alt="like-message" /></button>
                                    <button><img src={dislikeURL} alt="dislike-message" /></button>
                                    <button><img src={reSendURL} alt="re-send-message" /></button>
                                </footer> 

                        </div>
                    </div>

                    )


                })}

                {messages && messages.length > 0 && messages[messages.length - 1].message_type !== 'ai_message' && <div className='ai-message-container'> <div className='ai-message-app'> <RotateTriangle /> </div> </div>} 

            </section>
        </div>

    )
}

export default Messenger