
import './MobileTariffSection.css'

import icon_1URL from './item/icon-1.svg'
import icon_2URL from './item/icon-2.svg'
import icon_3URL from './item/icon-3.svg'

const MobileTariffSection = () => {
    

    return (

        <section className='section-tariff'>

            <header>
                <section>

                    <span>
                        <h1>50.032,00 UZS</h1>
                        <h2>Узбекский СУМ/месяц</h2>
                    </span>
                    <span>
                        <h1>36.032,00 UZS</h1>
                        <h2>Узбекский СУМ/месяц</h2>
                    </span>

                </section>

                <section>

                    <button>
                        Месячная
                    </button>


                    <button>
                        Годовая
                    </button>

                </section>

            </header>



            <footer>
                <section>
                    <div> 
                        <img src={icon_1URL} alt="time" />
                    </div>

                    
                    <span> Свобода от очередей на запросы </span>
                </section>

                <section>
                    <div> 
                        <img src={icon_2URL} alt="message" />
                    </div>

                    
                    <span> Расширенные ограничения на обмен сообщениями </span>
                </section>

                <section>
                    <div> 
                        <img src={icon_3URL} alt="file" />
                    </div>

                    
                    <span> Расширенные ограничения на загрузку файлов </span>
                </section>


            </footer>
        </section>
    )
}

export default MobileTariffSection