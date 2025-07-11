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

import axios from 'axios'



const Messenger = ({ messages }) => {
    
    const { selectedChat, data, setSendButtonEnabled } = useChatStore()
    const { chatInstantEnabled } = useVisualStore()


    const a = localStorage.getItem('chat_id')
    const b = JSON.parse(a)
    const token = localStorage.getItem('access_token')

    
    const getMessages = async () => {

        try {
            const res = await axios.get(`/ascender/api/agents/1/messages/${b.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                }
              })

              console.log(res.data)
        } catch (err) {

            console.log(err)
        }
    }

    const getChat = async () => {

        try {
            const res = await axios.get(`/ascender/api/v1/1/chats/${b.id}`, {
                header: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })

            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }


    // console.log(data)

    const messengerWrapperRef = useRef()
    const messengerAppRef = useRef()

    useEffect(() => {
        void messengerAppRef.current.offsetWidth
        
    }, [chatInstantEnabled])

    useEffect(() => {

        getMessages()
        // getChat()
    }, [])

    // console.log(selectedChat)
    useEffect(() => {



        

        messengerWrapperRef.current.classList.remove('messenger-wrapper-animation')

        void messengerWrapperRef.current.offsetWidth

        messengerWrapperRef.current.classList.add('messenger-wrapper-animation')

    }, [selectedChat.id])

    useEffect(() => {
        console.log('selectedChat changed')
        if (!selectedChat.message) return
        if (selectedChat.message[selectedChat.message.length - 1].author === 'ai' && selectedChat.message[selectedChat.message.length - 1].message === '') setSendButtonEnabled(false)
        if (selectedChat.message[selectedChat.message.length - 1].author !== 'ai' && selectedChat.message[selectedChat.message.length - 1].message !== '') setSendButtonEnabled(true)

        // if (!data.message) return
        // if (data.message[data.message.length -1].message === '') setSendButtonEnabled(false)
        // if (data.message[data.message.length -1].message !== '') setSendButtonEnabled(true)
    }, [selectedChat]) 
    

    return (

        <div ref={messengerWrapperRef} className='messenger-wrapper'>  
            <section ref={messengerAppRef} className={chatInstantEnabled ? "messenger-app" : "messenger-app fade-out-animation"}>

                {Array.isArray(selectedChat.message) && selectedChat.message.map((element) => {
                    if (element.author === 'user') return <div key={element.id} className='user-message-container'> <div className='user-message'> {element.message} </div> </div> 
                    if (element.author === 'ai') return (

                    <div className='ai-message-container'> 

                        {/* <DotJump /> */}



                        <div className='ai-message-app'>

                            {element.title && element.message ? <>



                                <header>
                                    <span> {element.title} </span>
                                </header>

                                <section>
                                    <span> {element.message} </span>
                                </section>

                                <footer>
                                    <button><img src={copyURL} alt="copy-message" /></button>
                                    <button><img src={likeURL} alt="like-message" /></button>
                                    <button><img src={dislikeURL} alt="dislike-message" /></button>
                                    <button><img src={reSendURL} alt="re-send-message" /></button>
                                </footer> 
                            </>
                            :
                            <>
                                <RotateTriangle />

                            </>

                            
                            }
                        </div>
                    </div>

                    )
                })}
            </section>
        </div>

    )
}

export default Messenger