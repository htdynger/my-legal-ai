
import './AuthAnimatedFrame.css'
import authAnimatedFrameURL from './video/auth-animated-frame.mp4'
import mobileAuthAnimatedFrameURL from './video/mobile-auth-animated-frame.mp4'

import { useVisualStore } from '../../store/useVisualStore'

const AuthAnimatedFrame = () => {

    const { windowLayout } = useVisualStore()
    return (

        <>

            <div className='auth-animated-frame-parent'>
                <div className='auth-fade-bottom'> </div>

                <video 
                className='auth-animated-frame'
                src={windowLayout.width > 440 ? authAnimatedFrameURL : mobileAuthAnimatedFrameURL}
                autoPlay
                loop
                muted
                playsInline
                ></video>
            </div>




            {/* {windowLayout.width <= 750 && 
            
            <div className='auth-animated-frame-parent'>
                <div className='auth-fade-bottom'> </div>

                <video 
                className='auth-animated-frame'
                src={authAnimatedFrameURL}
                autoPlay
                loop
                muted
                playsInline
                ></video>
            </div>} */}

        </>


    )
}

export default AuthAnimatedFrame