
import './MobilePro.css'

import AI_URL from './item/AI.svg'
import character_1URL from './item/character-1.png'

import showMoreURL from './item/showMore.svg'
import showMoreAnimatedURL from './item/showMore-animated.svg'

import section_2_icon_1URL from './item/section-2-icon-1.svg'
import section_2_icon_2URL from './item/section-2-icon-2.svg'
import section_2_icon_3URL from './item/section-2-icon-3.svg'

import true_iconURL from './item/true.svg'
import false_iconURL from './item/false.svg'

import { useState } from 'react'

const MobilePro = () => {

    const [isAccordionOpened, setIsAccordionOpened] = useState([false, false])

    return (
        <>
            <div className="pro-750-wrapper">

                <main className="pro-750">

                    <section className="pro-750__section-1">
                        <header>
                            <h1>
                                Leg <img src={AI_URL} alt="AI" /> Pro
                            </h1>
                            <h2>
                                <p>
                                    РАСШИРЬТЕ СВОИ ВОЗМОЖНОСТИ С PRO
                                </p>
                                <p>
                                    Раздвиньте границы с помощью расширенного доступа.
                                </p>
                            </h2>

                            <button>
                                <span> Оформить подписку </span> <img src={showMoreURL} alt=">" />
                            </button>

                        </header>

                        <footer>
                            <img src={character_1URL} alt="character" />
                        </footer>

                    </section>


                    <section className='pro-750__section-2'>

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
                                    <img src={section_2_icon_1URL} alt="time" />
                                </div>

                                
                                <span> Свобода от очередей на запросы </span>
                            </section>

                            <section>
                                <div> 
                                    <img src={section_2_icon_2URL} alt="message" />
                                </div>

                                
                                <span> Расширенные ограничения на обмен сообщениями </span>
                            </section>

                            <section>
                                <div> 
                                    <img src={section_2_icon_3URL} alt="file" />
                                </div>

                                
                                <span> Расширенные ограничения на загрузку файлов </span>
                            </section>


                        </footer>
                    </section>


                    <section className='pro-750__section-3'>

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


                    <section className='pro-750__section-4'>
                        <h1>Возможности LEG AI</h1>

                        <section>

                            <aside>

                                <div className='pro-750__section-4__opportunity-1'></div>
                                <div className='pro-750__section-4__opportunity-2'></div>
                                <div className='pro-750__section-4__opportunity-3'></div>

                            </aside>


                        </section>

                    </section>




                    <section className='pro-750__section-5'>

                        <h1> ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ </h1>

                        <div>
                            <header>
                                <span> Информация о компании </span> 
                                
                                <button
                                    onClick={() =>
                                        setIsAccordionOpened(prev => {
                                        const initialState = [...prev];
                                        initialState[0] = !initialState[0];
                                        return initialState;
                                        })
                                    }
                                    >
                                    <img
                                        className={isAccordionOpened[0] ? 'accordion-opened-animation' : 'accordion-closed-animation'}
                                        src={showMoreAnimatedURL}
                                        alt="show"
                                    />
                                </button>

                            </header>

                            <section className={isAccordionOpened[0] ? 'accordion-opened-animation' : 'accordion-closed-animation'}>
                            Наша команда состоит из квалифицированных специалистов, обладающих глубокими знаниями в области перестрахования и анализа страховых рисков. Мы следуем международным стандартам и постоянно совершенствуем свой опыт.
                            </section>

                        </div>

                        <div>
                            <header>
                                <span> Информация о компании </span> 
                                
                                <button
                                    onClick={() =>
                                        setIsAccordionOpened(prev => {
                                        const initialState = [...prev];
                                        initialState[1] = !initialState[1];
                                        return initialState;
                                        })
                                    }
                                    >
                                    <img
                                        className={isAccordionOpened[1] ? 'accordion-opened-animation' : 'accordion-closed-animation'}
                                        src={showMoreAnimatedURL}
                                        alt="show"
                                    />
                                </button>

                            </header>

                            <section className={isAccordionOpened[1] ? 'accordion-opened-animation' : 'accordion-closed-animation'}>
                            Наша команда состоит из квалифицированных специалистов, обладающих глубокими знаниями в области перестрахования и анализа страховых рисков. Мы следуем международным стандартам и постоянно совершенствуем свой опыт.
                            </section>

                        </div>


                    </section>


                </main>
            </div>
        </>
    )

}

export default MobilePro