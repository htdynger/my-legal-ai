import { useChatStore } from '../../store/useChatStore'
import copyURL from './items/copy.png'
import  likeURL from './items/like.png'
import dislikeURL from './items/dislike.png'
import reSendURL from './items/reSend.png'
import docxURL from './items/docx.png'
import saveURL from './items/save.png'
import './MiniMessenger.css'
import RotateTriangle from '../../animation/RotateTriangle/RotateTriangle'
import { useEffect } from 'react'





const MiniMessenger = () => {

    const { selectedChat, data, setSendButtonEnabled } = useChatStore()

    console.log(data)
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

        <section className="mini-messenger-app">

                {Array.isArray(selectedChat.message) && selectedChat.message.map((element) => {
                    if (element.author === 'user') return <div key={element.id} className='user-mini-message'> {element.message} </div>
                    if (element.author === 'ai') return (

                        <div className='ai-mini-message-app'>

                            {
                                element.message ? 
                                <>
                                    <section>
                                        <span> {element.message} </span>
                                    </section>

                                    <div className='ai-mini-message-file'>

                                        <div className='ai-mini-message-file__icon'> <img src={docxURL} alt="document" /> </div>

                                        <div className='ai-mini-message-file__text'> 
                                            <p> Договор о передаче прав</p>
                                            <p> DOCX 10 Gb </p>
                                        </div>

                                        <div className='ai-mini-message-file__save'>
                                            <button>
                                                <img src={saveURL} alt="save" />
                                            </button>
                                        </div>
                                    </div>

                                    <footer>
                                        <button><img src={copyURL} alt="copy-message" /></button>
                                        <button><img src={likeURL} alt="like-message" /></button>
                                        <button><img src={dislikeURL} alt="dislike-message" /></button>
                                        <button><img src={reSendURL} alt="re-send-message" /></button>
                                    </footer>

                                </> 
                                :
                                <RotateTriangle />

                            }
                            


                        </div>
                    )
                })}
        </section>
    )
}

export default MiniMessenger