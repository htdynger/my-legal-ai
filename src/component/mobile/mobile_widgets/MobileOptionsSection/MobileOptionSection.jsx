
import './MobileOptionSection.css'

import true_iconURL from '../../mobile_assets/true.svg'
import false_iconURL from '../../mobile_assets/false.svg'
import AI_URL from '../../mobile_assets/AI.svg'

const MobileOptionSection = () => {

    return (

        
        <section className='section-option'>

            <h1>
                ВЫБЕРИТЕ ПЛАН, КОТОРЫЙ ПОДХОДИТ ВАМ ЛУЧШЕ ВСЕГО
            </h1>

            <aside>
                <div>

                    <h1> Возможности </h1>

                    <span>
                        Кол-во загрузки файлов в день
                    </span>

                    <span>
                        Загрузка файла весом более 50 МБ
                    </span>

                    <span>
                        Кроссплатформенный доступ (Webstite, Telegram)
                    </span>

                    <span>
                        Глубокое пояснение
                    </span>

                    <span>
                        Услуга связи с онлайн-юристом
                    </span>


                </div>


                <div>

                    <h1> LegAI</h1>

                    <span> до 20 </span>
                    <span> до 20 МБ </span>
                    <span> <img src={true_iconURL} alt="true" /> </span>
                    <span> <img src={true_iconURL} alt="true" /> </span>
                    <span> <img src={false_iconURL} alt="false" /> </span>
                </div>


                <div>

                    <h1>
                        Leg <img src={AI_URL} alt="AI" /> Pro
                    </h1>
                    <span> до 100 </span>
                    <span> <img src={true_iconURL} alt="true" /> </span>
                    <span> <img src={true_iconURL} alt="true" /> </span>
                    <span> <img src={true_iconURL} alt="true" /> </span>
                    <span> огр. кол-во </span>

                </div>
            </aside>

        </section>
    )
}

export default MobileOptionSection