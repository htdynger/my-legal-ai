import './Messenger.css'

import copyURL from './items/copy.png'
import  likeURL from './items/like.png'
import dislikeURL from './items/dislike.png'
import reSendURL from './items/reSend.png'

import { useState, useRef, useEffect } from 'react'

import { useChatStore } from '../../store/useChatStore'
import { useVisualStore } from '../../store/useVisualStore'
import DotJump from '../../animation/DotJump/DotJump'
import RotateTriangle from '../../animation/RotateTriangle/RotateTriangle'


const Messenger = () => {
    
    const { selectedChat, data, setSendButtonEnabled } = useChatStore()
    const { chatInstantEnabled } = useVisualStore()




    
    console.log(data)
    console.log(selectedChat)

    const messengerWrapperRef = useRef()
    const messengerAppRef = useRef()

    useEffect(() => {
        void messengerAppRef.current.offsetWidth
        
    }, [chatInstantEnabled])


    useEffect(() => {
        
        messengerWrapperRef.current.classList.remove('messenger-wrapper-animation')

        void messengerWrapperRef.current.offsetWidth

        messengerWrapperRef.current.classList.add('messenger-wrapper-animation')

    }, [selectedChat])
    

    return (
        <div ref={messengerWrapperRef} className='messenger-wrapper'>  
            <section ref={messengerAppRef} className={chatInstantEnabled ? "messenger-app" : "messenger-app fade-out-animation"}>

                {Array.isArray(selectedChat.message) && selectedChat.message.map((element) => {
                    if (element.author === 'user') return <div className='user-message-container'> <div key={element.id} className='user-message'> {element.message} </div> </div> 
                    if (element.author === 'ai') return (

                    <div className='ai-message-container'> 

                        {/* <DotJump /> */}



                        <div className='ai-message-app'>

                            {element.title && element.message ? <>

                                {setSendButtonEnabled(true)}

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
                                {setSendButtonEnabled(false)}
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