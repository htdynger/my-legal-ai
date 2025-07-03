

import iconURL from './item/icon.svg'
import './MobileInfoStatusSection.css'
const MobileInfoStatusSection = () => {

    return (

        <section className='section-info-status'>
            <aside> 
                <div>
                    <div><img src={iconURL} alt="icon" /></div>
                    <p> Заряд кредитов: </p>
                    <p> 1500/1500 </p>
                </div>

                <div>
                    <div><img src={iconURL} alt="icon" /></div>
                    <p> Сообщений за сегодня:</p>
                    <p> 0 </p>
                </div>

                <div>
                    <i className='info-750-container'>
                        <div>Pro</div>
                        <p> Подписка: </p>
                    </i>

                    <p className='section-info-status__div-3__status'> Неактивна </p>
                </div>

            </aside>
        </section>
    )
}

export default MobileInfoStatusSection