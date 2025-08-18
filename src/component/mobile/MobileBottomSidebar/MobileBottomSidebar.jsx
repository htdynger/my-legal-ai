
import { useEffect } from 'react'
import './MobileBottomSidebar.css'
import logoURL from './item/logo.svg'

const MobileBottomSidebar = ({ isMobileBottomSidebarOpened, setIsMobileBottomSidebarOpened }) => {
    
    useEffect(() => {
        console.log(isMobileBottomSidebarOpened)

    }, [isMobileBottomSidebarOpened])
    return (
        <>
        <div className={isMobileBottomSidebarOpened ? 'MobileBottomSidebar MobileBottomSidebar__fade-in-animation' : 'MobileBottomSidebar MobileBottomSidebar__fade-out-animation'}>
            


             <div className='MobileBottomSidebar__close-area' onClick={() => setIsMobileBottomSidebarOpened(false)}>
                <span>
                    <svg width="70" height="5" viewBox="0 0 70 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="70" height="5" rx="2.5" fill="#373E4E"/>
                    </svg>

                </span>
            </div>



            <section>
                <button className='add-file'>
                    <span>
                        Добавить фото / Файл
                    </span>
                    <i>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5 0.25C11.0523 0.25 11.5 0.697715 11.5 1.25V9H19.25C19.8023 9 20.25 9.44771 20.25 10C20.25 10.5523 19.8023 11 19.25 11H11.5V18.75C11.5 19.3023 11.0523 19.75 10.5 19.75C9.94771 19.75 9.5 19.3023 9.5 18.75V11H1.75C1.19772 11 0.75 10.5523 0.75 10C0.75 9.44771 1.19772 9 1.75 9H9.5V1.25C9.5 0.697715 9.94771 0.25 10.5 0.25Z" fill="#BFBFBF"/>
                        </svg>
                    </i>
                    

                </button>


                <div>
                    <span>
                        <p> Глубокое пояснение </p>
                        <p> В разработке... </p>
                    </span>

                    <button>
                    </button>
                </div>

                <img src={logoURL} alt="" />

            </section>


        </div>      
        </>
    )
}

export default MobileBottomSidebar