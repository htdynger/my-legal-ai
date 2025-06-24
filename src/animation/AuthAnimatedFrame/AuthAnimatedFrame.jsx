
import './AuthAnimatedFrame.css'
import authAnimatedFrameURL from './video/auth-animated-frame.mp4'

const AuthAnimatedFrame = () => {

    return (


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
        </div>

    )
}

export default AuthAnimatedFrame