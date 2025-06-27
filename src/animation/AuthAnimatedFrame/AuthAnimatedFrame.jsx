
import './AuthAnimatedFrame.css'
import authAnimatedFrameURL from './video/auth-animated-frame.mp4'

import { useVisualStore } from '../../store/useVisualStore'

const AuthAnimatedFrame = () => {

    const { windowLayout } = useVisualStore()
    return (

        <>

            {windowLayout.width > 750 && <div className='auth-animated-frame-parent'>
                <div className='auth-fade-bottom'> </div>

                <video 
                className='auth-animated-frame'
                src={authAnimatedFrameURL}
                autoPlay
                loop
                muted
                playsInline
                ></video>
            </div>}




            {windowLayout.width <= 750 && 
            
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
            </div>}

        </>


    )
}

export default AuthAnimatedFrame