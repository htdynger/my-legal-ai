
// import MobileNavSection from "../../MobileNavSection/MobileNavSection"
import MobileNavSection from '../MobileNavSection/MobileNavSection.jsx'

const MobileInputFooter = ({ translateY, isSwiping, handleTouchStart, handleTouchMove, handleTouchEnd, messageText, setMessageText, mobileNewChatURL, mobileAddFileURL, mobileExplainURL, handleSendMessage, mobileSendMessageURL, setTranslateY }) => {


    return (
        <>
        <div className='main-750__footer-layout'> </div>
                <div 
                    className={translateY > 350 ? 'main-750__footer-wrapper main-750__footer-wrapper__fade-in-animation' : 'main-750__footer-wrapper main-750__footer-wrapper__fade-out-animation'}
                    style={{ height: `${134 + translateY}px`, transition: isSwiping ? 'none' : 'height 0.5s ease'}}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <footer className='main-750__footer'> 
                        <div className="footer-shadow"></div>
                        <div className="footer-handle"></div>

                        <div className='main-750__footer__content-wrapper'>
                            <section>
                                <div className='main-750__footer__section__textarea-section'>
                                    <textarea 
                                        // ref={textareaRef} 
                                        value={messageText} 
                                        onChange={(e) => setMessageText(e.target.value)} 
                                        placeholder='Начните писать'
                                    />
                                </div>
                                <div className='main-750__footer__section__button-section'>
                                    <div className='main-750__footer__section__button-section__column-1'>
                                        <div><button><img src={mobileNewChatURL} alt="new-chat" /></button></div>
                                        <div><button><img src={mobileAddFileURL} alt="add-file" /></button></div>
                                    </div>
                                    <div className='main-750__footer__section__button-section__column-2'>
                                        <div><button><img src={mobileExplainURL} alt="explain" /></button></div>
                                        <div onClick={() => handleSendMessage(messageText)}>
                                            <button><img src={mobileSendMessageURL} alt="send-message" /></button>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <div className={translateY > 490 ? 'main-750__footer__nav main-750__footer__nav__fade-in-animation' : 'main-750__footer__nav main-750__footer__nav__fade-out-animation'}>
                                <MobileNavSection setTranslateY={setTranslateY} />
                            </div>
                        </div>
                    </footer>


                </div>
        </>
    )
}


export default MobileInputFooter