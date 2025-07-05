
import animatedFrameURL from './video/animated-frame.mp4'

import './SettingsAnimatedFrame.css'
const SettingsAnimatedFrame = () => {

    return (
        <>
        

            <div className='settings-animated-frame-parent'>
                <div className='settings-fade-bottom'> </div>

                <video 
                className='settings-animated-frame'
                src={animatedFrameURL}
                autoPlay
                loop
                muted
                playsInline
                ></video>
            </div>
        </>
    )
}
export default SettingsAnimatedFrame